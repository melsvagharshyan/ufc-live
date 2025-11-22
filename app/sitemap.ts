import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com';
  const languages = ['en', 'es', 'ru', 'pt', 'fr', 'de', 'ar', 'hy'];
  
  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          languages.map(lang => [lang, `${baseUrl}/${lang}`])
        ),
      },
    },
  ];

  // Add language-specific pages
  languages.forEach(lang => {
    urls.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  return urls;
}

