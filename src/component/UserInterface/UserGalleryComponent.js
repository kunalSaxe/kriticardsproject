import React, { useState, useEffect } from 'react';
import { Card, makeStyles } from '@material-ui/core';
import { ServerURL, getData, postDataup } from '../FetchNodeService';
import Aos from 'aos';
import "aos/dist/aos.css"

const useStyles = makeStyles((theme) => ({
    image: {
        zIndex: -1,
        transition: 'all 0.4s',
        "&:hover": {
            transform: 'scale(1.2)',
        }
    }
}))


export const UserGalleryComponent = (props) => {
    
    const classes = useStyles()
    var itemProps = props.item;
  
    const [status, setStatus] = useState(false)
    useEffect(function () {
        Aos.init({ duration: 2000 })
    }, [])
    const [CardStyle, setCardStyle] = useState({
        width: 250,
        margin: 15,
        height:300,

        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.8s ease',

    });





    const handleProps = () => {
        props.history.push({ pathname: "/cardview" }, { 'itemprops': itemProps })
    }

    return (
        <div onClick={() => handleProps()} style={{}}>

            <Card data-aos="zoom-in-up" style={CardStyle} elevation="3"  >

                <div  >
                    <img className={classes.image} src={`${ServerURL}/images/${itemProps.picture}`} width="100%" height="100%" />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: 'white', padding: 10, display: 'flex', justifyContent: "center", alignItems: 'center', textTransform: "capitalize",flexDirection:'column', fontSize: 18, zIndex: 1 }}>
                    <div style={{fontWeight:600}}>{itemProps.cardcode}</div>                <div> &#8377; {itemProps.price}</div>

                </div>
              

            </Card>

        </div>




    )

}
