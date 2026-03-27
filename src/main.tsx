import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { projects } from './data/projects'
import './index.css'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import GuestsPage from './pages/GuestsPage'
import ImageDetailPage from './pages/ImageDetailPage'
import ProjectPage from './pages/ProjectPage'

const firstProjectSlug = projects[0]?.slug ?? 'echoes-of-aranya'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Navigate to={`/projects/${firstProjectSlug}`} replace />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="gallery/:slug" element={<GalleryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="guests" element={<GuestsPage />} />
        <Route path="image/:type/:slug/:index" element={<ImageDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
