
import React from "react";
import { PortfolioCanvas } from "../components/canvas";
import SmallFrontPage from "../components/smallFrontPage";
import { HomeProvider } from "../src/contexts/HomeContext";
import { getAllPostsForHome, getAllPostsWithImages } from "../helpers/api";
import { createImage } from "../helpers/getImage";
 import {useMediaQuery} from '@material-ui/core';
 import json2mq from 'json2mq';
export default function FrontPage(props) {

  const matches = useMediaQuery(
    json2mq({
      minWidth: 900,
    }),
  );

console.log(`matches`)
console.log(matches)

  return (
    <HomeProvider>
      <div>
        {(matches) && (
          <PortfolioCanvas data={props.post} />
        )}
        {(!matches && typeof window != 'undefined') && (
          <SmallFrontPage data={props.post} />
        )}
      </div>
    </HomeProvider>
  );
}

export async function getStaticProps() {
  const data = await getAllPostsForHome();


//creates pictures in public/images
  const allData = await getAllPostsWithImages();
  allData?.map((data) =>{
    console.log(data?.slug, data?.mainImage?.url)
    createImage(data?.slug, data?.mainImage?.url)
  });

  return {
    props: {
      post: data ?? null,
    },
  };
}
