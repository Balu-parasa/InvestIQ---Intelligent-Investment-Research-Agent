import React from 'react';
import { ExternalLink, Calendar, BookOpen } from 'lucide-react';

export default function News({ news }) {
  
  const getSentimentStyles = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'bg-[#22C55E]/5 border-[#22C55E]/15 text-[#22C55E]';
      case 'negative':
        return 'bg-[#EF4444]/5 border-[#EF4444]/15 text-[#EF4444]';
      case 'neutral':
      default:
        return 'bg-[#F8F7F4] border-border-base text-text-secondary';
    }
  };

  if (!news || news.length === 0) {
    return (
      <div className="dashboard-card p-8 text-center text-text-secondary">
        <BookOpen className="w-8 h-8 mx-auto mb-2 text-text-secondary/40" />
        No news stories available for this company.
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest">Latest Market News</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-card p-6 flex flex-col justify-between hover:border-[#8B5CF6]/30 transition-all duration-200 group shadow-[0_1px_3px_rgba(0,0,0,0.01),0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[9px] font-bold px-2.5 py-0.5 border rounded-md uppercase tracking-wider ${getSentimentStyles(item.sentiment)}`}>
                  {item.sentiment || 'Neutral'}
                </span>
              </div>
              
              <h4 className="text-sm font-bold text-text-primary group-hover:text-[#8B5CF6] transition-colors leading-snug">
                {item.headline}
              </h4>
            </div>

            <div className="space-y-3 mt-4 pt-3.5 border-t border-border-base">
              <div className="flex items-center justify-between text-text-secondary text-[10px]">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-text-primary">{item.source}</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#6B7280]/60" />
                    <span>{item.publishedDate}</span>
                  </div>
                </div>
                <span className="flex items-center gap-0.5 text-[#8B5CF6] font-bold uppercase tracking-wider group-hover:translate-x-[2px] transition-transform duration-200 text-[9px]">
                  Read Article
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
