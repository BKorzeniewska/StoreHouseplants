import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from './components/home/HomeScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { AuthProvider } from './components/auth/AuthContext';
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
    clearCart
  } = props
  return (
    <AuthProvider>
      <ErrorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            {/*Accessory*/}
            <Route path="/accessories" element={<AccessoryAllList />}></Route>
            <Route path="/accessories/category/:category" element={<AccessoryByCategoryList />}></Route>
            <Route path="/accessory/:accessoryId" element={<AccessoryScreen />}></Route>
            {/*Plant*/}
            <Route path="/plants/all" element={<PlantItemList/>}></Route>
            <Route path="/plants/:plantId" element={<PlantScreen/>}></Route>
            <Route path="/plants/species/:speciesId" element={<PlantListBySpecies/>}></Route>
            <Route path="/plants/position/:position" element={<PlantsByPosition/>}></Route>
            <Route path="/plants/beginners/:isForBegginers" element={<PlantsByBegginers/>}></Route>
            <Route path="/plants/collectible/:isCollectible" element={<PlantsByCollectible/>}></Route>
            {/*Plant Species*/}
            <Route path="/species" element={<SpeciesItemList/>}></Route>
            {/*Grounds*/}
            <Route path="/grounds" element={<GroundsItemList/>}></Route>
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
            <Route path="/admin/edit/:articleId?" element={<ArticleEditionScreen />}></Route>
            <Route path="/admin/users" element={<AdminUsersScreen />}></Route>
            <Route path="/admin/grounds" element={<AdminGroundsScreen />}></Route>
            <Route path="/admin" element={<AdminScreen />}></Route>
          </Routes>
        </BrowserRouter>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
