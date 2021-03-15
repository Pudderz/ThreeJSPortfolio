import React, { useRef, useEffect, useState } from "react";
import { HomeProvider } from "../src/contexts/HomeContext";
import { getAllPostsForHome } from "../helpers/api";
import { useMediaQuery } from "@material-ui/core";
import json2mq from "json2mq";
import dynamic from 'next/dynamic';

const PortfolioCanvas = dynamic(() => import("../components/largeFrontPage"));
const SmallFrontPage = dynamic(() => import("../components/smallFrontPage"));


export default function FrontPage(props) {
  const [firstRun, setFirstRun] = useState(false);

  const matches = useMediaQuery(
    json2mq({
      minWidth: 900,
    })
  );

  useEffect(() => {
    setFirstRun(true);
  }, []);

  return (
    <HomeProvider>
      <div>
        {matches && firstRun && <PortfolioCanvas data={props.post} />}
        {!matches && firstRun && <SmallFrontPage data={props.post} />}
      </div>
    </HomeProvider>
  );
}

export async function getStaticProps() {
  const data = await getAllPostsForHome();

  return {
    props: {
      post: data ?? null,
    },
  };
}
