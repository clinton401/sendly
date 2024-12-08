export const appearAnimation = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            ease: "easeIn",
            duration: 0.3
        }
    }
}
export const hamMenu = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
        y: 50,
        transition: {
            duration: 0.2,
            ease: "easeIn",
          },
    }
  };