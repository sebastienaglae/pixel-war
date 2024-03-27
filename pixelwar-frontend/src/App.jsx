import { Routes, Route, Link } from "react-router-dom";
import HomePage from "@pages/HomePage";
import TestPage from "@pages/TestPage";
import { Outlet } from "react-router-dom";
import { socket } from "./socket";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        console.log("msg from server", data);
      });

      return () => {
        socket.off("connect");
      };
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
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
        <Link to="/test">Test</Link>&nbsp;&nbsp;
      </nav>
      <Outlet />
    </>
  );
}

export default App;
