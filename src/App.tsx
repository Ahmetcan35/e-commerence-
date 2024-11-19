import Router from './config/router'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import { RootState } from './redux/store';
import productService from './services/ProductService';
import { ProductType, UserType } from './types/Types';
import { useEffect } from 'react'
import { setCurrentUser, setProducts } from './redux/appSlice';
import { setBasket } from './redux/basketSlice';
import BasketDetails from './components/BasketDetails';

function App() {
  const { currentUser } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    const products: ProductType[] = await productService.getAllProducts();
    dispatch(setProducts(products));
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  useEffect(() => {
    const currentUserString: string | null = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser))
    }
  }, [])

  useEffect(() => {
    const basketString = localStorage.getItem("basket");
    if (basketString) {
      const basket: ProductType[] = JSON.parse(basketString) as ProductType[]
      dispatch(setBasket(basket));
    }
  }, [])

  return (
    <>
      <Router />
      <ToastContainer autoClose={2500} style={{ fontSize: '13px' }} />
      <BasketDetails />
    </>
  )
}

export default App
