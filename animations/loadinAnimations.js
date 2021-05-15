import { Power3, Power4 } from "gsap";

export function homePageLoadInStart(animation, screen, body) {
  screen.style.width = "100%";
  screen.style.left = "0";

  animation.fromTo(
    screen,
    {
      opacity: 0,
    },
    {
      duration: 0.6,
      opacity: 1,
    }
  );

  animation.to(screen, {
    duration: 0.8,
    left: "100%",
  });

  animation.to(
    body,
    {
      opacity: "1",
      pointerEvents: "auto",
      duration: 0.5
    },
    "-=0.2"
  );
}

export function homePageLoadInDefault(animation, screen, body) {
  animation.to(body, {
    duration: 0.8,
    opacity: "1",
    pointerEvents: "auto",
  });
}

export function canvasPictureLoadInStart(timeline, picture, endPoint) {
  picture.rotation.x = 0;
  picture.rotation.z = 0;
  picture.rotation.y = 0;

  timeline.fromTo(
    picture.position,
    {
      x: 0,
      z: 2,
      y: -10,
    },
    {
      duration: 3,
      x: 0,
      y: 0,
      z: 0,
      ease: Power4.easeInOut,
    }
  );
  timeline.add(
    picture.rotation,
    {
      duration: 0.8,
      x: -0.3,
      y: -0.35,
      z: -0.12,
      ease: Power4.easeInOut,
    },
    "-=0.8"
  );
  timeline.to(
    picture.position,
    {
      duration: 0.8,
      x: 0.8,
      y: 0,
      z: 0.1,
      ease: Power4.easeInOut,
    },
    "-=0.8"
  );
}

export function canvasPictureLoadInDefault(timeline, picture, endPoint) {
  timeline.to(
    picture.rotation,
    {
      duration: 0.8,
      x: -0.3,
      y: -0.35,
      z: -0.12,
      ease: Power4.easeInOut,
    },
    "-=0.8"
  );
  timeline.to(
    picture.position,
    {
      duration: 0.8,
      x: 0.8,
      y: 0,
      z: 0.1,
      ease: Power4.easeInOut,
    },
    "-=0.8"
  );
  timeline.from(
    picture,
    {
      duration: 2.8,
      autoAlpha: 0,
      ease: Power4.easeInOut,
    },
    "-=0.8"
  );
}

export function projectPageLoadInStart(animation, information) {
  animation.fromTo(
    information,
    {
      opacity: 0,
    },
    {
      duration: 1,
      opacity: 1,
      ease: Power3.easeInOut,
    }
  );
}

export function projectPageLoadInDefault(animation, information) {
  animation.fromTo(
    information,
    {
      left: "-100%",
    },
    {
      duration: 1,
      left: "0%",
      ease: Power3.easeInOut,
    }
  );
}

export function aboutLoadInStartAnimation(animation, aboutPage) {
  animation.fromTo(
    aboutPage,
    {
      autoAlpha: 0,
    },
    {
      duration: 1,
      autoAlpha: 1,
    }
  );
}
export function aboutLoadInDefaultAnimation(animation, aboutPage) {
  animation.fromTo(
    aboutPage,
    {
      position: "absolute",
      autoAlpha: 1,
      zIndex: 200,
      width: "100%",
      right: "-100vw",
      fontSize: "12px",
    },
    {
      position: "absolute",
      duration: 1,
      zIndex: 200,
      width: "100%",
      right: "0",
      fontSize: "16px",
      autoAlpha: 1,
      ease: Power4.easeInOut,
    }
  );
}

export function backgroundLoadInStart(timeline, background) {
  timeline
    .to(background, {
      duration: 1,
      height: "100%",
    })
    .delay(1.5);
  timeline.to(background, {
    duration: 0.5,
    width: "100%",
  });
}

export function backgroundLoadInDefault(timeline, background) {
  timeline.fromTo(
    background,
    {
      width: "100%",
      opacity: 0,
    },
    {
      opacity: 1,
      width: "100%",
      duration: 1,
    }
  );
}
