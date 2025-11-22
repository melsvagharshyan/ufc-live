import { getTranslation } from '@/lib/i18n';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ufcEvents } from '@/lib/events';

// Your UFC Live Telegram channel
const TELEGRAM_CHANNEL_URL = 'https://t.me/ufc_live_show';

async function getLocale() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';
  const primaryLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
  
  const supportedLocales = ['en', 'es', 'ru', 'pt', 'fr', 'de', 'ar', 'hy'];
  return supportedLocales.includes(primaryLang) ? primaryLang : 'en';
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslation(locale);
  
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      locale: locale,
      siteName: 'UFC Live Stream',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
    },
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'es': '/es',
        'ru': '/ru',
        'pt': '/pt',
        'fr': '/fr',
        'de': '/de',
        'ar': '/ar',
        'hy': '/hy',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Home() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t.title,
    description: t.description,
    url: 'https://yourdomain.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://yourdomain.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'UFC Live Stream',
      description: t.description,
      sameAs: [TELEGRAM_CHANNEL_URL],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-black to-gray-900">
        {/* Hero Section */}
        <main className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col items-center text-center">
            {/* Logo/Title */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
                <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  UFC
                </span>{' '}
                LIVE
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-semibold">
                {t.subtitle}
              </p>
            </div>

            {/* Main CTA */}
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 mb-16"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.094.036.308.02.475z"/>
              </svg>
              {t.cta}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Upcoming Events Section */}
            <div className="mt-20 w-full max-w-6xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                🔥 Upcoming UFC Events
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {ufcEvents.map((event) => (
                  <a
                    key={event.id}
                    href={TELEGRAM_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50 cursor-pointer block"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={event.image}
                        alt={`${event.title} - ${event.date}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      
                      {/* Live Badge if event is today */}
                      {new Date(event.date).toDateString() === new Date().toDateString() && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          LIVE NOW
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 relative">
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-red-400 font-semibold mb-2">{event.mainEvent}</p>
                      <p className="text-gray-300 text-sm mb-1">📅 {event.date}</p>
                      <p className="text-gray-400 text-sm">📍 {event.venue}</p>
                      
                      <div className="mt-4 block text-center bg-red-600 group-hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Watch Live
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mt-20">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">🔴</div>
                <h3 className="text-2xl font-bold text-white mb-3">{t.features.live}</h3>
                <p className="text-gray-300">{t.features.liveDesc}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">💯</div>
                <h3 className="text-2xl font-bold text-white mb-3">{t.features.free}</h3>
                <p className="text-gray-300">{t.features.freeDesc}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-3">{t.features.instant}</h3>
                <p className="text-gray-300">{t.features.instantDesc}</p>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="mt-16">
              <a
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} UFC Live Stream. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
