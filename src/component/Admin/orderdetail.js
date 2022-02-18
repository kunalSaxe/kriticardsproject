import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getData, postData } from "../FetchNodeService";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Modal from '@material-ui/core/Modal';
import { IconButton } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subdiv: {
      width: 800,
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
      wodth:'100%',
      height:'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background:'#ecf0f1',
      padding:1,
      borderRadius:5,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    input: {
      display: 'none',
    },
    paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    roots: {
        width: '100%',
      },
      container: {
        maxHeight: 440,
      },
  }));

  
  

  export default function OrderDetail(props){
const classes = useStyles()
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   // setPage(0);
  // };

const [orderByClick,setorderbyclick]=useState([])
const [open, setOpen] = React.useState(false);
const [modalStyle] = React.useState(getModalStyle);

      const[order,setorder]=useState([])
      // const [selectedRow, setSelectedRow] = useState(null)
      // const [invoiceno, setInvoiceno] = useState(null)

      // const handleOpen = () => {
      //   setOpen(true);
      // };
    
      const handleClose = () => {
        setOpen(false);
      };
     
      useEffect(function(){
        fetchAllorders()
      },[])
    

    const fetchAllorders= async()=>{
        var list = await getData('carditem/fetchallorders')
        setorder(list.data)
    
      }


     const fetchbyclick=async(data)=>{
        var body={id:data}
        var list = await postData('carditem/fetchallordersbyclick',body)
        setorderbyclick(list.data)

      }


      const HandleBillwindow=async(data)=>{
 

        var body={cardid:data.cardid,cardcode:data.cardcode,qty:data.qty,orderno:data.orderid}
      var result= await postData('client/orderminus',body)

        if(result.check){
          var body = {invoiceno:data.invoiceno,emailid:data.emailid,amount:data.amount,invoicedate: new Date}
          var invoiceresult = await postData("carditem/addinvoice", body)
          if(invoiceresult){
            props.history.push({"pathname":"/invoice"},{orderbyclick:data})
          
          }

          
        }
        else
        {
          alert('Stock not updated')
        }
        
      }



 




      const SimpleAction2= ()=> {
        return (
          <MaterialTable
            title="View DETAILS"
            columns={[
                {title: "Order Date ",cellStyle: {
                  width: 150,
                  minWidth: 150
                  },headerStyle: {
                    width: 150,
                    minWidth: 150
                    }, render:(rowData)=><div>{rowData.orderdate} </div>},
                { title: "Order No.",cellStyle: {
                  width: 100,
                  minWidth: 100
                  },headerStyle: {
                    width: 100,
                    minWidth: 200
                    },  field:'orderid' ,},
                { title: "Card Code",  field:'cardcode' },
                { title: "Price Details",  field:'',cellStyle: {
                  width: 200,
                  minWidth: 200
                  },headerStyle: {
                    width: 200,
                    minWidth: 200
                    },render:(rowData)=><div><span><b>Price</b>&nbsp;</span>{rowData.cardprice}<div><b>Amount:</b> {rowData.totalprice}</div> <div><b>Quantity:</b> {rowData.qty}</div></div>  },
                
                { title: "City/State", render: (rowData) => <div>{rowData.city}/{rowData.state}</div> },
                { title: " Card Color", render: (rowData) => <div>{rowData.cardcolor}</div> },
                { title: " Bill", render: (rowData) => <div>
                  {rowData.status !== "Confirmed" ? 
                <IconButton onClick={()=>HandleBillwindow(rowData)}><ReceiptIcon /></IconButton> 
                 :<span style={{backgroundColor:'lightgreen'}}> Confirmed</span>}
                </div> },
               
                
           
            ]}
            data={orderByClick}  
         />
        )
      }
  
  

      function getModalStyle() {
        const top = 50
        const left = 50
   
      
        return {
          top: `${top}%`,
          left: `${left}%`,
         
          transform: `translate(-${top}%, -${left}%)`,
        };
      }


    const handleDetails = (data) => {
      setOpen(true);

      fetchbyclick(data.clientid)
    }

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <div className={classes.droot}>
          <div className={classes.dsubdiv}>
         {SimpleAction2()}
         </div>
      </div>
     
      </div>
    );

   
       const SimpleAction= ()=> {
        return (
           
          <MaterialTable
            title="ORDER DETAILS"
            columns={[
                 { title: "Order No.",
                  render: (rowData) =>
                  <div style={{width: 300}}>
                   <div><span><b>Name:</b></span><span>{rowData.name}</span></div>
                   <div><span><b>Email:</b></span>{rowData.email}</div>
                   <div><b>Mobile Number:</b>{rowData.mobile}</div>
                   <div><span><b>Billing Address:</b></span>{rowData.billingaddress}</div>
                   </div>
                },
                { title: " CLient Id .", render: (rowData) => <div>{rowData.clientid}</div> }, 
            ]}
          
            data={order}  
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              },
              {
                icon: ()=> <VisibilityIcon/>,
                tooltip: 'View Details',
                onClick: (event, rowData) => handleDetails(rowData)
              }
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
        )
      }


      return(
        <>
        <div className={classes.root}>
          <div className={classes.subdiv}>
          {SimpleAction()}
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        
      >
        {body}
      </Modal>
          </div>
        </div>
        </>
    )
}