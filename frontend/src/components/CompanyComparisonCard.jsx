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
      <div className="dashboard-card p-6 flex flex-col justify-between h-full">
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
                  className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-brand-blue transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {website.replace(/https?:\/\/(www\.)?/, '')}
                </a>
              )}
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold tracking-wider text-brand-blue bg-brand-blue/10 border border-brand-blue/20 rounded uppercase">
              {symbol}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              let textColor = 'text-text-primary';
              if (m.highlight) textColor = 'text-brand-blue';
              if (m.isRisk) {
                const val = String(m.value).toLowerCase();
                if (val.includes('low')) textColor = 'text-brand-success';
                else if (val.includes('high')) textColor = 'text-brand-danger';
                else if (val.includes('med') || val.includes('mod')) textColor = 'text-brand-warning';
              }
              return (
                <div key={idx} className="bg-bg-base border border-border-base rounded-lg p-3 hover:border-brand-blue/30 transition-colors">
                  <div className="flex items-center gap-1.5 text-text-secondary mb-1">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{m.label}</span>
                  </div>
                  <p className={`text-sm font-semibold tracking-wide ${textColor}`}>{m.value}</p>
                </div>
              );
            })}
          </div>

          {/* Core Info details list */}
          <div className="space-y-3.5 pt-2">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              Company Overview
            </h3>
            <div className="space-y-2.5">
              {details.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <Icon className="w-4 h-4 text-text-secondary/60 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <span className="text-text-secondary text-[9px] uppercase tracking-wider block">
                        {detail.label}
                      </span>
                      {detail.isLink && detail.value !== 'N/A' ? (
                        <a
                          href={detail.value.startsWith('http') ? detail.value : `https://${detail.value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-primary hover:text-brand-blue font-semibold line-clamp-1 break-all transition-colors"
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
          <span className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded uppercase ${
            isInvest
              ? 'text-brand-success bg-brand-success/10 border border-brand-success/20'
              : 'text-brand-danger bg-brand-danger/10 border border-brand-danger/20'
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
