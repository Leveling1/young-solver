export type Language = 'fr' | 'en'

type TranslationEntry = Record<Language, string>

export const translations = {
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.services': { fr: 'Services', en: 'Services' },
  'nav.projects': { fr: 'Projets', en: 'Projects' },
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.cta': { fr: 'Nous contacter', en: 'Get in touch' },

  'hero.title.line1': { fr: 'Construisons les', en: "Building tomorrow's" },
  'hero.title.line2': { fr: 'solutions digitales', en: 'digital solutions' },
  'hero.title.line3': { fr: 'de demain', en: 'today' },
  'hero.description': {
    fr: 'Nous transformons vos idées ambitieuses en produits numériques utiles, élégants et évolutifs.',
    en: 'We turn ambitious ideas into useful, elegant, and scalable digital products.',
  },
  'hero.primaryAction': { fr: 'Voir nos realisations', en: 'See our work' },
  'hero.secondaryAction': { fr: 'Decouvrir nos services', en: 'Explore services' },
  'hero.scrollLabel': { fr: 'Defiler vers les services', en: 'Scroll to services' },

  'services.title.prefix': { fr: 'Nos', en: 'Our' },
  'services.title.highlight': { fr: 'services', en: 'services' },
  'services.description': {
    fr: 'Des prestations claires, solides et pensées pour accompagner la croissance de votre activité.',
    en: 'Clear, reliable services designed to support the growth of your business.',
  },
  'services.web.title': { fr: 'Développement web', en: 'Web development' },
  'services.web.description': {
    fr: 'Applications web performantes, sites vitrines premium et plateformes métier sur mesure.',
    en: 'High-performance web apps, premium websites, and tailored business platforms.',
  },
  'services.mobile.title': { fr: 'Applications mobiles', en: 'Mobile apps' },
  'services.mobile.description': {
    fr: 'Expériences mobiles fluides pour iOS et Android, natives ou cross-platform.',
    en: 'Smooth native or cross-platform mobile experiences for iOS and Android.',
  },
  'services.backend.title': { fr: 'Systèmes backend', en: 'Backend systems' },
  'services.backend.description': {
    fr: 'APIs fiables, logique métier maintenable et intégrations entre vos outils clés.',
    en: 'Reliable APIs, maintainable business logic, and integrations across key tools.',
  },
  'services.design.title': { fr: 'Design produit', en: 'Product design' },
  'services.design.description': {
    fr: 'Interfaces cohérentes, parcours utiles et direction visuelle alignée avec votre marque.',
    en: 'Consistent interfaces, useful journeys, and a visual direction aligned with your brand.',
  },
  'services.ai.title': { fr: 'Solutions IA', en: 'AI solutions' },
  'services.cloud.title': { fr: 'Architecture cloud', en: 'Cloud architecture' },
  'ecosystem.title.prefix': { fr: 'Notre', en: 'Our' },
  'ecosystem.title.highlight': { fr: 'orchestration', en: 'orchestration' },
  'ecosystem.description': {
    fr: 'Une lecture claire de la façon dont nous relions front, backend, automatisation, data et IA dans un même flux.',
    en: 'A clear view of how we connect frontend, backend, automation, data, and AI in one delivery flow.',
  },
  'ecosystem.partners': { fr: 'Partenaires et stack', en: 'Partners and stack' },

  'solutions.title.prefix': { fr: 'Nos', en: 'Our' },
  'solutions.title.highlight': { fr: 'solutions', en: 'solutions' },
  'solutions.description': {
    fr: 'Des produits que nous concevons pour accélérer les opérations, la production et la collaboration.',
    en: 'Products we design to accelerate operations, production, and collaboration.',
  },
  'solutions.solverflow.title': { fr: 'SolverFlow', en: 'SolverFlow' },
  'solutions.solverflow.description': {
    fr: 'Une plateforme pour orchestrer les workflows, les validations et les automatisations internes.',
    en: 'A platform to orchestrate workflows, approvals, and internal automation.',
  },
  'solutions.novaops.title': { fr: 'NovaOps', en: 'NovaOps' },
  'solutions.novaops.description': {
    fr: 'Un cockpit opérationnel pour suivre les équipes, les incidents et les environnements cloud.',
    en: 'An operations cockpit to track teams, incidents, and cloud environments.',
  },
  'solutions.atelierai.title': { fr: 'Atelier AI', en: 'Atelier AI' },
  'solutions.atelierai.description': {
    fr: 'Un studio IA pour produire plus vite des contenus, assistants et prototypes intelligents.',
    en: 'An AI studio to produce content, assistants, and smart prototypes faster.',
  },
  'solutions.vaultdata.title': { fr: 'VaultData', en: 'VaultData' },
  'solutions.vaultdata.description': {
    fr: 'Une plateforme de gestion et d\'analyse des données avec tableaux de bord interactifs.',
    en: 'A data management and analytics platform with interactive dashboards.',
  },
  'solutions.auditflow.title': { fr: 'AuditFlow', en: 'AuditFlow' },
  'solutions.auditflow.description': {
    fr: 'Un système de conformité et d\'audit pour tracer, valider et sécuriser vos processus.',
    en: 'A compliance and audit system to track, validate, and secure your processes.',
  },

  'projects.title.prefix': { fr: 'Projets clients', en: 'Client' },
  'projects.title.highlight': { fr: 'sélectionnés', en: 'projects' },
  'projects.description': {
    fr: 'Quelques exemples de livrables pensés pour répondre à un besoin métier concret.',
    en: 'A few examples of deliverables built to solve real business needs.',
  },
  'projects.filter.all': { fr: 'Tous', en: 'All' },
  'projects.filter.web': { fr: 'Web', en: 'Web' },
  'projects.filter.mobile': { fr: 'Mobile', en: 'Mobile' },
  'projects.filter.ai': { fr: 'IA', en: 'AI' },
  'projects.code': { fr: 'Code', en: 'Code' },
  'projects.demo': { fr: 'Demo', en: 'Live demo' },
  'projects.ecommerce.title': { fr: 'Plateforme e-commerce', en: 'E-commerce platform' },
  'projects.ecommerce.description': {
    fr: 'Une boutique complète avec catalogue dynamique, paiements et suivi opérationnel.',
    en: 'A complete storefront with a dynamic catalog, payments, and operational monitoring.',
  },
  'projects.health.title': { fr: 'Application HealthTrack', en: 'HealthTrack app' },
  'projects.health.description': {
    fr: 'Une expérience mobile de suivi santé avec synchronisation et visualisation d\'indicateurs.',
    en: 'A mobile health tracking experience with sync and insight visualization.',
  },
  'projects.document.title': { fr: 'Analyseur documentaire IA', en: 'AI document analyzer' },
  'projects.document.description': {
    fr: 'Un pipeline d\'extraction et de classement de documents pour accélérer le traitement métier.',
    en: 'A document extraction and classification pipeline to accelerate business processing.',
  },
  'projects.dashboard.title': { fr: 'Dashboard SaaS', en: 'SaaS dashboard' },
  'projects.dashboard.description': {
    fr: 'Un espace décisionnel centré sur les métriques essentielles et la clarté de lecture.',
    en: 'A decision-focused workspace centered on essential metrics and readability.',
  },
  'projects.logistics.title': { fr: 'Suivi logistique', en: 'Logistics tracker' },
  'projects.logistics.description': {
    fr: 'Un outil terrain pour piloter une flotte, optimiser les trajets et gagner en visibilité.',
    en: 'A field tool to manage a fleet, optimize routes, and improve visibility.',
  },
  'projects.assistant.title': { fr: 'Assistant conversationnel', en: 'Conversational assistant' },
  'projects.assistant.description': {
    fr: 'Un assistant métier relié au CRM pour répondre vite et mieux aux demandes clients.',
    en: 'A business assistant connected to the CRM for faster, better customer responses.',
  },
  'projects.viewAll': { fr: 'Voir tous les projets', en: 'View all projects' },

  'solutions.viewAll': { fr: 'Voir toutes les solutions', en: 'View all solutions' },

  'about.title.prefix': { fr: 'À propos de', en: 'About' },
  'about.title.highlight': { fr: 'Young Solver', en: 'Young Solver' },
  'about.description.lead': {
    fr: 'Young Solver accompagne les entreprises qui veulent structurer, accélérer ou moderniser leurs produits numériques.',
    en: 'Young Solver supports companies that want to structure, accelerate, or modernize their digital products.',
  },
  'about.description.body': {
    fr: 'Nous privilégions les choix techniques durables, une exécution rigoureuse et une communication simple tout au long du projet.',
    en: 'We prioritize durable technical choices, rigorous execution, and straightforward communication throughout the project.',
  },
  'about.value.innovation.title': { fr: 'Innovation utile', en: 'Useful innovation' },
  'about.value.innovation.description': {
    fr: 'Chaque décision produit doit créer un avantage concret, pas seulement un effet visuel.',
    en: 'Every product decision should create tangible value, not just visual novelty.',
  },
  'about.value.quality.title': { fr: 'Qualité durable', en: 'Lasting quality' },
  'about.value.quality.description': {
    fr: 'Un code lisible, une base maintenable et des composants réutilisables dès le départ.',
    en: 'Readable code, a maintainable foundation, and reusable components from day one.',
  },
  'about.value.client.title': { fr: 'Partenariat reel', en: 'Real partnership' },
  'about.value.client.description': {
    fr: 'Nous cherchons à comprendre le besoin métier avant de proposer la solution technique.',
    en: 'We aim to understand the business need before proposing the technical solution.',
  },
  'about.stats.clients': { fr: 'Clients accompagnés', en: 'Clients supported' },
  'about.stats.projects': { fr: 'Projets livrés', en: 'Projects delivered' },
  'about.stats.experience': { fr: 'Années d\'expérience', en: 'Years of experience' },
  'about.stats.success': { fr: 'Taux de satisfaction', en: 'Satisfaction rate' },

  'contact.title.prefix': { fr: 'Parlons de votre', en: 'Let us discuss your' },
  'contact.title.highlight': { fr: 'projet', en: 'project' },
  'contact.description': {
    fr: 'Une idée, un besoin de refonte ou un produit à lancer: nous pouvons poser un cadre clair et avancer vite.',
    en: 'An idea, a redesign need, or a product to launch: we can define a clear path and move fast.',
  },
  'contact.email': { fr: 'Email', en: 'Email' },
  'contact.phone': { fr: 'Téléphone', en: 'Phone' },
  'contact.location': { fr: 'Localisation', en: 'Location' },
  'contact.name': { fr: 'Nom', en: 'Name' },
  'contact.name.placeholder': { fr: 'Votre nom', en: 'Your name' },
  'contact.email.placeholder': { fr: 'votre@email.com', en: 'your@email.com' },
  'contact.subject': { fr: 'Sujet', en: 'Subject' },
  'contact.subject.placeholder': { fr: 'Votre besoin principal', en: 'Your main need' },
  'contact.message': { fr: 'Message', en: 'Message' },
  'contact.message.placeholder': {
    fr: 'Décrivez le contexte, vos objectifs et vos contraintes.',
    en: 'Describe the context, goals, and constraints.',
  },
  'contact.send': { fr: 'Envoyer le message', en: 'Send message' },
  'contact.sending': { fr: 'Envoi en cours...', en: 'Sending...' },
  'contact.success': {
    fr: 'Votre message a été envoyé avec succès ! Nous vous répondrons très prochainement.',
    en: 'Your message has been sent successfully! We will get back to you very soon.',
  },
  'contact.error': {
    fr: "Une erreur est survenue. Veuillez vérifier vos informations ou votre connexion réseau.",
    en: "An error occurred. Please check your information or your network connection.",
  },
  'contact.error.email': {
    fr: "Veuillez entrer une adresse email valide.",
    en: "Please enter a valid email address.",
  },

  'footer.description': {
    fr: 'Des solutions numériques bien pensées, bien construites et prêtes à durer.',
    en: 'Well-designed digital solutions, well-built and ready to last.',
  },
  'footer.services': { fr: 'Services', en: 'Services' },
  'footer.company': { fr: 'Entreprise', en: 'Company' },
  'footer.about': { fr: 'À propos', en: 'About' },
  'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'footer.terms': { fr: 'Conditions utilisation', en: 'Terms of use' },
} satisfies Record<string, TranslationEntry>

export type TranslationKey = keyof typeof translations

export function getTranslation(language: Language, key: TranslationKey): string {
  return translations[key][language]
}
