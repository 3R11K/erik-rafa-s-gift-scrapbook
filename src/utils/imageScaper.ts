// Front-end only image scraping using DOMParser
// Falls back to a default scrapbook image if scraping fails

const DEFAULT_SCRAPBOOK_IMAGES = [
  "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=300&fit=crop", // Gift box
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop", // Wrapped gift
  "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=300&fit=crop", // Home decor
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", // House
];

export const getDefaultImage = (index: number): string => {
  return DEFAULT_SCRAPBOOK_IMAGES[index % DEFAULT_SCRAPBOOK_IMAGES.length];
};

// Extract images using API services for known sites
const extractImageViaApi = async (url: string): Promise<string | null> => {
  try {
    // Use Microlink with additional parameters to get better images
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=false&meta=true&palette=false&audio=false&video=false&filter=image`;
    
    const response = await fetch(apiUrl, {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;

    const data = await response.json();
    
    // Try to get the best product image
    // First check if there's a product-specific image in data
    let imageUrl = data?.data?.image?.url;
    
    // For sites like Shopee/Mercado Livre, also check logo field to avoid it
    const logoUrl = data?.data?.logo?.url?.toLowerCase() || '';
    
    if (imageUrl) {
      const urlLower = imageUrl.toLowerCase();
      // Filtros rigorosos para evitar logos
      const isLogo = urlLower.includes('logo') || 
                     urlLower.includes('brand') || 
                     urlLower.includes('meli') ||
                     urlLower.includes('mercadolibre') ||
                     urlLower.includes('shopee-logo') ||
                     urlLower.includes('/logo/') ||
                     urlLower.includes('favicon') ||
                     imageUrl === logoUrl;
      
      if (!isLogo) {
        return imageUrl;
      }
    }
    
    // Try alternative image sources from Microlink
    if (data?.data?.video?.url) {
      // Some sites use video thumbnail as product image
      const thumbnailUrl = data.data.video.url;
      if (!thumbnailUrl.toLowerCase().includes('logo')) {
        return thumbnailUrl;
      }
    }

    return null;
  } catch (e) {
    console.error('Error fetching from API:', e);
    return null;
  }
};

const extractImageFromDoc = (doc: Document, url: string): string | null => {
  // Amazon
  let img = doc.querySelector('#landingImage')?.getAttribute('src') ||
            doc.querySelector('#imgTagWrapperId img')?.getAttribute('src');
  if (img) return img;

  // Shopee - seletores mais específicos
  img = doc.querySelector('.gallery-item img')?.getAttribute('src') ||
        doc.querySelector('[data-test-id="product-gallery"] img')?.getAttribute('src') ||
        doc.querySelector('img[role="presentation"]')?.getAttribute('src') ||
        doc.querySelector('img[data-src]')?.getAttribute('data-src') ||
        doc.querySelector('._26Wlno img')?.getAttribute('src') ||
        doc.querySelector('.product-gallery img')?.getAttribute('src');
  if (img && !img.includes('logo')) return img;

  // Mercado Livre - seletores mais específicos e filtros rigorosos
  img = doc.querySelector('.ui-pdp-gallery__figure img')?.getAttribute('src') ||
        doc.querySelector('.ui-pdp-image--container img')?.getAttribute('src') ||
        doc.querySelector('[data-zoom]')?.getAttribute('src') ||
        doc.querySelector('.ui-pdp-image')?.getAttribute('src') ||
        doc.querySelector('figure img')?.getAttribute('data-src');
  
  if (img) {
    const imgLower = img.toLowerCase();
    const isLogoMeli = imgLower.includes('logo') || 
                       imgLower.includes('meli-logo') ||
                       imgLower.includes('mercadolibre') ||
                       imgLower.includes('brand');
    if (!isLogoMeli) return img;
  }

  // Generic: OG image (very reliable for most sites)
  img = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
  if (img) {
    const imgLower = img.toLowerCase();
    if (!imgLower.includes('logo') && !imgLower.includes('meli') && !imgLower.includes('shopee-logo')) {
      return img;
    }
  }

  // Twitter image
  img = doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
  if (img && !img.toLowerCase().includes('logo')) return img;
  
  // Product-specific meta tags
  img = doc.querySelector('meta[property="product:image"]')?.getAttribute('content') ||
        doc.querySelector('meta[itemprop="image"]')?.getAttribute('content');
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
    console.log(`🔍 Attempting to extract image from: ${url}`);

    // First try: Use Microlink API (most reliable for e-commerce)
    const apiImage = await extractImageViaApi(url);
    if (apiImage) {
      console.log(`✅ Image found via API: ${apiImage}`);
      return apiImage;
    }

    console.log(`⚠️ No image found via API, falling back to default`);
    return getDefaultImage(index);
  } catch (error) {
    console.log(`❌ Could not get image from ${url}, using default (${error})`);
    return getDefaultImage(index);
  }
};
