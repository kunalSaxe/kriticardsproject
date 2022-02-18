import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField, Avatar } from "@material-ui/core";
import { getData, postDataAndImage, postData } from "../FetchNodeService";
import { isEmpty, errorMessage } from "../Checks";
import { DropzoneArea } from 'material-ui-dropzone'
import { Autocomplete } from "@material-ui/lab";

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
        width: "600px",
        height: "auto",
        marginTop: 10,
        background: "inherit",
        padding: 15,
        borderRadius: 5,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    input: {
        display: "none",
    },
}));

export default function ProductPictures(props) {
    const classes = useStyles();
    const [productId, setProductId] = useState('');

    const [productList, setProductList] = useState([]);
    const [listFiles, setListFiles] = useState([])





    const fetchAllProducts = async () => {
        var list = await getData("carditem/fetchallcarditem");
        setProductList(list.data);
    };




    useEffect(function () {
        fetchAllProducts();
    }, []);
    const handleUploadFiles = async () => {

        var formData = new FormData()
        formData.append("cardcode", productId)
        listFiles.map((item, index) => {
            formData.append("picture" + index, item)
        })
        var config = { header: { "content-type": "multipart/form-data" } }
        var result = await postDataAndImage("carditem/addproductpictures", formData, config)
    }

    const top = productList




    const handleFiles = (files) => {
        setListFiles(files)


    }
    const handlechange=(event)=>{
        var i = event.currentTarget.value
        setProductId(i)

    }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid
                    container
                    xs={12}
                    spacing={1}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid item xs={12}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 20,
                                fontWeight: "bold",
                                letterSpacing: 1,
                            }}
                        >
                            <span>
                                <img
                                    src="/kc.png"
                                    alt="Remy Sharp"
                                    style={{ width: 50 }}
                                ></img>
                            </span>
                            <span> Add Final Products</span>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                    <Autocomplete
                            id="combo-box-demo"
                            options={top}
                            onChange={(event, newValue) => {
                                setProductId(newValue.cardcode);
                              }}
                            getOptionLabel={(option) => option.cardcode}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Combo box"  variant="outlined" />}
                        />
                    </Grid>

                    <Grid item xs={12} >

                        <DropzoneArea
                            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                            maxFileSize={5000000}
                            filesLimit={10}
                            onChange={(files) => handleFiles(files)}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => handleUploadFiles()} color="primary" variant="contained" fullWidth>Upload Files</Button>

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
