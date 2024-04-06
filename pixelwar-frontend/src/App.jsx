import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import HomePage from "@pages/HomePage";
import BoardPage from "@pages/BoardPage";
import CreatePage from "@pages/CreatePage";
import FindBoardPage from "./pages/FindBoardPage";
import LoginPage from "@pages/LoginPage";
import SignupPage from "@pages/SignupPage";
import NavigationBar from "@components/nav/NavigationBar";
import CreateBoardPage from "@pages/admin/CreateBoardPage";
import EditBoardPage from "@pages/admin/EditBoardPage";
import PixelBoardListPage from "@pages/admin/PixelBoardsPage";
import Footer from "@components/nav/Footer";
import { RoleProvider, RoleContext } from "@contexts/RoleContext";
import { ThemeProvider } from "@contexts/ThemeContext";
import { useContext } from "react";
import NotFound from "@pages/NotFound";
import Unauthorized from "@pages/Unauthorized";
import UserProfilePage from "@pages/UserProfilePage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/boards' element={<FindBoardPage />} />
        <Route path='/board/:id' element={<BoardPage />} />
        <Route
          path='/board'
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <CreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/board'
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/board/edit/:boardId'
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PixelBoardListPage />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <NavigationBar />
        <Outlet />
        <Footer />
      </RoleProvider>
    </ThemeProvider>
  );
}

function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();
  const { role, isLoggedIn } = useContext(RoleContext);
  const isAuthorized = allowedRoles.includes(role);

  if (!isLoggedIn()) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  } else if (!isAuthorized) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
}

export default App;
