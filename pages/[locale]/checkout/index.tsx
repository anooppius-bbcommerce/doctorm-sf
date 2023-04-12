// @ts-nocheck
import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components";
import { contextToRegionQuery } from "@/lib/regions";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
} from "@/saleor/api";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { usePaths } from "@/lib/paths";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import CheckoutSidebar from "@/components/checkout/sidebar/CheckoutSidebar";
import { useRegions } from "@/components/RegionsProvider";
import { Box, Grid } from "@mui/material";
import CheckoutLayout from "@/components/CheckoutLayout/Layout";
import Head from 'next/head'

function CheckoutPage() {
  const router = useRouter();
  const paths = usePaths();
  const { checkout, loading } = useCheckout();

  const { query, currentLocale: localeString } = useRegions();
  const { locale } = query;

  useEffect(() => {
    // Redirect to cart if theres no checkout data
    if (!loading && (!checkout || !checkout.lines?.length)) {
      void router.push(paths.$url());
    }
  }, []);

  const isCheckoutLoading = loading || typeof window === "undefined";
  if (isCheckoutLoading) {
    return (
      <>
        <div title="Checkout" />
      </>
    );
  }

  if (!checkout || checkout.lines?.length === 0) {
    return <div title="Checkout" />;
  }

  return (
    <>
    <Head>
        <title>Eyewear For Every Lifestyle | Glasses & Lenses | Doctor M</title>
      </Head>
    <Grid item sx={{ border: "0px solid #f6f6f6", color: "#343434" }}>
      <Grid item xs={12}>
        <Grid item xs={8} sx={{ border: "0px solid" }}>
          <Box sx={{ m: 5, backgroundColor: "#f6f6f6", p: 3 }}>
            <CheckoutForm locale={locale} />
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ border: "0px solid" }}>
          <Box sx={{ m: 5, backgroundColor: "#f6f6f6", p: 3 }}>
            <CheckoutSidebar checkout={checkout} locale={locale} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}

export default CheckoutPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }
  const locale = contextToRegionQuery(context).locale;
  const response: ApolloQueryResult<RootCategoriesQuery> =
    await serverApolloClient.query<
      RootCategoriesQuery,
      RootCategoriesQueryVariables
    >({
      query: RootCategoriesDocument,
      fetchPolicy: "no-cache",
      variables: {
        locale: locale,
      },
    });
  const rootCategories = response.data.categories.edges.map((edge) => ({
    ...edge.node,
  }));

  return {
    props: {
      rootCategories: rootCategories,
      locale,
    },
  };
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <CheckoutLayout>{page}</CheckoutLayout>;
};
