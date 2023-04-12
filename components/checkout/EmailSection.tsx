import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import {
  CheckoutDetailsFragment,
  useCheckoutEmailUpdateMutation,
  LanguageCodeEnum,
} from "@/saleor/api";
import { Box, Button, Grid, styled, Card } from "@mui/material";
import { messages } from "@/lib/i18n";
import Divider from "@mui/material/Divider";
import { Roboto } from "@next/font/google";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircleIcon from "@mui/icons-material/Circle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import LockIcon from "@mui/icons-material/Lock";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import {textBoxStyler} from "../../lib/styles/commonStyles";
import EditIcon from '@mui/icons-material/Edit';

export interface EmailSectionProps {
  checkout: CheckoutDetailsFragment;
  locale: LanguageCodeEnum;
}
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const checkoutSectionHeaderActive = {
  border: "0px solid #000",
  fontSize: "24px",
  fontWeight: "bold",
  marginLeft: "0px",
};
const errorMessage = {
  color: "red",
  fontSize: "14px",
};

export function EmailSection({ checkout, locale }: EmailSectionProps) {
  const t = useIntl();
  const [modifyEmail, setModifyEmail] = useState(!checkout?.email);

  const [checkoutEmailUpdate] = useCheckoutEmailUpdateMutation({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: checkout?.email || "",
    },
  });
  const onEmailFormSubmit = handleSubmit(async (formData) => {
    const result = await checkoutEmailUpdate({
      variables: {
        email: formData.email,
        token: checkout?.token,
        locale: locale,
      },
    });
    const mutationErrors = result.data?.checkoutEmailUpdate?.errors || [];
    if (mutationErrors.length > 0) {
      mutationErrors.forEach((e) =>
        setError("email", { message: e.message || "" })
      );
      return;
    }
    setModifyEmail(false);
  });

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* <Box>
          <LooksOneIcon />
        </Box> */}
        <Typography sx={checkoutSectionHeaderActive}>
          {t.formatMessage(messages.emailAddressCardHeader)}
        </Typography>
        {!modifyEmail && (<Box sx={{ml:1,mt:.5}}>
          <EditIcon sx={{fontSize:'20px', color:'#F7961C', cursor:'pointer'}} onClick={() => setModifyEmail(true)}/>
        </Box>)}
      </Box>
      <Box>
        <Card sx={{ p: 2 }}>
          {!modifyEmail ? (
            <Box className="flex justify-between items-center">
              <p className="text-base">{checkout?.email}</p>
              {/* <Button
                variant="contained"
                onClick={() => setModifyEmail(true)}
                style={{
                  backgroundColor: "#ff9905",
                  color: "#3A3A3A",
                  textTransform: "capitalize",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                {t.formatMessage(messages.changeButton)}
              </Button> */}
            </Box>
          ) : 
          (
            <form method="post" onSubmit={onEmailFormSubmit}>
              <Box sx={textBoxStyler}>
                <Box className="col-span-full">
                  <TextField
                    className="NestedChildSelector"
                    id="outlined-basic"
                    label={t.formatMessage(messages.email)}
                    required
                    variant="outlined"
                    sx={{width:"100%"}}
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    
                  />
                  <Typography sx={errorMessage}>
                    {errors.email?.message}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    className="btn-checkout-section"
                    style={{
                      backgroundColor: "#ff9905",
                      color: "#3A3A3A",
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                    sx={{width:'100%'}}
                  >
                    {t.formatMessage(messages.saveButton)}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Card>
      </Box>
    </>
  );
}

export default EmailSection;
