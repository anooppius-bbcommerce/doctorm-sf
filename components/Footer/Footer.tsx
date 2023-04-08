import {
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Roboto } from "@next/font/google";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FooterItems from "./FooterItems";
import doctorMlogo from "../../images/DoctorM.svg";
import tabby from "../../images/Tabby_logo.webp";
import cards from "../../images/flag-card-sprites.webp";

const footerLists = [
  {
    heading: "Top Categories",
    items: [
      "Clear Contact Lenses",
      "Men's Sunglasses",
      "Women’s Sunglasses",
      "Color Contact Lenses",
      "Men’s Eyeglasses",
    ],
  },
  {
    heading: "Top Brands",
    items: ["Ray-Ban", "POLO RALPH LAUREN", "CARRERA", "EMPORIO ARMANI"],
  },
  {
    heading: "About Doctor M",
    items: ["Our Story", "Find Us", "Terms and Conditions", "Privacy Policy"],
  },
  {
    heading: "Customer Service",
    items: [
      "Help and FAQs",
      "Contact Us",
      "Shipping and Services",
      "Returns and Refunds",
    ],
  },
];

export function Footer({}) {
  return (
    <Grid sx={{ border: "0px solid #f6f6f6", color: "#343434" }}>
      <Grid container xs={12}>
        <Divider
          sx={{ width: "100%", mt: 4, color: "#343434", background: "#ddd" }}
        />
        <Box sx={{ border: "0px solid", width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", m: 4 }}>
            <Box sx={{ ml: -2 }}>
              <Image src={doctorMlogo} alt="text" />
            </Box>
            {footerLists.map((item, index) => (
              <FooterItems key={index} data={item} />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", m: 4 }}>
            <Box sx={{ width: "25%" }}>
              <Box>
                <Box>
                  <Typography sx={{ fontSize: "26px", fontWeight: "bold" }}>
                    Contact Us
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box>
                    <LocalPhoneOutlinedIcon />
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      sx={{
                        color: "#F7961C",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      800 8851 021
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <EmailOutlinedIcon />
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      sx={{
                        color: "#F7961C",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      contact@doctor-m.com
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider orientation="vertical" sx={{ height: "200px" }} flexItem />
            <Box sx={{ width: "25%", border: "0px solid" }}>
              <Box sx={{ width: "100%", border: "0px solid" }}>
                <Box>
                  <Typography sx={{ fontSize: "26px", fontWeight: "bold" }}>
                    Newsletter
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  Stay up to date with the latest Doctor M collections, events,
                  campaigns and exclusive benefits.
                </Box>
                <Box sx={{ width: "100%", mt: 2 }}>
                  <TextField
                    type="text"
                    id=""
                    label="E-mail Address"
                    sx={{ width: "100%", borderRadius: "50%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ArrowForwardIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", m: 4 }}>
            <Box>
              <Box>
                <Typography sx={{ fontSize: "26px", fontWeight: "bold" }}>
                  Follow Us
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <FacebookIcon />
                <InstagramIcon />
                <TwitterIcon />
              </Box>
            </Box>
            <Box sx={{ border: "0px solid ", width: "30%" }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "26px", fontWeight: "bold" }}>
                  We Accept
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Box sx={{background:`url(${cards.src}) 244px -183px`,width:'30px',height:'34px', border:'0px solid'}}>
                </Box>
                <Box sx={{background:`url(${cards.src}) 257px -21px`,width:'51px',height:'34px', border:'0px solid'}}>
                </Box>
                <Box sx={{background:`url(${cards.src}) 137px -21px`,width:'48px',height:'34px', border:'0px solid'}}>
                </Box>
                <Box sx={{background:`url(${cards.src}) 141px -183px`,width:'71px',height:'31px', border:'0px solid'}}>
                </Box>
               
                <Image
                  src={tabby}
                  style={{ width: "75px", height: "25px" }}
                  alt="text"
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              background: "#3A3A3A",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
            }}
          >
            <Box sx={{ color: "#fff", fontSize: "20px" }}>
              © Copyright 2023 Doctor M, All Rights Reserved.
            </Box>
            <Box>
              <Button
                sx={{ background: "#fff", "&:hover": { background: "#ddd" } }}
              >
                English
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Footer;
