import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";
import s1 from '../../../images/slider1.png';
import s2 from '../../../images/HEAD MAST HOLIDAY FINAL.png';
import ms1 from '../../../images/mslider1.png';
import ms2 from '../../../images/mslider2.png';
import p1 from '../../../images/products/AustralianPassion.jpeg';
import p2 from '../../../images/products/Chardonnay.jpeg';
import p3 from '../../../images/products/chivas1ltr.jpeg';
import p4 from '../../../images/products/jb1liter.jpeg';
import { Card, CardMedia, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import useStyles from "./styles.js";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1, itemsToScroll: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 }
];

const BannerFile = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const slider1 = isMobile ? ms1 : s1
  const slider2 = isMobile ? ms2 : s2
  
    const items = [
                {
                    i:50,
                    Name: "A Passion",
                    Image: slider1// "https://source.unsplash.com/featured/?macbook"
                },
                {
                    i:100,
                    Name: "Chardonnay",
                    Image: slider2//"https://source.unsplash.com/featured/?iphone"
                },
        ]
        const carouselRef = useRef(null);
        const totalPages = Math.ceil(items.length / breakPoints.itemsToShow)
        let resetTimeout;
        const onNextStart = (currentItem, nextItem) => {
          if (currentItem.index === nextItem.index) {
            // we hit the last item, go to first item
            carouselRef.current.goTo(0);
          }
        };
        
        const onPrevStart = (currentItem, nextItem) => {
          if (currentItem.index === nextItem.index) {
            // we hit the first item, go to last item
            carouselRef.current.goTo(items.length);
          }
        };
  return (
    <div className="App" style={{ marginTop: "100px" }}>
      {/* <div className="carousel-wrapper"> */}
        <Carousel breakPoints={breakPoints} pagination={false} enableAutoPlay={true} showArrows={false} easing="fadeIn 5s" transitionMs={700}
        ref={carouselRef}
        onNextEnd={({ index }) => {
              clearTimeout(resetTimeout)
              if (index + 1 === totalPages) {
                resetTimeout = setTimeout(() => {
                    carouselRef.current.goTo(0)
                }, 1500) // same time
              }
          }}>
          {items.map((item) => (
           
           <img src={item.Image} style={{
            objectFit: isMobile ? 'cover' : 'fill',
            width:'100%',
            height: '200px'
           }}/>
          ))}
        </Carousel>
      {/* </div> */}
    </div>
  );
}
export default BannerFile;