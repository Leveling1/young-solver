'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Input } from '@/components/ui/input'
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_DETAILS } from '@/content/site'
import { useLanguage } from '@/providers/language-provider'

type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_CONTACT_FORM_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactSection() {
  const { t } = useLanguage()
  const [formValues, setFormValues] = useState<ContactFormValues>(INITIAL_CONTACT_FORM_VALUES)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setFormValues((currentValues) => ({ ...currentValues, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setIsSubmitted(false)

    await new Promise((resolve) => setTimeout(resolve, 900))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormValues(INITIAL_CONTACT_FORM_VALUES)
  }

  return (
    <section id="contact" className="relative bg-secondary/18 py-24 backdrop-blur-[2px]">
      <div className="container mx-auto px-4">
        <ScrollAnimation variant="fadeUp" className="mb-16 text-center">
          <h2 className="mb-4 text-foreground text-3xl font-bold sm:text-4xl md:text-5xl">
            {t('contact.title.prefix')} <span className="text-primary">{t('contact.title.highlight')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t('contact.description')}</p>
        </ScrollAnimation>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {CONTACT_DETAILS.map((contactDetail) => {
              const Icon = contactDetail.icon

              return (
                <StaggerItem key={contactDetail.key}>
                  <GlassCard className="flex items-center gap-4">
                    <motion.div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t(`contact.${contactDetail.key}`)}</p>
                      <p className="font-medium">{contactDetail.value}</p>
                    </div>
                  </GlassCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>

          <ScrollAnimation variant="fadeUp" delay={0.2} className="lg:col-span-2">
            <GlassCard hover={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      {t('contact.name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={formValues.name}
                      placeholder={t('contact.name.placeholder')}
                      onChange={(event) => updateField('name', event.target.value)}
                      className="bg-background/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      {t('contact.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formValues.email}
                      placeholder={t('contact.email.placeholder')}
                      onChange={(event) => updateField('email', event.target.value)}
                      className="bg-background/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    {t('contact.subject')}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    autoComplete="organization-title"
                    value={formValues.subject}
                    placeholder={t('contact.subject.placeholder')}
                    onChange={(event) => updateField('subject', event.target.value)}
                    className="bg-background/50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formValues.message}
                    placeholder={t('contact.message.placeholder')}
                    onChange={(event) => updateField('message', event.target.value)}
                    rows={5}
                    className="resize-none bg-background/50"
                    required
                  />
                </div>

                {isSubmitted ? (
                  <p className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                    {t('contact.success')}
                  </p>
                ) : null}

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      t('contact.sending')
                    ) : (
                      <>
                        {t('contact.send')}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </GlassCard>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
