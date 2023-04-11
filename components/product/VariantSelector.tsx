// @ts-nocheck
import { RadioGroup } from "@headlessui/react";
import { Box } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductDetailsFragment } from "@/saleor/api";

import { useRegions } from "../RegionsProvider";
import { Sonsie_One } from "@next/font/google";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/lib/sanity/client";

export interface VariantSelectorProps {
  product: ProductDetailsFragment;
  selectedVariantID?: string;
}

function urlFor(source) {
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
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).fit("max").auto("format").url()}
        />
      );
    },
  },
};

export function VariantSelector({
  variants,
  selectedVariantID,
  product,
  setProductRequiredDetails,
}: VariantSelectorProps) {
  const paths = usePaths();
  const router = useRouter();
  const { formatPrice } = useRegions();

  const [selectedVariant, setSelectedVariant] = useState(selectedVariantID);

  useEffect(() => {
    setProductRequiredDetails({ variant: variants[0] });
  }, [selectedVariant]);

  // Skip displaying selector when theres less than 2 variants
  if (!variants || variants.length === 0) {
    return null;
  }

  const onChange = (value: string) => {
    setSelectedVariant(value);
    void router.replace(
      paths.products
        ._slug(product.slug)
        .$url({ ...(value && { query: { variant: value } }) }),
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  return (
    <div className="w-full">
      <RadioGroup value={selectedVariant} onChange={onChange}>
        <div className="space-y-4" style={{ display: "flex" }}>
          {variants.map((variantObject, index) => (
            <RadioGroup.Option key={variantObject.id} value={variantObject.id}>
              <div style={{ display: "flex" }}>
                <RadioGroup.Label>
                  <Box key={index} sx={{ mr: 2, cursor: "pointer" }}>
                    <PortableText
                      value={variantObject.frameImage}
                      components={ptComponents}
                    />
                  </Box>
                </RadioGroup.Label>
              </div>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

export default VariantSelector;
