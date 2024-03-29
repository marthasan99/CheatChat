import { Route, Routes } from "react-router-dom";
import Blog from "./page/Blog";
import DashBoard from "./page/DashBoard";
import Home from "./page/Home";
import Login from "./page/Login";
import Registration from "./page/Registration";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          index
          element={<Login />}
        ></Route>
        <Route
          path="/home"
          element={<Home />}
        ></Route>
        <Route
          path="/registration"
          element={<Registration />}
        ></Route>
        <Route
          path="/dashboard"
          element={<DashBoard />}
        ></Route>
        <Route
          path="/blog/:id"
          element={<Blog />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
