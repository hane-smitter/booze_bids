import React, { useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";
import p1 from '../../../images/products/AustralianPassion.jpeg';
import p2 from '../../../images/products/Chardonnay.jpeg';
import p3 from '../../../images/products/chivas1ltr.jpeg';
import p4 from '../../../images/products/jb1liter.jpeg';
import { Card, CardMedia, Typography } from "@material-ui/core";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 }
];

const BannerFile = () => {
    const items = [
                {
                    Name: "A Passion",
                    Image: p1// "https://source.unsplash.com/featured/?macbook"
                },
                {
                    Name: "Chardonnay",
                    Image: p2//"https://source.unsplash.com/featured/?iphone"
                },
                {
                    Name: "Chivas",
                    Image: p3//"https://source.unsplash.com/featured/?washingmachine"
                },
                {
                    Name: "JB 1000ML",
                    Image: p4//"https://source.unsplash.com/featured/?vacuum,cleaner"
                },
                {
                    Name: "A Passion",
                    Image: p1//"https://source.unsplash.com/featured/?lamp"
                },
                {
                    Name: "Chardonnay",
                    Image: p2//"https://source.unsplash.com/featured/?vase"
                }
        ]

  return (
    <div className="App" style={{ marginTop: "100px" }}>
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints} pagination={false} enableAutoPlay={true} showArrows={false}>
          {items.map((item) => (
            <Item >
                <CardMedia
                    style={{backgroundSize: 'contain',
                    width:'200px',
                    height: '190px',
                    overflow: 'hidden'}}
                    image={item.Image}
                    title={item.Name}
                >
                <Typography 
                    style={{
                        textOverflow: 'ellipsis',
                        position: 'relative',
                        top: '50%',
                        alignItems:'right',
                        padding: '10px',
                        backgroundColor: 'black',
                        color: 'white',
                        opacity: '0.6',
                        maxWidth: '50%',
                        height: '7%',
                        fontSize: '18px',
                        fontWeight: '200',
                        transition: '300ms',
                        cursor: 'pointer'
                    }}
                >
                    {item.Name}
                </Typography>
                </CardMedia>
            </Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default BannerFile;