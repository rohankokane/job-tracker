import NavBar from 'components/Navbar'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'components/ErrorFallback'
import JobBoard from 'screens/JobBoard'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import BoardProvider from 'contexts/BoardContext'

function App(): JSX.Element {
  return (
    <main>
      <NavBar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <BoardProvider>
            <AppRoutes />
          </BoardProvider>
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
