import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from './components/home/HomeScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { AuthProvider } from './components/auth/AuthContext';
import { AcrticleScreen } from './components/article/ArticleScreen';
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
import {ChapterItemList} from "./components/blog/chapter/ChapterItem";


function App() {
  return (
    <AuthProvider>
      <ErrorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/accessory/:accessoryId" element={<AccessoryEditionScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/article/:articleId" element={<AcrticleScreen />}></Route>
            <Route path="/user/:userId?" element={<UserScreen />}></Route>
            <Route path="/user/edit" element={<UserEditScreen />}></Route>
            <Route path="/admin/articles" element={<AdminArticlesScreen />}></Route>
            <Route path="/admin/edit/:articleId?" element={<ArticleEditionScreen />}></Route>
            <Route path="/admin/users" element={<AdminUsersScreen />}></Route>
            <Route path="/admin" element={<AdminScreen />}></Route>
            <Route path="/blog" element={<ChapterItemList />}></Route>
            <Route path="/password-recovery" element={<PasswordRecoveryScreen />}></Route>
            <Route path="/password-recovery-next" element={<PasswordRecoveryNextScreen />}></Route>
          </Routes>
        </BrowserRouter>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
