import { useCallback, useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import ProjectsSection from '../components/ProjectsSection'
import usePageTitle from '../hooks/usePageTitle'
import './HomePage.css'

export default function HomePage() {
    usePageTitle()
    const containerRef = useRef<HTMLDivElement>(null)
    const [isLocked, setIsLocked] = useState(false)
    const currentSection = useRef(0)

    const scrollToSection = useCallback((index: number) => {
        const container = containerRef.current
        if (!container) return
        const sections = container.querySelectorAll<HTMLElement>('.snap-section')
        if (!sections[index]) return

        setIsLocked(true)
        currentSection.current = index
        sections[index].scrollIntoView({ behavior: 'smooth' })

        setTimeout(() => setIsLocked(false), 900)
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let lastTime = 0
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            if (isLocked) return

            const now = Date.now()
            if (now - lastTime < 900) return
            lastTime = now

            const direction = e.deltaY > 0 ? 1 : -1
            const next = Math.max(0, Math.min(1, currentSection.current + direction))
            if (next !== currentSection.current) {
                scrollToSection(next)
            }
        }

        container.addEventListener('wheel', handleWheel, { passive: false })
        return () => container.removeEventListener('wheel', handleWheel)
    }, [isLocked, scrollToSection])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let touchStartY = 0
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY
        }
        const handleTouchEnd = (e: TouchEvent) => {
            if (isLocked) return
            const deltaY = touchStartY - e.changedTouches[0].clientY
            if (Math.abs(deltaY) < 50) return

            const direction = deltaY > 0 ? 1 : -1
            const next = Math.max(0, Math.min(1, currentSection.current + direction))
            if (next !== currentSection.current) {
                scrollToSection(next)
            }
        }

        container.addEventListener('touchstart', handleTouchStart, { passive: true })
        container.addEventListener('touchend', handleTouchEnd, { passive: true })
        return () => {
            container.removeEventListener('touchstart', handleTouchStart)
            container.removeEventListener('touchend', handleTouchEnd)
        }
    }, [isLocked, scrollToSection])

    return (
        <div className="home-scroll-container" ref={containerRef}>
            <div className="snap-section">
                <HeroSection />
            </div>
            <div className="snap-section">
                <ProjectsSection />
                <Footer />
            </div>
        </div>
    )
}
