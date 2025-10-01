import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router";
import CampusChampionsPage from './components/CampusChampionsPage';
import Container from './Container';
import Footer from './components/Footer';
import HomePage from './components/Home';
import LegalPage from './components/Legal';
import LoginPage from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import RouteForm from './components/RouteForm';
import SignUpPage from './components/SignUp';

const App = () => {
    return (
        <BrowserRouter>
            <div className='min-h-screen bg-gray-50 flex flex-col justify-between pt-10'>
                <Container>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/create_post' element={<ProtectedRoute><CampusChampionsPage /></ProtectedRoute>} />
                        <Route path='/route' element={<ProtectedRoute><RouteForm /></ProtectedRoute>} />
                        <Route path='/legal' element={<LegalPage />} />
                    </Routes>
                    <Footer />
                </Container>
            </div>
        </BrowserRouter>
    )
}

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <App />
);