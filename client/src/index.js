import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './components/Home';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import CreatePostPage from './components/CreatePost';
import ProtectedRoute from './ProtectedRoute';
import Container from './Container';

const App = () => {
    return (
        <BrowserRouter>
            <div className='container'>
                <Container>
                    <Navbar />
                    <Routes> 
                        <Route path='/' element={<HomePage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='create_post' element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
                    </Routes> 
                </Container>
            </div>
        </BrowserRouter>
    )
}

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <App />
);