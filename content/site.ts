import {
  Cloud,
  Code,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Palette,
  Phone,
  Smartphone,
  Target,
  Trophy,
  Twitter,
  Users,
} from 'lucide-react'

export const HOME_SECTION_IDS = ['services', 'projects', 'about', 'contact'] as const

export const SERVICE_ITEMS = [
  { icon: Code, key: 'web' },
  { icon: Smartphone, key: 'mobile' },
  { icon: Database, key: 'backend' },
  { icon: Palette, key: 'design' },
] as const

export const PROJECT_CATEGORIES = ['all', 'web', 'mobile', 'ai'] as const

export const SOLUTION_PRODUCTS = [
  {
    key: 'solverflow',
    tags: ['Workflow', 'Automation', 'Ops'],
    image: '/images/projects/solverflow-app.png',
  },
  {
    key: 'novaops',
    tags: ['Monitoring', 'Cloud', 'Teams'],
    image: '/images/projects/novaops-app.png',
  },
  {
    key: 'atelierai',
    tags: ['AI', 'Content', 'Studio'],
    image: '/images/projects/atelierai-app.png',
  },
] as const

export const FEATURED_PROJECTS = [
  {
    key: 'ecommerce',
    category: 'web',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #007BFF 0%, #00D4FF 100%)',
    image: '/images/projects/ecommerce-app.png',
  },
  {
    key: 'health',
    category: 'mobile',
    tags: ['React Native', 'TensorFlow', 'Firebase'],
    gradient: 'linear-gradient(135deg, #00C853 0%, #B2FF59 100%)',
    image: '/images/projects/healthtrack-app.png',
  },
  {
    key: 'document',
    category: 'ai',
    tags: ['Python', 'OpenAI', 'AWS'],
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #FFD166 100%)',
    image: '/images/projects/docai-app.png',
  },
  {
    key: 'dashboard',
    category: 'web',
    tags: ['React', 'D3.js', 'Node.js'],
    gradient: 'linear-gradient(135deg, #264653 0%, #2A9D8F 100%)',
    image: '/images/projects/dashboard-app.png',
  },
  {
    key: 'logistics',
    category: 'mobile',
    tags: ['Flutter', 'Google Maps', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
    image: '/images/projects/logistics-app.png',
  },
  {
    key: 'assistant',
    category: 'ai',
    tags: ['GPT-4', 'LangChain', 'Redis'],
    gradient: 'linear-gradient(135deg, #3A86FF 0%, #8338EC 100%)',
    image: '/images/projects/assistant-app.png',
  },
] as const

export const ABOUT_VALUE_KEYS = ['innovation', 'quality', 'client'] as const

export const ABOUT_STATS = [
  { icon: Users, value: '50+', key: 'clients' },
  { icon: Trophy, value: '100+', key: 'projects' },
  { icon: Target, value: '99%', key: 'success' },
  { icon: Cloud, value: '5+', key: 'experience' },
] as const

export const CONTACT_DETAILS = [
  { icon: Mail, key: 'email', value: 'youngsolver@gmail.com' },
  { icon: Phone, key: 'phone', value: '+243 983-314-789' },
  { icon: MapPin, key: 'location', value: 'Kinshasa, RDC' },
] as const

export const SOCIAL_LINKS = [
  { href: '#', icon: Github, label: 'GitHub' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:youngsolver@gmail.com', icon: Mail, label: 'Email' },
] as const

export const DELIVERY_FLOW_CARDS = [
  {
    title: 'Edge network',
    badge: 'Core',
    tone: 'blue',
    items: ['Traffic routing', 'DDoS protection', 'Caching layer'],
  },
  {
    title: 'Applications',
    badge: 'Runtime',
    tone: 'cyan',
    items: ['Flutter app', 'TypeScript API', 'Worker jobs'],
  },
  {
    title: 'Automation',
    badge: 'Ops',
    tone: 'amber',
    items: ['Queue orchestration', 'Scheduler', 'Deploy hooks'],
  },
  {
    title: 'Data fabric',
    badge: 'Data',
    tone: 'violet',
    items: ['PostgreSQL', 'Redis cache', 'Analytics sync'],
  },
  {
    title: 'AI pipeline',
    badge: 'Intelligence',
    tone: 'pink',
    items: ['Prompt routing', 'Document parsing', 'Response scoring'],
  },
  {
    title: 'Observability',
    badge: 'Control',
    tone: 'emerald',
    items: ['Tracing', 'Alerts', 'Business metrics'],
  },
] as const

export const PARTNER_NAMES = [
  'Flutter',
  'TypeScript',
  'Python',
  'Firebase',
  'Google Cloud',
  'MongoDB',
  'Docker',
  'OpenAI',
  'Supabase',
  'Stripe',
] as const
