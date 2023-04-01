// @ts-nocheck
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { notNullable } from "@/lib/util";
import {
  CheckoutDetailsFragment,
  CountryCode,
  useCheckoutShippingAddressUpdateMutation,
  LanguageCodeEnum,
} from "@/saleor/api";
import { messages } from "../i18n";
import { AddressDisplay } from "./AddressDisplay";
import { AddressForm, AddressFormData } from "./AddressForm";
import { useUser } from "@/lib/useUser";
import Looks3Icon from '@mui/icons-material/Looks3';
import {
  Box, Button,
  Grid, styled,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import {checkoutSectionHeaderActive} from './EmailSection';
import Typography from "@mui/material/Typography";


export interface ShippingAddressSectionProps {
  active: boolean;
  checkout: CheckoutDetailsFragment;
  locale: LanguageCodeEnum;
}

export function ShippingAddressSection({ active, checkout,locale }: ShippingAddressSectionProps) {
  const t = useIntl();

  const { authenticated } = useUser();
  const [editing, setEditing] = useState(!checkout.shippingAddress);
  const [shippingAddressUpdateMutation] = useCheckoutShippingAddressUpdateMutation({});

  const { billingAddress } = checkout;

  const onSameAsBilling = async () => {
    if (!billingAddress) {
      return;
    }
    const { data } = await shippingAddressUpdateMutation({
      variables: {
        address: {
          firstName: billingAddress.firstName || "",
          lastName: billingAddress.lastName || "",
          phone: billingAddress.phone || "",
          country: (billingAddress.country.code as CountryCode) || "US",
          streetAddress1: billingAddress.streetAddress1 || "",
          city: billingAddress.city || "",
          postalCode: billingAddress.postalCode || "",
        },
        token: checkout.token,
        locale: locale,
      },
    });
    if (data?.checkoutShippingAddressUpdate?.errors.length) {
      // todo: add error handling
      return;
    }
    // Successfully updated the shipping address
    setEditing(false);
  };
  const updateMutation = async (formData: AddressFormData) => {
    const { data } = await shippingAddressUpdateMutation({
      variables: {
        address: {
          ...formData,
        },
        token: checkout.token,
        locale: locale,
      },
    });
    setEditing(false);
    return data?.checkoutShippingAddressUpdate?.errors.filter(notNullable) || [];
  };

  return (
    <>
      <Box sx={{display:'flex',alignItems:'center', mt:2}}>
      <Box><Looks3Icon/></Box><Typography sx={checkoutSectionHeaderActive}
          className={active ? "checkout-section-header-active" : "checkout-section-header-disabled"}
        >
          {t.formatMessage(messages.shippingAddressCardHeader)}
        </Typography>
      </Box>
      {active &&
        (editing ? (
          <>
            <Box sx={{mt:1}}>
              <Button variant="contained" onClick={onSameAsBilling}>
                {t.formatMessage(messages.sameAsBillingButton)}
              </Button>
            </Box>
            <AddressForm
              existingAddressData={checkout.shippingAddress || undefined}
              toggleEdit={() => setEditing(false)}
              updateAddressMutation={updateMutation}
            />
          </>
        ) : (
          <Box sx={{mt:2}}>
            {!!checkout.shippingAddress && <AddressDisplay address={checkout.shippingAddress} />}
            <Button variant="contained" onClick={() => setEditing(true)}>
              {t.formatMessage(messages.changeButton)}
            </Button>
          </Box>
        ))}
    </>
  );
}

export default ShippingAddressSection;
