# Young Solver

Site vitrine premium construit avec Next.js pour presenter Young Solver, ses services, ses projets, et son positionnement produit.

## Objectif du projet

Le site sert a :

- presenter l'offre de Young Solver avec un rendu moderne
- inspirer confiance avec une execution propre et rapide
- convertir via la section contact
- poser une base maintenable pour des iterations futures

## Stack technique

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- React Three Fiber / Three.js
- next-themes

## Commandes utiles

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm exec tsc --noEmit
```

## Architecture

```text
app/
  layout.tsx
  page.tsx
  manifest.ts
  robots.ts
  sitemap.ts

components/
  controls/
  home/
    sections/
    visuals/
  layout/
  seo/
  ui/

content/
  site.ts
  translations.ts

providers/
  language-provider.tsx
  theme-provider.tsx

lib/
  utils.ts
```

## Structure des responsabilites

### `app/`

Contient le shell Next.js :

- metadata globale
- viewport
- manifest
- robots
- sitemap
- styles globaux

### `components/home/`

Contient le domaine principal de la page d'accueil :

- sections marketing
- visuels 3D
- hero
- composition de page

### `components/layout/`

Contient les blocs de structure reutilisables :

- header
- footer

### `components/controls/`

Contient les commandes utilisateur globales :

- switch de theme
- switch de langue

### `components/ui/`

Contient les primitives partagees :

- boutons
- cartes glass
- liens de scroll
- logo de marque
- inputs

### `content/`

Centralise les donnees editables :

- textes de navigation
- contenus bilingues
- listes de services
- projets
- reseaux sociaux

### `providers/`

Contient les contextes applicatifs :

- langue
- theme

## Fonctionnalites principales

### Themes

Le site gere plusieurs themes :

- light
- night
- black
- cyberpunk

Les logos noir/blanc sont selectionnes automatiquement selon le theme actif.

### Navigation sans rechargement

La navigation interne utilise un composant de scroll dedie pour :

- eviter les rechargements ressentis
- garder le hash synchronise
- scroller proprement vers les sections

### Performance

Optimisations deja en place :

- chargement differe de la scene 3D du hero
- `dynamic import` pour la partie 3D
- reduction du `dpr` du canvas
- suppression du preload 3D inutile
- assets de marque branches proprement
- validation TypeScript sans erreur

### SEO

Le socle SEO natif Next.js est en place :

- metadata riche
- canonical
- Open Graph
- Twitter cards
- robots
- sitemap
- manifest
- JSON-LD `Organization` et `WebSite`

## Strategie SEO recommandee

Pour aller tres loin en SEO, voici la feuille de route conseillee :

### Niveau 1 : fondation technique

- garder un HTML semantique propre
- maintenir un `h1` clair et unique
- soigner les titles et descriptions
- garder des pages ultra rapides
- eviter le JS inutile au-dessus de la ligne de flottaison

### Niveau 2 : contenu

- creer des pages dediees par service
- creer des pages dediees par secteur ou cas d'usage
- publier des etudes de cas reelles
- ajouter une page contact tres claire
- ajouter des FAQ par service

### Niveau 3 : autorite

- connecter le site a Google Search Console
- connecter le site a Google Business Profile si pertinent
- obtenir des backlinks qualitatifs
- publier du contenu regulier cible sur des intentions precises

### Niveau 4 : conversion + mesure

- suivre les clics sur contact
- mesurer les pages qui convertissent
- retravailler les sections faibles selon les donnees

## Guide d'ajout de contenu

### Ajouter un service

1. Ajouter le contenu dans `content/site.ts`
2. Ajouter les labels dans `content/translations.ts`
3. Verifier l'affichage dans `components/home/sections/services-section.tsx`

### Ajouter un projet

1. Ajouter l'entree dans `content/site.ts`
2. Ajouter le titre et la description dans `content/translations.ts`
3. Verifier le rendu dans `components/home/sections/projects-section.tsx`

### Modifier les textes

Tous les textes bilingues sont centralises dans `content/translations.ts`.

## Bonnes pratiques de travail

- ne pas remettre de logique de contenu dans les composants de rendu
- ne pas reintroduire de gros kits UI inutilises
- garder les hash links internes sur `ScrollLink`
- verifier TypeScript apres chaque refactor
- traiter la performance avant d'ajouter de nouveaux effets visuels lourds

## Verifications recommandees avant merge

```bash
pnpm exec tsc --noEmit
pnpm build
```

## Pistes d'amelioration futures

- alleger encore `package.json` en supprimant les dependances orphelines
- ajouter de vraies pages SEO par service
- brancher un vrai formulaire contact
- generer une image Open Graph dediee
- ajouter analytics/consentement si besoin business
