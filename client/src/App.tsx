import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import HomeScreen from './components/home/HomeScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import {AuthContext, AuthProvider} from './components/auth/AuthContext';
import { AcrticleScreen } from './components/blog/article/ArticleScreen';
import { ErrorProvider } from './components/common/ErrorContext';
import { UserScreen } from './components/user/UserScreen';
import { AdminArticlesScreen } from './components/admin/article/AdminArticlesScreen';
import { ArticleEditionScreen } from './components/admin/article/ArticleEditionScreen';
import { AdminUsersScreen } from './components/admin/users/AdminUsersScreen';
import { AdminScreen } from './components/admin/AdminScreen';
import { UserEditScreen } from './components/user/UserEditScreen';
import {ChapterItemList} from "./components/blog/chapter/ChaptersPage";
import ChapterArticles from "./components/blog/article/ArticleByChapterScreen";
import {GroundsIByTypeList, GroundsItemList} from "./components/ground/GroundItemList";
import {PlantItemList} from "./components/plant/PlantAllListScreen";
import {SpeciesItemList} from "./components/plant/species/SpeciesListScreen";
import {PlantScreen} from "./components/plant/PlantScreen";
import {AdminPlantsScreen} from "./components/admin/plant/AdminPlantScreen";
import {AccessoryAllList, AccessoryByCategoryList} from "./components/accessory/AccessoryListScreen";
import {
  PlantListBySpecies,
  PlantsByBegginers,
  PlantsByCollectible,
  PlantsByPosition
} from "./components/plant/PlantsLists";
import ShoppingCart from "./components/cart/ShoppingCart";
import {AccessoryScreen} from "./components/accessory/AccessoryScreen";
import {AdminGroundsScreen} from "./components/admin/ground/AdminGroundScreen";
import {AdminSpeciesScreen} from "./components/admin/species/AdminSpeciesScreen";
import {useContext, useEffect, useState} from "react";
import {Kind, Product} from "./components/cart/apis/product";
import {GroundScreen} from "./components/ground/GroundScreen";
import {AdminAccessoriesScreen} from "./components/admin/accessory/AdminAccessoryScreen";
import {AdminDeliveriesScreen} from "./components/admin/delivery/AdminDeliveryScreen";
import {PaymentScreen} from "./components/cart/PaymentScreen";

