// @ts-nocheck
import React from "react";
import { Badge, Box, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import { useRegions } from "@/components/RegionsProvider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Roboto } from "@next/font/google";
import useScrollDirection from "../../lib/useScrollDirection";
import { CheckoutLineDetailsFragment } from "@/saleor/api";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import { API_URI } from "@/lib/const";
import { invariant } from "@apollo/client/utilities/globals";
import Link from "next/link";
import Search from "../Search/Search";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sxStyle = {
  backgroundColor: "#3A3A3A",
  width: "100%",
  spacing: "0",
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  color: "#F7961C",
  height: "48px",
  fontFamily: "Acumin Pro",
};
const spanStyle = {
  color: "#FFFFFF",
};
const mainHeader = {
  backgroundColor: "#F7961C",
  width: "100%",
  direction: "column",
  color: "#F7961C",
  height: "70px",
  fontFamily: "Acumin Pro",
};

const searchWrapper = {
  backgroundColor: "#F7961C",
  width: "100%",
  direction: "column",
  color: "#F7961C",
  fontFamily: "Acumin Pro",
};

const iconColor = {
  color: "#3A3A3A",
  fontSize: "26px",
};
const iconSize = {
  fontSize: "40px",
  color: "#FFF",
};

const HeaderItemWrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "0px solid",
  width: "14%",
};

const HeaderLogo = {
  width: "30%",
};

const HeaderItemInnerWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .MuiBadge-badge": {
    background: "#343434",
  },
};

const HeaderitemWrapperWidth = {
  width: "20%",
};

const clsHeader = {
  position: "sticky",
  top: "0px",
  transitionProperty: "all",
  transitionTimingGunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionFuration: "500ms",
};

const deviderSpace = {
  mr: 2,
  ml: 2,
};

export function Navbar(props) {
  const { currentLocale, currentChannel } = useRegions();
  const rootCategories = props.rootCategories;
  const uspContent = props.uspContent;
  const scrollDirection = useScrollDirection();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [searchActive, setSearchActive] = React.useState<null | HTMLElement>(
    false
  );

  const saleorApiUrl = API_URI;
  invariant(saleorApiUrl, "Missing NEXT_PUBLIC_API_URI");
  const domain = new URL(saleorApiUrl).hostname;

  const categories = rootCategories.map((category) => {
    return category.name;
  });

  const { checkout } = useCheckout();

  const checkoutParams = checkout
    ? new URLSearchParams({
        checkout: checkout.id,
        locale: currentLocale,
        channel: currentChannel.slug,
        saleorApiUrl,
        // @todo remove `domain`
        // https://github.com/saleor/saleor-dashboard/issues/2387
        // https://github.com/saleor/saleor-app-sdk/issues/87
        domain,
      })
    : new URLSearchParams();

  const pages = categories;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleSearchClose = () => {
    setSearchActive(false);
  };

  const counter =
    checkout?.lines?.reduce(
      (amount: number, line?: CheckoutLineDetailsFragment | null) =>
        line ? amount + line.quantity : amount,
      0
    ) || 0;

  return (
    //sx={{clsHeader:`${ scrollDirection === "down" ? "hide" : "show"}`}}
    <AppBar position="static" sx={{ background: "#f6f6f6" }}>
      <Grid>
        {/*
          <div dangerouslySetInnerHTML={{ __html: props.uspContent }}></div>
           */}

        <Grid item xs={12} sx={sxStyle}>
          <Box className={roboto.className}>
            {uspContent &&
              uspContent[0].content &&
              uspContent[0].content.map((item, index) =>
                item.children[0].marks.length > 0 &&
                item.children[0].marks[0] !== "strong" ? (
                  <Box component="span" key={index}>
                    {item.children[0].text}{" "}
                  </Box>
                ) : item.children[0].marks[0] === "strong" ? (
                  <Box
                    component="span"
                    key={index}
                    sx={[spanStyle, deviderSpace]}
                  >
                    {"  "}
                    {item.children[0].text}
                    {"  "}
                  </Box>
                ) : (
                  <Box component="span" key={index} sx={spanStyle}>
                    {item.children[0].text}{" "}
                  </Box>
                )
              )}
          </Box>
        </Grid>
        <Grid item xs={12} sx={mainHeader}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              color: "#3A3A3A",
              pl: 6,
              pr: 6,
            }}
            className={roboto.className}
          >
            <Box sx={HeaderItemWrapper}>
              <Box>
                <Box sx={HeaderItemInnerWrapper}>
                  <LocationOnOutlinedIcon sx={iconColor} />
                </Box>
                <Box>Find a Store</Box>
              </Box>
              <Box sx={{ cursor: "pointer" }}>
                {!searchActive && (
                  <>
                    <Box sx={HeaderItemInnerWrapper}>
                      <SearchOutlinedIcon
                        sx={iconColor}
                        onClick={handleSearchClick}
                      />
                    </Box>
                    <Box onClick={handleSearchClick}>Search</Box>
                  </>
                )}

                {searchActive && (
                  <Box sx={HeaderItemInnerWrapper}>
                    <CloseIcon
                      sx={{ color: "#3A3A3A", fontSize: "26px", width: "53px" }}
                      onClick={handleSearchClose}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <Box sx={HeaderItemWrapper}>
              <Link href={`/`}>
                <img
                  style={{ width: "100%" }}
                  src="https://img-cdn.magrabi.com/medias/sys_master/root/hb0/h3f/9069140738078/logo/logo.png"
                />
              </Link>
            </Box>
            <Box sx={[HeaderItemWrapper, HeaderitemWrapperWidth]}>
              <Box sx={HeaderItemInnerWrapper}>
                <Box>
                  <AccountCircleRoundedIcon sx={iconSize} />
                </Box>
                <Box sx={{ fontWeight: "bold",pl:1 }}>drm</Box>
              </Box>
              <Box>
                <Box sx={HeaderItemInnerWrapper}>
                  <FavoriteBorderOutlinedIcon sx={iconColor} />
                </Box>
                <Box>Favorites</Box>
              </Box>

              <Box>
                <Box sx={HeaderItemInnerWrapper}>
                  <Badge
                    badgeContent={counter}
                    sx={{ color: "#343434" }}
                    color="secondary"
                  >
                    <Link
                      href={`/en-AE/cart`}
                      style={{
                        textDecoration: "none",
                        textDecorationColor: "#343434",
                        color: "#343434",
                      }}
                    >
                      <ShoppingBagOutlinedIcon sx={iconColor} />
                    </Link>
                  </Badge>
                </Box>
                <Box>
                  <Link
                    href={`/en-AE/cart`}
                    style={{
                      textDecoration: "none",
                      textDecorationColor: "#343434",
                      color: "#343434",
                    }}
                  >
                    Basket
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 1.5,
                    color: "black",
                    fontWeight: "bold",
                    display: "block",
                    ml: 8,
                    fontSize: "18px",
                    textTransform:"capitalize"
                  }}
                  className={roboto.className}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Grid>

        {searchActive && (
          <Grid item xs={12} sx={searchWrapper}>
            <Box>
              <Search
                handleSearchClose={handleSearchClose}
                locale={currentLocale}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </AppBar>
  );
}

export default Navbar;
