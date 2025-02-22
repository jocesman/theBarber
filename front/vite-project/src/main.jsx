import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthForm from './components/AuthForm.jsx'
import RegForm from './components/RegForm/RegForm.jsx'

createRoot(document.getElementById('root')).render(
    // <App />
    <RegForm />
)
