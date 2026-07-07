import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BrainCircuit, RotateCcw, AlertTriangle } from 'lucide-react';
import Hero from './components/Hero';
import Loading from './components/Loading';
import Overview from './components/Overview';
import Financials from './components/Financials';
import News from './components/News';
import SWOT from './components/SWOT';
import Recommendation from './components/Recommendation';
import Sources from './components/Sources';
import CompareCompaniesPage from './components/CompareCompaniesPage';

export default function App() {
  const [activeView, setActiveView] = useState('SEARCH'); // 'SEARCH' | 'LOADING' | 'RESULTS'
  const [searchQuery, setSearchQuery] = useState('');
  const [isDataReady, setIsDataReady] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync route on popstate (browser back/forward button clicks)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  const handleLogoClick = () => {
    handleReset();
    navigateTo('/');
  };

  // Trigger analysis pipeline
  const startAnalysis = async (query) => {
    setSearchQuery(query);
    setError(null);
    setIsDataReady(false);
    setActiveView('LOADING');

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: query })
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Company not found.');
      }

      // Parser for SWOT strings "Title: Description" to visual component requirements
      const parseSwotItem = (str, index, fallbackTitle) => {
        const colonIndex = str.indexOf(':');
        if (colonIndex !== -1) {
          return {
            title: str.slice(0, colonIndex).trim(),
            description: str.slice(colonIndex + 1).trim()
          };
        }
        return {
          title: `${fallbackTitle} ${index + 1}`,
          description: str
        };
      };

      const getSentiment = (title, summary) => {
        const text = `${title} ${summary}`.toLowerCase();
        if (text.includes('growth') || text.includes('beat') || text.includes('rise') || text.includes('gain') || text.includes('success') || text.includes('positive') || text.includes('upward')) return 'Positive';
        if (text.includes('fall') || text.includes('drop') || text.includes('loss') || text.includes('slump') || text.includes('decline') || text.includes('warning') || text.includes('negative') || text.includes('hit')) return 'Negative';
        return 'Neutral';
      };

      const mappedOverview = {
        name: result.company.name,
        symbol: result.company.symbol || 'N/A',
        industry: result.company.industry,
        ceo: result.company.ceo,
        headquarters: result.company.headquarters,
        website: result.company.website,
        description: `${result.company.description}${result.company.employees ? ` (Employees: ${Number(result.company.employees).toLocaleString()})` : ''}`,
        founded: 'N/A'
      };

      const mappedFinancials = {
        revenue: result.financials.revenue,
        netIncome: result.financials.netIncome,
        marketCap: result.financials.marketCap,
        peRatio: result.financials.peRatio,
        revenueGrowth: result.financials.revenueGrowth
      };

      const mappedNews = result.news.map((item, index) => ({
        headline: item.title,
        source: item.source,
        publishedDate: item.date,
        link: item.link || `https://finance.yahoo.com/quote/${result.company.symbol}`,
        sentiment: getSentiment(item.title, item.summary)
      }));

      const mappedSwot = {
        strengths: result.analysis.strengths.map((s, i) => parseSwotItem(s, i, 'Strength')),
        weaknesses: result.analysis.weaknesses.map((w, i) => parseSwotItem(w, i, 'Weakness')),
        opportunities: [
          { title: "Growth Potential", description: "Expanded product lines and regional scaling vector optimization." },
          { title: "Strategic Leverage", description: "Capital allocation efficiency and technological integration." },
          { title: "Market Scaling", description: "Untapped client demographics and business sector penetration." }
        ],
        risks: result.analysis.risks.map((r, i) => parseSwotItem(r, i, 'Risk'))
      };

      const mappedRecommendation = {
        decision: result.analysis.recommendation,
        confidence: result.analysis.confidence,
        reasoning: result.analysis.reasoning
      };

      const mappedSources = [
        { name: 'Yahoo Finance Profile', url: `https://finance.yahoo.com/quote/${result.company.symbol}` },
        { name: 'SEC Filings', url: `https://www.sec.gov/edgar/searchedgar/companysearch?company=${result.company.symbol}` },
        { name: 'Google Finance', url: `https://www.google.com/finance/quote/${result.company.symbol}:NASDAQ` }
      ];

      setAnalysisData({
        overview: mappedOverview,
        financials: mappedFinancials,
        news: mappedNews,
        swot: mappedSwot,
        recommendation: mappedRecommendation,
        sources: mappedSources
      });

      setIsDataReady(true);
    } catch (err) {
      console.error("API Call error:", err.message);
      setError(err.message);
      setActiveView('SEARCH');
    }
  };

  const handleLoadingFinished = () => {
    setActiveView('RESULTS');
  };

  const handleReset = () => {
    setAnalysisData(null);
    setIsDataReady(false);
    setSearchQuery('');
    setError(null);
    setActiveView('SEARCH');
  };

  return (
    <div className="min-h-screen relative font-sans">
      {/* Header / Navbar */}
      <header className="border-b border-border-base bg-card-base sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-12">
            <div 
              onClick={handleLogoClick} 
              className="flex items-center gap-2 cursor-pointer group shrink-0"
            >
              <div className="p-1.5 rounded-lg bg-brand-blue group-hover:bg-brand-blue/80 transition-colors duration-200">
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-text-primary">
                Invest<span className="text-brand-blue">IQ</span>
              </h1>
            </div>

            {/* Navigation links */}
            <nav className="flex items-center gap-6">
              <button
                onClick={() => { handleReset(); navigateTo('/'); }}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  currentPath === '/' 
                    ? 'text-brand-blue border-b-2 border-brand-blue pb-1' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Analyze
              </button>
              <button
                onClick={() => navigateTo('/compare')}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  currentPath === '/compare' 
                    ? 'text-brand-blue border-b-2 border-brand-blue pb-1' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Compare Companies
              </button>
            </nav>
          </div>

          {currentPath === '/' && activeView === 'RESULTS' && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary border border-border-base hover:border-brand-blue/40 hover:bg-bg-base rounded-lg transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Research
            </button>
          )}
        </div>
      </header>

      {/* Error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 inset-x-4 max-w-lg mx-auto z-[100] bg-card-base border border-brand-danger/30 text-text-primary p-4 rounded-xl shadow-lg flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-brand-danger shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-text-primary">Research Interrupted</h4>
              <p className="text-xs text-text-secondary leading-relaxed">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentPath === '/compare' ? (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CompareCompaniesPage />
            </motion.div>
          ) : (
            <React.Fragment key="dashboard">
              {/* SEARCH VIEW */}
              {activeView === 'SEARCH' && (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <Hero onSearch={startAnalysis} />
                </motion.div>
              )}

              {/* LOADING VIEW */}
              {activeView === 'LOADING' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Loading isDataReady={isDataReady} onFinished={handleLoadingFinished} />
                </motion.div>
              )}

              {/* RESULTS VIEW */}
              {activeView === 'RESULTS' && analysisData && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  {/* Reset Search back button */}
                  <button 
                    onClick={handleReset} 
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:translate-x-[-2px] transition-transform" />
                    Back to Dashboard Search
                  </button>

                  {/* Section 5: Main Opinion / Recommendation Callout */}
                  <Recommendation recommendation={analysisData.recommendation} />

                  {/* Grid block for Overview and Financials */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Section 1: Company Profile Info */}
                    <div className="lg:col-span-1">
                      <Overview overview={analysisData.overview} />
                    </div>
                    {/* Section 2: Financial Grid Cards */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-col h-full justify-between gap-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Financial Health Indicators</h3>
                          <Financials financials={analysisData.financials} />
                        </div>
                        {/* Section 4: SWOT Details */}
                        <SWOT swot={analysisData.swot} />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Sentiment-categorized News */}
                  <News news={analysisData.news} />

                  {/* Section 6: Sources citations */}
                  <Sources sources={analysisData.sources} />

                </motion.div>
              )}
            </React.Fragment>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
