# TechStore - Plateforme E-commerce Moderne

![TechStore Preview](https://imgix.cosmicjs.com/d0ca49a0-9719-11f0-bba7-d56988718db7-photo-1556742049-0cfed4f6a45d-1758479756377.jpg?w=1200&h=300&fit=crop&auto=format,compress)

Une plateforme e-commerce moderne et responsive construite avec Next.js 15 et Tailwind CSS, alimentée par Cosmic CMS pour une gestion de contenu dynamique.

## ✨ Fonctionnalités

- **🏠 Page d'accueil moderne** avec bannières promotionnelles et produits populaires
- **🛍️ Catalogue produits** avec navigation par catégories et filtres
- **📱 Design responsive** optimisé pour mobile, tablette et desktop
- **🔍 Barre de recherche** intégrée dans la navigation principale
- **🎯 Bannières dynamiques** avec contrôle d'affichage depuis le CMS
- **📄 Pages produits détaillées** avec galeries d'images et descriptions complètes
- **📝 Section blog** intégrée pour améliorer l'engagement
- **⚙️ Paramètres centralisés** pour la configuration du site
- **🎨 Interface moderne** avec palette de couleurs cohérente

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d04186d7c81076a7d6c125&clone_repository=68d047b8d7c81076a7d6c14c)

## Prompts

Cette application a été construite en utilisant les prompts suivants pour générer la structure de contenu et le code :

### Prompt de Modèle de Contenu

> "Je veux créer une plateforme e-commerce moderne et attrayante qui permette aux utilisateurs de naviguer facilement à travers des catégories de produits variées. La page d'accueil doit comporter un en-tête avec le logo du site, une barre de recherche bien visible, un menu de navigation avec les principales catégories, ainsi qu'un bouton d'accès rapide au panier et à l'espace utilisateur. En haut, une bannière visuelle doit mettre en avant les promotions ou les nouveaux arrivages, suivie d'une section présentant les produits populaires et recommandés. Chaque produit doit être affiché sous forme de carte avec une image de haute qualité, le nom, le prix, et un bouton "Ajouter au panier". Le site doit comporter une page dédiée pour chaque produit avec une galerie d'images, une description détaillée, le prix, la disponibilité en stock, ainsi qu'une section pour les avis clients et les recommandations de produits similaires. Le parcours d'achat doit être fluide : un panier clair permettant de modifier les quantités ou supprimer des articles, suivi d'un processus de commande en plusieurs étapes simples (informations personnelles, adresse de livraison, choix du mode de paiement, confirmation). Le site doit proposer plusieurs moyens de paiement sécurisés, comme la carte bancaire, PayPal ou d'autres solutions locales selon le marché. L'espace utilisateur doit permettre de gérer les commandes passées, suivre la livraison en temps réel et enregistrer des adresses pour des achats futurs. Le design doit être moderne, responsive et épuré, avec une palette de couleurs cohérente et des typographies lisibles. Il doit s'adapter parfaitement aux écrans d'ordinateur, de tablette et de smartphone. Le site doit aussi inclure un pied de page avec des liens utiles comme "À propos", "Contact", "Politique de confidentialité" et "Conditions générales". Enfin, il serait intéressant d'intégrer un système de recommandations personnalisées basé sur l'historique de navigation et d'achats, ainsi qu'une section blog ou actualités pour améliorer l'engagement des utilisateurs et le référencement."

### Prompt de Génération de Code

> "Based on the content model I created for "Je veux créer une plateforme e-commerce moderne et attrayante qui permette aux utilisateurs de naviguer facilement à travers des catégories de produits variées. La page d'accueil doit comporter un en-tête avec le logo du site, une barre de recherche bien visible, un menu de navigation avec les principales catégories, ainsi qu'un bouton d'accès rapide au panier et à l'espace utilisateur. En haut, une bannière visuelle doit mettre en avant les promotions ou les nouveaux arrivages, suivie d'une section présentant les produits populaires et recommandés. Chaque produit doit être affiché sous forme de carte avec une image de haute qualité, le nom, le prix, et un bouton "Ajouter au panier". Le site doit comporter une page dédiée pour chaque produit avec une galerie d'images, une description détaillée, le prix, la disponibilité en stock, ainsi qu'une section pour les avis clients et les recommandations de produits similaires. Le parcours d'achat doit être fluide : un panier clair permettant de modifier les quantités ou supprimer des articles, suivi d'un processus de commande en plusieurs étapes simples (informations personnelles, adresse de livraison, choix du mode de paiement, confirmation). Le site doit proposer plusieurs moyens de paiement sécurisés, comme la carte bancaire, PayPal ou d'autres solutions locales selon le marché. L'espace utilisateur doit permettre de gérer les commandes passées, suivre la livraison en temps réel et enregistrer des adresses pour des achats futurs. Le design doit être moderne, responsive et épuré, avec une palette de couleurs cohérente et des typographies lisibles. Il doit s'adapter parfaitement aux écrans d'ordinateur, de tablette et de smartphone. Le site doit aussi inclure un pied de page avec des liens utiles comme "À propos", "Contact", "Politique de confidentialité" et "Conditions générales". Enfin, il serait intéressant d'intégrer un système de recommandations personnalisées basé sur l'historique de navigation et d'achats, ainsi qu'une section blog ou actualités pour améliorer l'engagement des utilisateurs et le référencement.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

L'application a été adaptée pour fonctionner avec votre structure de contenu Cosmic existante et inclut toutes les fonctionnalités demandées ci-dessus.

## 🛠️ Technologies Utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique pour une meilleure fiabilité
- **Tailwind CSS** - Framework CSS utilitaire pour un design moderne
- **Cosmic CMS** - Gestion de contenu headless
- **React** - Bibliothèque d'interface utilisateur
- **Lucide React** - Icônes modernes et légères

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ ou Bun
- Compte Cosmic avec bucket configuré

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd techstore-ecommerce
```

2. **Installer les dépendances**
```bash
bun install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Ajoutez vos clés Cosmic dans `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Lancer le serveur de développement**
```bash
bun dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📚 Exemples avec le SDK Cosmic

### Récupération des produits avec catégories
```typescript
import { cosmic } from '@/lib/cosmic'

// Récupérer tous les produits avec leurs catégories
const products = await cosmic.objects
  .find({ type: 'produits' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Filtrer les produits populaires
const popularProducts = products.objects.filter(
  product => product.metadata?.populaire === true
)
```

### Récupération des bannières actives
```typescript
// Récupérer seulement les bannières actives
const banners = await cosmic.objects
  .find({ 
    type: 'bannieres',
    'metadata.actif': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
```

## 🎨 Intégration Cosmic CMS

L'application utilise votre modèle de contenu Cosmic existant avec les types d'objets suivants :

- **Produits** (`produits`) - Catalogue principal avec prix, stock, catégories
- **Catégories** (`categories`) - Organisation des produits par catégories
- **Bannières** (`bannieres`) - Promotions et contenus mis en avant
- **Articles** (`articles`) - Section blog pour l'engagement utilisateur
- **Paramètres** (`parametres`) - Configuration globale du site

### Structure des métadonnées

Les objets Cosmic incluent des métadonnées riches comme :
- Images optimisées avec imgix pour les performances
- Relations entre objets (produits ↔ catégories)
- Champs booléens pour les flags (populaire, nouveau, en_promotion)
- Contenu HTML riche pour les descriptions détaillées

## 🚀 Options de Déploiement

### Vercel (Recommandé pour Next.js)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Variables d'environnement de production
Configurez ces variables dans votre plateforme de déploiement :
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->