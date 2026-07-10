import React, { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';
import ComparisonHeader from './ComparisonHeader';
import ComparisonSearch from './ComparisonSearch';
import CompanyComparisonCard from './CompanyComparisonCard';
import FinancialComparisonTable from './FinancialComparisonTable';
import SwotComparison from './SwotComparison';
import ComparisonSummary from './ComparisonSummary';
import ComparisonSkeleton from './ComparisonSkeleton';
import ComparisonError from './ComparisonError';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const isMisconfigured = 
  typeof window !== 'undefined' && 
  window.location.hostname !== 'localhost' && 
  window.location.hostname !== '127.0.0.1' && 
  (!API_BASE_URL || API_BASE_URL.includes('localhost'));

export default function CompareCompaniesPage() {
  const [company1, setCompany1] = useState('');
  const [company2, setCompany2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isMisconfigured) {
      setError("Configuration Error: The app is deployed on Railway, but VITE_API_URL is pointing to localhost. Please add the VITE_API_URL variable in your Railway dashboard pointing to your backend's public URL.");
    }
  }, []);

  const handleCompare = async () => {
    if (!company1.trim() || !company2.trim()) return;

    setIsLoading(true);
    setError(null);
    setComparisonData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company1: company1.trim(),
          company2: company2.trim()
        })
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Company not found. Try another publicly listed company.');
      }

      setComparisonData(result);
    } catch (err) {
      console.error('Comparison API error:', err);
      setError(err.message || 'Company not found. Try another publicly listed company.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <ComparisonHeader />

      {/* Input Section */}
      <ComparisonSearch
        company1={company1}
        setCompany1={setCompany1}
        company2={company2}
        setCompany2={setCompany2}
        onCompare={handleCompare}
        isLoading={isLoading}
      />

      {/* Error state */}
      {error && !isLoading && (
        <div className="pt-2">
          <ComparisonError error={error} />
        </div>
      )}

      {/* Loading state skeleton panels */}
      {isLoading && (
        <div className="pt-2">
          <ComparisonSkeleton />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !comparisonData && !error && (
        <div className="pt-6">
          <div className="dashboard-card p-8 md:p-12 text-center max-w-xl mx-auto space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
            <div className="w-12 h-12 rounded-xl bg-[#FCFAF7] border border-border-base flex items-center justify-center text-[#1E1C1A] mx-auto shadow-sm">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <p className="text-text-secondary text-xs leading-relaxed max-w-sm mx-auto">
              Compare two publicly listed companies side-by-side to receive an AI-powered investment comparison.
            </p>
          </div>
        </div>
      )}

      {/* Success comparison results */}
      {!isLoading && comparisonData && (
        <div className="space-y-6 pt-2 animate-fade-in">
          {/* Side-by-side Overview Cards */}
          <CompanyComparisonCard
            company1={comparisonData.company1}
            company2={comparisonData.company2}
          />

          {/* AI Verdict Summary */}
          <ComparisonSummary
            comparison={comparisonData.comparison}
            company1={comparisonData.company1}
            company2={comparisonData.company2}
          />

          {/* Financials comparison table */}
          <FinancialComparisonTable
            company1={comparisonData.company1}
            company2={comparisonData.company2}
          />

          {/* SWOT Side-by-side analysis */}
          <SwotComparison
            company1={comparisonData.company1}
            company2={comparisonData.company2}
          />
        </div>
      )}
    </div>
  );
}
