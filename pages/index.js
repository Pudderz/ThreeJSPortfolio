import React, { useRef, useEffect, useState } from "react";
import { PortfolioCanvas } from "../components/homePage/largeDisplays/largeFrontPage";
import SmallFrontPage from "../components/homePage/smallDisplays/smallFrontPage";
import { getAllPostsForHome, getAllPostsWithImages } from "../helpers/api";
import { createImage } from "../helpers/getImage";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';

export default function FrontPage(props) {
  const [firstRun, setFirstRun] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(
    theme.breakpoints.up('md')
  );

  useEffect(() => {
    setFirstRun(true);
  }, []);
props
  return (
      <div>
        {matches && firstRun && <PortfolioCanvas data={props.post} images ={JSON.parse(props.images)}/>}
        {!matches && firstRun && <SmallFrontPage data={props.post} images = {JSON.parse(props.images)}/>}
      </div>
  );
}

export async function getStaticProps() {
  const data = await getAllPostsForHome();

  //creates pictures in public/images
  const allData = await getAllPostsWithImages();
  await allData?.map(async (data) => {
   await createImage(data?.slug, data?.mainImage?.url);
  });


  const images = {}
  allData?.map((data)=>{
    images[data.slug] = require(`../public/images/${data.slug}.png`);
    console.log(images[data.slug])
  })
  return {
    props: {
      post: data ?? null,
      images: JSON.stringify(images) ?? null
    },
  };
}
