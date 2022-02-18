import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import {postData } from "../FetchNodeService";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subdiv: {
      width: 1200,
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
   
    roots: {
        width: '100%',
      },
      container: {
        maxHeight: 440,
      },
  }));

  
  

  export default function TodayOrder(props){
const classes = useStyles()
const [datee,setdate] = useState('')
 


      const[order,setorder]=useState([])
  
     
      useEffect(function(){
        fetchAllorders()
      },[parseInt(datee)])
    

    const fetchAllorders= async()=>{
        var dat=new Date()
        var date=dat.getDate()
        var month=dat.getMonth()+1
        var year=dat.getFullYear()
        
            var d=date+"/"+month+"/"+year
            setdate(d)
            var body={newdate:d}
        var list = await postData('carditem/todayorder',body)
        setorder(list.data)
    
      }


    


     

   

    
       const SimpleAction= ()=> {
        return (
           
          <MaterialTable
            title="ORDER RECEIVED TODAY "
            columns={[

                { title: "Order No.",field:'orderid' ,},
                { title: " CLient Id .", render: (rowData) => <div>{rowData.clientid}</div> }, 
                 { title: "Client Name",
                  render: (rowData) =>
                  <div style={{width: 100}}>
                   <div><span>{rowData.name}</span></div>
                   </div>
                },
             
                {title: "Order Date ",cellStyle: {
                    width: 150,
                    minWidth: 150
                    },headerStyle: {
                      width: 150,
                      minWidth: 150
                      }, render:(rowData)=><div>{rowData.orderdate} </div>},
                      { title: " Quantity", render: (rowData) => <div>{rowData.qty}</div> },
      
                  { title: "Price ",  field:'',render:(rowData)=><div>{rowData.cardprice}</div>  },
                      { title: " Total Amount", render: (rowData) => <div>{rowData.totalprice}</div> },

                  
            ]}
          
            data={order}  
           
          />
        )
      }


      return(
        <>
        <div className={classes.root}>
          <div className={classes.subdiv}>
          {SimpleAction()}
         
          </div>
        </div>
        </>
    )
}