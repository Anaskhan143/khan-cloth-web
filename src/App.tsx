import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { CollectionPage } from './pages/CollectionPage'
import { FabricDetailPage } from './pages/FabricDetailPage'
import { HomePage } from './pages/HomePage'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/collection/:fabricId" element={<FabricDetailPage />} />
        <Route path="/collections" element={<Navigate to="/collection" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
