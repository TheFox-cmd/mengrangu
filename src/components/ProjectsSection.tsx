import { publicProjects } from '../data/projects'
import ProjectCard from './ProjectCard'
import './ProjectsSection.css'

export default function ProjectsSection() {
    return (
        <section className="projects-section">
            <div className="projects-header">
                <h2>Selected Works</h2>
            </div>
            <div className="projects-list">
                {publicProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </section>
    )
}
