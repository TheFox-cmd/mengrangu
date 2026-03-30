import { useEffect, useState } from 'react'

function getColumnCount(width: number) {
    if (width <= 600) return 1
    return 2
}

function roundRobin<T>(items: T[], columnCount: number): T[][] {
    return Array.from({ length: columnCount }, (_, col) =>
        items.filter((_, i) => i % columnCount === col),
    )
}

function balancedDistribute<T extends { src: string }>(
    items: T[],
    columnCount: number,
    heightMap: Map<string, number>,
): T[][] {
    const columns: T[][] = Array.from({ length: columnCount }, () => [])
    const heights = new Array(columnCount).fill(0)

    for (const item of items) {
        const ratio = heightMap.get(item.src) ?? 1
        const shortest = heights.indexOf(Math.min(...heights))
        columns[shortest].push(item)
        heights[shortest] += ratio
    }

    return columns
}

export default function useMasonryColumns<T extends { src: string }>(
    items: T[],
): T[][] {
    const [columnCount, setColumnCount] = useState(() => getColumnCount(window.innerWidth))
    const [heightMap, setHeightMap] = useState<Map<string, number>>(new Map())

    useEffect(() => {
        const handleResize = () => setColumnCount(getColumnCount(window.innerWidth))
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        let cancelled = false
        const srcs = items.map((item) => item.src)
        const pending = srcs.filter((src) => !heightMap.has(src))

        if (pending.length === 0) return

        Promise.all(
            pending.map(
                (src) =>
                    new Promise<{ src: string; ratio: number }>((resolve) => {
                        const img = new Image()
                        img.onload = () => resolve({ src, ratio: img.naturalHeight / img.naturalWidth })
                        img.onerror = () => resolve({ src, ratio: 1 })
                        img.src = src
                    }),
            ),
        ).then((results) => {
            if (cancelled) return
            setHeightMap((prev) => {
                const next = new Map(prev)
                for (const { src, ratio } of results) {
                    next.set(src, ratio)
                }
                return next
            })
        })

        return () => {
            cancelled = true
        }
    }, [items, heightMap])

    const allLoaded = items.every((item) => heightMap.has(item.src))

    if (!allLoaded) {
        return roundRobin(items, columnCount)
    }

    return balancedDistribute(items, columnCount, heightMap)
}
