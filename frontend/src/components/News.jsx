import React from 'react';
import { ExternalLink, Calendar, BookOpen } from 'lucide-react';

export default function News({ news }) {
  
  const getSentimentStyles = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20';
      case 'negative':
        return 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20';
      case 'neutral':
      default:
        return 'bg-slate-500/10 border-slate-500/20 text-slate-400 hover:bg-slate-500/20';
    }
  };

  if (!news || news.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center text-slate-500">
        <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-600" />
        No news stories available for this company.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Latest Market News</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 hover:translate-y-[-2px] transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider">
                  {item.source}
                </span>
                
                <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-full uppercase tracking-wider transition-colors ${getSentimentStyles(item.sentiment)}`}>
                  {item.sentiment || 'Neutral'}
                </span>
              </div>
              
              <h4 className="text-sm font-semibold text-slate-200 line-clamp-3 group-hover:text-white group-hover:underline decoration-brand-blue leading-snug">
                {item.headline}
              </h4>
            </div>

            <div className="flex items-center justify-between text-slate-500 text-[10px] mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{item.publishedDate}</span>
              </div>
              <span className="flex items-center gap-0.5 text-brand-blue group-hover:text-brand-cyan transition-colors">
                Read Article
                <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
