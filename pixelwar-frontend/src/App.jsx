import { Routes, Route, Link } from "react-router-dom";
import HomePage from "@pages/HomePage";
import BoardPage from "@pages/BoardPage";
import CreatePage from "@pages/CreatePage";
import { Outlet } from "react-router-dom";
import { socket } from "./socket";
import { useEffect } from "react";
import FindBoardPage from "./pages/FindBoardPage";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      return () => {
        socket.off("connect");
      };
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/find_board" element={<FindBoardPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/create_board" element={<CreatePage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <h1>Navigation</h1>
      <nav>
        <Link to="/">Index</Link>&nbsp;&nbsp;
        <Link to="/find_board">Find a board</Link>&nbsp;&nbsp;
        <Link to="/create_board">Create Board</Link>&nbsp;&nbsp;
      </nav>
      <Outlet />
    </>
  );
}

export default App;
