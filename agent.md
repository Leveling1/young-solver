# Agent Guide

Ce fichier aide tout agent IA ou collaborateur technique a intervenir proprement sur ce projet.

## Mission du projet

Le projet est un site vitrine premium pour Young Solver. Il doit rester :

- rapide
- propre
- maintenable
- credible visuellement
- bon en SEO

## Priorites absolues

Quand tu modifies le projet, respecte cet ordre de priorite :

1. ne pas casser le rendu ni la navigation
2. garder la base simple et lisible
3. preserver ou ameliorer la performance
4. renforcer le SEO et la clarte produit
5. conserver la coherence visuelle existante

## Architecture a respecter

### `app/`

Shell Next.js, metadata, manifest, robots, sitemap, styles globaux.

### `components/home/`

Tout ce qui concerne la page d'accueil :

- sections
- visuels
- hero

### `components/layout/`

Structure globale du site :

- header
- footer

### `components/controls/`

Commandes globales de l'utilisateur :

- langue
- theme

### `components/ui/`

Primitives partagees uniquement.

Ne pas y remettre un kit complet genere automatiquement si 90% des composants ne servent pas.

### `content/`

Source unique des textes et constantes marketing.

Ne pas disperser les donnees metier dans les composants.

### `providers/`

Contextes applicatifs globaux.

## Regles de modification

### Navigation

- Pour les liens internes de section, utiliser `components/ui/scroll-link.tsx`
- Ne pas revenir a des liens qui provoquent un rechargement ressenti

### Logos et branding

- Utiliser `logo-black.png` pour les themes clairs
- Utiliser `logo-white.png` pour les themes sombres
- Passer par `components/ui/brand-logo.tsx`

### Glass effect

- `glass-nav` pour la navigation
- `glass-card` pour les cartes
- eviter une transparence trop forte qui nuit a la lisibilite

### Performance

- eviter les animations lourdes au chargement initial
- charger la 3D de facon differee si possible
- limiter les imports clients inutiles
- ne pas ajouter de bibliotheques sans raison claire

### SEO

Toujours penser a :

- `metadata`
- `canonical`
- Open Graph
- Twitter cards
- structured data
- robots
- sitemap

Si tu ajoutes une vraie page, pense au SEO de cette page.

## Workflow recommande

Avant de terminer :

1. verifier les imports
2. verifier TypeScript
3. verifier qu'aucun vieux doublon n'a ete reintroduit
4. verifier la navigation
5. verifier les themes clair/sombre

Commande minimale :

```bash
pnpm exec tsc --noEmit
```

## Ce qu'il faut eviter

- remettre des traces de generateur ou de boilerplate
- remettre Vercel analytics ou des integrations non demandees
- recreer des dossiers doublons
- multiplier les constantes dans les composants
- ajouter des effets visuels qui ralentissent le hero

## Si une nouvelle fonctionnalite doit etre ajoutee

Pose-toi ces questions :

1. est-ce utile au business ou juste decoratif ?
2. est-ce coherent avec l'architecture actuelle ?
3. est-ce que cela degrade la performance ?
4. est-ce que cela aide ou nuit au SEO ?
5. est-ce que le code reste comprensible pour le prochain intervenant ?
