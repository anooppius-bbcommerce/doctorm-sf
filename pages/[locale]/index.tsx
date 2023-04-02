import { HomepageBlock, Layout } from "@/components";
import { ReactElement } from "react";

import client from "@/lib/sanity/client";
import { ApolloQueryResult } from "@apollo/client";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { contextToRegionQuery } from "@/lib/regions";
import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
} from "@/saleor/api";
import { HOME_PAGE_SANITY_QUERY } from "@/lib/const";

function HomeRedirection({
  homePageContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomepageBlock homePageContent={homePageContent} />;
}

export default HomeRedirection;

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

  const slug = "home";
  const homePageContent = await client.fetch(HOME_PAGE_SANITY_QUERY, { slug });

  return {
    props: {
      rootCategories: rootCategories,
      homePageContent: homePageContent,
    },
  };
};

HomeRedirection.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
