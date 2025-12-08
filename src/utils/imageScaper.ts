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

export const scrapeImageFromUrl = async (url: string, index: number): Promise<string> => {
  // Skip scraping for now due to CORS restrictions on most e-commerce sites
  // In production, you'd use a CORS proxy or backend service
  // For this demo, we'll use placeholder images based on the item
  
  try {
    // Try to extract domain for a branded placeholder
    const domain = new URL(url).hostname.replace('www.', '');
    
    // Use a placeholder service that doesn't have CORS issues
    // We'll generate a nice placeholder based on the index
    const colors = ['e8b4b8', 'a8d5ba', 'f5e6d3', 'b8d4e8', 'd4b8e8'];
    const color = colors[index % colors.length];
    
    return `https://placehold.co/400x300/${color}/ffffff?text=${encodeURIComponent('🎁')}`;
  } catch {
    return getDefaultImage(index);
  }
};

// Alternative: If you have a CORS proxy, you can use this function
export const scrapeImageWithProxy = async (url: string, index: number): Promise<string> => {
  const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  
  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(url), {
      signal: AbortSignal.timeout(5000),
    });
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Try various selectors to find product image
    const selectors = [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
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
        const imgUrl = element.getAttribute('content') || 
                       element.getAttribute('src') || 
                       element.getAttribute('data-src');
        if (imgUrl && imgUrl.startsWith('http')) {
          return imgUrl;
        }
      }
    }
    
    // If no image found with selectors, try first large image
    const images = doc.querySelectorAll('img');
    for (const img of images) {
      const src = img.getAttribute('src') || img.getAttribute('data-src');
      if (src && src.startsWith('http')) {
        const width = parseInt(img.getAttribute('width') || '0');
        const height = parseInt(img.getAttribute('height') || '0');
        if (width >= 200 || height >= 200 || (!width && !height)) {
          return src;
        }
      }
    }
    
    throw new Error('No suitable image found');
  } catch (error) {
    console.log(`Could not scrape image from ${url}, using default`);
    return getDefaultImage(index);
  }
};
