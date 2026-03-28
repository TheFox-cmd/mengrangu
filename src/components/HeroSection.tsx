import './HeroSection.css'

interface HeroSectionProps {
    showScrollIndicator?: boolean
}

export default function HeroSection({ showScrollIndicator = true }: HeroSectionProps) {
    return (
        <section className="hero-section">
            <div className="hero-overlay" />
            <div className="hero-content">
                <h1 className="hero-title">mengrangu</h1>
                <p className="hero-subtitle">Concept Art &amp; Illustration</p>
            </div>
            {showScrollIndicator && (
                <div className="scroll-indicator">
                    <span>scroll</span>
                    <div className="scroll-line" />
                </div>
            )}
        </section>
    )
}
