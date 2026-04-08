import logoImg from '../assets/logo.png'
import resumePdf from '../assets/Resume_Mengran_2026.pdf'
import BackButton from '../components/BackButton'
import usePageTitle from '../hooks/usePageTitle'
import './AboutPage.css'

export default function AboutPage() {
    usePageTitle('About')

    return (
        <div className="about-container">
            <BackButton />
            <div className="about-header-title">
                <div className="about-header-text">
                    <img src={logoImg} alt="" className="about-header-logo" />
                    <span className="about-header-lg">Art</span>
                    <span className="about-header-sm">of</span>
                    <span className="about-header-lg">Mengran</span>
                </div>
            </div>
            <div className="about-image">
                <img src="/about.png" alt="Mengran" />
            </div>
            <div className="about-text">
                <h1 className="about-title">About Mengran</h1>
                <p className="about-bio">
                    Mengran is a conceptual artist with 4 years of
                    experience in the gaming industry, focused on character design and
                    environmental illustration. She is drawn to the small things that make
                    a world feel alive: the shape of a silhouette, the mood of a quiet
                    room, the feeling that a place has been lived in long before the
                    player arrived. She loves creating art that carries atmosphere,
                    emotion, and a sense of story without needing to say too much.
                    If you'd like to collaborate or just say hello, feel free to reach out —
                    she's always open to new adventures!
                </p>
                <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="about-download-cv">
                    View CV
                </a>
                <div className="about-links">
                    <a href="https://www.instagram.com/tastybunny2019/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.linkedin.com/in/mengran-gu-b81362b4/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://www.artstation.com/mengrangu" target="_blank" rel="noopener noreferrer">ArtStation</a>
                </div>
            </div>
        </div>
    )
}
