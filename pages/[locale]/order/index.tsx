import { Layout } from "@/components";
import { ReactElement } from "react";

import Link from "next/link";
import { usePaths } from "@/lib/paths";
import { ApolloQueryResult } from "@apollo/client";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { contextToRegionQuery } from "@/lib/regions";
import { GetServerSideProps } from "next";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
  OrderDetailsQuery, OrderDetailsQueryByIdDocument, OrderDetailsQueryByIdVariables
} from "@/saleor/api";
import {
  Box, Button,
  Grid, styled,Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Roboto } from "@next/font/google";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRegions } from "@/components/RegionsProvider";
import VerifiedIcon from '@mui/icons-material/Verified';
import Head from 'next/head'
function OrderConfirmation({orderDetails}) {
  console.log(orderDetails, "orderDetails")
  const paths = usePaths();
  const { currentChannel, formatPrice, query } = useRegions();
  return (
    <>
    <Head>
        <title>Eyewear For Every Lifestyle | Glasses & Lenses | Doctor M</title>
      </Head>
    <Grid sx={{  border:'0px solid #f6f6f6', }}>
      <Grid container xs={12}>
        <Box  sx={{ m: 5,  width:'100%', display:'flex', justifyContent:'center', fontSize:'4.5rem' }}>
          <Box>
            <Box sx={{textAlign:'center'}}><VerifiedIcon sx={{color:'#F7961C', fontSize:'70px'}}/></Box>
            <Box sx={{textAlign:'center'}}>
              <Typography sx={{color:'#F7961C', fontSize:'26px'}}>
                Congratulations
              </Typography>
            </Box>
            <Box sx={{mt:2}}>
              <Typography sx={{color:'#343434', fontSize:'18px'}}>
                Your Order is Submitted
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid container xs={12} sx={{ color: "#343434",}}>
        <Box  sx={{ m: 5, backgroundColor: "#f6f6f6", p: 3, width:'100%' }}>
          <Box sx={{mt:2,mb:2}}>
            {/* <Box className="font-semibold text-3xl">Your order is completed!</Box> */}
              <Typography sx={{fontSize:'20px',fontWeight:'bold'}}>
                Order Number
              </Typography>
              <Typography>
                {orderDetails.number}
              </Typography>
            {/* <p className="mt-2">
              <Link href={paths.$url()}>Go back to homepage</Link>
            </p> */}
          </Box>
          <Divider/>
          <Box sx={{mt:2,mb:2}}>
            <Box sx={{fontSize:'20px',fontWeight:'bold',mb:2}}>Shipping</Box>
              <Typography>
                <Box component="span">{orderDetails.shippingAddress.firstName}</Box>
                <Box component="span" sx={{ml:1}}>{orderDetails.shippingAddress.lastName}</Box>
              </Typography>
              <Typography>
                {orderDetails.shippingAddress.streetAddress1}
              </Typography>
              <Typography>
                {orderDetails.shippingAddress.phone}
              </Typography>
          </Box>
          <Divider/>
          <Box sx={{mt:2,mb:2}}>
            <Box sx={{fontSize:'20px',fontWeight:'bold',mb:2}}>Payment Details</Box>
              <Typography>
                <Box component="span">{orderDetails.shippingAddress.firstName}</Box>
                <Box component="span" sx={{ml:1}}>{orderDetails.shippingAddress.lastName}</Box>
              </Typography>
              <Typography>
                {orderDetails.shippingAddress.phone}
              </Typography>
          </Box>
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
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      color: "inherit",
                      textAlign: "right",
                    }}
                  >
                    <b>{formatPrice(orderDetails?.subtotal?.net)}</b>
                  </TableCell>
                </TableRow>
                {orderDetails?.total?.gross?.amount > 0 && (
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
                      <b>{formatPrice(orderDetails?.shippingPrice?.gross)}</b>
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
                    <b>{formatPrice(orderDetails?.total?.gross)}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Grid>
    </Grid>
    </>
  )
}

export default OrderConfirmation;

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
  const { orderId } = context.query || {};
  const orderDetailsResponse: ApolloQueryResult<OrderDetailsQuery> =
    await serverApolloClient.query<
      OrderDetailsQuery,
      OrderDetailsQueryByIdVariables
    >({
      query: OrderDetailsQueryByIdDocument,
      fetchPolicy: "no-cache",
      variables: {
        id: orderId?.toString()
      },
    });
  return {
    props: {
      rootCategories: rootCategories,
      orderDetails: orderDetailsResponse.data.order,
    },
  };
};

OrderConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
