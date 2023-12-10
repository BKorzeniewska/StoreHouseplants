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
import { PasswordRecoveryScreen } from './components/auth/PasswordRecoveryScreen';
import { PasswordRecoveryNextScreen } from './components/auth/PasswordRecoveryNextScreen';
import { UserEditScreen } from './components/user/UserEditScreen';
import { AccessoryEditionScreen} from "./components/accessory/AccessoryScreen";
import {ChapterItemList} from "./components/blog/chapter/ChaptersPage";
import ChapterArticles from "./components/blog/article/ArticleByChapterScreen";


function App() {
  return (
    <AuthProvider>
      <ErrorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            {/*Accessory*/}
            <Route path="/accessory/:accessoryId" element={<AccessoryEditionScreen />}></Route>
            {/*Plant*/}
            {/*Plant Species*/}
            {/*Grounds*/}
            {/*Blog - Chapters*/}
            <Route path="/blog" element={<ChapterItemList />}></Route>
            {/*Blog - Article*/}
            <Route path="/chapter/:chapterId" element={<ChapterArticles />} />
            <Route path="/article/:articleId" element={<AcrticleScreen />}></Route>
            {/*Auth*/}
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/password-recovery" element={<PasswordRecoveryScreen />}></Route>
            <Route path="/password-recovery-next" element={<PasswordRecoveryNextScreen />}></Route>
            {/*User*/}
            <Route path="/user/:userId?" element={<UserScreen />}></Route>
            <Route path="/user/edit" element={<UserEditScreen />}></Route>
            {/*Admin*/}
            <Route path="/admin/articles" element={<AdminArticlesScreen />}></Route>
            <Route path="/admin/edit/:articleId?" element={<ArticleEditionScreen />}></Route>
            <Route path="/admin/users" element={<AdminUsersScreen />}></Route>
            <Route path="/admin" element={<AdminScreen />}></Route>
          </Routes>
        </BrowserRouter>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
