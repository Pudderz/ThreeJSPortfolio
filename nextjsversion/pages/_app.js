import React, { useRef } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import "../styles/App.css";
import { GlobalProvider } from "../src/contexts/GlobalContext";
// import Test from "../components/canvas";
import { useRouter } from "next/router";
import Layout from '../components/Layout'
import Title from "../components/Title";
import "../styles/App.scss"
// import { Transition } from "react-transition-group";
export default function MyApp(props) {
  const { Component, pageProps, router } = props;
  console.log(props)
  const route = useRouter();
  const tl = useRef();

  React.useEffect(() => {
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
          <Title path={router.pathname}/>
          <Layout path={router.pathname}>
                <Component
                  {...pageProps}
                  key={router.route}
                />
          </Layout>
        
        </GlobalProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
