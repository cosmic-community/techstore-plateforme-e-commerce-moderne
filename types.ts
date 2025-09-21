// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Site parameters interface
export interface SiteParameters extends CosmicObject {
  type: 'parametres';
  metadata: {
    nom_site?: string;
    description?: string;
    logo_principal?: {
      url: string;
      imgix_url: string;
    };
    email_contact?: string;
    telephone?: string;
    adresse?: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    nom?: string;
    description?: string;
    image_banniere?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Product interface
export interface Product extends CosmicObject {
  type: 'produits';
  metadata: {
    nom?: string;
    description_courte?: string;
    description_detaillee?: string;
    prix?: number;
    prix_barre?: number;
    stock?: number;
    image_principale?: {
      url: string;
      imgix_url: string;
    };
    galerie?: Array<{
      url: string;
      imgix_url: string;
    }>;
    categorie?: Category;
    populaire?: boolean;
    nouveau?: boolean;
    en_promotion?: boolean;
  };
}

// Banner interface
export interface Banner extends CosmicObject {
  type: 'bannieres';
  metadata: {
    titre?: string;
    sous_titre?: string;
    image_fond?: {
      url: string;
      imgix_url: string;
    };
    texte_bouton?: string;
    lien_bouton?: string;
    actif?: boolean;
  };
}

// Article interface
export interface Article extends CosmicObject {
  type: 'articles';
  metadata: {
    titre?: string;
    resume?: string;
    contenu?: string;
    image_couverture?: {
      url: string;
      imgix_url: string;
    };
    date_publication?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'produits';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isBanner(obj: CosmicObject): obj is Banner {
  return obj.type === 'bannieres';
}

export function isArticle(obj: CosmicObject): obj is Article {
  return obj.type === 'articles';
}

export function isSiteParameters(obj: CosmicObject): obj is SiteParameters {
  return obj.type === 'parametres';
}