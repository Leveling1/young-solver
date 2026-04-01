# Agent Guide

Ce document sert de guide rapide pour toute IA ou tout developpeur qui doit reprendre le projet Young Solver sans perdre de temps.

## 1. Vision du projet

Young Solver est un site vitrine premium construit avec Next.js. Le site doit presenter l'entreprise comme un studio de developpement de solutions numeriques sur mesure :

- applications web
- applications mobiles
- logiciels desktop
- backend et API
- IA et automatisation
- cloud, livraison et maintenance

Le site n'est pas un simple template marketing. Il doit rester :

- rapide
- propre
- credible
- lisible
- maintenable

## 2. Priorites absolues

Quand tu travailles sur ce projet, respecte cet ordre :

1. ne pas casser le rendu, la navigation ou les themes
2. ne pas toucher aux fichiers non lies a la demande
3. garder une architecture Next.js claire et professionnelle
4. proteger la fluidite et les performances
5. renforcer la coherence visuelle et le SEO

## 3. Stack technique

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- `@react-three/fiber`
- `@react-three/drei`
- `three`
- `next-themes`
- `react-intl`

## 4. Structure du projet

### `app/`

Infrastructure Next.js :

- [`app/layout.tsx`](C:/Users/merdi/Downloads/YoungSolver/app/layout.tsx) : metadata, providers, favicon, themes
- [`app/page.tsx`](C:/Users/merdi/Downloads/YoungSolver/app/page.tsx) : entree de la home
- [`app/globals.css`](C:/Users/merdi/Downloads/YoungSolver/app/globals.css) : tokens globaux, themes, glass effects
- [`app/robots.ts`](C:/Users/merdi/Downloads/YoungSolver/app/robots.ts) : robots
- [`app/sitemap.ts`](C:/Users/merdi/Downloads/YoungSolver/app/sitemap.ts) : sitemap
- [`app/manifest.ts`](C:/Users/merdi/Downloads/YoungSolver/app/manifest.ts) : manifest

### `components/home/`

Le coeur de la page d'accueil.

- [`components/home/home-page.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/home-page.tsx) : ordre des sections
- `sections/` : blocs metier de la page
- `visuals/` : animations et rendu hero

Ordre actuel des sections :

1. header
2. hero
3. services
4. ecosystem / orchestration
5. nos solutions
6. projets clients
7. a propos
8. contact
9. footer

### `components/layout/`

Structure globale :

- header
- footer

### `components/controls/`

Switchers de theme et de langue.

### `components/ui/`

Primitives partagees.

Ne pas retransformer ce dossier en poubelle de composants generes automatiquement.

### `content/`

Source de verite du contenu business :

- [`content/site.ts`](C:/Users/merdi/Downloads/YoungSolver/content/site.ts) : structure du site, navigation, orchestration, projets, solutions
- [`content/translations.ts`](C:/Users/merdi/Downloads/YoungSolver/content/translations.ts) : textes i18n

### `providers/`

Providers applicatifs :

- theme
- langue / intl

## 5. Fichiers les plus importants a connaitre

Si tu dois comprendre le projet tres vite, lis d'abord ceux-la :

1. [`components/home/home-page.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/home-page.tsx)
2. [`content/site.ts`](C:/Users/merdi/Downloads/YoungSolver/content/site.ts)
3. [`content/translations.ts`](C:/Users/merdi/Downloads/YoungSolver/content/translations.ts)
4. [`app/layout.tsx`](C:/Users/merdi/Downloads/YoungSolver/app/layout.tsx)
5. [`app/globals.css`](C:/Users/merdi/Downloads/YoungSolver/app/globals.css)

Pour le hero et les effets visuels :

1. [`components/home/sections/hero-section.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/sections/hero-section.tsx)
2. [`components/home/code-showcase.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/code-showcase.tsx)
3. [`components/home/visuals/hero-scene.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/visuals/hero-scene.tsx)
4. [`components/home/visuals/canvas-stage.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/visuals/canvas-stage.tsx)
5. [`components/home/visuals/logo-particle-field.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/visuals/logo-particle-field.tsx)
6. [`components/home/visuals/cursor-cube-constellation.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/visuals/cursor-cube-constellation.tsx)

Pour la section orchestration :

- [`components/home/sections/ecosystem-section.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/home/sections/ecosystem-section.tsx)

## 6. Regles de navigation

- Les ancres internes doivent passer par [`components/ui/scroll-link.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/ui/scroll-link.tsx)
- Ne pas reintroduire une navigation qui donne l'impression de recharger la page
- L'accueil est accessible via le logo, pas via un onglet `Accueil`

## 7. Themes et branding

Themes autorises :

- `light`
- `black`
- `system`

Regles de branding :

- en `light`, utiliser `logo-black.png`
- en `black`, utiliser `logo-white.png`
- en `system`, suivre le theme resolu
- le composant de reference est [`components/ui/brand-logo.tsx`](C:/Users/merdi/Downloads/YoungSolver/components/ui/brand-logo.tsx)
- le favicon actuel doit rester lie au branding du projet

