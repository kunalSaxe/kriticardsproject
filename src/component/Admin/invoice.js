import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField, Avatar, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    subdiv: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "700px",
        height: "auto",
        marginTop: 10,
        padding: 15,
        border: '1px solid #000'
    },
 
   

    table: {
        borderCollapse: "collapse",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },

    tr: {
        border: "1px solid black",
        borderCollapse: "collapse",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        
    },

    td: {
        border: "1px solid black",
        borderCollapse: "collapse",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        
    },
 
}));

export default function Invoice(props) {
    const classes = useStyles();
    const [OrderByClick, setOrderByClick] = useState(props.location.state.orderbyclick)



const Printer=(pr)=>{
    var restorepage=document.body.innerHTML
    var printcontent=document.getElementById(pr).innerHTML
    document.body.innerHTML=printcontent
    window.print()
    document.body.innerHTML=restorepage

}

   
    
    return (

        <div  className={classes.root}  >
            <Button onClick={()=>Printer('print')}> Print</Button>
            <div id='print'  className={classes.subdiv}>

                <Grid
                    container
                    xs={12}
                    spacing={3}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}

                >
                    <Grid xs={12} item>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <img src='kc.png' width='200px' height='100px' />
                            <div><b>KRITI CARD</b></div>
                            <span style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 550 }}>Near,Petrol Pump,Thatipur,Gwalior(474011)</span>
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 550 }} > kritiindia@gmail.com</span>
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 550 }} >+91 9314781001</span>
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 550 }}>GSTIN: 23HIYPS8521M1Z6</span>
                            </span>


                        </div>


                    </Grid>
                    <Grid item xs={12}>
                        <div
                            style={{
                                width: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 20,
                                fontWeight: "bold",
                                letterSpacing: 1,
                                padding: 1,
                            }}
                        >Tax Invoice</div>
                    </Grid>









                    <Grid container xs={12} spacing={3} >
                        <Grid xs={6} item >
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: "flex-start", }}>
                                <div><b>Bill To:</b></div>
                                <span style={{ fontWeight: 550, padding: 5 }}> {OrderByClick.name}</span>
                                <span style={{ padding: 5, fontWeight: 550, }}>{OrderByClick.billingaddress}</span>
                                <span style={{ padding: 5, fontWeight: 550, }}>Contact No:+91-{OrderByClick.mobile}</span>
                              


                            </div>


                        </Grid>
                        <Grid item xs={6} >
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', alignItems: 'flex-end' }}>
                                <div style={{ padding: 5 }} >
                                    <b>Invoice:</b>280
                                </div>
                                <div style={{ padding: 5 }}>
                                    <b>Date:</b><span style={{ fontWeight: 550 }}>{OrderByClick.orderdate}</span>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Grid>


                    </Grid>


                        <Grid item xs={12} sm={12} >
                            <div >
                            <table className={classes.table} style={{ width: 400 }} >
                                     <tr className={classes.tr}>
                                         <th>SR</th>
                                         <th style={{paddingLeft:5}}>Item Name</th>
                                         <th>Quantity</th>
                                         <th>Price/Unit</th>
                                         <th>Amount</th>
                                     </tr>
                                     <tr className={classes.td}>
                                         <td style={{paddingInline:20,width:'50px'}}>{OrderByClick.orderid}</td> 
                                         <td style={{paddingInline:40,}}>{OrderByClick.cardcode}</td>
                                          <td style={{paddingInline:50,}}>{OrderByClick.qty}</td>
                                            <td style={{paddingInline:40,}}>{OrderByClick.cardprice}</td>
                                             <td style={{paddingInline:40,}}>{OrderByClick.totalprice}</td>
                                             </tr>
                                         


                                </table>
                            </div>
                        </Grid>




                    <Grid xs={6} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    </Grid>
                    <Grid xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid xs={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', fontSize: 18, fontWeight: 550, fontFamily: 'Calibri', color: '#2c3e50', padding: 10, }} >
                            <Grid style={{ padding: 7 }}>Sold Total</Grid>
                            <Grid style={{ padding: 7 }}>Total</Grid>
                            <Grid style={{ padding: 7 }}>Received</Grid>
                            <Grid style={{ padding: 7 }}>Balance</Grid>
                        </Grid>
                        <Grid xs={6} style={{ display: 'flex', justifyContent: 'right', alignItems: 'flex-end', flexDirection: 'column', fontSize: 17, fontWeight: 550, fontFamily: 'Calibri', color: '#2c3e50', padding: 10 }} >
                            <Grid style={{ padding: 7 }}>{OrderByClick.totalprice}</Grid>
                            <Grid style={{ padding: 7 }}>{OrderByClick.totalprice}</Grid>
                            <Grid style={{ padding: 7 }}>--</Grid>
                            <Grid style={{ padding: 7 }}>{OrderByClick.totalprice}</Grid>

                        </Grid>

                    </Grid>
                    <Grid xs={6} item style={{ display: 'flex', justifyContent: 'right', alignItems: 'flex-end', fontWeight: 550, fontFamily: 'Calibri', color: '#2c3e50', fontSize: 17, flexDirection: 'column', paddingTop: 80 }}>
                        <div>________________</div>
                        <div>Authorized Signatory</div>
                    </Grid>
                    
                </Grid>

              


            </div>
        </div>

    )
}