import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";
import router from "./router";
import { AuthProvider } from "./contexts/auth/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <Container py={5} w={"sm"} minH="100vh" h="full">
          <RouterProvider router={router} />
        </Container>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
