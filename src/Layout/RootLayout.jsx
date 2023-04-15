import React from "react";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "../Components/Navbar";
import MobileNav from "../Components/MobileNav";
import Footer from "../Components/Footer";

const RootLayout = () => {
  const isSmallerThanMd = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <div>
      {isSmallerThanMd ? <MobileNav /> : <Navbar />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
