// Web Vitals monitoring for production
export function reportWebVitals() {
  if (typeof window === 'undefined') return

  // Dynamic import to avoid loading in development
  if (process.env.NODE_ENV === 'production') {
    // Uncomment when web-vitals is installed: npm install web-vitals
    // import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
    //   onCLS(console.log)
    //   onFID(console.log)
    //   onFCP(console.log)
    //   onLCP(console.log)
    //   onTTFB(console.log)
    //   onINP(console.log)
    // })
  }
}

// Performance monitoring utility
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map()

  startMeasure(label: string): void {
    if (typeof performance === 'undefined') return
    performance.mark(`${label}-start`)
  }

  endMeasure(label: string): number | null {
    if (typeof performance === 'undefined') return null

    performance.mark(`${label}-end`)
    performance.measure(label, `${label}-start`, `${label}-end`)

    const measure = performance.getEntriesByName(label)[0]
    const duration = measure?.duration || 0

    this.metrics.set(label, duration)
    
    // Clean up
    performance.clearMarks(`${label}-start`)
    performance.clearMarks(`${label}-end`)
    performance.clearMeasures(label)

    return duration
  }

  getMetric(label: string): number | undefined {
    return this.metrics.get(label)
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  clear(): void {
    this.metrics.clear()
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Resource hints for critical resources
export function addResourceHints() {
  if (typeof document === 'undefined') return

  const hints = [
    { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
    { rel: 'dns-prefetch', href: 'https://js.paystack.co' },
    { rel: 'preconnect', href: 'https://images.unsplash.com' },
  ]

  hints.forEach(({ rel, href }) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    document.head.appendChild(link)
  })
}
