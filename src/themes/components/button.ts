import { ComponentStyleConfig } from "@chakra-ui/react";

const button: ComponentStyleConfig = {
  baseStyle: {
    rounded: "full",
    fontWeight: "light",
  },

  sizes: {
    md: {
      fontSize: "xl",
      px: 8,
      py: 2,
      lineHeight: 1,
    },
    mdSlime: ({ theme }) => {
      return {
        ...theme.components.Button.sizes?.md,
        px: 4,
        py: 6,
        lineHeight: 1,
      };
    },
  },
  defaultProps: {
    colorScheme: "primary",
  },
};

export default button;
