import React, {useEffect} from "react";
import {makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import { Avatar, Grid,} from "@material-ui/core";
import Footer from "./Footer";
import Aos from 'aos';
import 'aos/dist/aos.css'

const useStyle = makeStyles((theme) => ({
  large: {
    width: theme.spacing(85),
    height: theme.spacing(50),
    borderRadius: 10,
    [theme.breakpoints.down('xs')]: {
      width: '300px',
      height: '200px',
      borderRadius: 10,
    }


  },
  photo: {
    margin: '40px',
      [theme.breakpoints.up('md')]: {
      marginLeft: '110px',
    },


  },
  content: {
    display: 'flex', fontWeight: '600px', fontSize: '25px', margin: '20px', padding: '30px', fontFamily: ' sans-serif;', marginTop: '70px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '0px',
    }


  }
}));

export default function Home(props) {
  const classes = useStyle();
  var homesliderSettings = {
    dots: true,
    fade: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 1000,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,

  };


  useEffect(function () {
    Aos.init({
      offset: 120,
      delay: 0,
      easing: 'ease',
      duration: 1000,
      disable: false, 
      once: false,
      mirror: false, 
      startEvent: 'DOMContentLoaded'

    });

  }, [])


  return (


    <Grid container xs={12}>
      <Grid item xs={12} >
        <Header history={props.history} />
      </Grid>

      <Grid item xs={12} sm={12} lg={12} >
        <Slider    {...homesliderSettings} >
          <img src="/banner22.png" width='50px' height='550px' />
          <img src="/banner 1.png" width='50px' height='550px' />
          <img src="/banner22.png" width='50px' height='550px' />
          <img src="/banner 1.png" width='50px' height='550px' />


        </Slider>
      </Grid>

      <Grid item xs={10} sm={12} lg={6} >
        <div className={classes.photo} >
          <Avatar
           data-aos="fade-up"
            
            variant='rounded' className={classes.large} src="/main.jpg" />

        </div>
      </Grid>

      <Grid item xs={10} sm={12} lg={6}  >
        <div 
        data-aos="fade-up"
          
           className={classes.content}
        >

          The Most Professional Place i felt soo good got the Premium Card for so less Price for sure the Best in Quality & Pricing in Gwalior Would love to get more cards & Services from here Thank you :)

        </div>

      </Grid>


      <Grid item xs={12} >
        <Footer />
      </Grid>
    </Grid>




  )
}