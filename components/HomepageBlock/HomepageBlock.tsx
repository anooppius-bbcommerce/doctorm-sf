// @ts-nocheck
import { Box, Grid } from "@mui/material";
import { Roboto } from "@next/font/google";
import TopProducts from "./TopProducts";
import TopCategories from "./TopCategories";
import TopBrands from "./TopBrands";
import BannerCarousal from "./BannerCarousal";
import ImageWithText from "./ImageWithText";
import BannerImage from "./BannerImage";
import CustomMedia from "./CustomMedia";
import ImageWithTextGrid from "./ImageWithTextGrid";
import { useRegions } from "@/components/RegionsProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export function HomepageBlock({ homePageContent }) {
  const { currentLocale: locale } = useRegions();
  const {
    seoDetails: {
      title
    },
    translations: {
      contents
    }
  } = homePageContent || { seoDetails: {}, translations: {} };

  return (
    <Grid>
      <Grid item xs={12}>
        <Box>
          {
            contents && Array.isArray(contents) && contents.map(content => {
              if (content._type == "bannerCarousal") {
                return <BannerCarousal key={content._key} data={content}></BannerCarousal>
              }
              if (content._type == "imageWithText") {
                return <ImageWithText key={content._key} data={content}></ImageWithText>
              }
              if (content._type == "imageWithTextGrid") {
                return <ImageWithTextGrid key={content._key} data={content}></ImageWithTextGrid>
              }
              if (content._type == "catalogueBanner") {
                return <BannerImage key={content._key} data={content}></BannerImage>
              }
              if (content._type == "customMedia") {
                return <CustomMedia key={content._key} data={content}></CustomMedia>
              }
              if (content._type == "topProducts") {
                return <TopProducts key={content._key} data={content} locale={locale}></TopProducts>
              }
              if (content._type == "topBrands") {
                return <TopBrands key={content._key} data={content}></TopBrands>
              }
              if (content._type == "topCategories") {
                return <TopCategories key={content._key} data={content}></TopCategories>
              }
              return ("")
            })
          }
        </Box>
      </Grid>
    </Grid>
  );
}

export default HomepageBlock;
