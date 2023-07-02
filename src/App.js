import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

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
import RegisterLocationCompletePage from './pages/RegisterLocationCompletePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginFailure, loginStart, loginSuccess } from './redux/slices/authSlice';
import { getUserInfoAPI } from './redux/api/authApi';

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, user } = useSelector((state) => state.auth);
  const authNavigate = (element) => {
    if (!isLoading && user.id !== '') {
      return element;
    }

    return <Navigate to="/signin" state={{ before: location.state?.before ?? '/' }} />;
  };

  useEffect(() => {
    navigate('/splashscreen');

    (async () => {
      dispatch(loginStart());
      const result = await getUserInfoAPI({ token: user.token });
      if (result?.id) {
        dispatch(loginSuccess(result));
      } else {
        dispatch(loginFailure(result));
      }
    })();
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-location" element={<RegisterLocationPage />} />
            <Route path="/register-location-complete" element={<RegisterLocationCompletePage />} />
            <Route path="/register-complete" element={<RegisterComplete />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/permission" element={<PermissionPage />} />
            <Route path="/splashscreen" element={<SplashScreen />} />
            <Route path="/walkthrough" element={<Walkthrough />} />
            <Route path="/chat" element={authNavigate(<Chat />)} />
            <Route path="/chatlist" element={authNavigate(<ChatList />)} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/favorite-categories" element={<FavoriteCategories />} />
            <Route path="/writing" element={authNavigate(<WritingPage />)} />
            <Route path="/posts/:postId" element={<PostsPage />} />
            <Route path="/myPage" element={authNavigate(<MyPage />)} />
            <Route path="/editProfile" element={authNavigate(<EditProfilePage />)} />
          </Routes>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
