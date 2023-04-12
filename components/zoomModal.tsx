// @ts-nocheck
import React from "react";
import { Box } from "@mui/material";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import Paper, { PaperProps } from "@mui/material/Paper";
import client from "@/lib/sanity/client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function ZoomModal({ setZoomModalDetails, zoomModalDetails }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [open, setOpen] = React.useState(true);
  const [displayImage, setDisplayImage] = React.useState(
    zoomModalDetails.selectedImage.url
  );

  React.useEffect(()=>{
    console.log(displayImage)
  },[displayImage])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setZoomModalDetails((oldData) => ({
      ...oldData,
      display: false,
    }));
  };

  const nextItem = () => {
    const fullLength = zoomModalDetails.allImages.length - 1;
    zoomModalDetails.allImages.forEach((item, index) => {
      if (item.url === displayImage && fullLength !== index) {
        setDisplayImage(zoomModalDetails.allImages[index + 1].url);
      }
      if (item.url === displayImage && fullLength === index) {
        setDisplayImage(zoomModalDetails.allImages[0].url);
      }
    });
  };

  const prevItem = () => {
    const fullLength = zoomModalDetails.allImages.length - 1;
    zoomModalDetails.allImages.forEach((item, index) => {
      if (item.url === displayImage && fullLength >= index) {
        setDisplayImage(zoomModalDetails.allImages[index - 1].url);
      }
      if (item.url === displayImage && index <= 0) {
        setDisplayImage(zoomModalDetails.allImages[fullLength].url);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      maxWidth={"xl"}
    >
      <DialogTitle>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              height: "10px",
              width: "100%",
              cursor: "move",
              border: "0px solid",
            }}
            id="draggable-dialog-title"
          ></Box>
          <Box sx={{ border: "0px solid" }}>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <KeyboardArrowLeftIcon
                sx={{ cursor: "pointer" }}
                onClick={() => prevItem()}
              />
            </Box>
            <Box>
              {/* <PortableText value={displayImage} components={ptComponents} /> */}
              <img src={displayImage} width="800px" height="443px"/>
            </Box>
            <Box>
              <KeyboardArrowRightIcon
                sx={{ cursor: "pointer" }}
                onClick={() => nextItem()}
              />
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default ZoomModal;
