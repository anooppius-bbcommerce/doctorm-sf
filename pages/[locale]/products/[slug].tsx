// @ts-nocheck
import { Layout } from "@/components";
import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { ApolloQueryResult } from "@apollo/client";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
  ProductBySlugQuery,
  ProductBySlugQueryVariables,
  ProductBySlugDocument,
  useCheckoutAddProductLineMutation,
  useCreateCheckoutMutation,
} from "@/saleor/api";
import { contextToRegionQuery } from "@/lib/regions";
import { Roboto } from "@next/font/google";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/lib/sanity/client";
import {
  PDP_PAGE_SANITY_QUERY,
  HEADER_PAGE_SANITY_QUERY,
  PDP_PAGE_LAYOUT_SANITY_QUERY,
} from "@/lib/const";
import { Box, Grid, Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import BreadcrumbsDetails from "../../../components/breadcrumbs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PortableText } from "@portabletext/react";
import Carousel from "react-material-ui-carousel";
import DoneIcon from "@mui/icons-material/Done";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import PdpDetail from "@/components/pdpDetail";
import ZoomModal from "@/components/zoomModal";
import Image from "next/image";
import { usePaths } from "@/lib/paths";
import { useRegions } from "@/components/RegionsProvider";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import { useUser } from "@/lib/useUser";
import { getSelectedVariantID } from "@/lib/product";
import { VariantSelector } from "@/components/product/VariantSelector";
import { useParams } from "react-router-dom";
import {
  getSunglassCategoryMesurementDetails,
  getProductDetails,
  getProductFeatures,
} from "@/lib/transformer/productDetailPage";
import TopProducts from "@/components/HomepageBlock/TopProducts";
import TopBrands from "@/components/HomepageBlock/TopBrands";
import TopCategories from "@/components/HomepageBlock/TopCategories";
import BannerImage from "@/components/HomepageBlock/BannerImage";
import ImageWithTextGrid from "@/components/HomepageBlock/ImageWithTextGrid";
import ImageWithText from "@/components/HomepageBlock/ImageWithText";
import BannerCarousal from "@/components/HomepageBlock/BannerCarousal";

export type OptionalQuery = {
  variant?: string;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const space = {
  mr: 2,
  ml: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
};
const tickColor = {
  color: "#F7961C",
};
const title = {
  fontSize: "28px",
};
const dis = {
  fontSize: "20px",
  mt: 2,
  mb: 4,
};
const productDis = {
  width: "80%",
};
const types = {
  p: 2,
  borderRadius: "50px",
  background: "#F1ECE1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "65%",
  pr: 6,
  pl: 6,
};

const CarouselImageComponents = {
  types: {
    image: ({ value, index }) => {
      return <Image src={value} alt="dd"></Image>;
    },
  },
};
const ptComponents = {
  types: {
    image: ({ value, index }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).fit("max").auto("format").url()}
        />
      );
    },
  },
};

const thumpComponents = {
  types: {
    image: ({ value, index }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).fit("max").auto("format").url()}
          width="80%"
        />
      );
    },
  },
};

const powerLists = [
  "select",
  "-1.25",
  "-1.50",
  "-2.00",
  "-2.75",
  "-3.25",
  "-3.50",
  "-3.75",
  "-4.00",
  "-4.50",
  "-4.75",
];

