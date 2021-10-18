import React, { useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";
import s1 from '../../../images/slider1.png';
import s2 from '../../../images/slider2.png';
import p1 from '../../../images/products/AustralianPassion.jpeg';
import p2 from '../../../images/products/Chardonnay.jpeg';
import p3 from '../../../images/products/chivas1ltr.jpeg';
import p4 from '../../../images/products/jb1liter.jpeg';
import { Card, CardMedia, Typography } from "@material-ui/core";
import useStyles from "./styles.js";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1, itemsToScroll: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 }
];

const BannerFile = () => {
  const classes = useStyles();
    const items = [
                {
                    i:50,
                    Name: "A Passion",
                    Image: s1// "https://source.unsplash.com/featured/?macbook"
                },
                {
                    i:100,
                    Name: "Chardonnay",
                    Image: s2//"https://source.unsplash.com/featured/?iphone"
                },
        ]

  return (
    <div className="App" style={{ marginTop: "100px" }}>
      {/* <div className="carousel-wrapper"> */}
        <Carousel breakPoints={breakPoints} pagination={false} enableAutoPlay={true} showArrows={false} easing="fadeIn 5s" transitionMs={700}>
          {items.map((item) => (
           
                <CardMedia
                    style={{
                      backgroundSize: 'contain',
                      width:'100%',
                      height: '200px',
                   }}
                    image={item.Image}
                    title={item.Name}
                >
                </CardMedia>
          ))}
        </Carousel>
      {/* </div> */}
    </div>
  );
}
export default BannerFile;