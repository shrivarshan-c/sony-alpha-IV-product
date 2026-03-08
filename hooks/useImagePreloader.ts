import { useState, useEffect } from 'react'

export const useImagePreloader = (framePrefix: string, start: number, end: number) => {
  const [progress, setProgress] = useState(0)
  const [frames, setFrames] = useState<HTMLImageElement[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let loadedCount = 0
    const totalFrames = end - start + 1
    const loadedFrames: HTMLImageElement[] = new Array(totalFrames)

    const loadImages = async () => {
      const promises = []
      for (let i = start; i <= end; i++) {
        promises.push(new Promise<void>((resolve) => {
          const img = new Image()
          const p = i.toString().padStart(3, '0')
          img.src = `${framePrefix}${p}.jpg`
          img.onload = () => {
            loadedCount++
            setProgress(Math.round((loadedCount / totalFrames) * 100))
            loadedFrames[i - start] = img
            resolve()
          }
          img.onerror = () => {
            loadedCount++
            setProgress(Math.round((loadedCount / totalFrames) * 100))
            resolve()
          }
        }))
      }
      await Promise.all(promises)
      setFrames(loadedFrames)
      setIsLoaded(true)
    }
    loadImages()
  }, [framePrefix, start, end])

  return { progress, frames, isLoaded }
}