function Cart() {
  const [cartKey, setCartKey] = useState('shopping-cart-guest')
  const [userId, setUserId] = useState(0)
  const [showCartSuccessToast, setShowCartSuccessToast] = useState(false);
  const [showCartWarningToast, setShowCartWarningToast] = useState(false);
  const location = useLocation();
  const {getUser, isAuthorized} = useContext(AuthContext);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUserId(userData.userId)
    } else {
      setUserId(0)
    }
    setCartKey(`shopping-cart-${userId}`)
  }, [location]);

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(JSON.parse(localStorage.getItem(cartKey)!) || []));

    setProductsInCart(JSON.parse(localStorage.getItem(cartKey)!) || []);
    console.log(productsInCart);
  }, [cartKey]);

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(productsInCart));
  }, [productsInCart]);

  const addProductToCart = (product: Product) => {
    const alreadyInCart = productsInCart.find(item => item.id === product.id && item.kind === product.kind);
    if (alreadyInCart) {
      const latestCartUpdate = productsInCart.map(item =>
          item.id === product.id && item.kind === product.kind? {
                ...item, count: item.count + 1
              }
              : item
      );
      setProductsInCart(latestCartUpdate);
      setShowCartWarningToast(true);
    } else {
      const newProduct = {
        ...product,
        count: 1,
      }
      setProductsInCart([...productsInCart, newProduct,])
      setShowCartSuccessToast(true);
    }
    setTimeout(() => {
      setShowCartSuccessToast(false);
      setShowCartWarningToast(false);
    }, 3000);
  }

  const onQuantityChange = (productId: number, count: number, kind:Kind) => {
    setProductsInCart((oldState) => {
      const productsIndex = oldState.findIndex(
          (item) =>
              item.id === productId && item.kind === kind
      );
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onProductRemove = (product: Product) => {
    setProductsInCart((oldState) => {
      const productsIndex = oldState.findIndex(
          (item) =>
              item.id === product.id && item.kind === product.kind
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  }

  const clearCart = () => {
    setProductsInCart([]);
  }
  return {
    productsInCart,
    addProductToCart,
    onQuantityChange,
    onProductRemove,
    showCartSuccessToast,
    setShowCartSuccessToast,
    showCartWarningToast,
    setShowCartWarningToast,
    clearCart
  }
}
function App(props: any) {
  const {
    productsInCart,
    addProductToCart,
    onQuantityChange,
    onProductRemove,
    setShowCartWarningToast,
    setShowCartSuccessToast,
    showCartWarningToast,
    showCartSuccessToast,
    clearCart,
  } = Cart()
  return (

          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            {/*Accessory*/}
            <Route path="/accessories" element={<AccessoryAllList />}></Route>
            <Route path="/accessories/category/:category" element={<AccessoryByCategoryList />}></Route>
            <Route path="/accessory/:accessoryId" element={<AccessoryScreen productsInCart={productsInCart}
                                                                            addProductToCart={addProductToCart}
                                                                            setShowCartWarningToast={setShowCartWarningToast}
                                                                            setShowCartSuccessToast={setShowCartSuccessToast}
                                                                            showCartWarningToast={showCartWarningToast}
                                                                            showCartSuccessToast={showCartSuccessToast} />}></Route>
            {/*Plant*/}
            <Route path="/plants/all" element={<PlantItemList/>}></Route>
            <Route path="/plants/:plantId" element={<PlantScreen  productsInCart={productsInCart}
                                                                  addProductToCart={addProductToCart}
                                                                  setShowCartWarningToast={setShowCartWarningToast}
                                                                  setShowCartSuccessToast={setShowCartSuccessToast}
                                                                  showCartWarningToast={showCartWarningToast}
                                                                  showCartSuccessToast={showCartSuccessToast}/>}></Route>
            <Route path="/plants/species/:speciesId" element={<PlantListBySpecies/>}></Route>
            <Route path="/plants/position/:position" element={<PlantsByPosition/>}></Route>
            <Route path="/plants/beginners/:isForBeginners" element={<PlantsByBegginers/>}></Route>
            <Route path="/plants/collectible/:isCollectible" element={<PlantsByCollectible/>}></Route>
            {/*Plant Species*/}
            <Route path="/species" element={<SpeciesItemList/>}></Route>
            {/*Grounds*/}
            <Route path="/grounds" element={<GroundsItemList/>}></Route>
            <Route path="/ground/:groundId" element={<GroundScreen  productsInCart={productsInCart}
                                                                     addProductToCart={addProductToCart}
                                                                     setShowCartWarningToast={setShowCartWarningToast}
                                                                     setShowCartSuccessToast={setShowCartSuccessToast}
                                                                     showCartWarningToast={showCartWarningToast}
                                                                     showCartSuccessToast={showCartSuccessToast}/>}></Route>
            <Route path="/grounds/type/:type" element={<GroundsIByTypeList/>}></Route>
            {/*Blog - Chapters*/}
            <Route path="/blog" element={<ChapterItemList />}></Route>
            {/*Blog - Article*/}
            <Route path="/chapter/:chapterId" element={<ChapterArticles />} />
            <Route path="/article/:articleId" element={<AcrticleScreen/>}></Route>
            {/*Auth*/}
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            {/*Cart*/}
              <Route path="/payment/:cost"
                     element={<PaymentScreen productsInCart={productsInCart} onQuantityChange={onQuantityChange}
                                            onProductRemove={onProductRemove} clearCart={clearCart} />} />
            <Route path="/cart"
                   element={<ShoppingCart productsInCart={productsInCart} onQuantityChange={onQuantityChange}
                                          onProductRemove={onProductRemove} clearCart={clearCart} />} />
            {/*User*/}
            <Route path="/user/:userId?" element={<UserScreen />}></Route>
            <Route path="/user/edit" element={<UserEditScreen />}></Route>
            {/*Admin*/}
            <Route path="/admin/articles" element={<AdminArticlesScreen />}></Route>
            <Route path="/admin/plants" element={<AdminPlantsScreen />}></Route>
            <Route path="/admin/species" element={<AdminSpeciesScreen/>}></Route>
            <Route path="/admin/accessories" element={<AdminAccessoriesScreen/>}></Route>
            <Route path="/admin/edit/:articleId?" element={<ArticleEditionScreen />}></Route>
            <Route path="/admin/users" element={<AdminUsersScreen />}></Route>
            <Route path="/admin/grounds" element={<AdminGroundsScreen />}></Route>
            <Route path="/admin/delivery" element={<AdminDeliveriesScreen />}></Route>

            <Route path="/admin" element={<AdminScreen />}></Route>

          </Routes>

  );
}
export default App;
