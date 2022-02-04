import NavBar from 'components/navbar'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'components/ErrorFallback'
import JobBoard from 'screens/JobBoard'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <main>
      <NavBar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <AppRoutes />
        </Router>
      </ErrorBoundary>
    </main>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<JobBoard />} />
    </Routes>
  )
}

export default App
