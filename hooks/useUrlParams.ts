import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useUrlParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }, [router, searchParams])

  const getParam = useCallback((key: string) => {
    return searchParams.get(key) || ''
  }, [searchParams])

  return { setParam, getParam }
}