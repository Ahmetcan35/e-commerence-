import { useDispatch, useSelector } from 'react-redux'
import { ProductType, UserType } from '../types/Types';
import { useEffect } from 'react';
import { setCurrentUser, setLoading, setProducts } from '../redux/appSlice';
import { RootState } from '../redux/store';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import ProductCard from '../components/ProductCard';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar';
import Category from '../components/Category';

function Homepage() {
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.app);
    const getAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response: ProductType[] = await productService.getAllProducts();
            if (response) {
                dispatch(setProducts(response));
            }
        } catch (error) {
            toast.error("Ürünler getirilirken hata oluştu : " + error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    useEffect(() => {
        const result = localStorage.getItem("currentUser")
        if (result) {
            const currentUser: UserType = JSON.parse(result) as UserType;
            dispatch(setCurrentUser(currentUser));
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Category />

                <Container maxWidth="xl">
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {
                            products && products.map((product: ProductType, index: number) => (
                                <ProductCard key={index} product={product} />
                            ))
                        }
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Homepage