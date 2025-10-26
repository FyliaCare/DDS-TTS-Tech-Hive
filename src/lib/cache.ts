// API Response caching utility
type CacheEntry<T> = {
  data: T
  timestamp: number
}

class APICache {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private defaultTTL: number = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + (ttl || this.defaultTTL)
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() > entry.timestamp) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }
}

export const apiCache = new APICache()

// Optimized fetch with caching
export async function cachedFetch<T>(
  url: string,
  options?: RequestInit,
  cacheTTL?: number
): Promise<T> {
  const cacheKey = `${url}-${JSON.stringify(options)}`
  
  // Check cache first
  const cached = apiCache.get<T>(cacheKey)
  if (cached) {
    return cached
  }

  // Fetch from API
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  const data = await response.json()
  
  // Store in cache
  apiCache.set(cacheKey, data, cacheTTL)
  
  return data
}

// Batch requests to reduce API calls
export class RequestBatcher {
  private queue: Map<string, Promise<any>> = new Map()
  private delay: number = 50

  async batch<T>(key: string, fn: () => Promise<T>): Promise<T> {
    if (this.queue.has(key)) {
      return this.queue.get(key)
    }

    const promise = new Promise<T>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await fn()
          resolve(result)
        } catch (error) {
          reject(error)
        } finally {
          this.queue.delete(key)
        }
      }, this.delay)
    })

    this.queue.set(key, promise)
    return promise
  }
}

export const requestBatcher = new RequestBatcher()
