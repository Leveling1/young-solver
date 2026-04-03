import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ScrollAmbientBackground } from '@/components/home/visuals/scroll-ambient-background'
import { AboutSection } from '@/components/home/sections/about-section'
import { ContactSection } from '@/components/home/sections/contact-section'
import { EcosystemSection } from '@/components/home/sections/ecosystem-section'
import { HeroSection } from '@/components/home/sections/hero-section'
import { ProjectsSection } from '@/components/home/sections/projects-section'
import { ServicesSection } from '@/components/home/sections/services-section'
import { SolutionsSection } from '@/components/home/sections/solutions-section'

export function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <ScrollAmbientBackground />
      <div className="relative z-10">
        <SiteHeader />
        <HeroSection />
        <ServicesSection />
        <EcosystemSection />
        <SolutionsSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <SiteFooter />
      </div>
    </main>
  )
}
