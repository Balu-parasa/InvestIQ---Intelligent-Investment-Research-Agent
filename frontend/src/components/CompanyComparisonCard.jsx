import React from 'react';
import { Building2, User, MapPin, Users, Globe, TrendingUp, Compass, Shield, Clock, Award } from 'lucide-react';

export default function CompanyComparisonCard({ company1, company2 }) {
  const renderCompanyProfile = (companyData, isLeft) => {
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
      <div className={`glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between h-full border ${
        isLeft ? 'border-brand-purple/10' : 'border-brand-blue/10'
      }`}>
        {/* Glow backgrounds */}
        <div className={`absolute top-0 right-0 w-[120px] h-[120px] rounded-full blur-3xl pointer-events-none ${
          isLeft ? 'bg-brand-purple/5' : 'bg-brand-blue/5'
        }`} />

        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
                {name}
              </h2>
              {website && website !== 'N/A' && (
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-cyan transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {website.replace(/https?:\/\/(www\.)?/, '')}
                </a>
              )}
            </div>
            <span className={`px-3 py-1.5 text-xs font-bold tracking-widest rounded-lg border uppercase ${
              isLeft
                ? 'text-brand-purple bg-brand-purple/10 border-brand-purple/20'
                : 'text-brand-blue bg-brand-blue/10 border-brand-blue/20'
            }`}>
              {symbol}
            </span>
          </div>

          {/* Quick Metrics Dashboard inside card */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              let textColor = 'text-slate-200';
              if (m.highlight) textColor = 'text-brand-cyan';
              if (m.isRisk) {
                const val = String(m.value).toLowerCase();
                if (val.includes('low')) textColor = 'text-emerald-400';
                else if (val.includes('high')) textColor = 'text-rose-400';
                else if (val.includes('med') || val.includes('mod')) textColor = 'text-amber-400';
              }
              return (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 hover:border-slate-800 transition-colors">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
                  </div>
                  <p className={`text-sm font-semibold tracking-wide ${textColor}`}>{m.value}</p>
                </div>
              );
            })}
          </div>

          {/* Core Info details list */}
          <div className="space-y-3.5 pt-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Company Overview
            </h3>
            <div className="space-y-2.5">
              {details.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <Icon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <span className="text-slate-500 font-medium block text-[10px] uppercase tracking-wider">
                        {detail.label}
                      </span>
                      {detail.isLink && detail.value !== 'N/A' ? (
                        <a
                          href={detail.value.startsWith('http') ? detail.value : `https://${detail.value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-brand-cyan font-semibold line-clamp-1 break-all"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-slate-300 font-semibold line-clamp-1">
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
        <div className={`mt-6 pt-5 border-t border-white/5 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verdict Opinion</span>
          </div>
          <span className={`px-4 py-1.5 text-xs font-black tracking-widest rounded-full uppercase ${
            isInvest
              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
              : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
          }`}>
            {recommendation}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {renderCompanyProfile(company1, true)}
      {renderCompanyProfile(company2, false)}
    </div>
  );
}
