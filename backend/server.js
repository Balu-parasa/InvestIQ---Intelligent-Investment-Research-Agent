process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { fetchCompanyData } = require('./services/yahoo');
const { fetchCompanyNews } = require('./services/news');
const { analyzeCompany } = require('./services/analyzer');

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
