import React from "react";
import Grid from "@mui/material/Grid";
import SideBar from "./SideBar";
import Cards from "./Cards";
import ReactAutoSlider from "./ReactAutoSlider";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProductsSection = () => {
  const isSmallerThanMd = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );
  return (
    <div className="w-11/12 mx-auto mt-8">
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          style={{ display: isSmallerThanMd ? "none" : "block" }}
        >
          <SideBar />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReactAutoSlider />
          <Cards />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsSection;
