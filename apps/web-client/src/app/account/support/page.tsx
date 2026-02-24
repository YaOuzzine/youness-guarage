'use client';

import { useLocale } from '../../../i18n/LocaleContext';

export default function UserSupportPage() {
  const { t } = useLocale();

  return (
    <div className="p-6 lg:p-10 w-full max-w-7xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            {t.accountSupport.title}
          </h1>
          <p className="text-slate-400 max-w-xl">
            {t.accountSupport.subtitle}
          </p>
        </div>
        <div className="relative w-full md:w-96 group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined group-focus-within:text-electric-teal transition-colors">
            search
          </span>
          <input
            className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-slate-500 transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
            placeholder={t.accountSupport.searchPlaceholder}
            type="text"
          />
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <button className="glass-card rounded-[2rem] p-8 text-left group hover:bg-white/5 transition-all duration-300 relative overflow-hidden h-48 flex flex-col justify-between border-t border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-electric-teal group-hover:scale-110 transition-transform duration-300 relative z-10">
            <span className="material-symbols-outlined text-2xl">
              library_books
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-electric-teal transition-colors">
              {t.accountSupport.faqs}
            </h3>
            <p className="text-sm text-slate-400">
              {t.accountSupport.faqsDesc}
            </p>
          </div>
          <span className="material-symbols-outlined absolute top-6 right-6 text-slate-600 group-hover:text-white transition-colors -rotate-45 group-hover:rotate-0 transform duration-300">
            arrow_forward
          </span>
        </button>

        <button className="glass-card rounded-[2rem] p-8 text-left group hover:bg-white/5 transition-all duration-300 relative overflow-hidden h-48 flex flex-col justify-between border-t border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-fresh-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-fresh-mint group-hover:scale-110 transition-transform duration-300 relative z-10">
            <span className="material-symbols-outlined text-2xl">forum</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-fresh-mint transition-colors">
              {t.accountSupport.liveChat}
            </h3>
            <p className="text-sm text-slate-400">
              {t.accountSupport.liveChatDesc}
            </p>
          </div>
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fresh-mint opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-fresh-mint" />
            </span>
            <span className="text-xs font-bold text-fresh-mint uppercase tracking-wider">
              {t.accountSupport.online}
            </span>
          </div>
        </button>

        <button className="glass-card rounded-[2rem] p-8 text-left group hover:bg-white/5 transition-all duration-300 relative overflow-hidden h-48 flex flex-col justify-between border-t border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300 relative z-10">
            <span className="material-symbols-outlined text-2xl">
              confirmation_number
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
              {t.accountSupport.submitTicket}
            </h3>
            <p className="text-sm text-slate-400">
              {t.accountSupport.submitTicketDesc}
            </p>
          </div>
          <span className="material-symbols-outlined absolute top-6 right-6 text-slate-600 group-hover:text-white transition-colors -rotate-45 group-hover:rotate-0 transform duration-300">
            arrow_forward
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FAQs */}
        <div className="lg:col-span-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-electric-teal">
              quiz
            </span>
            {t.accountSupport.commonQuestions}
          </h2>
          <div className="space-y-4">
            {t.accountSupport.faqsList.map((faq, index) => (
              <details key={index} className="group glass-card rounded-2xl border-none open:bg-white/5 transition-colors duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-medium text-white group-hover:text-electric-teal transition-colors">
                    {faq.q}
                  </span>
                  <span className="material-symbols-outlined text-slate-500 group-open:rotate-180 transition-transform duration-300">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-electric-teal">
              contact_support
            </span>
            {t.accountSupport.contactUs}
          </h2>
          <div className="glass-card rounded-[2rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric-teal/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="space-y-8 relative z-10">
              <div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                  {t.accountSupport.directLines}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-electric-teal shrink-0">
                      <span className="material-symbols-outlined text-lg">
                        call
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg hover:text-electric-teal cursor-pointer transition-colors">
                        +1 (800) 555-0123
                      </p>
                      <p className="text-slate-500 text-sm">
                        {t.accountSupport.prioritySupport}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-fresh-mint shrink-0">
                      <span className="material-symbols-outlined text-lg">
                        mail
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg hover:text-fresh-mint cursor-pointer transition-colors">
                        help@younessgarage.com
                      </p>
                      <p className="text-slate-500 text-sm">
                        {t.accountSupport.responseTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                  {t.accountSupport.officeLocation}
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 shrink-0">
                    <span className="material-symbols-outlined text-lg">
                      pin_drop
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {t.accountSupport.officeLocationDesc}
                    </p>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-electric-teal text-charcoal font-bold hover:bg-white hover:text-black transition-all duration-300 mt-2 shadow-glow-teal">
                {t.accountSupport.requestCallback}
              </button>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-charcoal to-charcoal-dark border-dashed border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined">star</span>
              </div>
              <div>
                <h4 className="font-bold text-white">{t.accountSupport.premiumMember}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  {t.accountSupport.premiumMemberDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
