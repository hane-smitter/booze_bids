import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import useStyles from './style/BannerFile.js';
import BgImage from '../../../images/boy.png';
import GgImage from '../../../images/girl.png';
import BannerBg from '../../../images/bannerbg.png';
import p1 from '../../../images/products/AustralianPassion.jpeg';
import p2 from '../../../images/products/Chardonnay.jpeg';
import p3 from '../../../images/products/chivas1ltr.jpeg';
import p4 from '../../../images/products/jb1liter.jpeg';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    Slider,
    useTheme,
    useMediaQuery
} from '@material-ui/core';

function Banner(props) {
    const classes = useStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} >
            <CardMedia
                className={classes.Media}
                image={props.item.image}
                title={props.item.Name}
            >
                {/* <Typography className={classes.MediaCaption}>
                    {props.item.Name}
                </Typography> */}
            </CardMedia>

        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name} >
                <CardMedia
                    className={classes.Media}
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className={classes.MediaCaption}>
                        {item.Name}
                    </Typography>
                </CardMedia>

            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className={classes.Banner}>
            <Grid container spacing={0} className={classes.BannerGrid}>
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Electronics",
        Caption: "Electrify your friends!",
        image:BgImage,
        contentPosition: "left",
        Items: [
            {
                Name: "A Passion",
                Image: p1// "https://source.unsplash.com/featured/?macbook"
            },
            {
                Name: "Chardonnay",
                Image: p2//"https://source.unsplash.com/featured/?iphone"
            }
        ]
    },
    {
        Name: "Home Appliances",
        Caption: "Say no to manual home labour!",
        contentPosition: "middle",
        image:GgImage,
        Items: [
            {
                Name: "Chivas",
                Image: p3//"https://source.unsplash.com/featured/?washingmachine"
            },
            {
                Name: "JB 1000ML",
                Image: p4//"https://source.unsplash.com/featured/?vacuum,cleaner"
            }
        ]
    },
    {
        Name: "Decoratives",
        Caption: "Give style and color to your living room!",
        contentPosition: "right",
        image:BgImage,
        Items: [
            {
                Name: "A Passion",
                Image: p1//"https://source.unsplash.com/featured/?lamp"
            },
            {
                Name: "Chardonnay",
                Image: p2//"https://source.unsplash.com/featured/?vase"
            }
        ]
    }
]

class BannerFile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: true,
            animation: "slide",
            indicators: false,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false,
            cycleNavigation: true
        }

        autoBind(this);
    }

    
    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        })
    }

    changeTimeout(event, value) {
        this.setState({
            timeout: value
        })
    }

    render() {
        return (
            <div style={{ marginTop: "100px", color: "#494949" }}>

                <Carousel
                    autoPlay={this.state.autoPlay}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    cycleNavigation={this.state.cycleNavigation}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                    next={(now, previous) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                    prev={(now, previous) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                    onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                    // fullHeightHover={false}
                    // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
                    // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
                    // indicatorContainerProps={{style: {margin: "20px"}}}
                    // NextIcon='next'
                >
                    {
                        items.map((item, index) => {
                            return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                        })
                    }
                </Carousel>


                
            </div>

        )
    }
}

export default BannerFile;