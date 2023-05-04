// @ts-nocheck
import { Box, Button } from "@mui/material";
import { PortableText } from "@portabletext/react";
import Carousel from "react-material-ui-carousel";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/lib/sanity/client";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function BannerCarousal({ data }) {
  function urlFor(source: string) {
    return imageUrlBuilder(client).image(source);
  }

  const ptComponents = {
    types: {
      image: ({ value, index }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <img
            key={index}
            alt={value.alt || " "}
            loading="lazy"
            src={urlFor(value).fit("max").auto("format").url()}
            width="100%"
          />
        );
      },
    },
  };

  const { contents, title } = data || {};
  return (
    <Box sx={{border:'0px solid #000', }}>
      {contents && (
        <Carousel
          swipe={false}
          animation="slide"
          interval={4000}
          PrevIcon={<ArrowBackIosNewIcon sx={{fontSize:'25px'}}/>}
          NextIcon={<ArrowForwardIosIcon sx={{fontSize:'25px'}}/>}
          navButtonsProps={{
            // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
            style: {
              background: "#fff",
              color: "#F7961C",
              width:'60px',
              height:'60px',
            },
          }}
          navButtonsAlwaysVisible={true}
          activeIndicatorIconButtonProps={{
            style: {
              backgroundColor: "#F7961C",
              color: "#F7961C",
            },
          }}
          indicatorIconButtonProps={{
            style: {
              color: "#b2be9a",
              marginRight: "10px",
            },
          }}
        >
          {contents.map((item, index) => (
            <Box key={item._key}>
              <PortableText value={item.image} components={ptComponents} />{" "}
              <Box
                sx={{
                  mx: 2,
                  mt: 3,
                  pb: 4,
                  display: "flex",
                  justifyContent: "center",
                  border: "0px solid",
                  alignItems: "center",
                  color: "#343434",
                }}
              >
                <Box sx={{ border: "0px solid red", width: "400px", height: "143px" }}>
                  <Box
                    sx={{
                      fontWeight: "bold",
                      fontSize: "30px",
                      mb: "10px",
                      border: "0px solid",
                      textAlign: "center",
                    }}
                  >
                    {item.text}
                  </Box>
                  <Box sx={{ border: "0px solid", textAlign: "center" }}>
                    {item.description}
                  </Box>
                  <Box sx={{ border: "0px solid", textAlign: "center", mt: 3 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff9905",
                        "&:hover": {
                          backgroundColor: "#f59407",
                        },
                      }}
                      style={{
                        backgroundColor: "#ff9905",
                        color: "#3A3A3A",
                        textTransform: "capitalize",
                        borderRadius: "5px",
                        textDecoration: "none",
                      }}
                    >
                      {item?.bannerButton?.text}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
}

export default BannerCarousal;
