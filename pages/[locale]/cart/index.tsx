// @ts-nocheck
import React from "react";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { Layout } from "@/components";
import Header from "../../components/header";
import {
  Box,
  Grid,
  Theme,
  Paper,
  Card,
  SubCategory,
  Button,
  Link,
} from "@mui/material";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
  useCheckoutLineUpdateMutation,
  useRemoveProductFromCheckoutMutation,
} from "@/saleor/api";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { contextToRegionQuery } from "@/lib/regions";
import Carousel from "react-material-ui-carousel";
import Divider from "@mui/material/Divider";
import { Roboto } from "@next/font/google";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircleIcon from "@mui/icons-material/Circle";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import { useRegions } from "@/components/RegionsProvider";
import client from "@/lib/sanity/client";
import { HEADER_PAGE_SANITY_QUERY } from "@/lib/const";
import Head from 'next/head'

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const types = {
  p: 2,
  borderRadius: "50px",
  background: "#F1ECE1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "50px",
  padding: "8px 12px",
};

const tableStyle = {
  "&:td": {
    border: "1px solid",
  },
};

function CartDetails(props) {
  const { checkoutToken, setCheckoutToken, checkout } = useCheckout();
  const { currentChannel, formatPrice, query } = useRegions();
  const [updateProductToCheckout] = useCheckoutLineUpdateMutation();
  const [removeProductFromCheckout] = useRemoveProductFromCheckoutMutation();

  const updateItemQuantity = (id, quantity) => async (e) => {
    const result = await updateProductToCheckout({
      variables: {
        token: checkoutToken,
        lines: [{ lineId: id, quantity: quantity }],
        locale: query.locale,
      },
    });
  };

  const selectionRowContent = [
    {
      name: "Model",
      data: "PLD2059/S",
    },
    {
      name: "Product",
      data: "Aviator",
      bullet: true,
    },
    {
      name: "Details",
      data: "Metal",
      bullet: true,
    },
    {
      name: "",
      data: "Black",
      bullet: true,
    },
  ];

  const orderSummary = [
    {
      name: "Subtotal  ",
      data: "SAR 730.00",
    },
    {
      name: "Delivery Cost",
      data: "FREE",
      freeDelivery: true,
    },
    {
      name: "Order Total",
      data: "SAR 730.00",
    },
  ];
  return (
    <>
    <Head>
        <title>Eyewear For Every Lifestyle | Glasses & Lenses | Doctor M</title>
      </Head>
    <Grid
      sx={{ backgroundColor: "#f6f6f6", border: "0px solid #f6f6f6", mt: 1 }}
    >
      <Grid
        item
        xs={12}
        className={roboto.className}
        sx={{ border: "1px solid #f6f6f6" }}
      >
        <Grid container xs={12} sx={{ mt: 5, color: "#343434" }}>
          <Grid xs={7} sx={{ border: "0px solid", ml: 5, mr: 5 }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  p: 2,
                }}
              >
                <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>My Cart</Box>
                <Box>
                  <Link
                    href="#"
                    sx={{
                      color: "#F7961C",
                      textDecorationColor: "#F7961C",
                      fontSize: "20px",
                    }}
                  ></Link>
                </Box>
              </Box>

              {checkout?.lines.map((lineItem, index) => (
                <Box
                  key={index}
                  sx={{ mt: 5, backgroundColor: "#fff", mb: 5, p: 3 }}
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <FavoriteBorderIcon />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Link
                      href={`/en-AE/products/${lineItem.variant?.product?.slug}?channel=web-ksa&variant=${lineItem.variant.id}`}
                    >
                      <Box>
                        <img src={lineItem.variant?.product?.thumbnail?.url} />
                      </Box>
                    </Link>
                    <Box sx={{ ml: 5, fontSize: "20px" }}>
                      <Box sx={{}}>
                        <b>Polaroid</b>
                        <span> {lineItem.variant?.product?.name}</span>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        {formatPrice(lineItem.variant?.pricing?.price.gross)}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 5,
                      mb: 4,
                    }}
                  >
                    <Box sx={types}>
                      <Box sx={{ cursor: "pointer" }}>
                        <RemoveIcon
                          onClick={updateItemQuantity(
                            lineItem.id,
                            lineItem.quantity - 1
                          )}
                        />
                      </Box>
                      <Box sx={{ fontSize: "20px", ml: 2, mr: 2 }}>
                        {lineItem.quantity}
                      </Box>
                      <Box sx={{ cursor: "pointer" }}>
                        <AddIcon
                          onClick={updateItemQuantity(
                            lineItem.id,
                            lineItem.quantity + 1
                          )}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        startIcon={<DeleteOutlineIcon />}
                        sx={{
                          backgroundColor: "#F1ECE1",
                          color: "#343434",
                          textTransform: "capitalize",
                          pl: 2,
                          pr: 2,
                          "&:hover": { backgroundColor: "#d3cec4" },
                        }}
                        onClick={() =>
                          removeProductFromCheckout({
                            variables: {
                              checkoutToken: checkoutToken,
                              lineId: lineItem.id,
                              locale: query.locale,
                            },
                          })
                        }
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ fontSize: "20px" }}>Item Total :</Box>
                    <Box
                      sx={{
                        color: "#DF3131",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {formatPrice(lineItem.totalPrice.gross)}
                    </Box>
                  </Box>
                  <Box sx={{ mt: 3, mb: 3 }}>
                    <Box>
                      <Divider />
                    </Box>
                    <Box>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Selections</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 450 }}
                              aria-label="simple table"
                            >
                              <TableBody>
                                {selectionRowContent.map((item, index) => (
                                  <TableRow
                                    key={index}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell>
                                      <b>{item.name}</b>
                                    </TableCell>
                                    <TableCell>
                                      {item.freeDelivery ? (
                                        <CircleIcon
                                          sx={{
                                            fontSize: "10px",
                                            color: "#F7961C",
                                          }}
                                        />
                                      ) : null}{" "}
                                      {item.data}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                    <Box>
                      <Divider />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid xs={4} sx={{ color: "#343434" }}>
            <Box sx={{ backgroundColor: "#fff", p: 5 }}>
              <Box sx={{ fontSize: "24px", mb: 3 }}>Order Summary</Box>
              <Box>
                <TableContainer>
                  <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ pl: 0, fontSize: "18px" }}>
                          Subtotal
                          <Typography
                            sx={{ pl: 0, fontSize: "13px", color: "grey" }}
                            gutterBottom
                          >
                            Delivery cost may apply
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "18px",
                            color: "inherit",
                            textAlign: "right",
                          }}
                        >
                          <b>{formatPrice(checkout?.subtotalPrice?.net)}</b>
                        </TableCell>
                      </TableRow>

                      {checkout?.shippingPrice?.gross?.amount > 0 && (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell sx={{ pl: 0, fontSize: "18px" }}>
                            Delivery Cost
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "18px",
                              color: "inherit",
                              textAlign: "right",
                            }}
                          >
                            <b>{formatPrice(checkout?.shippingPrice?.gross)}</b>
                          </TableCell>
                        </TableRow>
                      )}

                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ pl: 0, fontSize: "18px" }}>
                          Order Total
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "18px",
                            color: "inherit",
                            textAlign: "right",
                          }}
                        >
                          <b>{formatPrice(checkout?.totalPrice?.gross)}</b>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ border: "0px solid", mt: 3 }}>
                <Link
                  href="/en-AE/checkout"
                  style={{
                    backgroundColor: "#ff9905",
                    color: "#3A3A3A",
                    textTransform: "capitalize",
                    padding: "8px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    "&:hover": { backgroundColor: "#f59407" },
                    width: "100%",
                    fontWeight: "bold",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Proceed to Checkout
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}

export default CartDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }

  const response: ApolloQueryResult<RootCategoriesQuery> =
    await serverApolloClient.query<
      RootCategoriesQuery,
      RootCategoriesQueryVariables
    >({
      query: RootCategoriesDocument,
      fetchPolicy: "no-cache",
      variables: {
        locale: contextToRegionQuery(context).locale,
      },
    });
  const rootCategories = response.data.categories.edges.map((edge) => ({
    ...edge.node,
  }));
  const marketingContent = await client.fetch(HEADER_PAGE_SANITY_QUERY);

  return {
    props: {
      rootCategories: rootCategories,
      uspContent: marketingContent,
    },
  };
};

CartDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