Ne pas reintroduire d'anciens themes comme `night`, `dark` ou `cyberpunk`.

## 8. Hero et animations

Le hero doit rester impressionnant, mais compact et fluide.

### Ce qui existe aujourd'hui

- une scene Three.js / R3F dans le hero
- un logo 3D compose de cubes / particules
- une interaction souris entre la code card et le logo via l'evenement `hero-logo-interaction`
- une constellation de cubes / points reactifs dans le fond du hero

### Regles importantes

- ne pas mettre un fond anime fixe sur toute la page si cela degrade la lisibilite
- ne pas ajouter des animations lourdes juste pour faire "awwwards"
- si un effet est beau mais alourdit le chargement, le simplifier
- garder les animations coherentes avec le positionnement premium / engineering de Young Solver

### Interactions deja en place

- la code card pilote le logo 3D au survol
- quand le curseur entre, le logo peut se decomposer
- quand le curseur quitte, le logo se recompose

Si tu modifies cette zone, teste toujours :

- fluidite
- lisibilite du texte
- impact sur mobile
- coherence avec le theme actif

## 9. Section orchestration

La section "notre orchestration" s'inspire d'un design type Laravel Cloud, mais le contenu doit toujours parler de Young Solver.

Elle doit mettre en valeur :

- design produit
- apps web
- apps mobiles
- desktop software
- backend / APIs
- IA
- CI/CD
- cloud operations

Contraintes :

- garder des cartes claires et aeriennes
- hover subtil avec leger lift
- fond technique discret
- responsive propre
- ne pas surcharger avec des effets parasites

## 10. Contenu et donnees

Regle simple :

- les textes et donnees business vivent dans `content/`
- les composants affichent ces donnees
- eviter de recoder des constantes marketing en dur dans les composants

Si tu ajoutes une nouvelle section, pense a :

- ajouter les donnees dans [`content/site.ts`](C:/Users/merdi/Downloads/YoungSolver/content/site.ts)
- ajouter les traductions dans [`content/translations.ts`](C:/Users/merdi/Downloads/YoungSolver/content/translations.ts)

## 11. SEO

Le projet a deja une base SEO. Toute nouvelle vraie page doit rester compatible avec :

- metadata Next.js
- canonical
- Open Graph
- Twitter cards
- JSON-LD
- `robots.ts`
- `sitemap.ts`
- contenu semantique reel

Le SEO ne doit pas etre pense uniquement comme des meta tags. Il faut aussi :

- des titres clairs
- une promesse lisible
- des sections utiles
- un bon maillage interne
- des contenus par service si le site evolue

## 12. Performance

La performance est une contrainte de premier rang.

Bonnes pratiques obligatoires :

- limiter les composants clients au strict necessaire
- reduire le nombre d'objets et de particules en 3D
- preferer des animations intelligentes a des effets massifs
- ne pas empiler plusieurs couches de blur inutiles
- garder des sections lisibles meme avec glass effect
- charger la 3D du hero proprement

Eviter absolument :

- les backgrounds globaux tres lourds
- les animations scroll non maitrisees sur toute la page
- les bibliotheques ajoutees sans besoin reel
- les effets qui nuisent au LCP ou au confort de lecture

## 13. Internationalisation

Le changement de langue doit rester propre.

Regles :

- utiliser `react-intl`
- garder une API de provider simple pour le reste du code
- centraliser les messages
- ne pas revenir a un systeme manuel fragile

## 14. Workflow de modification

Avant de coder :

1. lire les fichiers lies a la demande
2. comprendre la structure existante
3. toucher uniquement les fichiers concernes

Pendant le travail :

1. conserver le style de code existant
2. garder des noms de variables et constantes clairs
3. ne pas dupliquer une logique deja presente ailleurs

Avant de finir :

1. verifier les imports
2. verifier les themes
3. verifier le responsive
4. verifier la navigation
5. verifier la console
6. verifier que rien d'inutile n'a ete modifie

## 15. Validation locale

Commandes utiles :

```bash
pnpm dev
pnpm build
pnpm exec tsc --noEmit
```

Point important sur l'environnement actuel :

- des validations automatiques peuvent echouer localement a cause d'un probleme `EPERM` sur certains fichiers sous `node_modules/.pnpm`
- si cela arrive, ne pas mentir sur la verification
- indiquer clairement ce qui a ete verifie et ce qui n'a pas pu l'etre

## 16. Ce qu'il ne faut pas reintroduire

- traces Vercel non demandees
- traces v0 / Vo.app / boilerplate IA
- anciens themes abandonnes
- navigation interne qui recharge
- fonds animes lourds sur toute la page
- contenu marketing disperse dans les composants
- dependances ajoutees sans justification

## 17. Definition d'un travail propre

Une modification est consideree comme propre si :

1. elle repond a la demande precise
2. elle ne touche pas des zones non liees
3. elle reste elegante dans l'architecture actuelle
4. elle preserve la vitesse du site
5. elle garde un niveau visuel senior
6. elle laisse le projet plus clair qu'avant
