import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Explore from "./Pages/Explore";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgoPassword";
import { MainProvider } from "./Context/MainContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TimeProvider } from "./Context/TimeContext";
import { CartProvider } from "./Context/CartContext";
import ProductDetails from "./Pages/ProductDetails";
import PrivateRoute from "./Components/PrivateRoute";
import Cart from "./Pages/Cart";
import ComingSoon from "./Pages/ComingSoon";
import Contact from "./Pages/Contact";

function App() {
  const theme = createTheme();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Explore />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/cart" element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/coming-soon" element={<ComingSoon />} />
      </>
    )
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <MainProvider>
          <TimeProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </TimeProvider>
        </MainProvider>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
