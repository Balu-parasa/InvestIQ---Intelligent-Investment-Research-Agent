import React from 'react';
import { Building2, User, MapPin, Users, Globe, TrendingUp, Compass, Shield, Clock, Award } from 'lucide-react';

export default function CompanyComparisonCard({ company1, company2 }) {
  const renderCompanyProfile = (companyData) => {
    if (!companyData) return null;

    const { company, financials, analysis } = companyData;
    const { name, symbol, industry, ceo, headquarters, employees, website } = company;
    const { overallScore, recommendation, confidence, riskLevel, investmentHorizon } = analysis;

    const isInvest = recommendation?.toUpperCase() === 'INVEST';

    const details = [
      { label: 'Industry', value: industry || 'N/A', icon: Building2 },
      { label: 'CEO', value: ceo || 'N/A', icon: User },
      { label: 'Headquarters', value: headquarters || 'N/A', icon: MapPin },
      { label: 'Employees', value: employees ? Number(employees).toLocaleString() : 'N/A', icon: Users },
      { label: 'Website', value: website || 'N/A', icon: Globe, isLink: true },
    ];

    const metrics = [
      { label: 'Overall Score', value: `${overallScore || 'N/A'}/100`, icon: TrendingUp, highlight: true },
      { label: 'Confidence', value: `${confidence || 'N/A'}%`, icon: Compass },
      { label: 'Risk Level', value: riskLevel || 'N/A', icon: Shield, isRisk: true },
      { label: 'Horizon', value: investmentHorizon || 'N/A', icon: Clock },
    ];

    return (
      <div className="dashboard-card p-8 flex flex-col justify-between h-full shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-base pb-5">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-text-primary tracking-tight leading-tight">
                {name}
              </h2>
              {website && website !== 'N/A' && (
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-[#1E1C1A] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {website.replace(/https?:\/\/(www\.)?/, '')}
                </a>
              )}
            </div>
            <span className="px-3 py-1.5 text-xs font-bold tracking-wider text-[#1E1C1A] bg-[#EAE5DB]/70 border border-[#E5E0DA] rounded-lg uppercase shadow-sm">
              {symbol}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              let textColor = 'text-text-primary';
              if (m.highlight) textColor = 'text-[#1E1C1A]';
              if (m.isRisk) {
                const val = String(m.value).toLowerCase();
                if (val.includes('low')) textColor = 'text-[#4A6D55]';
                else if (val.includes('high')) textColor = 'text-[#B05B54]';
                else if (val.includes('med') || val.includes('mod')) textColor = 'text-[#C29F68]';
              }
              return (
                <div key={idx} className="bg-[#FCFAF7] border border-border-base rounded-xl p-4 hover:border-[#1E1C1A]/20 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.015)]">
                  <div className="flex items-center gap-1.5 text-text-secondary mb-1">
                    <Icon className="w-3.5 h-3.5 text-[#1E1C1A]/85" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{m.label}</span>
                  </div>
                  <p className={`text-xs font-bold tracking-wide ${textColor}`}>{m.value}</p>
                </div>
              );
            })}
          </div>

          {/* Core Info details list */}
          <div className="space-y-4 pt-2">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              Company Overview
            </h3>
            <div className="space-y-3">
              {details.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="p-1 rounded bg-[#FCFAF7] border border-border-base shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-[#7E7A75]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-text-secondary text-[8px] font-bold uppercase tracking-wider block">
                        {detail.label}
                      </span>
                      {detail.isLink && detail.value !== 'N/A' ? (
                        <a
                          href={detail.value.startsWith('http') ? detail.value : `https://${detail.value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-primary hover:text-[#1E1C1A] font-semibold line-clamp-1 break-all transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-text-primary font-semibold line-clamp-1">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Agent recommendation ribbon */}
        <div className="mt-6 pt-5 border-t border-border-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-text-secondary" />
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Verdict Opinion</span>
          </div>
          <span className={`px-3.5 py-1.5 text-xs font-bold tracking-wider rounded-lg uppercase shadow-sm ${
            isInvest
              ? 'text-[#4A6D55] bg-[#4A6D55]/5 border border-[#4A6D55]/15'
              : 'text-[#B05B54] bg-[#B05B54]/5 border border-[#B05B54]/15'
          }`}>
            {recommendation}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {renderCompanyProfile(company1)}
      {renderCompanyProfile(company2)}
    </div>
  );
}
