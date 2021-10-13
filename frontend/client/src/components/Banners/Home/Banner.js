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
import useStyles from "./styles.js";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 }
];

const BannerFile = () => {
  const classes = useStyles();
    const items = [
                {
                    i:50,
                    Name: "A Passion",
                    Image: p1// "https://source.unsplash.com/featured/?macbook"
                },
                {
                    i:100,
                    Name: "Chardonnay",
                    Image: p2//"https://source.unsplash.com/featured/?iphone"
                },
                {
                    i:50,
                    Name: "Chivas",
                    Image: p3//"https://source.unsplash.com/featured/?washingmachine"
                },
                {
                    i:20,
                    Name: "JB 1000ML",
                    Image: p4//"https://source.unsplash.com/featured/?vacuum,cleaner"
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
                    overflow: 'hidden',
                    border:'2px solid #2b5681',
                    padding:'3px'
                   }}
                    image={item.Image}
                    title={item.Name}
                >
                  <Typography 
                  variant="h6"
                  className={classes.ribbon}
                  >BID NOW!!
                  </Typography><br/>

                  <Typography 
                  variant="p"
                  className={classes.ribbon3}
                  ><span style={{alignItems:'right'}}>Ends in 9h {item.i}m<br/>
                  Slots: {(item.i)*10}</span>
                  </Typography><br/>

                  <Typography 
                    className={classes.ribbon2}
                  >KES. {item.i}
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