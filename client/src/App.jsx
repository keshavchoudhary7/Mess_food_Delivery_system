import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import MenuPage from "./pages/FoodMenuPage/MenuPage";
import Register from "./pages/register/Register";
import SignIn from "./pages/signIn/SignIn";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import UserNav from "./components/userNav/UserNav";
import MessLists from "./pages/MessLists/MessLists";

function App() {
  const location = useLocation();
  const hideNav = ["/auth/login", "/auth/register"].includes(location.pathname);

  return (
    <>
      {!hideNav && <UserNav />}
      <Routes>
        {/* Public routes */}
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected Routes (note element={...}) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mess/food-menu" element={<MenuPage />} />
          <Route path="/" element={<MessLists />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
