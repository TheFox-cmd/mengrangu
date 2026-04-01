import resumePdf from '../assets/Resume 2026_new.pdf'
import BackButton from '../components/BackButton'
import usePageTitle from '../hooks/usePageTitle'
import './AboutPage.css'

export default function AboutPage() {
    usePageTitle('About')

    return (
        <div className="about-container">
            <BackButton />
            <div className="about-image">
                <img src="/about.png" alt="Mengran" />
            </div>
            <div className="about-text">
                <h1 className="about-title">About Mengran</h1>
                <p className="about-bio">
                    Mengran is a conceptual artist with 4 years of
                    experience in the gaming industry, focused on character design and
                    environmental illustration. I'm drawn to the small things that make
                    a world feel alive: the shape of a silhouette, the mood of a quiet
                    room, the feeling that a place has been lived in long before the
                    player arrived. I love creating art that carries atmosphere,
                    emotion, and a sense of story without needing to say too much.
                    If you'd like to collaborate or just say hello, feel free to reach out —
                    I'm always open to new adventures!
                </p>
                <a href={resumePdf} download className="about-download-cv">
                    Download CV
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
