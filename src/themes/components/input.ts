import { ComponentStyleConfig } from "@chakra-ui/react";

const input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      rounded: "full",
      fontsize: "xl",
      px: 6,
      boxShadow: "0 4px 4px 0  rgba(0,0,0,0.25)",
    },
  },
  variants: {
    outline: {
      field: {
        bg: "white",
        border: "1px solid white",
        "::placeholder": { color: "#939598" },
      },
    },
  },
  sizes: {},
  defaultProps: {},
};

export default input;
