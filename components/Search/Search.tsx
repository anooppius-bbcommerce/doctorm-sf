// @ts-nocheck
import algoliasearch from "algoliasearch/lite";
import React from "react";
import { InstantSearch, Hits, SearchBox, Highlight  } from "react-instantsearch-dom";
import Link from "next/link";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Roboto } from "@next/font/google";
import config from "../../config";
import { useRegions } from "@/components/RegionsProvider";

const { algoliaIndexName, algoliaProjectId, algoliaReadKey } = config;

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const client = algoliasearch(algoliaProjectId, algoliaReadKey);

const searchListWrapper = {
  position: "absolute",
  zIndex: "999",
  width: "100%",
};
const searchList = {
  background: "#f3f3f3",
  borderRadius: "0px",
  border: "1px solid #ddd",
  "& input": {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    fontFamily: "sans-serif",
    fontSize: "14px",
    background: "none",
    width: "100%",
    border: "none",
  },
  "& button": {
    width: "32px",
    height: "27px",
    marginLeft: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    display: "none",
  },
  "& ul": {
    padding: 0,
    margin: 0,
    // display: "flex",
    // flexWrap: "wrap",
    margin: "0",
    position: "absolute",
    marginTop:'2px',
    zIndex: "999",
    background: "#fff",
    borderRadius: "0px",
    border:'1px solid #ddd',
    "& searchBox": {
      background: "#F7961C !important",
    },
    "& li": {
      listStyleType: "none",
      margin: "0px",
      wordWrap: "break-word",
      padding: "5px",
      border: "0px solid #ddd",
      borderRadius: "0px",
      background: "#fff",
      textAlign: "left",
      cursor: "pointer",
      fontSize: "15px",
      fontFamily: "sans-serif",
      "&:hover": {
       // border: "1px solid #F7961C",
       background:'#fbfbfb',
      },
      "& a": {
        display: "block",
        textDecoration: "none",
        display: "flex",
        color: "343434",
        "& img": {
          display: "block",
          width: "60px",
          height: "35px",
          marginTop: "-10px",
        },
        "& span": {
          display: "flex",
          justifyContent: "start",
          wordWrap: "break-word",
          width: "200px",
          border: "0px solid",
          alignItems: "center",
          overflowWrap: "break-word",
          overflow: "hidden",
          padding: "5px",
          color: "#343434",
          fontSize: "15px",
        },
        "& span:nth-of-type(1)": {
          border: "0px solid #000",
          height: "27px",
          width: "54px",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        "& span:nth-of-type(2)": {
          display:'flex',
          justifyContent:'flext-start',
        },
        "& span:nth-of-type(3)": {
          width: "80px",
        },
      },
    },
  },
};

const searchClient = {
  ...client,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return [];
    }
    return client.search(requests);
  },
};

const checkClickType = (type) => {
  const timer = setTimeout(() => {
    type();
  }, 300);
  return () => clearTimeout(timer);
};

function HitComponent({
  Hit,
  locale,
  formatPrice,
  handleSearchClick,
}: HitProps) {
  const { hit } = Hit;
  return (
    <>
      <Box
        sx={{}}
        onMouseDown={() => checkClickType(handleSearchClick)}
      >
        <Link
          href={"/" + locale + "/products/" + hit.slug}
          passHref
          className={roboto.className}
        >
          <span>
            <img src={hit.thumbnail} width="100" height="50"></img>
          </span>
          <span>{hit.productName}</span>
          {/* <Highlight attribute={hit.productName} hit={hit.productName} tagName={hit.productName} /> */}
          <span className="Hit-price">AED {hit.grossPrice}</span>
          {/* <span>
          {hit.grossPrice}
        </span> */}
          {/* <Highlight hit={hit} attribute="name" /> */}
        </Link>
      </Box>
    </>
  );
}

export default function Search({
  hello,
  handleSearchClose,
  locale,
  searchActive,
  handleSearchClick,
}) {
  const { currentChannel, formatPrice, query } = useRegions();
  return (
    <Box sx={searchList}>
      <InstantSearch indexName={algoliaIndexName} searchClient={searchClient} style={{width:'100%'}}>
        <Box className="right-panel" sx={{ width: "100%" }}>
          <Box>
            <Box sx={{ width: "100%" }}>
              <SearchBox
                translations={{ placeholder: "Search for products" }}
                onFocus={() => handleSearchClick()}
                onBlur={() => checkClickType(handleSearchClose)}
              />
            </Box>
          </Box>
          <Box>
            {searchActive ? (
              <Hits
                hitComponent={(Hit) => (
                  <HitComponent
                    Hit={Hit}
                    handleSearchClick={handleSearchClick}
                    formatPrice={formatPrice}
                    locale={locale}
                  />
                )}
              />
            ) : null}
          </Box>
        </Box>
      </InstantSearch>
    </Box>
  );
}
