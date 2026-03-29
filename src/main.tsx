import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import './index.css'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import GuestsPage from './pages/GuestsPage'
import HomePage from './pages/HomePage'
import ImageDetailPage from './pages/ImageDetailPage'
import ProjectPage from './pages/ProjectPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="gallery/:slug" element={<GalleryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="guests" element={<GuestsPage />} />
        <Route path="image/:type/:slug/:index" element={<ImageDetailPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
