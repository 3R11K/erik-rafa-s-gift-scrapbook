// Front-end only image scraping using DOMParser
// Falls back to a default scrapbook image if scraping fails

const DEFAULT_SCRAPBOOK_IMAGES = [
  "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=300&fit=crop", // Gift box
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop", // Wrapped gift
  "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=300&fit=crop", // Home decor
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", // House
];

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const getDefaultImage = (index: number): string => {
  return DEFAULT_SCRAPBOOK_IMAGES[index % DEFAULT_SCRAPBOOK_IMAGES.length];
};

const extractImageFromDoc = (doc: Document, url: string): string | null => {
  // Amazon
  let img = doc.querySelector('#landingImage')?.getAttribute('src') ||
            doc.querySelector('#imgTagWrapperId img')?.getAttribute('src');
  if (img) return img;

  // Shopee
  img = doc.querySelector('img[role="presentation"]')?.getAttribute('src') ||
        doc.querySelector('img[data-src]')?.getAttribute('data-src') ||
        doc.querySelector('._26Wlno img')?.getAttribute('src');
  if (img) return img;

  // Mercado Livre
  img = doc.querySelector('.ui-pdp-gallery__figure img')?.getAttribute('src') ||
        doc.querySelector('.ui-pdp-image--container img')?.getAttribute('src');
  if (img) return img;

  // Generic: OG image (very reliable for most sites)
  img = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
  if (img) return img;

  // Twitter image
  img = doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
  if (img) return img;

  // Common product image selectors
  const selectors = [
    'img[data-zoom-image]',
    'img.product-image',
    '#product-image img',
    '.product-gallery img',
    'img[itemprop="image"]',
    '.gallery-image img',
    'picture img',
    'main img',
  ];

  for (const selector of selectors) {
    const element = doc.querySelector(selector);
    if (element) {
      const imgUrl = element.getAttribute('src') || element.getAttribute('data-src');
      if (imgUrl && imgUrl.startsWith('http')) {
        return imgUrl;
      }
    }
  }

  // Fallback: first reasonably sized image
  const images = doc.querySelectorAll('img');
  for (const imgEl of images) {
    const src = imgEl.getAttribute('src') || imgEl.getAttribute('data-src');
    if (src && src.startsWith('http')) {
      const width = parseInt(imgEl.getAttribute('width') || '0');
      const height = parseInt(imgEl.getAttribute('height') || '0');
      if (width >= 200 || height >= 200 || (!width && !height)) {
        return src;
      }
    }
  }

  return null;
};

export const scrapeImageFromUrl = async (url: string, index: number): Promise<string> => {
  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(url), {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error('Failed to fetch');

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const imageUrl = extractImageFromDoc(doc, url);
    
    if (imageUrl) {
      return imageUrl;
    }

    throw new Error('No suitable image found');
  } catch (error) {
    console.log(`Could not scrape image from ${url}, using default`);
    return getDefaultImage(index);
  }
};
