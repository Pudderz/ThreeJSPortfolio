import Link from "next/link";
import React, { useEffect, useState } from "react";
import  { PortfolioCanvas } from "../components/canvas";
import SmallFrontPage from "../components/smallFrontPage";
import { HomeProvider } from "../src/contexts/HomeContext";
import {getAllPostsForHome} from '../helpers/api'


export default function FrontPage(props) {
  const [windowWidth, setWindowWidth] = useState();

  const changeSize=(width)=>{
    console.log(width)
    console.log(`width is less than 1100 - ${width <= 1100}`)
    if (width <= 1100 && windowWidth === "large") {
      setWindowWidth("small");
      console.log('small')
      console.log(windowWidth)
    } else if (width > 1100 && windowWidth === "small") {
      setWindowWidth("large");
      console.log('large')
      console.log(windowWidth)
    }
    console.log(windowWidth ==='large')
  }

  useEffect(()=>{
    console.log('index mounted')
    setWindowWidth(
      window.innerWidth > 1100 ? "large" : "small"
    );
    window.addEventListener("resize", (e) => {
     changeSize(e.target.innerWidth)
     
    });
    return()=>{
      console.log('index unmounted')
      window.removeEventListener("resize", (e) => {
        changeSize(e.target.innerWidth)
      });
    }
  },[])
  return (
    <HomeProvider>
         
      <div>{windowWidth === "large" ? <PortfolioCanvas data={props.post}/> : <SmallFrontPage data={props.post} />}</div>
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
