// @ts-nocheck
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { notNullable } from "@/lib/util";
import {
  CheckoutDetailsFragment,
  CountryCode,
  useCheckoutShippingAddressUpdateMutation,
  CheckoutDetailsFragment,
  useCheckoutEmailUpdateMutation,
  useCheckoutBillingAddressUpdateMutation,
  LanguageCodeEnum,
} from "@/saleor/api";
import { messages } from "../i18n";
import { AddressDisplay } from "./AddressDisplay";
import { AddressForm, AddressFormData } from "./AddressForm";
import { useUser } from "@/lib/useUser";
import Looks3Icon from "@mui/icons-material/Looks3";
import { Box, Button, Grid, styled, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { checkoutSectionHeaderActive } from "./EmailSection";
import Typography from "@mui/material/Typography";
import LooksOneIcon from "@mui/icons-material/LooksOne";

export interface CommonAddressSectionProps {
  active: boolean;
  checkout: CheckoutDetailsFragment;
  locale: LanguageCodeEnum;
}

export function CommonAddressSection({
  active,
  checkout,
  locale,
}: CommonAddressSectionProps) {
  const t = useIntl();

  const { authenticated } = useUser();
  const [editing, setEditing] = useState(!checkout.shippingAddress);
  const [shippingAddressUpdateMutation] =
    useCheckoutShippingAddressUpdateMutation({});
  const [checkoutEmailUpdate] = useCheckoutEmailUpdateMutation({});
  const [checkoutBillingAddressUpdate] =
    useCheckoutBillingAddressUpdateMutation({});

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
          country: (billingAddress.country.code as CountryCode) || "AE",
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
    console.log(formData);
    const checkoutEmailUpdateResult = await checkoutEmailUpdate({
      variables: {
        email: formData.email,
        token: checkout?.token,
        locale: locale,
      },
    });
    const mutationEmailErrors =
      checkoutEmailUpdateResult.data?.checkoutEmailUpdate?.errors || [];
    delete formData.email;

    const shippingAddressUpdateMutationResult =
      await shippingAddressUpdateMutation({
        variables: {
          address: {
            ...formData,
          },
          token: checkout.token,
          locale: locale,
        },
      });
    const mutationShippingAddressErrors =
      shippingAddressUpdateMutationResult.data?.shippingAddressUpdateMutation
        ?.errors || [];
    console.log(shippingAddressUpdateMutationResult);
    const { data } = await checkoutBillingAddressUpdate({
      variables: {
        address: {
          ...formData,
        },
        token: checkout.token,
        locale: locale,
      },
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Box>
          <LooksOneIcon />
        </Box>
        <Typography
          sx={checkoutSectionHeaderActive}
          className={
            active
              ? "checkout-section-header-active"
              : "checkout-section-header-disabled"
          }
        >
          {t.formatMessage(messages.shippingAddressCardHeader)}
        </Typography>
      </Box>

      {active && (
        <Box>
          <Card sx={{ pl: 2, pr: 2, pb: 2 }}>
            {editing ? (
              <>
                <AddressForm
                  existingAddressData={checkout.shippingAddress || undefined}
                  toggleEdit={() => setEditing(false)}
                  updateAddressMutation={updateMutation}
                />
              </>
            ) : (
              <Box sx={{ mt: 2 }}>
                {!!checkout.shippingAddress && (
                  <AddressDisplay address={checkout.shippingAddress} />
                )}
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => setEditing(true)}
                >
                  {t.formatMessage(messages.changeButton)}
                </Button>
              </Box>
            )}
          </Card>
        </Box>
      )}
    </>
  );
}

export default CommonAddressSection;
