import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Container w={"sm"} minH="100vh" h="full">
        <RouterProvider router={router} />
      </Container>
    </ChakraProvider>
  </React.StrictMode>
);
