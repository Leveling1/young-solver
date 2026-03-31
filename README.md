# Young Solver

Site vitrine premium de Young Solver, construit avec Next.js, pense pour presenter les services, les solutions, les projets clients et la vision produit de l'equipe.

## 1. Vision du projet

Ce projet n'est pas un simple portfolio statique. Il a ete pense comme une vitrine de positionnement :

- montrer une image technique solide
- transmettre une sensation de produit haut de gamme
- presenter clairement l'offre
- mettre en avant les solutions internes et les projets clients
- favoriser la prise de contact

Le site combine une direction visuelle moderne, des animations controlees, un theming multi-mode, une base SEO propre, et une architecture suffisamment claire pour evoluer sans repartir de zero.

## 2. Stack utilisee

### Framework et runtime

- Next.js 16
- React 19
- TypeScript

### Styling et UI

- Tailwind CSS 4
- CSS variables pour le theming
- Framer Motion pour les animations

### 3D et hero visuals

- React Three Fiber
- Three.js

### Theming

- next-themes

### Internationalisation

- react-intl

### Utilitaires

- clsx
- tailwind-merge
- class-variance-authority

## 3. Fonctionnalites principales

### Hero immersif

Le hero contient :

- une scene animee en arriere-plan
- une carte de code qui represente la stack de Young Solver
- des CTA de navigation interne

### Theming

Le site gere plusieurs themes :

- light
- night
- black
- cyberpunk

Les logos et certaines ambiances visuelles s'adaptent automatiquement au theme actif.

### Internationalisation

Le changement de langue est gere proprement via `react-intl`, avec une couche provider locale pour exposer :

- la langue courante
- le changement de langue
- une API simple pour recuperer les messages

### Sections metier

Le site contient actuellement :

- hero
- services
- section ecosysteme/orchestration
- solutions / produits
- projets clients
- a propos
- contact

### Branding

Le site utilise :

- un favicon dedie
- des logos noirs / blancs selon le theme
- des assets projets generes pour les cartes

### SEO

Le projet integre deja :

- metadata Next.js
- canonical
- Open Graph
- Twitter cards
- robots
- sitemap
- manifest
- JSON-LD

## 4. Commandes utiles

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm exec tsc --noEmit
```

## 5. Architecture du projet

```text
app/
  layout.tsx
  page.tsx
  globals.css
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

public/
  images/
```

## 6. Role de chaque dossier

### `app/`

Contient le shell applicatif Next.js :

- layout global
- metadata globale
- styles globaux
- manifest
- robots
- sitemap

### `components/home/`

Contient tout ce qui est specifique a la page d'accueil :

- sections marketing
- carte de code
- visuels 3D / hero
- composition de page

### `components/layout/`

Contient les composants structurels globaux :

- header
- footer

### `components/controls/`

Contient les controleurs globaux :

- selecteur de langue
- selecteur de theme

### `components/ui/`

Contient les primitives reutilisables :

- boutons
- liens de scroll
- logo
- cartes glass
- champs de formulaire

### `components/seo/`

Contient les blocs SEO reutilisables, comme le structured data.

### `content/`

Contient les donnees editables du site :

- textes bilingues
- listes de services
- solutions
- projets
- partenaires
- infos de contact

### `providers/`

Contient les providers applicatifs :

- theme provider
- language provider base sur `react-intl`

## 7. Theming

Le theming est pilote par :

- `next-themes`
- les variables CSS dans `app/globals.css`

Cela permet :

- d'adapter les couleurs globales
- d'ajuster les glass effects
- de gerer les logos noir/blanc selon le theme
- de garder une base visuelle centrale et maintenable

## 8. Internationalisation

L'internationalisation repose sur :

- `react-intl`
- `content/translations.ts`
- `providers/language-provider.tsx`

Le provider prepare les messages a partir des traductions et expose une API simple au reste de l'interface.

## 9. Animation et motion

Les animations sont concentrees sur des zones a forte valeur :

- hero
- sections reveal au scroll
- ecosysteme relie par cartes et lignes
- bandeau partenaires
- carte code sensible a la souris

Le principe general du projet est simple :

- animation utile
- animation lisible
- animation qui soutient le produit au lieu de distraire

## 10. SEO et performance

### SEO deja en place

- titles et descriptions
- canonical
- Open Graph
- Twitter metadata
- robots
- sitemap
- structured data

### Performance deja en place

- chargement differe de certains visuels
- build statique
- theming natif base CSS
- navigation interne sans rechargement
- images structurees dans `public/`

## 11. Modifier le contenu

### Modifier un texte

Aller dans :

- `content/translations.ts`

### Modifier les services, solutions ou projets

Aller dans :

- `content/site.ts`

### Modifier une section

Aller dans :

- `components/home/sections/`

### Modifier le hero

Aller dans :

- `components/home/sections/hero-section.tsx`
- `components/home/code-showcase.tsx`
- `components/home/visuals/`

## 12. Verifications avant livraison

Toujours lancer au minimum :

```bash
pnpm exec tsc --noEmit
pnpm build
```

## 13. Principes de maintenance

Quand tu modifies ce projet :

- garde la separation entre contenu et rendu
- evite de recoder des donnees en dur dans les composants
- preserve la coherence visuelle
- n'ajoute pas d'effets lourds gratuitement
- garde le code lisible et centré produit

## 14. Axes d'amelioration futurs

- brancher un vrai backend de formulaire
- creer des pages SEO dediees par service
- ajouter une vraie couche analytics si necessaire
- nettoyer encore les dependances non utilisees
- produire des etudes de cas plus detaillees
