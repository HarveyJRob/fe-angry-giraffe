import React, { useState } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button onClick={scrollToTop} id="myBtn" style={{ display: visible ? "block" : "none" }}>
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default ScrollButton;
