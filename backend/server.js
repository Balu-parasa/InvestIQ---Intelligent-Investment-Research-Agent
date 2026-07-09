require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchCompanyData } = require('./services/yahoo');
const { fetchCompanyNews } = require('./services/news');
const { analyzeCompany, compareCompanies } = require('./services/analyzer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

async function getYahooWithRetry(companyName, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchCompanyData(companyName);
    } catch (err) {
      if (i === retries - 1) {
        throw err;
      }



      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }
}

// Main analysis endpoint
app.post('/api/analyze', async (req, res) => {

  const { company } = req.body;

  // Validate request parameters
  if (!company || company.trim() === '') {
    return res.status(400).json({ success: false, message: 'Company name is required.' });
  }

  const queryCompany = company.trim();

  try {
    // Step 1 & 2: Validate existence & fetch real company information from Yahoo Finance
    let companyProfile;
    try {

      companyProfile = await getYahooWithRetry(queryCompany);

    } catch (yfError) {

      // If it is an explicit validation "not found" error, return 404
      if (yfError.message.includes("Company not found")) {
        return res.status(404).json({
          success: false,
          message: 'Company not found.'
        });
      }

      throw yfError;
    }

    // Step 3: Fetch recent company news using NewsAPI
    let companyNews;
    try {

      companyNews = await fetchCompanyNews(companyProfile.company.name);

    } catch (newsError) {
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
      throw new Error(`Failed to run AI analysis: ${aiError.message}`);
    }

    // Step 5: Compile and return the strict JSON schema
    const responsePayload = {
      company: companyProfile.company,
      financials: companyProfile.financials,
      news: companyNews,
      analysis: aiAnalysis
    };

    return res.json(responsePayload);

  } catch (error) {

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

  // Helper function to fetch and analyze a single company
  const getFullCompanyDetails = async (companyName) => {
    let companyProfile;
    try {
      companyProfile = await getYahooWithRetry(companyName);
    } catch (yfError) {
      if (yfError.message.includes("Company not found")) {
        throw new Error(`Company not found: "${companyName}"`);
      }
      throw yfError;
    }

    let companyNews;
    try {
      companyNews = await fetchCompanyNews(companyProfile.company.name);
    } catch (newsError) {
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
});
