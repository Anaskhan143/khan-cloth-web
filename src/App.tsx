import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import { CollectionPage } from './pages/CollectionPage'
import { FabricDetailPage } from './pages/FabricDetailPage'
import { HomePage } from './pages/HomePage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminFabricsPage } from './pages/admin/AdminFabricsPage'
import { AdminFaqsPage } from './pages/admin/AdminFaqsPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminMetersPage } from './pages/admin/AdminMetersPage'
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage'
import { AdminGuard, AdminShell } from './pages/admin/AdminShell'
import './index.css'

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/collection/:fabricId" element={<FabricDetailPage />} />
            <Route path="/collections" element={<Navigate to="/collection" replace />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminGuard />}>
              <Route element={<AdminShell />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="fabrics" element={<AdminFabricsPage />} />
                <Route path="faqs" element={<AdminFaqsPage />} />
                <Route path="reviews" element={<AdminReviewsPage />} />
                <Route path="meters" element={<AdminMetersPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  )
}
