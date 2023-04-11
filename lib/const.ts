import groq from "groq";
export const STOREFRONT_NAME = process.env.NEXT_PUBLIC_STOREFRONT_NAME || "";
export const CHECKOUT_TOKEN = "checkoutToken";
export const API_URI = "https://doctorm-poc-store.eu.saleor.cloud/graphql/";
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const HOMEPAGE_MENU = process.env.NEXT_PUBLIC_HOMEPAGE_MENU || "";
export const GEOLOCATION = process.env.NEXT_PUBLIC_GEOLOCATION === "true";

export const HOME_PAGE_SANITY_QUERY = groq`*[_type == "definedPage" && pageType == "home"][0]{
  _id,
  _type,
  pageType,
  seoDetails{
    title
  },
  title,
  translations
}`;

export const PDP_PAGE_LAYOUT_SANITY_QUERY = groq`*[_type == "definedPage" && pageType == "pdp"][0]{
  _id,
  _type,
  pageType,
  seoDetails{
    title
  },
  title,
  translations
}`;

export const HEADER_PAGE_SANITY_QUERY = groq`*[_type == "header"]{
  content,
}`;

export const PDP_PAGE_SANITY_QUERY = groq`*[_type == "productDetail" && slug.current == $slug][0]{
    "productCarouselImg":productCarousel[]->carouselImage,
    "productThumpnail":thumpnails[]->carouselImage,
    measurements,
    "measurementImages":measurementImages[]->carouselImage,
    "measurementsTitle":measurementImages[]->title,
    "measurementsDes":measurementImages[]->description,
    "frameImage":frameImage[]->carouselImage,
    "frameCode":frameImage[]->title,
    }`;
