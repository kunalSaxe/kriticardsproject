import React, { useState, useEffect, createRef } from "react";
import Header from "./Header";
import { makeStyles, ThemeProvider, createTheme, } from "@material-ui/core/styles";
import { Grid, Button, TextField, Hidden } from '@material-ui/core'
import {ServerURL, postData } from "../FetchNodeService";
import Link from '@material-ui/core/Link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";

import { useDispatch } from 'react-redux';



const useStyles = makeStyles((theme) => ({

    bigSlider: {
        width: '370px',
        height: '400px',
        padding: 10,
        display: 'flex',
        cursor: "pointer",
        [theme.breakpoints.down('xs','md')]: {
            width: '250px',
            height: '250px',
            padding: 10,
            display: 'flex',
            cursor: "pointer",
            justifyContent: 'center',
            marginLeft: '30px'
        },
    },
    content:{
        display:'flex',
        paddingBottom:'10px',
        [theme.breakpoints.down('xs')]:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        },
        [theme.breakpoints.down('md')]:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }

    }

}));

const theme = createTheme({
    palette: {
        primary: {
            main: '#000',
        },
    },


});

export default function CardView(props) {
    const classes = useStyles();
    const [cardPic, setCardPic] = useState([])
    const [Quantity, setQuantity] = useState('')
    var dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)

    const [picSelected, setPicSelected] = useState('')

    var itemProps = props.location.state.itemprops


    var picBigSlider = createRef()
    var picSlider = createRef()

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,

    };

    var bigSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };
    var bigSettings2 = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };




    
    const clickThumbNails = (item, index) => {
        setPicSelected(item.pictureid);
        picSlider.current.slickNext()
        picBigSlider.current.slickGoTo(index)
    }

    const fetchAllFinalProductspicture = async () => {
        var body = { cardcode: itemProps.cardcode }
        const result = await postData("carditem/fetchallproductpictures", body)
        setCardPic(result.data)
    }

    useEffect(function () {
        fetchAllFinalProductspicture()
    }, [])
    const [User, setUser] = useState([]);
    const  checkSession=()=>{
        if(!localStorage.getItem('user')){
          props.history.replace({pathname:'/home'})
        }else{
          var adm=JSON.parse(localStorage.getItem('user'))

          setUser(adm[0])
        }
      }

      useEffect(function(){
          checkSession()
      },[])



    const handleCart = (value) => {
        if (parseInt(itemProps.stock) <= 0) {
            alert("not enough stock")
        }
        else {
            if (parseInt(itemProps.stock) < parseInt(Quantity)) {
                alert("more than stock")
            }
            else {
                var data = { ...itemProps, Quantity };
                if (value == 0) {
                    dispatch({ type: "REMOVE_CART", payload: [itemProps.cardcode] });
                } else {
                    dispatch({ type: "ADD_CART", payload: [itemProps.cardcode, data] });
                }
                setRefresh(!refresh);
            }
        }

    };

    const showProductPicture = () => {


        return cardPic.map((item, index) => {
            return (

                <div style={{
                    display: 'flex',
                 flexDirection: 'column',


                }}>

                    <div
                        onClick={() => clickThumbNails(item, index)}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',


                            
                            width: '100%',
                            height: 100,
                            cursor: 'pointer',
                            borderRadius: 5,

                        }}>

                        <img
                            src={`${ServerURL}/images/${item.picture}`}
                            width={72} height={72}

                        />

                    </div>



                </div>


            )
        }
        )

    }

    const showBigProductPicture = () => {

        return cardPic.map((item) => {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',



                }}>
                    <div className={classes.bigSlider}>



                        <img
                            src={`${ServerURL}/images/${item.picture}`}
                            width="100%"


                        />

                    </div>


                </div>

            )
        }
        )

    }


    const displayProduct = (props) => {
        return (
            <div style={{ paddingInline: 25 }}>
                <Grid container xs={12} spacing={3}>


                    <Grid item xs={12} sm={12} lg={7} >
                        <div style={{ display: 'flex', justifyContent: 'center', fontSize: 25, fontFamily: 'sans-serif',margin:'30px' }}>Card View</div>



                        <Hidden smUp>
                            <div>

                                <Slider   {...bigSettings2} ref={picBigSlider}>
                                    {showBigProductPicture()}
                                </Slider>


                            </div>
                        </Hidden>

                        <Hidden xsDown >
                            <div>

                                <Slider   {...bigSettings} ref={picBigSlider}>
                                    {showBigProductPicture()}
                                </Slider>


                            </div>
                        </Hidden>




                        <Grid item xs={12}>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: 350 }}>
                                    <Slider {...settings} ref={picSlider}>
                                        {showProductPicture()}
                                    </Slider>
                                </div>
                            </div>
                        </Grid>


                    </Grid>


                    <Grid className={classes.content} item xs={12} sm={12} lg={5} >

                        <div style={{ marginTop: '35px' }} >
                            <div style={{ display: 'flex',  justifyContent: 'flex-start', marginTop:'50px'}}>
                                <div style={{  letterSpacing: 1 }}>
                                <span style={{ fontSize: 25,fontWeight: 600 }}>Cardcode: &nbsp;</span><span style={{fontSize:25,fontWeight:500}}> {itemProps.cardcode}</span>
                                </div>
                                
                            </div>
                            <div style={{marginTop:'35px'}}>
                                    <span style={{ fontSize: 22 }}><span style={{ fontWeight: 600 }}>Price: &nbsp;</span>&#8377;{itemProps.price}</span>
                                </div>


                         

                            <div 
                            style={{ display: 'flex',justifyContent: 'left', marginTop:'35px', fontSize: 22 }}
                            >
                                <span><span style={{ fontWeight: 500 }}>Stock: </span>{itemProps.stock}</span>
                            </div>
                            <div style={{
                                paddingTop: 5,
                                letterSpacing: 1,
                                fontSize: 16,
                                fontWeight: 700,
                                fontFamily: 'sans-serif'
                            }}
                            >
                                {itemProps.stock == 0 ? (
                                    <span style={{ color: "red" }}>Out of Stock</span>
                                ) : itemProps.stock >= 1 && itemProps.stock <= 3 ? (
                                    <span style={{ color: "orange" }}>
                                        Hurry Only {itemProps.stock} item(s) is left
                                    </span>
                                ) : (
                                    <span style={{ color: "green" }}>In Stock</span>
                                )}
                            </div>

                            <ThemeProvider theme={theme}>
                                <Grid item xs={8} style={{ marginTop: '25px',width:'300px' }} >
                                    <TextField fullWidth onChange={(event) => setQuantity(event.target.value)} id="standard-required" label='Enter Quantity' />
                                </Grid>
                                {Quantity > 25 ?<Grid xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }} item>
                                    <Link href="#" style={{color:'green' ,fontWeight:550}} variant="body2">
                                        {"Minimum Quantity is 25"}
                                    </Link>
                                </Grid> :<Grid xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }} item>
                                <Link href="#" style={{color:'red' ,fontWeight:550}} variant="body2">
                                        {"Minimum Quantity is 25"}
                                    </Link>
                                </Grid>} 
                            </ThemeProvider>

                            <div style={{ paddingTop: '70px' }}>
                                {Quantity < 25 ? <><Button disabled style={{ display: 'flex', justifyContent: 'center', background: 'pink', color: '#fff', padding: 10, textAlign: 'center', fontFamily: 'Helvetica', fontSize: 22, letterSpacing: 2, cursor: 'pointer', width: 300, borderRadius: 5 }}>
                                    Book
                                </Button>

                                </>
                                    : <Button onClick={() => handleCart()} style={{ display: 'flex', justifyContent: 'center', background: '#ff80ab', color: '#fff', padding: 10, textAlign: 'center', fontFamily: 'Helvetica', fontSize: 22, letterSpacing: 2, cursor: 'pointer', width: 300, borderRadius: 5 }}>
                                        Book
                                    </Button>}

                            </div>
                        </div>
                    </Grid>

                </Grid>
            </div>
        )
    }


    return (
        <div>
            <Header history={props.history} />
           
            {displayProduct()}


            <Footer history={props.history} />
        </div>
    )
}