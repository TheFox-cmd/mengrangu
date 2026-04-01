import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links">
                    <a
                        href="https://www.instagram.com/tastybunny2019/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Instagram"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="5" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/mengran-gu-b81362b4/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="LinkedIn"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>

                    <a
                        href="https://www.artstation.com/mengrangu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="ArtStation"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                            <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-2.218a2.4 2.4 0 0 0-.468-1.432L14.837 1.439a2.42 2.42 0 0 0-2.096-1.22h-4.05L20.36 20.544l3.16-5.472c.27-.47.48-.96.48-1.567zM4.96 14.188l5.073-8.79 5.074 8.79H4.96z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    )
}
