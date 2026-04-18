# Young Solver — Agent Status & Memory

## Architecture Actuelle
- **Mode de déploiement** : Statique (SSG) via FTP.
- **Base de données & Backend** : Supabase (Table `contacts` + RLS).
- **Emails** : Supabase Edge Function (`send-contact-email`) utilisant Nodemailer sur Deno 2 via SMTP (levelingcoder.com).
- **Sécurité** : Clés Supabase isolées dans `secrets.ts` (local) et GitHub Secrets (CI/CD).

## État des fonctionnalités
- [x] Formulaire de contact avec validation regex.
- [x] Intégration Supabase (insertion DB).
- [x] Envoi automatique d'emails (Notification + Accusé).
- [x] Internationalisation FR/EN.
- [x] Nettoyage automatique du build (`prebuild` script).

## Tâches à venir
- [ ] Migration du design des emails vers des templates HTML plus riches (React Email ?).
- [ ] Ajout d'un système de protection contre le spam (Rate limiting côté Supabase).
- [ ] Optimisation des performances des scènes Three.js.

## Vigilance Production
- Ne jamais supprimer `secrets.ts` sans mettre à jour les secrets GitHub.
- S'assurer que `output: 'export'` est présent dans `next.config.js`.