export type Language = 'fr' | 'en'

type TranslationEntry = Record<Language, string>

export const translations = {
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.services': { fr: 'Services', en: 'Services' },
  'nav.projects': { fr: 'Projets', en: 'Projects' },
  'nav.about': { fr: 'A propos', en: 'About' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.cta': { fr: 'Nous contacter', en: 'Get in touch' },

  'hero.title.line1': { fr: 'Construisons les', en: "Building tomorrow's" },
  'hero.title.line2': { fr: 'solutions digitales', en: 'digital solutions' },
  'hero.title.line3': { fr: 'de demain', en: 'today' },
  'hero.description': {
    fr: 'Nous transformons vos idees ambitieuses en produits numeriques utiles, elegants et evolutifs.',
    en: 'We turn ambitious ideas into useful, elegant, and scalable digital products.',
  },
  'hero.primaryAction': { fr: 'Voir nos realisations', en: 'See our work' },
  'hero.secondaryAction': { fr: 'Decouvrir nos services', en: 'Explore services' },
  'hero.scrollLabel': { fr: 'Defiler vers les services', en: 'Scroll to services' },

  'services.title.prefix': { fr: 'Nos', en: 'Our' },
  'services.title.highlight': { fr: 'services', en: 'services' },
  'services.description': {
    fr: 'Des prestations claires, solides et pensees pour accompagner la croissance de votre activite.',
    en: 'Clear, reliable services designed to support the growth of your business.',
  },
  'services.web.title': { fr: 'Developpement web', en: 'Web development' },
  'services.web.description': {
    fr: 'Applications web performantes, sites vitrines premium et plateformes metier sur mesure.',
    en: 'High-performance web apps, premium websites, and tailored business platforms.',
  },
  'services.mobile.title': { fr: 'Applications mobiles', en: 'Mobile apps' },
  'services.mobile.description': {
    fr: 'Experiences mobiles fluides pour iOS et Android, natives ou cross-platform.',
    en: 'Smooth native or cross-platform mobile experiences for iOS and Android.',
  },
  'services.backend.title': { fr: 'Systemes backend', en: 'Backend systems' },
  'services.backend.description': {
    fr: 'APIs fiables, logique metier maintenable et integrations entre vos outils cles.',
    en: 'Reliable APIs, maintainable business logic, and integrations across key tools.',
  },
  'services.design.title': { fr: 'Design produit', en: 'Product design' },
  'services.design.description': {
    fr: 'Interfaces coherentes, parcours utiles et direction visuelle alignee avec votre marque.',
    en: 'Consistent interfaces, useful journeys, and a visual direction aligned with your brand.',
  },
  'services.ai.title': { fr: 'Solutions IA', en: 'AI solutions' },
  'services.cloud.title': { fr: 'Architecture cloud', en: 'Cloud architecture' },
  'ecosystem.title.prefix': { fr: 'Notre', en: 'Our' },
  'ecosystem.title.highlight': { fr: 'orchestration', en: 'orchestration' },
  'ecosystem.description': {
    fr: 'Une lecture claire de la facon dont nous relions front, backend, automatisation, data et IA dans un meme flux.',
    en: 'A clear view of how we connect frontend, backend, automation, data, and AI in one delivery flow.',
  },
  'ecosystem.partners': { fr: 'Partenaires et stack', en: 'Partners and stack' },

  'solutions.title.prefix': { fr: 'Nos', en: 'Our' },
  'solutions.title.highlight': { fr: 'solutions', en: 'solutions' },
  'solutions.description': {
    fr: 'Des produits que nous concevons pour accelerer les operations, la production et la collaboration.',
    en: 'Products we design to accelerate operations, production, and collaboration.',
  },
  'solutions.solverflow.title': { fr: 'SolverFlow', en: 'SolverFlow' },
  'solutions.solverflow.description': {
    fr: 'Une plateforme pour orchestrer les workflows, les validations et les automatisations internes.',
    en: 'A platform to orchestrate workflows, approvals, and internal automation.',
  },
  'solutions.novaops.title': { fr: 'NovaOps', en: 'NovaOps' },
  'solutions.novaops.description': {
    fr: 'Un cockpit operationnel pour suivre les equipes, les incidents et les environnements cloud.',
    en: 'An operations cockpit to track teams, incidents, and cloud environments.',
  },
  'solutions.atelierai.title': { fr: 'Atelier AI', en: 'Atelier AI' },
  'solutions.atelierai.description': {
    fr: 'Un studio IA pour produire plus vite des contenus, assistants et prototypes intelligents.',
    en: 'An AI studio to produce content, assistants, and smart prototypes faster.',
  },

  'projects.title.prefix': { fr: 'Projets clients', en: 'Client' },
  'projects.title.highlight': { fr: 'selectionnes', en: 'projects' },
  'projects.description': {
    fr: 'Quelques exemples de livrables penses pour repondre a un besoin metier concret.',
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
    fr: 'Une boutique complete avec catalogue dynamique, paiements et suivi operationnel.',
    en: 'A complete storefront with a dynamic catalog, payments, and operational monitoring.',
  },
  'projects.health.title': { fr: 'Application HealthTrack', en: 'HealthTrack app' },
  'projects.health.description': {
    fr: 'Une experience mobile de suivi sante avec synchronisation et visualisation d indicateurs.',
    en: 'A mobile health tracking experience with sync and insight visualization.',
  },
  'projects.document.title': { fr: 'Analyseur documentaire IA', en: 'AI document analyzer' },
  'projects.document.description': {
    fr: 'Un pipeline d extraction et de classement de documents pour accelerer le traitement metier.',
    en: 'A document extraction and classification pipeline to accelerate business processing.',
  },
  'projects.dashboard.title': { fr: 'Dashboard SaaS', en: 'SaaS dashboard' },
  'projects.dashboard.description': {
    fr: 'Un espace decisionnel centre sur les metriques essentielles et la clarte de lecture.',
    en: 'A decision-focused workspace centered on essential metrics and readability.',
  },
  'projects.logistics.title': { fr: 'Suivi logistique', en: 'Logistics tracker' },
  'projects.logistics.description': {
    fr: 'Un outil terrain pour piloter une flotte, optimiser les trajets et gagner en visibilite.',
    en: 'A field tool to manage a fleet, optimize routes, and improve visibility.',
  },
  'projects.assistant.title': { fr: 'Assistant conversationnel', en: 'Conversational assistant' },
  'projects.assistant.description': {
    fr: 'Un assistant metier relie au CRM pour repondre vite et mieux aux demandes clients.',
    en: 'A business assistant connected to the CRM for faster, better customer responses.',
  },

  'about.title.prefix': { fr: 'A propos de', en: 'About' },
  'about.title.highlight': { fr: 'Young Solver', en: 'Young Solver' },
  'about.description.lead': {
    fr: 'Young Solver accompagne les entreprises qui veulent structurer, accelerer ou moderniser leurs produits digitaux.',
    en: 'Young Solver supports companies that want to structure, accelerate, or modernize their digital products.',
  },
  'about.description.body': {
    fr: 'Nous privilegions les choix techniques durables, une execution rigoureuse et une communication simple tout au long du projet.',
    en: 'We prioritize durable technical choices, rigorous execution, and straightforward communication throughout the project.',
  },
  'about.value.innovation.title': { fr: 'Innovation utile', en: 'Useful innovation' },
  'about.value.innovation.description': {
    fr: 'Chaque decision produit doit creer un avantage concret, pas seulement un effet visuel.',
    en: 'Every product decision should create tangible value, not just visual novelty.',
  },
  'about.value.quality.title': { fr: 'Qualite durable', en: 'Lasting quality' },
  'about.value.quality.description': {
    fr: 'Un code lisible, une base maintenable et des composants reutilisables des le depart.',
    en: 'Readable code, a maintainable foundation, and reusable components from day one.',
  },
  'about.value.client.title': { fr: 'Partenariat reel', en: 'Real partnership' },
  'about.value.client.description': {
    fr: 'Nous cherchons a comprendre le besoin metier avant de proposer la solution technique.',
    en: 'We aim to understand the business need before proposing the technical solution.',
  },
  'about.stats.clients': { fr: 'Clients accompagnes', en: 'Clients supported' },
  'about.stats.projects': { fr: 'Projets livres', en: 'Projects delivered' },
  'about.stats.experience': { fr: 'Annees experience', en: 'Years of experience' },
  'about.stats.success': { fr: 'Taux de satisfaction', en: 'Satisfaction rate' },

  'contact.title.prefix': { fr: 'Parlons de votre', en: 'Let us discuss your' },
  'contact.title.highlight': { fr: 'projet', en: 'project' },
  'contact.description': {
    fr: 'Une idee, un besoin de refonte ou un produit a lancer: nous pouvons poser un cadre clair et avancer vite.',
    en: 'An idea, a redesign need, or a product to launch: we can define a clear path and move fast.',
  },
  'contact.email': { fr: 'Email', en: 'Email' },
  'contact.phone': { fr: 'Telephone', en: 'Phone' },
  'contact.location': { fr: 'Localisation', en: 'Location' },
  'contact.name': { fr: 'Nom', en: 'Name' },
  'contact.name.placeholder': { fr: 'Votre nom', en: 'Your name' },
  'contact.email.placeholder': { fr: 'votre@email.com', en: 'your@email.com' },
  'contact.subject': { fr: 'Sujet', en: 'Subject' },
  'contact.subject.placeholder': { fr: 'Votre besoin principal', en: 'Your main need' },
  'contact.message': { fr: 'Message', en: 'Message' },
  'contact.message.placeholder': {
    fr: 'Decrivez le contexte, vos objectifs et vos contraintes.',
    en: 'Describe the context, goals, and constraints.',
  },
  'contact.send': { fr: 'Envoyer le message', en: 'Send message' },
  'contact.sending': { fr: 'Envoi en cours...', en: 'Sending...' },
  'contact.success': {
    fr: 'Merci. Votre demande a bien ete preparee.',
    en: 'Thank you. Your request has been prepared successfully.',
  },

  'footer.description': {
    fr: 'Des solutions digitales bien pensees, bien construites et pretes a durer.',
    en: 'Well-designed digital solutions, well-built and ready to last.',
  },
  'footer.services': { fr: 'Services', en: 'Services' },
  'footer.company': { fr: 'Entreprise', en: 'Company' },
  'footer.about': { fr: 'A propos', en: 'About' },
  'footer.rights': { fr: 'Tous droits reserves.', en: 'All rights reserved.' },
  'footer.privacy': { fr: 'Confidentialite', en: 'Privacy' },
  'footer.terms': { fr: 'Conditions utilisation', en: 'Terms of use' },
} satisfies Record<string, TranslationEntry>

export type TranslationKey = keyof typeof translations

export function getTranslation(language: Language, key: TranslationKey): string {
  return translations[key][language]
}
