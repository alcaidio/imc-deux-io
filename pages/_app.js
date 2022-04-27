import { ChakraProvider } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "../styles/globals.css";
dayjs.locale("en");

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
