import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const ApiError = lazy(() => import('./pages/ApiError'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projetos/:slug" element={<ProjectDetail />} />
        <Route path="contato" element={<Contact />} />
        <Route path="erro" element={<ApiError />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
