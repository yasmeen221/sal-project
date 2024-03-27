import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
// extend from this mean take all props of box
interface pageProps extends BoxProps {
  docTitle: String;
  children: ReactNode;
}
const page = ({ docTitle, children, ...rest }: pageProps) => {
  useEffect(() => {
    document.title = "Sal | " + docTitle;
  }, [docTitle]);
  return (
    <Box as="main" {...rest}>
      {children}
    </Box>
  );
};

export default page;
