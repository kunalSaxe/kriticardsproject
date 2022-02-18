import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => {

})

const Footer = () => {
    const classes = useStyles()

    return (
        <div>
            <Grid container xs={12} direction='column' style={{marginTop:20,backgroundColor:"#ffe6f2"}}>
                <Grid  item xs={12} md={12} style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'30px'}}>
                    <img src="/kc.png" width="400px" height="150px" />
                </Grid>

                <Grid item container direction='row' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <span style={{margin:20}}>
                            <img src="/facebook.png" width="40px"/>
                        </span>
                        <span style={{margin:20}}>
                            <img src="/instagram.png" width="40px"/>
                        </span>
                        <span style={{margin:20}}>
                            <img src="/linkedin.png" width="40px"/>
                        </span>
                        <span style={{margin:20}}>
                            <img src="/gmail.png" width="40px"/>
                        </span>
                </Grid>

                <Grid  conatiner xs={12} sm={12} lg={12} style={{ fontFamily:'calibri',display:'flex',justifyContent:'flex-end',alignItems:'center',padding:7,paddingBottom:'10px'}}>
                    <Grid item style={{fontWeight:600,fontSize:18}}>
                        Made by Namish Arora and Kunal Saxena.
                    </Grid>
                </Grid>

            </Grid>
            
        </div>
    )
}

export default Footer;
