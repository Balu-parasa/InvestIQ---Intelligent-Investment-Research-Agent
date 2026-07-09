const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { SystemMessage, HumanMessage } = require("@langchain/core/messages");


/**
 * Performs LangChain AI investment research using Gemini API.
 * @param {Object} company - The company profile data.
 * @param {Object} financials - The financial indicators.
 * @param {Array} news - The recent NewsAPI articles.
 * @returns {Promise<Object>} The strict analysis JSON response.
 */


async function analyzeCompany(company, financials, news) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE' || apiKey.trim() === '') {
    throw new Error(
      "Gemini API key is not configured."
    );
  }

  let jsonText = "";
  try {

    const chatModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: apiKey,
      temperature: 0.2,
      responseMimeType: "application/json"
    });

    const systemPrompt = `You are a senior equity research analyst at a top-tier investment bank. Your task is to review financial profiles and news for a public company and output a professional, data-driven investment analysis.

You MUST return ONLY a valid JSON object. Do not output any markdown code blocks (e.g. do not wrap in \`\`\`json), do not write any introductory or trailing text. The output must be directly parseable via JSON.parse().`;

    const userPrompt = `
Analyze the following investment target:

COMPANY PROFILE:
Name: ${company.name}
Symbol: ${company.symbol}
Industry: ${company.industry}
CEO: ${company.ceo}
Headquarters: ${company.headquarters}
Employees: ${company.employees ? company.employees.toLocaleString() : 'N/A'}
Website: ${company.website}
Description: ${company.description}

FINANCIAL DATA:
Revenue (TTM): $${company.revenue ? company.revenue.toLocaleString() : 'N/A'}
Market Capitalization: $${company.marketCap ? company.marketCap.toLocaleString() : 'N/A'}
Net Income: $${financials.netIncome ? financials.netIncome.toLocaleString() : 'N/A'}
P/E Ratio: ${financials.peRatio ? financials.peRatio.toFixed(2) : 'N/A'}
Revenue Growth (YoY): ${financials.revenueGrowth ? (financials.revenueGrowth * 100).toFixed(2) + '%' : 'N/A'}

RECENT NEWS ARTICLES:
${news.map((item, idx) => `[Article ${idx + 1}] Title: "${item.title}" | Source: "${item.source}" | Date: "${item.date}" | Summary: "${item.summary}"`).join('\n')}

Generate an investment analysis JSON object with exactly this schema:
{
  "strengths": [
    "Strong brand recognition across global markets.",
    "Healthy cash flow and operating margins.",
    "Diversified revenue streams reduce concentration risk."
  ],
  "weaknesses": [
    "Premium valuation limits near-term upside.",
    "Heavy dependence on advertising revenue.",
    "Rising operating expenses pressure margins."
  ],
  "risks": [
    "Regulatory investigations may affect growth trajectory.",
    "Macroeconomic slowdown could reduce consumer demand.",
    "Strong competition from well-funded industry players."
  ],
  "recommendation": "INVEST",
  "confidence": 78,
  "reasoning": "Max 100 words. Cover financial health, growth outlook, news sentiment, business quality, and investment conclusion. Be specific and data-driven."
}

SWOT FIELD RULES (MANDATORY):
- strengths, weaknesses, risks: Exactly 3 items each.
- Each item is a single plain sentence. Maximum 15 words. No colons. No title prefixes.
- Write like an equity research analyst bullet note — direct, factual, and information-dense.
- Each bullet must convey one specific, distinct insight. No padding. No repetition.
- DO NOT start bullets with: "The company", "The business", "This company", "Overall", "Based on", "It is", "Furthermore", "Additionally".
- DO NOT use colons to separate a label from description (e.g. "Revenue: Strong cash flow" is WRONG).
- Good examples: "Strong brand recognition across global markets." / "Premium valuation limits near-term upside." / "AI expansion unlocks new revenue potential."
- Bad examples: "The company demonstrates strong brand." / "Brand Recognition: The company has global reach."

FIELD RULES:
- recommendation: Return ONLY "INVEST" or "PASS". Recommend INVEST only when financials and news strongly support a positive case. Return PASS for significant uncertainties, weak indicators, or negative news.
- confidence: Realistic integer between 60 and 95. Lower if data is incomplete or conflicting.
- reasoning: Max 100 words. Specific financial figures and rationale. No padding.

SCORING SCALE (if applicable):
- Excellent companies: 85-95
- Good companies: 70-84
- Average companies: 55-69
- Weak companies: below 55
Avoid clustering scores around 80-90 for all companies.

WRITING RULES — MANDATORY:
- This dashboard is for quick investment decision-making. Users must grasp the thesis in 15 seconds.
- Write like a professional equity research analyst. Be direct, data-driven, and precise.
- Forbidden phrases: "Overall", "In conclusion", "It is important to note", "This company demonstrates", "It is worth noting", "Furthermore", "Additionally", "The company benefits from", "Based on available information".
- Avoid generic observations. Every sentence must add specific investment value.

Remember: Output ONLY valid raw JSON.`;

    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ];

    const response = await chatModel.invoke(messages);
    jsonText = response.text || response.content;

    if (jsonText.includes("```")) {
      jsonText = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();
    }

    const parsedResult = JSON.parse(jsonText);
    return parsedResult;
  } catch (error) {

    if (
      error.message.includes("429") ||
      error.message.toLowerCase().includes("quota")
    ) {
      throw new Error(
        "AI analysis is temporarily unavailable because the Gemini API quota has been exceeded. Please try again later."
      );
    }

    throw new Error(
      "AI analysis is temporarily unavailable."
    );
  }
}

