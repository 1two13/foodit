import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import 'tailwindcss/tailwind.css';

import Chat from './pages/ChatPage';
import ChatList from './pages/ChatListPage';
import Home from './pages/HomePage';
import Register from './pages/RegisterPage';
import SignIn from './pages/SignInPage';
import SplashScreen from './pages/SplashScreenPage';
import Walkthrough from './pages/WalkthroughPage';
import RegisterComplete from './pages/RegisterCompletePage';
import WritingPage from './pages/WritingPage';
import PostsPage from './pages/PostsPage';
import PermissionPage from './pages/PermissionPage';
import RegisterLocationPage from './pages/RegisterLocationPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import MyPage from './pages/MyPage';
import EditProfilePage from './pages/EditProfilePage';
import FavoriteCategories from './components/home/FavoriteCategories';

function App() {
  return (
    <div className="App">
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-location" element={<RegisterLocationPage />} />
          <Route path="/register-complete" element={<RegisterComplete />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/permission" element={<PermissionPage />} />
          <Route path="/splashscreen" element={<SplashScreen />} />
          <Route path="/walkthrough" element={<Walkthrough />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/favorite-categories" element={<FavoriteCategories />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/editProfile" element={<EditProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
