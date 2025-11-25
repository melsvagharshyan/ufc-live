import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "UFC Live Stream - Watch UFC Fights Live Online Free",
    template: "%s | UFC Live Stream",
  },
  description:
    "Watch UFC live streams online free. Never miss a UFC fight! Get instant access to all UFC events, PPV, and fight nights.",
  keywords: [
    "ufc live",
    "ufc stream",
    "ufc live stream",
    "watch ufc live",
    "ufc online",
    "ufc fight",
    "ufc ppv",
    "ufc en vivo",
    "ufc ao vivo",
    "ufc прямая трансляция",
    "ufc translacia",
  ],
  authors: [{ name: "UFC Live Stream" }],
  creator: "UFC Live Stream",
  publisher: "UFC Live Stream",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

async function getLocale() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "en";
  const primaryLang = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
  const supportedLocales = ["en", "es", "ru", "pt", "fr", "de", "ar", "hy"];
  return supportedLocales.includes(primaryLang) ? primaryLang : "en";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="alternate" hrefLang="en" href="https://yourdomain.com/en" />
        <link rel="alternate" hrefLang="es" href="https://yourdomain.com/es" />
        <link rel="alternate" hrefLang="ru" href="https://yourdomain.com/ru" />
        <link rel="alternate" hrefLang="pt" href="https://yourdomain.com/pt" />
        <link rel="alternate" hrefLang="fr" href="https://yourdomain.com/fr" />
        <link rel="alternate" hrefLang="de" href="https://yourdomain.com/de" />
        <link rel="alternate" hrefLang="ar" href="https://yourdomain.com/ar" />
        <link rel="alternate" hrefLang="hy" href="https://yourdomain.com/hy" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://yourdomain.com"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1886231301359804"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
