import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getData, ServerURL, postData, postDataAndImage } from "../FetchNodeService"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Avatar } from '@material-ui/core'
import swal from 'sweetalert';
import { isEmpty, errorMessage } from "../Checks";
import { Paper } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CardItems from "./Addcarditem";
import Swal from "sweetalert2";
import AddStockThroughExel from "./AddStockThroughExel";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subdiv: {
    width: '100%',
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 15,
    borderRadius: 5,
  },
  droot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  dsubdiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#ecf0f1',
    padding: 1,
    borderRadius: 5,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: 'none',
  },
}));


export default function DisplayAllItems(props) {

  const classes = useStyles();
 

  const [picture, setPicture] = useState({ filename: '', bytes: '' })
  const [Cardid, setCardId] = useState('')
  const [open, setOpen] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false)
  const [CarditemList, setCarditemList] = useState([])
  const [oldPicture, setOldPicture] = useState("")
  const [Cardcode, setCardcode] = useState('')
  const [Cardprice, setCardprice] = useState('')
  const [Stock, setStock] = useState('')



  const handleCancelPicture = async () => {
    setPicture({ filename: oldPicture, bytes: "" })
    setBtnStatus(false)
  }


  const fetchAllCarditem = async () => {


    var list = await getData('carditem/fetchallcarditem')

    setCarditemList(list.data)

  }

  const handleIcon = (event) => {
    setOldPicture(picture.filename)
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0]
    })
    setBtnStatus(true);
  }

  const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append("cardid",Cardid)
    formData.append("picture",picture.bytes)
    var config = { headers: {"content-type":"multipart/form-data"}};
    var result = await postDataAndImage("carditem/editicon", formData, config);
    if (result) {
      swal({
        title: "Good job!",
        text: "Successfully Submited",
        icon: "success",
        button: "OK",
      });
    }
    else {
      swal({
        title: "!OOPS",
        text: "Something Wrong",
        icon: "error",
        button: "OK",
      });
    }
    setOpen(false);
    setBtnStatus(false);
    fetchAllCarditem();
  }



  const handleSubmit = async () => {

    var err = false;

    if (isEmpty(picture.filename)) {
      err = true;
      errorMessage("Please Add Category Picture...");
    }
    if (!err) {
      var body = { "cardid": Cardid, "cardcode": Cardcode,  "stock": Stock, "price": Cardprice}
      var result = await postData("carditem/updatecarditemdata", body);
      if (result) {
        swal({
          title: "Good job!",
          text: "Successfully Submited",
          icon: "success",
          button: "OK",
        });
      }
      else {
        swal({
          title: "!OOPS",
          text: "Something Wrong",
          icon: "error",
          button: "OK",
        });
      }
      setOpen(false);
    }
    fetchAllCarditem();
  }

  const handleClickOpen = (data) => {

    setCardId(data.cardid)
    setCardcode(data.cardcode)
 
    setCardprice(data.price)
    setStock(data.stock)

    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" })
    setOpen(true);
  };

  
  const handleDeleteProduct = async (data) => {
    var body = { cardid: data.cardid };
    Swal.fire({
      imageUrl: "/glasskart.png",
      imageWidth: 200,
      title: "GlassKart.com",
      text: "Are u Sure to Delete Selected Record...",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        result = await postDataAndImage("carditem/deletecarditem", body);
        if (result) {
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
          fetchAllCarditem();
        }
        else
          Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Record is safe :)", "error");
      }
    });
    fetchAllCarditem();
  }



  const handleClose = () => {
    setOpen(false);
    setBtnStatus(false)
  };

  const storeDialog = () => {
    return (
      <div>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"><div
            style={{
              width: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 1,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 1,
                padding: 1,
              }}
            >
              <span>
                <img alt="" src="/glasskart.png" width="40" />
              </span>
              <span>Edit Product</span>
            </div>
          </div></DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <div className={classes.subdiv}>



                <Paper elevation={5} style={{ padding: 10 }} >
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    color: "#90A4AE",
                    display: 'flex',
                    flexDirection: 'center',
                    justifyContent: 'center',

                    padding: 5
                  }}>
                    <span><img src="/logo.png" width='70' alt="" /></span> <span  >ADD PRODUCTS</span> </div>

                  <Grid container xs={12} spacing={1}>
                    <Grid container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <TextField variant="outlined" label="Card Code" onChange={(event) => setCardcode(event.target.value)} value={Cardcode} fullWidth />
                      </Grid>
                     
                      <Grid item xs={6}>
                        <TextField variant="outlined" label="Card Price" onChange={(event) => setCardprice(event.target.value)} value={Cardprice} fullWidth />
                      </Grid>
                 
                      <Grid item xs={6}>
                        <TextField variant="outlined" label="Stock" onChange={(event) => setStock(event.target.value)} value={Stock} fullWidth />
                      </Grid>

                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {!btnStatus ? <>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(event) => handleIcon(event)}
                        />
                        <label htmlFor="contained-button-file">
                          <Button variant="contained" color="primary" component="span">
                            Edit Picture
                          </Button>
                        </label></> : <></>}
                      {btnStatus ? <>
                        <Button onClick={() => handleSavePicture()}>Save</Button>
                        <Button onClick={() => handleCancelPicture()}>Cancel</Button></> : <></>}
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                      <Avatar alt="Cindy Baker" variant="rounded" src={picture.filename} />
                    </Grid>

                    <Grid item sm={12} style={{ padding: 10 }}>
                      <div style={{ justifyContent: 'center', display: 'flex' }}><Button style={{ width: 250 }} onClick={() => handleSubmit()} variant="contained" color="primary" >ADD</Button></div>

                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );

  }

  useEffect(function () {
    fetchAllCarditem()
  }, [])

  function SimpleAction() {

    return (
      <MaterialTable
        title={<div>
          <Button  style={{marginInline:'10px'}}
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => props.setComponent(<CardItems/>)}
        >
          Add CardItems
        </Button>
        <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => props.setComponent(<AddStockThroughExel/>)}
      >
        AddStockThroughExel
      </Button> 
        </div>}
        columns={[
          { title: 'Id', field: 'cardid' },
          {
            title: 'Card Code',
            render: rowData => <div><b>{rowData.cardcode}</b></div>
          },
          {
            title: 'Price',
            render: rowData => <div>{rowData.price}</div>
          },
          {
            title: 'Stock',
            render: rowData => <div>{rowData.stock}</div>
          },




          {
            title: "Picture",
            render: (rowData) => (
              <img
                alt={rowData.picture}
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.picture}`}
              />
            ),
          },
        ]}
        data={CarditemList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Product',
            onClick: (event, rowData) => handleDeleteProduct(rowData)
          }
        ]}
      />
    )
  }

  return (

    <div className={classes.root}>
      <div className={classes.subdiv}>
        {SimpleAction()}
      </div>
      {storeDialog()}
    </div>
  )




}