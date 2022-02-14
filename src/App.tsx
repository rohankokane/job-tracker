import NavBar from 'components/navbar'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'components/shared/ErrorFallback'
import JobBoard from 'screens/JobBoard'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import BoardProvider from 'contexts/BoardContext'

function App(): JSX.Element {
  return (
    <main>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BoardProvider>
          <NavBar />
          <Router>
            <AppRoutes />
          </Router>
        </BoardProvider>
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
