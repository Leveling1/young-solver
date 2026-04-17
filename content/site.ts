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

export type OrchestrationTone = 'blue' | 'cyan' | 'slate' | 'amber' | 'violet'

export type OrchestrationItemIcon =
  | 'shield'
  | 'globe'
  | 'zap'
  | 'arrow-left-right'
  | 'box'
  | 'expand'
  | 'layers'
  | 'clock'
  | 'database'
  | 'server'
  | 'eye'
  | 'circle'

export type OrchestrationItem = {
  icon: OrchestrationItemIcon
  label: string
  value: string
  meta?: string
  state?: 'success'
}

export type OrchestrationPanel = {
  key: string
  title: string
  badge: string
  tone: OrchestrationTone
  items: readonly OrchestrationItem[]
  previewRows?: readonly string[]
  footer?: string
}

export type OrchestrationColumn = {
  key: string
  region: string
  panels: readonly OrchestrationPanel[]
  menu?: readonly string[]
}

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
  {
    key: 'vaultdata',
    tags: ['Data', 'Analytics', 'BI'],
    image: '/images/projects/vaultdata-app.png',
  },
  {
    key: 'auditflow',
    tags: ['Audit', 'Compliance', 'Security'],
    image: '/images/projects/auditflow-app.png',
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

export const ORCHESTRATION_COLUMNS: readonly OrchestrationColumn[] = [
  {
    key: 'edge',
    region: 'Product foundation',
    panels: [
      {
        key: 'product',
        title: 'Product design',
        badge: 'Product',
        tone: 'blue',
        items: [
          { icon: 'shield', label: 'Discovery workshop', value: 'Active', state: 'success' },
          { icon: 'globe', label: 'UX architecture', value: 'Ready', state: 'success' },
          { icon: 'zap', label: 'UI system', value: 'Reusable', state: 'success' },
        ],
      },
      {
        key: 'platforms',
        title: 'Platform scope',
        badge: 'Scope',
        tone: 'blue',
        items: [
          { icon: 'globe', label: 'Web applications', value: 'Enabled', meta: 'Next.js, React, admin dashboards' },
          { icon: 'globe', label: 'Mobile applications', value: 'Delivery', meta: 'Flutter for Android and iOS' },
          { icon: 'globe', label: 'Desktop software', value: 'Available', meta: 'Tauri, Electron, internal tools' },
        ],
        footer: '+ Add delivery scope',
      },
    ],
  },
  {
    key: 'runtime',
    region: 'Build and release flow',
    panels: [
      {
        key: 'web',
        title: 'Web app',
        badge: 'Web',
        tone: 'cyan',
        items: [
          { icon: 'arrow-left-right', label: 'Frontend stack', value: 'Next.js 16' },
          { icon: 'box', label: 'Backoffice', value: 'Enabled', state: 'success' },
          { icon: 'layers', label: 'SEO and analytics', value: 'Ready', state: 'success' },
        ],
      },
      {
        key: 'mobile',
        title: 'Mobile app',
        badge: 'Mobile',
        tone: 'slate',
        items: [
          { icon: 'box', label: 'Shared codebase', value: 'Flutter' },
          { icon: 'expand', label: 'Native delivery', value: 'iOS + Android' },
          { icon: 'layers', label: 'Offline sync', value: 'Optional' },
        ],
      },
      {
        key: 'automation',
        title: 'Automation',
        badge: 'Ops',
        tone: 'slate',
        items: [
          { icon: 'box', label: 'CI/CD pipeline', value: 'Active', state: 'success' },
          { icon: 'clock', label: 'Release workflow', value: 'Tracked', state: 'success' },
          { icon: 'layers', label: 'QA checkpoints', value: 'Included', state: 'success' },
        ],
        footer: '+ Add release flow',
      },
    ],
  },
  {
    key: 'data',
    region: 'Cloud and intelligence',
    menu: ['View architecture', 'Deploy release', 'Open workspace'],
    panels: [
      {
        key: 'backend',
        title: 'Backend core',
        badge: 'API',
        tone: 'amber',
        previewRows: ['Auth', 'Payments', 'Notifications', 'Sync jobs'],
        items: [
          { icon: 'database', label: 'Runtime', value: 'Node.js / Python' },
          { icon: 'server', label: 'Architecture', value: 'Scalable APIs' },
        ],
      },
      {
        key: 'intelligence',
        title: 'AI services',
        badge: 'AI',
        tone: 'violet',
        items: [
          { icon: 'database', label: 'Assistants and agents', value: 'Integrated', state: 'success' },
          { icon: 'box', label: 'Document workflows', value: 'Automated' },
          { icon: 'layers', label: 'Prompt routing', value: 'Managed' },
        ],
      },
      {
        key: 'cloud',
        title: 'Cloud ops',
        badge: 'Cloud',
        tone: 'violet',
        items: [
          { icon: 'eye', label: 'Monitoring', value: 'Visible', state: 'success' },
          { icon: 'circle', label: 'Deploy target', value: 'Production ready', state: 'success' },
          { icon: 'globe', label: 'Hosting model', value: 'Cloud managed' },
        ],
        footer: '+ Add production service',
      },
    ],
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
