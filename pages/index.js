import React, { useRef, useEffect, useState } from "react";
import { PortfolioCanvas } from "../components/largeFrontPage";
import SmallFrontPage from "../components/smallFrontPage";
import { HomeProvider } from "../src/contexts/HomeContext";
import { getAllPostsForHome, getAllPostsWithImages } from "../helpers/api";
import { createImage } from "../helpers/getImage";
import { useMediaQuery } from "@material-ui/core";
import json2mq from "json2mq";

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

  //creates pictures in public/images
  const allData = await getAllPostsWithImages();
  await allData?.map(async (data) => {
   await createImage(data?.slug, data?.mainImage?.url);
  });

  return {
    props: {
      post: data ?? null,
    },
  };
}
