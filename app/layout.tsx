import type { Metadata } from "next";
import { Playfair_Display, Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SEO, BRAND } from "@/lib/constants";

/* ── Playfair Display — editorial headings (keep, it's excellent) ── */
const playfair = Playfair_Display({
  subsets: ["latin"], variable: "--font-playfair",
  weight: ["400","500","600","700","800","900"],
  display: "swap", style: ["normal", "italic"],
});

/* ── Jost — replaces Inter. Warm geometric sans, not robotic ── */
const jost = Jost({
  subsets: ["latin"], variable: "--font-jost",
  weight: ["300","400","500","600","700"],
  display: "swap",
});

/* ── Cormorant Garamond — replaces Syne for labels/UI. Warm, luxury ── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"], variable: "--font-cormorant",
  weight: ["300","400","500","600","700"],
  display: "swap", style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default:  SEO.title,
    template: `%s | Above GRND Coffee Co.`,
  },
  description: SEO.description,
  keywords:    SEO.keywords,
  authors:     [{ name: "Above GRND Coffee Co." }],
  creator:     "Above GRND Coffee Co.",
  publisher:   "Above GRND Coffee Co.",

  /* Open Graph */
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         BRAND.url,
    siteName:    BRAND.name,
    title:       SEO.title,
    description: SEO.description,
    images: [{
      url:    SEO.ogImage,
      width:  1200,
      height: 630,
      alt:    "Above GRND Coffee Co. — Portland Specialty Coffee",
    }],
  },

  /* Twitter / X */
  twitter: {
    card:        "summary_large_image",
    title:       SEO.title,
    description: SEO.description,
    images:      [SEO.ogImage],
  },

  /* Robots */
  robots: {
    index:           true,
    follow:          true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  /* Verification (add your codes when you deploy) */
  // verification: { google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE" },

  /* App info */
  applicationName: BRAND.name,
  category:        "food",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* JSON-LD Structured Data — LocalBusiness schema */
  const jsonLd = {
    "@context":   "https://schema.org",
    "@type":      "CafeOrCoffeeShop",
    "name":       BRAND.name,
    "description": BRAND.description,
    "url":        BRAND.url,
    "telephone":  BRAND.phone,
    "address": {
      "@type":           "PostalAddress",
      "addressLocality": "Portland",
      "addressRegion":   "OR",
      "addressCountry":  "US",
    },
    "openingHours": ["Mo-Fr 06:30-20:00", "Sa 07:00-21:00", "Su 08:00-18:00"],
    "servesCuisine": ["Coffee", "Tea", "Pastries"],
    "priceRange":    "$$",
    "sameAs": [BRAND.instagram],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable} ${cormorant.variable}`}
    >
      <head>
        <meta name="theme-color" content="#FDF6EE" />
        <link rel="canonical" href={BRAND.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} antialiased`}>

        {/* ── Warm cream gradient background ── */}
        <div aria-hidden="true" style={{
          position: "fixed", inset: 0, zIndex: -2,
          background: "linear-gradient(160deg, #FDF6EE 0%, #F5E8D5 45%, #EDD9BC 100%)",
        }} />

        {children}
      </body>
    </html>
  );
}
