import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import './index.css'
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./themes/index.ts";
import AuthContextProvider from "./components/providers/AuthContextProvider.tsx";
import QueryErrorProvider from "./components/providers/QueryErrorProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryErrorProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QueryErrorProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
