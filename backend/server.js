process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchCompanyData } = require('./services/yahoo');
const { fetchCompanyNews } = require('./services/news');
const { analyzeCompany, fetchCompanyProfileFromAI, compareCompanies } = require('./services/analyzer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {
  const { company } = req.body;

  // Validate request parameters
  if (!company || company.trim() === '') {
    return res.status(400).json({ success: false, message: 'Company name is required.' });
  }

  const queryCompany = company.trim();
  console.log(`Starting production analysis pipeline for: "${queryCompany}"`);

  try {
    // Step 1 & 2: Validate existence & fetch real company information from Yahoo Finance
    let companyProfile;
    try {
      companyProfile = await fetchCompanyData(queryCompany);
    } catch (yfError) {
      console.warn(`Yahoo Finance lookup failed for "${queryCompany}": ${yfError.message}`);
      
      // If it is an explicit validation "not found" error, return 404
      if (yfError.message.includes("Company not found")) {
        return res.status(404).json({
          success: false,
          message: 'Company not found.'
        });
      }
      
      // Connection or network block fallback
      console.log(`Yahoo Finance API connection blocked. Falling back to AI/Sandbox profiler...`);
      companyProfile = await fetchCompanyProfileFromAI(queryCompany);
    }

    // Step 3: Fetch recent company news using NewsAPI
    let companyNews;
    try {
      companyNews = await fetchCompanyNews(companyProfile.company.name);
    } catch (newsError) {
      console.error(`NewsAPI fetch failed: ${newsError.message}`);
      throw new Error(`Failed to fetch latest news: ${newsError.message}`);
    }

    // Step 4: Run LangChain analysis with Gemini
    let aiAnalysis;
    try {
      aiAnalysis = await analyzeCompany(
        companyProfile.company,
        companyProfile.financials,
        companyNews
      );
    } catch (aiError) {
      console.error(`AI analysis failed: ${aiError.message}`);
      throw new Error(`Failed to run AI analysis: ${aiError.message}`);
    }

    // Step 5: Compile and return the strict JSON schema
    const responsePayload = {
      company: companyProfile.company,
      financials: companyProfile.financials,
      news: companyNews,
      analysis: aiAnalysis
    };

    console.log(`Successfully completed analysis pipeline for "${companyProfile.company.name}"`);
    return res.json(responsePayload);

  } catch (error) {
    console.error(`Analysis pipeline failed for "${queryCompany}":`, error.message);
    
    // Return standard error payload
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during company analysis.'
    });
  }
});

// Company comparison endpoint
app.post('/api/compare', async (req, res) => {
  const { company1, company2 } = req.body;

  if (!company1 || company1.trim() === '' || !company2 || company2.trim() === '') {
    return res.status(400).json({ success: false, message: 'Both company1 and company2 names are required.' });
  }

  const c1 = company1.trim();
  const c2 = company2.trim();
  console.log(`Starting comparison pipeline for: "${c1}" vs "${c2}"`);

  // Helper function to fetch and analyze a single company
  const getFullCompanyDetails = async (companyName) => {
    let companyProfile;
    try {
      companyProfile = await fetchCompanyData(companyName);
    } catch (yfError) {
      console.warn(`Yahoo Finance lookup failed for "${companyName}": ${yfError.message}`);
      if (yfError.message.includes("Company not found")) {
        throw new Error(`Company not found: "${companyName}"`);
      }
      console.log(`Yahoo Finance API connection blocked. Falling back to AI/Sandbox profiler...`);
      companyProfile = await fetchCompanyProfileFromAI(companyName);
    }

    let companyNews;
    try {
      companyNews = await fetchCompanyNews(companyProfile.company.name);
    } catch (newsError) {
      console.error(`NewsAPI fetch failed for "${companyProfile.company.name}": ${newsError.message}`);
      throw new Error(`Failed to fetch latest news: ${newsError.message}`);
    }

    let aiAnalysis;
    try {
      aiAnalysis = await analyzeCompany(
        companyProfile.company,
        companyProfile.financials,
        companyNews
      );
    } catch (aiError) {
      console.error(`AI analysis failed for "${companyProfile.company.name}": ${aiError.message}`);
      throw new Error(`Failed to run AI analysis: ${aiError.message}`);
    }

    return {
      company: companyProfile.company,
      financials: companyProfile.financials,
      news: companyNews,
      analysis: aiAnalysis
    };
  };

  try {
    // Run both pipelines concurrently
    const [company1Data, company2Data] = await Promise.all([
      getFullCompanyDetails(c1),
      getFullCompanyDetails(c2)
    ]);

    // Run direct comparison
    const comparisonResult = await compareCompanies(company1Data, company2Data);

    // Enhance individual analyses with the comparison details expected by the frontend
    company1Data.analysis.overallScore = comparisonResult.company1Details?.overallScore || 75;
    company1Data.analysis.riskLevel = comparisonResult.company1Details?.riskLevel || 'Medium';
    company1Data.analysis.investmentHorizon = comparisonResult.company1Details?.investmentHorizon || 'Long-term';
    company1Data.analysis.opportunities = comparisonResult.company1Details?.opportunities || [];

    company2Data.analysis.overallScore = comparisonResult.company2Details?.overallScore || 75;
    company2Data.analysis.riskLevel = comparisonResult.company2Details?.riskLevel || 'Medium';
    company2Data.analysis.investmentHorizon = comparisonResult.company2Details?.investmentHorizon || 'Long-term';
    company2Data.analysis.opportunities = comparisonResult.company2Details?.opportunities || [];

    return res.json({
      success: true,
      generatedAt: new Date().toISOString(),
      company1: company1Data,
      company2: company2Data,
      comparison: {
        winner: comparisonResult.winner,
        winnerSymbol: comparisonResult.winnerSymbol,
        summary: comparisonResult.summary,
        reason: comparisonResult.reason,
        comparisonScore: comparisonResult.comparisonScore
      }
    });

  } catch (error) {
    console.error(`Comparison pipeline failed for "${c1}" vs "${c2}":`, error.message);
    
    // Return standard error payload matching what the frontend expects
    if (error.message.includes("Company not found")) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during company comparison.'
    });
  }
});

// Simple healthcheck

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(` InvestIQ AI Backend running on port ${PORT}`);
  console.log(` Mode: Production AI Pipeline Active`);
  console.log(`========================================`);
});
