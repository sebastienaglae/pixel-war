import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage";
import TestPage from "@pages/TestPage";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import CreateBoardPage from "@pages/admin/CreateBoardPage";
import EditBoardPage from "@pages/admin/EditBoardPage";
import PixelBoardListPage from "@pages/admin/PixelBoardsPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/admin/create-board' element={<CreateBoardPage />} />
        <Route path='/admin/edit-board/:boardId' element={<EditBoardPage />} />
        <Route path='/admin' element={<PixelBoardListPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