/**
 * Performs LangChain AI comparison analysis between two public companies using Gemini API.
 * @param {Object} company1Data - First company's compiled profile, financials, news, and analysis.
 * @param {Object} company2Data - Second company's compiled profile, financials, news, and analysis.
 * @returns {Promise<Object>} The comparative JSON analysis.
 */
async function compareCompanies(company1Data, company2Data) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE' || apiKey.trim() === '') {
    throw new Error("GEMINI_API_KEY is not configured. Cannot perform comparison analysis.");
  }


  const chatModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: apiKey,
    temperature: 0.2,
    responseMimeType: "application/json"
  });

  const systemPrompt = `You are a senior equity research analyst at a top-tier investment bank. Your task is to compare two analyzed public companies and output a professional, structured investment comparison report.

You MUST return ONLY a valid JSON object. Do not output any markdown code blocks (e.g. do not wrap in \`\`\`json), do not write any introductory or trailing text. The output must be directly parseable via JSON.parse().`;

  const userPrompt = `
Compare the following two investment targets:

COMPANY 1:
Name: ${company1Data.company.name}
Symbol: ${company1Data.company.symbol}
Industry: ${company1Data.company.industry}
CEO: ${company1Data.company.ceo}
Headquarters: ${company1Data.company.headquarters}
Employees: ${company1Data.company.employees ? company1Data.company.employees.toLocaleString() : 'N/A'}
Description: ${company1Data.company.description}

FINANCIAL DATA:
Revenue (TTM): $${company1Data.company.revenue ? company1Data.company.revenue.toLocaleString() : 'N/A'}
Market Capitalization: $${company1Data.company.marketCap ? company1Data.company.marketCap.toLocaleString() : 'N/A'}
Net Income: $${company1Data.financials.netIncome ? company1Data.financials.netIncome.toLocaleString() : 'N/A'}
P/E Ratio: ${company1Data.financials.peRatio ? company1Data.financials.peRatio.toFixed(2) : 'N/A'}
Revenue Growth (YoY): ${company1Data.financials.revenueGrowth ? (company1Data.financials.revenueGrowth * 100).toFixed(2) + '%' : 'N/A'}

AI ANALYSIS:
Recommendation: ${company1Data.analysis.recommendation}
Confidence: ${company1Data.analysis.confidence}%
Reasoning: ${company1Data.analysis.reasoning}
Strengths:
${(company1Data.analysis.strengths || []).join('\n')}
Weaknesses:
${(company1Data.analysis.weaknesses || []).join('\n')}
Risks:
${(company1Data.analysis.risks || []).join('\n')}

========================================

COMPANY 2:
Name: ${company2Data.company.name}
Symbol: ${company2Data.company.symbol}
Industry: ${company2Data.company.industry}
CEO: ${company2Data.company.ceo}
Headquarters: ${company2Data.company.headquarters}
Employees: ${company2Data.company.employees ? company2Data.company.employees.toLocaleString() : 'N/A'}
Description: ${company2Data.company.description}

FINANCIAL DATA:
Revenue (TTM): $${company2Data.company.revenue ? company2Data.company.revenue.toLocaleString() : 'N/A'}
Market Capitalization: $${company2Data.company.marketCap ? company2Data.company.marketCap.toLocaleString() : 'N/A'}
Net Income: $${company2Data.financials.netIncome ? company2Data.financials.netIncome.toLocaleString() : 'N/A'}
P/E Ratio: ${company2Data.financials.peRatio ? company2Data.financials.peRatio.toFixed(2) : 'N/A'}
Revenue Growth (YoY): ${company2Data.financials.revenueGrowth ? (company2Data.financials.revenueGrowth * 100).toFixed(2) + '%' : 'N/A'}

AI ANALYSIS:
Recommendation: ${company2Data.analysis.recommendation}
Confidence: ${company2Data.analysis.confidence}%
Reasoning: ${company2Data.analysis.reasoning}
Strengths:
${(company2Data.analysis.strengths || []).join('\n')}
Weaknesses:
${(company2Data.analysis.weaknesses || []).join('\n')}
Risks:
${(company2Data.analysis.risks || []).join('\n')}

Based on this data and individual analysis, perform a direct comparison. Determine:
1. Which company is the better investment (winner name and winner symbol).
2. A high-level executive summary of the comparison (max 80 words).
3. The comparison reasoning — why the winner was chosen (max 100 words).
4. Relational score out of 100 for each company (company1 vs company2).
5. Generate strategic opportunities, overallScore (1-100), riskLevel ("Low", "Medium", or "High"), and recommended investmentHorizon ("Short-term", "Medium-term", or "Long-term") for both companies.

Return exactly this JSON schema:
{
  "winner": "Full Name of Winner Company",
  "winnerSymbol": "TICKER",
  "summary": "Max 80 words. Concise executive summary of the comparison. No generic filler.",
  "reason": "Max 100 words. Why the winner was chosen based on specific financial and business evidence.",
  "comparisonScore": {
    "company1": 85,
    "company2": 72
  },
  "company1Details": {
    "overallScore": 85,
    "riskLevel": "Low",
    "investmentHorizon": "Long-term",
    "opportunities": [
      "AI expansion unlocks new high-margin revenue streams.",
      "Enterprise cloud services show accelerating growth.",
      "Emerging market penetration offers significant upside."
    ]
  },
  "company2Details": {
    "overallScore": 72,
    "riskLevel": "High",
    "investmentHorizon": "Medium-term",
    "opportunities": [
      "AI expansion unlocks new high-margin revenue streams.",
      "Enterprise cloud services show accelerating growth.",
      "Emerging market penetration offers significant upside."
    ]
  }
}

SWOT BULLET RULES (MANDATORY):
- opportunities: Exactly 3 items per company. One plain sentence each. Maximum 15 words. No colons. No title prefixes.
- Write like an equity research analyst bullet note — direct, factual, information-dense.
- DO NOT start bullets with: "The company", "The business", "This company", "Overall", "Based on", "It is".
- DO NOT use colons to separate a label from description.
- Good examples: "AI expansion unlocks new high-margin revenue streams." / "Enterprise cloud services show accelerating growth."
- Bad examples: "The company has opportunities in AI." / "AI: The company can expand."

FIELD RULES:
- summary: Max 80 words. No padding. Specific financial contrast between companies.
- reason: Max 100 words. Cite specific metrics that differentiate the winner.
- overallScore: Use the full 0-100 range realistically. Excellent: 85-95. Good: 70-84. Average: 55-69. Weak: below 55.

WRITING RULES — MANDATORY:
- This dashboard is for quick investment decision-making. Users must grasp the thesis in 15 seconds.
- Write like a professional equity research analyst. Be direct, data-driven, and precise.
- Forbidden phrases: "Overall", "In conclusion", "It is important to note", "This company demonstrates", "It is worth noting", "Furthermore", "Additionally", "The company benefits from", "Based on available information".
- Avoid generic observations. Every sentence must add specific investment value.

Remember: Output ONLY valid raw JSON.`;

  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage(userPrompt)
  ];

  try {
    const response = await chatModel.invoke(messages);

    let jsonText = response.text || response.content;

    if (jsonText.includes("```")) {
      jsonText = jsonText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    }

    return JSON.parse(jsonText);

  } catch (error) {

    if (
      error.message.includes("429") ||
      error.message.toLowerCase().includes("quota")
    ) {
      throw new Error(
        "Comparison is temporarily unavailable because the Gemini API quota has been exceeded. Please try again later."
      );
    }

    throw new Error("Failed to compare companies.");
  }
}

module.exports = {
  analyzeCompany,
  compareCompanies
};
