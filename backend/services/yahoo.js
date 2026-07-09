const YahooFinance = require('yahoo-finance2').default;

// Instantiate Yahoo Finance with a browser User-Agent to bypass firewall blocks (Sophos)
const yahooFinance = new YahooFinance({
  fetchOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  }
});
const aliases = {
  google: "Alphabet",
  alphabet: "Alphabet",
  facebook: "Meta",
  meta: "Meta",
  tcs: "Tata Consultancy Services",
  reliance: "Reliance Industries",
  infosys: "Infosys",
  wipro: "Wipro",
  hcl: "HCL Technologies",
  airtel: "Bharti Airtel",
  amazon: "Amazon",
  microsoft: "Microsoft",
  apple: "Apple",
  tesla: "Tesla",
  nvidia: "NVIDIA"
};

/**
 * Searches for a company ticker and retrieves financial profile and news.
 * @param {string} companyName - The name of the company to look up.
 * @returns {Promise<Object>} The resolved financial data profile.
 */
async function fetchCompanyData(companyName) {
  try {
    const searchTerm =
      aliases[companyName.trim().toLowerCase()] || companyName;

    const searchResults = await yahooFinance.search(searchTerm, {
      newsCount: 1
    });
    // Strict existence check: If no quotes are found, the company does not exist
    if (!searchResults.quotes || searchResults.quotes.length === 0) {
      throw new Error("Company not found.");
    }

    // Find the first quote that is an equity (stock) or any valid symbol
    // Normalize search query
    const query = companyName.trim().toLowerCase();

    // Score every result
    const rankedQuotes = searchResults.quotes
      .filter(q => q.symbol && q.quoteType === "EQUITY")
      .map(q => {
        let score = 0;

        const shortName = (q.shortname || "").toLowerCase();
        const longName = (q.longname || "").toLowerCase();
        const symbol = (q.symbol || "").toLowerCase();

        // Exact symbol match
        if (symbol === query) score += 100;

        // Exact company name match
        if (shortName === query) score += 90;
        if (longName === query) score += 90;

        // Company name starts with query
        if (shortName.startsWith(query)) score += 70;
        if (longName.startsWith(query)) score += 70;

        // Company name contains query
        if (shortName.includes(query)) score += 50;
        if (longName.includes(query)) score += 50;

        // Prefer Indian companies for common Indian searches
        if (symbol.endsWith(".NS")) score += 40;
        if (symbol.endsWith(".BO")) score += 30;

        return {
          score,
          quote: q
        };
      })
      .sort((a, b) => b.score - a.score);

    if (rankedQuotes.length === 0) {
      throw new Error("Company not found.");
    }

    const quote = rankedQuotes[0].quote;

    if (!quote || !quote.symbol) {
      throw new Error("Company not found.");
    }

    const symbol = quote.symbol;

    // Fetch full profile and statistics
    const summary = await yahooFinance.quoteSummary(symbol, {
      modules: ['assetProfile', 'financialData', 'defaultKeyStatistics', 'price', 'summaryDetail']
    });

    const profile = summary.assetProfile || {};
    const financials = summary.financialData || {};
    const stats = summary.defaultKeyStatistics || {};
    const price = summary.price || {};
    const summaryDetail = summary.summaryDetail || {};

    // CEO details
    const ceoInfo = profile.companyOfficers && profile.companyOfficers.find(officer =>
      officer.title && (officer.title.toLowerCase().includes('ceo') || officer.title.toLowerCase().includes('chief executive officer'))
    );
    const ceoName = ceoInfo ? ceoInfo.name : 'N/A';

    // Headquarters string
    const hq = [profile.city, profile.state, profile.country].filter(Boolean).join(', ') || 'N/A';

    // Compile company profile mapping
    const company = {
      name: price.longName || quote.longname || quote.shortname || symbol,
      industry: profile.industry || 'N/A',
      ceo: ceoName,
      description: profile.longBusinessSummary || 'No description available.',
      website: profile.website || 'N/A',
      headquarters: hq,
      employees: profile.fullTimeEmployees || null,
      symbol: symbol,
      marketCap: price.marketCap || summaryDetail.marketCap || null,
      revenue: financials.totalRevenue || null
    };

    // Compile financial health indicators
    const financialsData = {
      marketCap: price.marketCap || summaryDetail.marketCap || null,
      revenue: financials.totalRevenue || null,
      netIncome: financials.netIncomeToCommon || stats.netIncomeToCommon || null,
      peRatio: summaryDetail.trailingPE || stats.trailingPE || null,
      revenueGrowth: financials.revenueGrowth || null,
    };

    return {
      company,
      financials: financialsData
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchCompanyData
};
