import { createBucketClient } from '@cosmicjs/sdk'
import { 
  Product, 
  Category, 
  Banner, 
  Article, 
  SiteParameters, 
  CosmicResponse 
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all products with categories
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'produits' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Product[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

// Get popular products
export async function getPopularProducts(): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(product => product.metadata?.populaire === true);
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return [];
  }
}

// Get products by category
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'produits',
        'metadata.categorie': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by category');
  }
}

// Get single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'produits',
      slug
    }).depth(1);
    
    const product = response.object as Product;
    
    if (!product || !product.metadata) {
      return null;
    }
    
    return product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Get single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'categories',
      slug
    });
    
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get active banners
export async function getActiveBanners(): Promise<Banner[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'bannieres',
        'metadata.actif': true
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Banner[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch banners');
  }
}

// Get all articles
export async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return (response.objects as Article[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.date_publication || '').getTime();
      const dateB = new Date(b.metadata?.date_publication || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch articles');
  }
}

// Get single article by slug
export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'articles',
      slug
    });
    
    return response.object as Article;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get site parameters
export async function getSiteParameters(): Promise<SiteParameters | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'parametres' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    const params = response.objects[0] as SiteParameters;
    return params || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch site parameters');
  }
}