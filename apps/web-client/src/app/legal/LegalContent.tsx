'use client';

import Link from 'next/link';
import { useLocale } from '../../i18n/LocaleContext';

export default function LegalContent() {
  const { t } = useLocale();

  return (
    <main className="relative min-h-screen pt-20">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 bg-charcoal pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-teal/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fresh-mint/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t.legal.title}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            {t.legal.subtitle}
          </p>
          <div className="text-sm text-slate-500 mt-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {t.legal.lastUpdated}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-28 space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">
                {t.legal.contents}
              </p>
              <a
                className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-r-lg transition-all hover:bg-white/5 hover:text-white text-electric-teal border-l-4 border-electric-teal bg-electric-teal/5"
                href="#privacy"
              >
                <span>{t.legal.privacyPolicy.title}</span>
                <span className="material-symbols-outlined text-base">
                  chevron_right
                </span>
              </a>
              <a
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-400 rounded-r-lg border-l-4 border-transparent hover:bg-white/5 hover:text-white transition-all"
                href="#terms"
              >
                <span>{t.legal.terms.title}</span>
                <span className="material-symbols-outlined text-base opacity-0">
                  chevron_right
                </span>
              </a>
              <a
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-400 rounded-r-lg border-l-4 border-transparent hover:bg-white/5 hover:text-white transition-all"
                href="#cookies"
              >
                <span>{t.legal.cookies.title}</span>
                <span className="material-symbols-outlined text-base opacity-0">
                  chevron_right
                </span>
              </a>
              <a
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-400 rounded-r-lg border-l-4 border-transparent hover:bg-white/5 hover:text-white transition-all"
                href="#liability"
              >
                <span>{t.legal.liability.title}</span>
                <span className="material-symbols-outlined text-base opacity-0">
                  chevron_right
                </span>
              </a>
              <div className="mt-8 pt-8 border-t border-white/10 px-3">
                <p className="text-xs text-slate-500 mb-3">
                  {t.legal.needHelp}
                </p>
                <span className="inline-flex items-center gap-2 text-fresh-mint hover:text-white text-sm font-medium transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    mail
                  </span>
                  {t.legal.contactEmail}
                </span>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 max-w-3xl">
            <div className="bg-charcoal-dark/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl">
              {/* Privacy Policy */}
              <section className="scroll-mt-28" id="privacy">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-electric-teal/10 rounded-lg text-electric-teal">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {t.legal.privacyPolicy.title}
                  </h2>
                </div>
                <p className="text-slate-300 mb-5 leading-relaxed">
                  {t.legal.privacyPolicy.intro}
                </p>
                <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-4">
                  {t.legal.privacyPolicy.section1Title}
                </h3>
                <p className="text-slate-300 mb-5 leading-relaxed">
                  {t.legal.privacyPolicy.section1Intro}
                </p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2 mb-5">
                  {t.legal.privacyPolicy.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-4">
                  {t.legal.privacyPolicy.section2Title}
                </h3>
                <p className="text-slate-300 mb-5 leading-relaxed">
                  {t.legal.privacyPolicy.section2Intro}
                </p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2 mb-5">
                  {t.legal.privacyPolicy.items2.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <div className="my-12 h-px bg-white/10 w-full" />

              {/* Terms of Service */}
              <section className="scroll-mt-28" id="terms">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-fresh-mint/10 rounded-lg text-fresh-mint">
                    <span className="material-symbols-outlined">gavel</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {t.legal.terms.title}
                  </h2>
                </div>
                <p className="text-slate-300 mb-5 leading-relaxed">
                  {t.legal.terms.intro}
                </p>
                {t.legal.terms.sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-4">
                      {section.title}
                    </h3>
                    <p className="text-slate-300 mb-5 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </section>

              <div className="my-12 h-px bg-white/10 w-full" />

              {/* Cookie Policy */}
              <section className="scroll-mt-28" id="cookies">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <span className="material-symbols-outlined">cookie</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {t.legal.cookies.title}
                  </h2>
                </div>
                <p className="text-slate-300 mb-5 leading-relaxed">
                  {t.legal.cookies.desc}
                </p>
              </section>

              <div className="my-12 h-px bg-white/10 w-full" />

              {/* Liability Disclaimer */}
              <section className="scroll-mt-28" id="liability">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {t.legal.liability.title}
                  </h2>
                </div>
                <p className="text-slate-300 mb-5 leading-relaxed">
                  {t.legal.liability.desc}
                </p>
              </section>
            </div>

            {/* Support CTA */}
            <div className="mt-8 bg-gradient-to-r from-electric-teal/10 to-fresh-mint/10 border border-electric-teal/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-white font-bold text-lg mb-1">
                  {t.legal.supportCta.title}
                </h4>
                <p className="text-slate-400 text-sm">
                  {t.legal.supportCta.subtitle}
                </p>
              </div>
              <Link
                href="/support"
                className="whitespace-nowrap px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-lg"
              >
                {t.legal.supportCta.button}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
