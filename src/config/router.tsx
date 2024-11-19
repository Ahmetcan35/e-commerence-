import { Routes, Route } from "react-router-dom";
import Homepage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AuthError from "../pages/AuthError";
import ProductDetail from "../pages/ProductDetail";

function router() {
    const { currentUser } = useSelector((state: RootState) => state.app);
    return (
        <div>
            <Routes>
                <Route path="/" element={currentUser ? <Homepage /> : <AuthError />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path='/product-detail/:productId' element={<ProductDetail />} />
            </Routes>
        </div>
    )
}

export default router