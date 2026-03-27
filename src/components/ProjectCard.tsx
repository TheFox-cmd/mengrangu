import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import './ProjectCard.css'

interface ProjectCardProps {
    project: Project
    index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <Link to={`/projects/${project.slug}`} className="project-card">
            <div className="project-image" style={{ backgroundColor: project.color }}>
                <span className="project-number">0{index + 1}</span>
            </div>
            <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-brief">{project.brief}</p>
            </div>
        </Link>
    )
}
