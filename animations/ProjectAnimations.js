import { TweenMax } from "gsap/dist/gsap";

export function imagePositionAnimation(image){
    return TweenMax.fromTo(
        image.position,
        1,
        {
          x: 0.8,
          y: 0,
          z: 0.1,
        },
        {
          duration: 0.5,
          x: 0,
          y: 0.3,
          z: 0,
          paused: true,
        }
      );
}
export function imageRotationAnimation(image){
 return TweenMax.fromTo(
    image.rotation,
    1,
    {
      x: -0.3,
      y: -0.35,
      z: -0.12,
    },
    {
      duration: 1,
      x: -0.5,
      y: 0,
      z: 0,
      paused: true,
    }
  );
}


export function canvasListAnimation(animation,description, nav, markers){

    animation.fromTo(
      description,
      {
        display: "none",
      },
      {
        display: "block",
        duration: 0,
      }
    );
    animation.fromTo(
      nav,
      {
        width: "50px",
      },
      {
        width: "fit-content",
        duration: 0,
      }
    );
    animation.fromTo(
      markers,
      {
        width: "fit-content",
      },
      {
        duration: 0.3,
        width: "100px",
      }
    );
    animation.to(description, {
      duration: 0,
      visibility: "visible",
    });
    animation.to(markers, {
      duration: 0.3,
      width: "0%",
    });

}