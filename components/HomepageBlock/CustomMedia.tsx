// @ts-nocheck
import { Box } from "@mui/material";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { getFileAsset } from '@sanity/asset-utils';
import { Flex, Spinner } from "@sanity/ui";
import client from "@/lib/sanity/client";

export function CustomMedia({ data }) {
  function urlFor(source: string) {
    return imageUrlBuilder(client).image(source);
  }

  function fileAssetFor(source) {
    return getFileAsset(source, client.config());
  }

  const ptComponents = {
    types: {
      file: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        const fileAsset = fileAssetFor(value);
        const { extension, url, alt } = fileAsset;
        if (["mp4", "mov", "mpeg", "m4v", "avi"].includes(extension)) {
          return (
            <video title={alt} loop autoPlay playsInline controls width="100%">
              <source src={url} type={`video/${extension}`} />
            </video>
          );
        } else if (["png", "jpeg", "jpg", "svg", "webp"].includes(extension)) {
          return (
            <img
              alt={alt || " "}
              loading="lazy"
              src={url}
              width="100%"
            />
          );
        } else {
          return null;
        }
      },
    },
  };

  const { text, url, media, _key } = data || {};
  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            border: "0px solid",
            mt: 8,
          }}
        >
          <Box
            key={_key}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "95%",
            }}
          >
            <PortableText value={media} components={ptComponents} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomMedia;
