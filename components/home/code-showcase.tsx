'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CODE_SNIPPETS = [
  {
    language: 'dart',
    code: `class YoungSolverApp {
  final String stack = "Flutter";
  final bool polished = true;

  Future<void> launch() async {
    await shipMobileExperience();
  }
}`,
  },
  {
    language: 'typescript',
    code: `interface DeliveryFlow {
  frontend: "Next.js";
  backend: "Fast APIs";
  automation: true;
}

export async function deploy(flow: DeliveryFlow) {
  return orchestrate(flow);
}`,
  },
  {
    language: 'javascript',
    code: `const productLoop = async () => {
  const inputs = ["design", "build", "launch"];
  return inputs.map((step) => optimize(step));
};`,
  },
  {
    language: 'python',
    code: `class IntelligenceLayer:
    def route(self, request):
        context = self.prepare(request)
        return self.answer(context)`,
  },
] as const

const SYNTAX_COLORS: Record<string, Record<string, string>> = {
  dart: {
    keyword: 'text-primary',
    string: 'text-green-400',
    type: 'text-cyan-400',
    function: 'text-yellow-400',
    default: 'text-foreground',
  },
  typescript: {
    keyword: 'text-primary',
    string: 'text-green-400',
    type: 'text-cyan-400',
    function: 'text-yellow-400',
    default: 'text-foreground',
  },
  javascript: {
    keyword: 'text-primary',
    string: 'text-green-400',
    type: 'text-cyan-400',
    function: 'text-yellow-400',
    default: 'text-foreground',
  },
  python: {
    keyword: 'text-primary',
    string: 'text-green-400',
    type: 'text-cyan-400',
    function: 'text-yellow-400',
    default: 'text-foreground',
  },
}

function renderToken(
  token: string,
  colors: Record<string, string>,
  keywords: string[],
  types: string[],
  key: string,
) {
  if (keywords.includes(token)) {
    return (
      <span key={key} className={colors.keyword}>
        {token}
      </span>
    )
  }

  if (types.includes(token) || /^[A-Z]/.test(token)) {
    return (
      <span key={key} className={colors.type}>
        {token}
      </span>
    )
  }

  return (
    <span key={key} className={colors.function ?? colors.default}>
      {token}
    </span>
  )
}

function highlightCode(code: string, language: string) {
  const colors = SYNTAX_COLORS[language] ?? SYNTAX_COLORS.javascript
  const keywords = ['async', 'await', 'class', 'const', 'export', 'final', 'Future', 'interface', 'return', 'true']
  const types = ['DeliveryFlow', 'Future', 'String', 'YoungSolverApp']

  return code.split('\n').map((line, lineIndex) => {
    const tokens: React.ReactNode[] = []
    let currentToken = ''
    let isInsideString = false
    let activeQuote = ''

    for (let characterIndex = 0; characterIndex < line.length; characterIndex += 1) {
      const character = line[characterIndex]

      if (!isInsideString && character.match(/["'`]/)) {
        if (currentToken) {
          tokens.push(renderToken(currentToken, colors, keywords, types, `${lineIndex}-${characterIndex}-token`))
          currentToken = ''
        }

        activeQuote = character
        isInsideString = true
        currentToken = character
        continue
      }

      if (isInsideString && character === activeQuote) {
        currentToken += character
        tokens.push(
          <span key={`${lineIndex}-${characterIndex}-string`} className={colors.string}>
            {currentToken}
          </span>,
        )
        currentToken = ''
        isInsideString = false
        activeQuote = ''
        continue
      }

      if (!isInsideString && /[\s()[\]{}:;,=<>]/.test(character)) {
        if (currentToken) {
          tokens.push(renderToken(currentToken, colors, keywords, types, `${lineIndex}-${characterIndex}-token`))
          currentToken = ''
        }

        tokens.push(
          <span key={`${lineIndex}-${characterIndex}-separator`} className={colors.default}>
            {character}
          </span>,
        )
        continue
      }

      currentToken += character
    }

    if (currentToken) {
      tokens.push(
        isInsideString ? (
          <span key={`${lineIndex}-string-end`} className={colors.string}>
            {currentToken}
          </span>
        ) : (
          renderToken(currentToken, colors, keywords, types, `${lineIndex}-token-end`)
        ),
      )
    }

    return (
      <div key={lineIndex} className="leading-relaxed">
        <span className="mr-4 inline-block w-4 select-none text-right text-xs text-muted-foreground/50">
          {lineIndex + 1}
        </span>
        {tokens}
      </div>
    )
  })
}

export function CodeShowcase() {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0)
  const [displayedCode, setDisplayedCode] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [tilt, setTilt] = useState({ rotateX: -5, rotateY: 8 })
  const cardRef = useRef<HTMLDivElement>(null)
  const typingHandleRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const activeSnippet = CODE_SNIPPETS[activeSnippetIndex]
    let characterIndex = 0

    setDisplayedCode('')
    setIsTyping(true)

    typingHandleRef.current = setInterval(() => {
      if (characterIndex < activeSnippet.code.length) {
        setDisplayedCode(activeSnippet.code.slice(0, characterIndex + 1))
        characterIndex += 1
        return
      }

      if (typingHandleRef.current) {
        clearInterval(typingHandleRef.current)
      }

      setIsTyping(false)

      typingHandleRef.current = setTimeout(() => {
        setActiveSnippetIndex((currentIndex) => (currentIndex + 1) % CODE_SNIPPETS.length)
      }, 2200)
    }, 26)

    return () => {
      if (typingHandleRef.current) {
        clearTimeout(typingHandleRef.current)
      }
    }
  }, [activeSnippetIndex])

  const activeSnippet = CODE_SNIPPETS[activeSnippetIndex]

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current

    if (!card) {
      return
    }

    const rect = card.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5

    setTilt({
      rotateX: offsetY * -10,
      rotateY: offsetX * 14,
    })
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center p-4 [perspective:1800px]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-background/10 to-accent/20 opacity-80 blur-3xl" />
      <div className="absolute inset-0 rounded-[32px] bg-background/28 backdrop-blur-[2px]" />

      <motion.div
        ref={cardRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setTilt({ rotateX: -5, rotateY: 8 })}
        className="relative w-full max-w-xl rounded-[28px] border border-white/10 bg-background/78 shadow-[0_28px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1, rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent_32%,transparent_68%,rgba(255,255,255,0.08))]" />
        <div className="border-b border-border/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <span className="flex-1 text-center font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {activeSnippet.language}
            </span>
          </div>
        </div>

        <div className="min-h-[300px] overflow-hidden p-5 font-mono text-xs sm:text-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSnippetIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {highlightCode(displayedCode, activeSnippet.language)}
              {isTyping ? (
                <motion.span
                  className="ml-1 inline-block h-4 w-2 bg-primary"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {CODE_SNIPPETS.map((snippet, index) => (
            <motion.div
              key={snippet.language}
              className={
                index === activeSnippetIndex ? 'h-2.5 w-2.5 rounded-full bg-primary' : 'h-2.5 w-2.5 rounded-full bg-muted'
              }
              animate={index === activeSnippetIndex ? { scale: [1, 1.2, 1] } : undefined}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
