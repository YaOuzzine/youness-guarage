'use client';

import Link from 'next/link';
import { useLocale } from '../../i18n/LocaleContext';

const categoryIcons = [
  'confirmation_number',
  'airport_shuttle',
  'location_on',
  'credit_card',
  'manage_accounts',
  'business_center',
];

const categoryColors = [
  'electric-teal',
  'fresh-mint',
  'purple-400',
  'yellow-400',
  'pink-400',
  'blue-400',
];

const categoryHoverBorders = [
  'hover:border-electric-teal/30',
  'hover:border-fresh-mint/30',
  'hover:border-purple-400/30',
  'hover:border-yellow-400/30',
  'hover:border-pink-400/30',
  'hover:border-blue-400/30',
];

const categoryIconBgs = [
  'bg-electric-teal/10 text-electric-teal border-electric-teal/20',
  'bg-fresh-mint/10 text-fresh-mint border-fresh-mint/20',
  'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'bg-blue-500/10 text-blue-400 border-blue-500/20',
];

const categoryTitleHoverColors = [
  'group-hover:text-electric-teal',
  'group-hover:text-fresh-mint',
  'group-hover:text-purple-400',
  'group-hover:text-yellow-400',
  'group-hover:text-pink-400',
  'group-hover:text-blue-400',
];

export default function SupportContent() {
  const { t } = useLocale();

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[800px] h-[500px] bg-electric-teal/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fresh-mint/5 rounded-full blur-[100px] translate-y-1/3 translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col pt-16 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 border border-electric-teal/20 text-electric-teal text-xs font-bold uppercase tracking-wider mb-6 shadow-glow-teal">
            <span className="material-symbols-outlined text-sm">
              support_agent
            </span>
            {t.support.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            {t.support.title}
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            {t.support.subtitle}
          </p>
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-electric-teal transition-colors">
              <span className="material-symbols-outlined text-2xl">
                search
              </span>
            </div>
            <input
              className="block w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-electric-teal focus:ring-1 focus:ring-electric-teal focus:bg-black/40 transition-all shadow-lg text-lg"
              placeholder={t.support.searchPlaceholder}
              type="text"
            />
            <button className="absolute inset-y-2 right-2 px-6 bg-electric-teal text-black font-bold rounded-xl hover:bg-white transition-colors">
              {t.support.searchButton}
            </button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {t.support.categories.map((category, index) => (
            <Link
              key={index}
              href="#"
              className={`glass-card p-8 rounded-2xl group text-left block hover:bg-white/[0.06] ${categoryHoverBorders[index]} hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${categoryIconBgs[index]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border`}>
                <span className="material-symbols-outlined text-2xl">
                  {categoryIcons[index]}
                </span>
              </div>
              <h3 className={`text-xl font-bold text-white mb-2 ${categoryTitleHoverColors[index]} transition-colors`}>
                {category.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {category.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {t.support.faqs.map((faq, index) => (
              <details key={index} className="group glass-card rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-medium text-white group-hover:text-electric-teal transition-colors">
                    {faq.q}
                  </span>
                  <span className="transition group-open:rotate-180">
                    <span className="material-symbols-outlined text-slate-400">
                      expand_more
                    </span>
                  </span>
                </summary>
                <div className="text-slate-400 px-5 pb-5 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Footer Section */}
      <div className="relative z-10 bg-charcoal-dark border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-electric-teal text-black">
                  <span className="material-symbols-outlined text-xl font-bold">
                    local_parking
                  </span>
                </div>
                <span className="font-bold text-xl text-white">
                  Youness Garage
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                Premium airport parking experience with top-tier security and
                VIP shuttle service. We redefine what it means to park and fly.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">{t.support.contact.title}</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-electric-teal mt-0.5">
                    location_on
                  </span>
                  <span style={{ whiteSpace: 'pre-line' }}>
                    {t.support.contact.address}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-electric-teal">
                    phone_in_talk
                  </span>
                  <span className="hover:text-white transition-colors">
                    {t.support.contact.phone}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-electric-teal">
                    mail
                  </span>
                  <span className="hover:text-white transition-colors">
                    {t.support.contact.email}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">{t.support.contact.supportHours.label}</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Mon - Fri</span>
                  <span className="text-white">{t.support.contact.supportHours.monFri}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Sat - Sun</span>
                  <span className="text-white">{t.support.contact.supportHours.satSun}</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span>{t.support.contact.supportHours.liveChat}</span>
                  <span className="text-fresh-mint font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-fresh-mint animate-pulse" />
                    {t.support.contact.supportHours.online}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
