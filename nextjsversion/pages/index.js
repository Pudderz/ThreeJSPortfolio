import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
// import Link from '../src/Link';
import Link from 'next/link'
import Copyright from '../src/Copyright';
import { CSSTransition } from 'react-transition-group'
import { TweenMax } from 'gsap'
import Home from '../components/Home'
export default function Index() {
  const onEnter = (node) => {
    TweenMax.from(
      [node.children[0].firstElementChild, node.children[0].lastElementChild],
      0.6,
      {
        y: 30,
        delay: 0.6,
        ease: 'power3.InOut',
        opacity: 0,
        stagger: {
          amount: 0.6,
        },
      },
    )
  }

  const onExit = (node) => {
    TweenMax.to(
      [node.children[0].firstElementChild, node.children[0].lastElementChild],
      0.6,
      {
        y: -30,
        ease: 'power3.InOut',
        stagger: {
          amount: 0.2,
        },
      },
    )
  }
  return (
    <Container maxWidth="sm">
    <CSSTransition
          in={true}
          timeout={1200}
          classNames="page"
          onExit={onExit}
          onEntering={onEnter}
          unmountOnExit
        >
          <div className="page">
            <Home />
          </div>
        </CSSTransition>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
         <a>Go to the about page</a>
        </Link>
        <ProTip />
        <Copyright />
      </Box>

    </Container>
  );
}