function ProductDetails({ pdpLayout, product, pdpDefinedPageContent }) {
  const router = useRouter();
  const paths = usePaths();
  const t = useIntl();
  const {
    currentChannel,
    formatPrice,
    query,
    currentLocale: locale,
  } = useRegions();

  const { checkoutToken, setCheckoutToken, checkout } = useCheckout();

  const [createCheckout] = useCreateCheckoutMutation();
  const { user } = useUser();

  const [addProductToCheckout] = useCheckoutAddProductLineMutation();
  const [loadingAddToCheckout, setLoadingAddToCheckout] = useState(false);
  const [addToCartError, setAddToCartError] = useState("");

  //const [selectedVariant, setSelectedVariant] = useState("");

  const productCarouselImg = [];
  const { name, description, attributes, category, variants } = product;
  let productDescription = JSON.parse(description);
  const productAttributesMap = new Map();

  const [sunglassMeasurementDetails, setSunglassMeasurementDetails] = useState(
    getSunglassCategoryMesurementDetails(attributes)
  );

  const [pdpDetails, setPdpDetails] = useState(getProductDetails(attributes));

  const [productFeature, setProductFeature] = useState(
    getProductFeatures(attributes)
  );

  const [productRequiredDetails, setProductRequiredDetails] = useState({
    variant: {},
  });

  attributes.forEach((attribute) => {
    if (attribute.values[0]) {
      productAttributesMap.set(
        attribute.attribute.name,
        attribute.values[0].name
      );
    }
  });

  if (productDescription.blocks[0]) {
    productDescription = productDescription.blocks[0].data.text;
  }

  const {
    productThumpnail,
    measurements,
    measurementImages,
    measurementsTitle,
    measurementsDes,
    frameImage,
    frameCode,
  } = pdpLayout || {};

  const [power, setPower] = React.useState();
  const [zoomModalDetails, setZoomModalDetails] = React.useState({
    display: false,
    selectedImage: null,
    allImages: [],
  });

  const {
    seoDetails: { title },
    translations: { contents },
  } = pdpDefinedPageContent || { seoDetails: {}, translations: {} };

  let productVariant = variants.map((variant) => Object.assign({}, variant));

  productVariant.forEach((variant) => {
    const frameColorAttribute = variant?.attributes.filter(
      (attribute) => attribute.attribute.name === "Frame Color"
    );

    if (frameColorAttribute) {
      let index = frameCode?.findIndex(
        (code) => code === frameColorAttribute[0]?.values[0]?.name.toLowerCase()
      );
      variant.frameImage = frameImage ? frameImage[index] : null;
    }
  });

  const handleChange = (event: SelectChangeEvent) => {
    setPower(event.target.value);
  };

  const zoom = (images) => {
    setZoomModalDetails((oldData) => ({
      ...oldData,
      display: true,
      selectedImage: images,
    }));
  };

  React.useEffect(() => {
    const defaultVariant = productVariant[0].id;
    void router.replace(
      paths.products._slug(product.slug).$url({
        ...(defaultVariant && { query: { variant: defaultVariant } }),
      }),
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }, []);

  const selectedVariantID = getSelectedVariantID(product, router);
  const selectedVariant =
    product?.variants?.find((v) => v?.id === selectedVariantID) || undefined;

  React.useEffect(() => {
    setZoomModalDetails((oldData) => ({
      ...oldData,
      allImages: selectedVariant?.media,
    }));
  }, [selectedVariant]);

  const onAddToCart = async () => {
    // Clear previous error messages
    setAddToCartError("");

    // Block add to checkout button
    setLoadingAddToCheckout(true);
    const errors: CheckoutError[] = [];

    if (!selectedVariantID) {
      return;
    }

    if (checkout) {
      // If checkout is already existing, add products
      const { data: addToCartData } = await addProductToCheckout({
        variables: {
          checkoutToken,
          variantId: selectedVariantID,
          locale: query.locale,
        },
      });
      addToCartData?.checkoutLinesAdd?.errors.forEach((e) => {
        if (e) {
          errors.push(e);
        }
      });
    } else {
      // Theres no checkout, we have to create one
      const { data: createCheckoutData } = await createCheckout({
        variables: {
          email: user?.email,
          channel: currentChannel.slug || "default-channel",
          lines: [
            {
              quantity: 1,
              variantId: selectedVariantID,
            },
          ],
        },
      });
      createCheckoutData?.checkoutCreate?.errors.forEach((e) => {
        if (e) {
          errors.push(e);
        }
      });
      if (createCheckoutData?.checkoutCreate?.checkout?.token) {
        setCheckoutToken(createCheckoutData?.checkoutCreate?.checkout?.token);
      }
    }
    // Enable button
    setLoadingAddToCheckout(false);

    if (errors.length === 0) {
      // Product successfully added
      return;
    }

    // Display error message
    const errorMessages = errors.map((e) => e.message || "") || [];
    setAddToCartError(errorMessages.join("\n"));
  };

  const isAddToCartButtonDisabled =
    !selectedVariant ||
    selectedVariant?.quantityAvailable === 0 ||
    loadingAddToCheckout;

  return (
    <Grid>
      <Grid item xs={12} className={roboto.className}>
        <BreadcrumbsDetails brand={productAttributesMap.get("Brand")} />
        <Grid container xs={12} sx={{ mt: 10 }}>
          <Grid xs={7} sx={{ border: "0px solid" }}>
            <Box>
              <Carousel
                width="100%"
                swipe="true"
                duration="100"
                PrevIcon={<ArrowBackIosNewIcon />}
                NextIcon={<ArrowForwardIosIcon />}
                navButtonsProps={{
                  // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                  style: {
                    background: "none",
                    color: "#F7961C",
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
                {selectedVariant?.media.map((image, index) => (
                  <Box
                    key={index}
                    sx={{ textAlign: "center", cursor: "zoom-in" }}
                    onClick={() => zoom(image)}
                  >
                    <Image
                      src={image.url}
                      alt="fff"
                      width={700}
                      height={400}
                    ></Image>
                  </Box>
                ))}
              </Carousel>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "0px solid",
                ml: 2,
                mr: 2,
                mt: 5,
              }}
            >
              {selectedVariant?.media.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "0px solid",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25%",
                  }}
                >
                  <Image
                    src={image.url}
                    alt="fff"
                    width={120}
                    height={70}
                  ></Image>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid xs={5} sx={{ border: "0px solid" }}>
            <Box sx={productDis}>
              <Box sx={title}>
                <b>{productAttributesMap.get("Brand")}</b> {name}
              </Box>
              <Box sx={dis}>{productDescription}</Box>
              <Box sx={types}>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">
                    {productAttributesMap.get("Shape")}
                  </Box>
                </Box>
                <Box component="span">|</Box>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">{productAttributesMap.get("Fit")}</Box>
                </Box>
                <Box component="span">|</Box>
                <Box component="span" sx={space}>
                  <DoneIcon sx={tickColor} />
                  <Box component="span">
                    {productAttributesMap.get("Frame Material")}
                  </Box>
                </Box>
              </Box>
              {category.name === "Sunglasses" && (
                <Box>
                  <Box sx={{ fontSize: "20px", mt: 3 }}>
                    <b>Frame Color</b> :{" "}
                    {selectedVariant?.attributes[0]?.values[0]?.name}
                  </Box>
                  <Box sx={{ mt: 2, display: "flex" }}>
                    {/* <PortableText value={frameImage} components={ptComponents} /> */}

                    <VariantSelector
                      variants={productVariant}
                      selectedVariantID={selectedVariantID}
                      product={product}
                      setProductRequiredDetails={setProductRequiredDetails}
                    />
                  </Box>
                </Box>
              )}

              {category.name !== "Sunglasses" && (
                <Box>
                  <Box sx={{ fontSize: "20px", mt: 3, fontWeight: "bold" }}>
                    Enter your prescription
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "0px solid",
                        mt: 3,
                      }}
                    >
                      <Box sx={{ border: "0px solid" }}>Sphere (Power) :</Box>
                      <Box sx={{ border: "0px solid", width: "60%" }}>
                        <FormControl style={{ minWidth: 220 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Select
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={power}
                            onChange={handleChange}
                            label="Power"
                            sx={{ width: "100%" }}
                          >
                            {powerLists.map((item, index) => (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              color: "#F7961C",
                              "&.Mui-checked": {
                                color: "#F7961C",
                              },
                            }}
                          />
                        }
                        label="I need 2 different powers"
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid xs={12}>
            <Box
              sx={{ background: "#F5F5F5", p: 4, mt: 5 }}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Box sx={{ fontSize: "30px" }}>
                {formatPrice(selectedVariant?.pricing?.price?.gross)}
              </Box>
              <Button
                onClick={onAddToCart}
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ff9905",
                  "&:hover": {
                    backgroundColor: "#f59407",
                  },
                  ml: 3,
                  color: "#343434",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "16px",
                  pl: 10,
                  pr: 10,
                  pt: 1,
                  pb: 1,
                }}
              >
                Add to cart
              </Button>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                  mt: 6,
                  mb: 1.5,
                  fontSize: "35px",
                }}
              >
                {measurements}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                  mb: 6,
                }}
              >
                <Divider
                  sx={{
                    width: "10%",
                    borderBottomWidth: 4,
                    background: "#343434",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {measurementImages &&
                measurementImages.map((val, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "0px solid",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ border: "0px solid", textAlign: "center" }}>
                      <PortableText value={val} components={thumpComponents} />
                      <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Box sx={{ textAlign: "center", fontSize: "22px" }}>
                          {measurementsTitle[index]}
                        </Box>
                        <Box
                          sx={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          {sunglassMeasurementDetails &&
                            sunglassMeasurementDetails[index] + " mm"}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Grid>
          <PdpDetail pdpDetails={pdpDetails} productFeature={productFeature} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Box>
          {contents &&
            Array.isArray(contents) &&
            contents.map((content) => {
              if (content._type == "bannerCarousal") {
                return (
                  <BannerCarousal
                    key={content._key}
                    data={content}
                  ></BannerCarousal>
                );
              }
              if (content._type == "imageWithText") {
                return (
                  <ImageWithText
                    key={content._key}
                    data={content}
                  ></ImageWithText>
                );
              }
              if (content._type == "imageWithTextGrid") {
                return (
                  <ImageWithTextGrid
                    key={content._key}
                    data={content}
                  ></ImageWithTextGrid>
                );
              }
              if (content._type == "catalogueBanner") {
                return (
                  <BannerImage key={content._key} data={content}></BannerImage>
                );
              }
              if (content._type == "topProducts") {
                return (
                  <TopProducts
                    key={content._key}
                    data={content}
                    locale={locale}
                  ></TopProducts>
                );
              }
              if (content._type == "topBrands") {
                return (
                  <TopBrands key={content._key} data={content}></TopBrands>
                );
              }
              if (content._type == "topCategories") {
                return (
                  <TopCategories
                    key={content._key}
                    data={content}
                  ></TopCategories>
                );
              }
              return "";
            })}
        </Box>
      </Grid>
      {zoomModalDetails.display && (
        <ZoomModal
          zoomModalDetails={zoomModalDetails}
          setZoomModalDetails={setZoomModalDetails}
        />
      )}
    </Grid>
  );
}

export default ProductDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }
  const { locale, channel } = contextToRegionQuery(context);
  const response: ApolloQueryResult<RootCategoriesQuery> =
    await serverApolloClient.query<
      RootCategoriesQuery,
      RootCategoriesQueryVariables
    >({
      query: RootCategoriesDocument,
      fetchPolicy: "no-cache",
      variables: {
        locale,
      },
    });
  const rootCategories = response.data.categories.edges.map((edge) => ({
    ...edge.node,
  }));

  const productSlug = context.params.slug.toString();
  //const productSlug = "aviator-sunglasses-2";
  const productDetails: ApolloQueryResult<ProductBySlugQuery> =
    await serverApolloClient.query<
      ProductBySlugQuery,
      ProductBySlugQueryVariables
    >({
      query: ProductBySlugDocument,
      fetchPolicy: "no-cache",
      variables: {
        slug: productSlug,
        locale,
        channel,
      },
    });
  const slug = "pdp";
  const pdpLayout = await client.fetch(PDP_PAGE_SANITY_QUERY, { slug });
  const product = productDetails.data.product;
  if (!product) {
    return {
      props: {},
      notFound: true,
    };
  }
  const marketingContent = await client.fetch(HEADER_PAGE_SANITY_QUERY);
  const pdpDefinedPageContent = await client.fetch(
    PDP_PAGE_LAYOUT_SANITY_QUERY
  );

  return {
    props: {
      rootCategories: rootCategories,
      pdpLayout: pdpLayout,
      product: product,
      uspContent: marketingContent,
      pdpDefinedPageContent: pdpDefinedPageContent,
    },
  };
};

ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
