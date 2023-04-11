// @ts-nocheck
import React from "react";
import { Box, Grid, Theme, Link, Divider } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Carousel from "react-material-ui-carousel";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const menu = {
  padding: "10px 5px",
  fontSize: "25px",
  cursor: "pointer",
  mb: 2,
};

const menuActive = {
  padding: "10px 5px",
  fontSize: "25px",
  cursor: "pointer",
  mb: 2,
  borderTop: "1px solid",
  borderBottom: "1px solid",
  color: "#FF9905",
};

const sectionTitle = {
  fontSize: "36px",
  fontWeight: "bold",
};

const pdpDetailsContent = {
  fontSize: "25px",
  color: "#3A3A3A",
  table: {
    mt: 3,
  },
  td: {
    padding: "20px 0",
    width: "auto",
    border: "0px solid",
    "&:nth-child(2)": {
      fontWeight: "bold",
    },
  },
};

const pdpDetailsFeatureContent = {
  fontSize: "20px", 
  border:"0px solid #000",
  '& ul':{
    margin:0,
    padding:'20px',
  },
  '& li':{
    padding:"10px 0",
  }
};

function PdpDetail({ pdpDetails, productFeature }) {
  const [isPdetail, setIsPdetail] = React.useState(true);
  const [isFeature, setIsFeature] = React.useState(false);
  const handleClick = (val) => {
    if (val === "showPdetails") {
      setIsPdetail(true);
      setIsFeature(false);
    } else if (val === "showFeatures") {
      setIsPdetail(false);
      setIsFeature(true);
    }
  };
  return (
    <Grid container xs={12} className={roboto.className}>
      <Box sx={{ background: "#F1ECE1", width: "100%", m: 4, border:'0px solid #000', minHeight:'560px' }}>
        <Box sx={{ display: "flex", flexDirection: "row", p: 4 }}>
          <Box sx={{ width: "40%" }}>
            <Box
              sx={[menu, isPdetail ? menuActive : null]}
              onClick={() => handleClick("showPdetails")}
            >
              Product Details
            </Box>
            <Box
              sx={[menu, isFeature ? menuActive : null]}
              onClick={() => handleClick("showFeatures")}
            >
              Features
            </Box>
          </Box>
          {isPdetail && (
            <Box sx={{ ml: 20, border: "0px solid", width: "100%" }}>
              <Box sx={sectionTitle}>Product Details</Box>
              <Box sx={pdpDetailsContent}>
                <table width="100%">
                  <tbody>
                    {pdpDetails.map((details, index) => (
                      <tr key={index}>
                        <td>{details[0]}</td>
                        <td>{details[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}

          {isFeature && (
            <Box sx={{ ml: 20, border: "0px solid", width: "100%" }}>
              <Box sx={sectionTitle}>Features</Box>
              <Box sx={[pdpDetailsContent, pdpDetailsFeatureContent]}>
                <ul>
                  {productFeature.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  );
}

export default PdpDetail;
