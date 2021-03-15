import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/theme";
import { GlobalProvider } from "../src/contexts/GlobalContext";
import TransitionLayout from '../components/Common/TransitionLayout'
import Title from "../components/HomePage/SmallDisplay/Title";
import "../styles/App.scss"

export default function App(props) {
  const { Component, pageProps, router } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Portfolio</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalProvider>
        {router.pathname !== "/" && router.pathname !== "/about" && <Title path={router.pathname}/>}
          <TransitionLayout path={router.pathname}>
                <Component
                  {...pageProps}
                  key={router.route}
                />
          </TransitionLayout>
        </GlobalProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
