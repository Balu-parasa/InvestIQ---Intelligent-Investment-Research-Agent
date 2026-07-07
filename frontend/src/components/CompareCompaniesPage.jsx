import React, { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import ComparisonHeader from './ComparisonHeader';
import ComparisonSearch from './ComparisonSearch';
import CompanyComparisonCard from './CompanyComparisonCard';
import FinancialComparisonTable from './FinancialComparisonTable';
import SwotComparison from './SwotComparison';
import ComparisonSummary from './ComparisonSummary';
import ComparisonSkeleton from './ComparisonSkeleton';
import ComparisonError from './ComparisonError';

export default function CompareCompaniesPage() {
  const [company1, setCompany1] = useState('');
  const [company2, setCompany2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (!company1.trim() || !company2.trim()) return;

    setIsLoading(true);
    setError(null);
    setComparisonData(null);

    try {
      const response = await fetch('http://localhost:5000/api/compare', {
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
        <div className="pt-4">
          <div className="dashboard-card p-8 md:p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-10 h-10 rounded bg-brand-blue/10 flex items-center justify-center text-brand-blue mx-auto">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <p className="text-text-secondary text-sm">
              Compare two publicly listed companies to receive an AI-powered investment comparison.
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
