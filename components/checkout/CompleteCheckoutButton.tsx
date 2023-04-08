/* eslint-disable */ // component will be fulle redesigned
import { Box, Button, Grid, styled, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Looks5Icon from "@mui/icons-material/Looks5";

interface CompleteCheckoutButtonProps {
  isDisabled: boolean;
  isProcessing: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function CompleteCheckoutButton({
  isDisabled,
  isProcessing,
  children,
  onClick,
}: CompleteCheckoutButtonProps) {
  return (
    <>
    
      {isProcessing ? (
        <Box>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg> */}
          <svg style={{width:'70px', height:'70px'}} version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 100 100" enable-background="new 0 0 0 0">
              <path fill="#ff9905" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="rotate"
                  dur="1s" 
                  from="0 50 50"
                  to="360 50 50" 
                  repeatCount="indefinite" />
            </path>
          </svg>
        </Box>
      ) : (
        <Button
          onClick={onClick}
          disabled={isDisabled}
          type="submit"
          style={{
            backgroundColor: "#ff9905",
            color: "#3A3A3A",
            textTransform: "capitalize",
            borderRadius: "5px",
            textDecoration: "none",
          }}
          sx={{mt:2}}
        >
          {children}
        </Button>
      )}
    </>
  );
}

export default CompleteCheckoutButton;
