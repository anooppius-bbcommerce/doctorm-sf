// @ts-nocheck
import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { notNullable } from "@/lib/util";
import {
  CheckoutDetailsFragment,
  ShippingMethod,
  useCheckoutShippingMethodUpdateMutation,
  LanguageCodeEnum,
} from "@/saleor/api";
import { messages } from "@/lib/i18n";
import { ShippingMethodDisplay } from "./ShippingMethodDisplay";
import { ShippingMethodOption } from "./ShippingMethodOption";
import Looks3Icon from "@mui/icons-material/Looks3";
import { Box, Button, Grid, styled, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { checkoutSectionHeaderActive } from "./EmailSection";
import Typography from "@mui/material/Typography";

export interface ShippingMethodSectionProps {
  checkout: CheckoutDetailsFragment;
  active: boolean;
  locale: LanguageCodeEnum;
}

export function ShippingMethodSection({
  checkout,
  active,
  locale,
}: ShippingMethodSectionProps) {
  const t = useIntl();

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    checkout.shippingMethod
  );
  const [editing, setEditing] = useState(!checkout.shippingMethod);

  const [checkoutShippingMethodUpdate] =
    useCheckoutShippingMethodUpdateMutation({});

  const handleChange = async (method: ShippingMethod) => {
    const { data } = await checkoutShippingMethodUpdate({
      variables: {
        token: checkout.token,
        shippingMethodId: method.id,
        locale: locale,
      },
    });
    if (data?.checkoutShippingMethodUpdate?.errors.length) {
      // todo: handle errors
      console.error(data?.checkoutShippingMethodUpdate?.errors);
      return;
    }
    setSelectedDeliveryMethod(method);
    setEditing(false);
  };

  const availableShippingMethods =
    checkout.availableShippingMethods.filter(notNullable) || [];

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        {/* <Box>
          <Looks3Icon />
        </Box> */}
        <Typography
          sx={checkoutSectionHeaderActive}
          className={
            active
              ? "checkout-section-header-active"
              : "checkout-section-header-disabled"
          }
        >
          {t.formatMessage(messages.shippingMethodCardHeader)}
        </Typography>
      </Box>

      {active && (
        <Box>
          <Card sx={{ p: 2 }}>
            {editing ? (
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={handleChange}
                className="py-8"
              >
                <Box sx={{ cursor: "pointer" }}>
                  {availableShippingMethods.map((method) => {
                    // todo: Investigate why filter did not excluded non existing methods
                    if (!method) {
                      return null;
                    }
                    return (
                      <ShippingMethodOption
                        method={method}
                        key={method.id}
                        locale={locale}
                      />
                    );
                  })}
                </Box>
              </RadioGroup>
            ) : (
              <section className="flex justify-between items-center mb-4">
                {!!checkout.shippingMethod && (
                  <ShippingMethodDisplay method={checkout.shippingMethod} />
                )}
                <div className="flex justify-between items-center">
                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => setEditing(true)}
                    style={{
                      backgroundColor: "#ff9905",
                      color: "#3A3A3A",
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    {t.formatMessage(messages.changeButton)}
                  </Button>
                </div>
              </section>
            )}
          </Card>
        </Box>
      )}
    </>
  );
}

export default ShippingMethodSection;
