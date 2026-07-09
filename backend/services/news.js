const YahooFinance = require('yahoo-finance2').default;

// Instantiate Yahoo Finance with a browser User-Agent to bypass firewall blocks (Sophos)
const yahooFinance = new YahooFinance({
  fetchOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  }
});

/**
 * Fetches recent news stories for a company using NewsAPI with a fallback to Yahoo Finance News.
 * @param {string} companyName - The name of the company to query.
 * @returns {Promise<Array>} List of news article objects containing title, date, source, and summary.
 */
async function fetchCompanyNews(companyName) {
  const apiKey = process.env.NEWS_API_KEY;

  // Try to fetch from NewsAPI if a key is provided
  if (apiKey && apiKey !== 'YOUR_NEWS_API_KEY_HERE' && apiKey.trim() !== '') {
    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(companyName)}&pageSize=5&sortBy=relevance&language=en&apiKey=${apiKey}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          return data.articles.slice(0, 5).map(article => ({
            title: article.title || 'No Title',
            date: article.publishedAt ? article.publishedAt.slice(0, 10) : 'N/A',
            source: article.source && article.source.name ? article.source.name : 'News Source',
            summary: article.description || article.content || 'No summary available.'
          }));
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
      }
    } catch (newsError) {
    }
  }

  // Fallback: Query Yahoo Finance Search News (does not require key)
  try {
    const searchResults = await yahooFinance.search(companyName, { newsCount: 5 });
    if (searchResults.news && searchResults.news.length > 0) {
      return searchResults.news.map(item => {
        let dateStr = 'Recent';

        if (item.providerPublishTime) {
          // Detect and parse date object, millisecond timestamp, or second timestamp
          let dateObj;
          if (item.providerPublishTime instanceof Date) {
            dateObj = item.providerPublishTime;
          } else {
            const ts = Number(item.providerPublishTime);
            // If UNIX seconds (e.g. 1712345678) vs milliseconds
            dateObj = new Date(ts < 1e11 ? ts * 1000 : ts);
          }

          try {
            dateStr = dateObj.toISOString().slice(0, 10);
          } catch (e) {
            dateStr = 'Recent';
          }
        }

        return {
          title: item.title || 'Market Update',
          date: dateStr,
          source: item.publisher || 'Yahoo Finance',
          summary: item.title
        };
      });
    }
  } catch (yfNewsError) {
    throw new Error(`Failed to retrieve latest news: ${yfNewsError.message}`);
  }

  return [];
}

module.exports = {
  fetchCompanyNews
};
