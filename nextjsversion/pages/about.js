import React, {useEffect, useContext, useRef} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import {GlobalContext} from '../src/contexts/GlobalContext'
import { Power4 } from 'gsap/dist/gsap';
import { Fab, Icon } from '@material-ui/core'
 import LinkedInIcon from '@material-ui/icons/LinkedIn';
 import GitHubIcon from '@material-ui/icons/GitHub';
export default function About(props) {
  const { PreviousLocation, previousPageColour,setPreviousColour,setPreviousLocation, animation} = useContext(GlobalContext);
  let aboutRef = useRef(null);
  let loaderRef = useRef(null);
  
  useEffect(() => {
    console.log(previousPageColour)
    // if(PreviousLocation !=='about' && PreviousLocation !==null){
   animation.current.about.fromTo(aboutRef.current,
    {
       autoAlpha:0,
      
      width:'100%',
      right:'-100vw',
      fontSize: '12px',
    },{
      duration:1,
      width:'100%',
      right:'0',
      fontSize:'16px',
      autoAlpha:1,
      ease: Power4.easeInOut
    })  
  
    return()=>{
      animation.current.about.clear()
    }


  }, []);

  return (
    <div>

  <div>
     <div className="top" style={{zIndex:'100', justifyContent:'flex-end'}}>
          {/* <Link style={{ color: "white" }} href="/">
           <a><h2 style={{ color: "white" }}>Matthew Pudney</h2></a> 
          </Link> */}

          <Link style={{ color: "white" }} href="/">
           <a>Home</a>
          </Link>
        </div>
       
      <div className="about" ref={aboutRef} 
      // style={{position:'absolute'}}
      
      
      >     
        <div >
          <div className="textContainer">
            <div style={{display:'flex', gap:'1em', justifyContent:'flex-start', padding:'0', marginBottom:'20px'}}>
              <h2 style={{fontSize:'3em'}}>Hey, I'm Matthew</h2>
          <Fab 
          // color="secondary"
          size="small"
          >
            <LinkedInIcon/>
          </Fab >
          <Fab 
          // color="secondary"
          size="small"
          >
            <GitHubIcon/>
          </Fab>
        
            </div>
          
          <p>
            I'm a front-end web developer based in UK and looking for a
            full-time role
          </p>
        </div>
        <div className="textContainer">
          <h2>...</h2>

          <p>
            I love learning the massive scope of computer science which I find
            incredibly rewarding and exciting as there's always something more
            you can learn and improve on.
          </p>

          <p>
            I'm currently looking for an opportunity to work on a JavaScript
            framework and hope to learn and move to a full-stack position in the
            future.
          </p>

          <p>
            Thank you for checking out my portfolio and if you'd like to learn
            more about what makes me tick or if you have knowledge of any
            exciting opportunities feel free to let me know by visiting the
            contact section
          </p>
        </div>
        </div>
      </div>

      <div className="about">
        test
      </div>
    {/* <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/frontPage">
          <Button variant="contained" color="primary" >
            Go to the main page
          </Button>
        </Link>

      </Box>
    </Container> */}
    </div>
    </div>
  );
}
