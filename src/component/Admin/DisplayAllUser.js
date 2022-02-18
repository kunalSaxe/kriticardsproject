import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getData,postData } from "../FetchNodeService";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import BlockIcon from '@material-ui/icons/Block';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subdiv: {
      width: 1400,
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
  }));

  export default function DisplayAllUser(props){
    const classes = useStyles();
    const [UserList,SetUserList] = useState([]);
    useEffect(function(){
        fetchAllUser()
      },[])
    

    const fetchAllUser = async()=>{
        var list = await getData('client/fetchalluser')
    
        SetUserList(list.data)
    
      }

        const handleStatusChange=async(data)=>{
         
            
            var userid=data.clientid         
            var body = {userid:userid,clientstatus:'Not Verify'}
            var list = await postData('client/updatestatus',body)
            if(list)
            {
               
               
            }
            else{
                
            }

            fetchAllUser()
        }

        const handleStatusVerify=async(data)=>{
         
            
            var userid=data.clientid
            var body = {userid:userid,clientstatus:'Verify'}
            var list = await postData('client/updatestatus',body)
            if(list)
            {

              
                
                
            }
            else{
          
            }
            fetchAllUser()
            
        }

function SimpleAction() {
      
    return (
      <MaterialTable
      title={  <><span>
        <img alt="" src="/glasskart.png" width="40" />
      </span> <b style={{fontSize:18,opacity:0.5}}>DISPLAY USER</b> &nbsp;  </>}
        columns={[
            { title: 'Client Id', field: 'clientid' },
          { title: 'Client Email', field: 'clientemail' },
          { title: 'Client Name', field: 'clientname'},
          { title: 'Contact Detail', field: 'clientaddress', render: (rowData) => (
            <div>{rowData.clientaddress}-{rowData.clientmobile}</div>
          )},
          { title: 'Client Verification', render:(rowData)=>(
           
            <div>
           
              {rowData.clientverify=="Not Verify"?
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'white',backgroundColor:'red'}}>{rowData.clientverify}</div>
              :rowData.clientverify=='Verify'?<div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'white',backgroundColor:'green'}}>
              {rowData.clientverify}</div>:<div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'white',backgroundColor:'blue'}}>
                {rowData.clientverify}</div>}
            </div>)},
          { title: 'Client Country/state/city', render: (rowData) => (
            <div>{rowData.clientcountry}/{rowData.clientstate}/{rowData.clientcity}</div>
          ),},
          { title: 'Client Billing Address', field: 'clientbillingaddress'},
        
   
          
           
        ]}
        data={UserList}   
        actions={[
            {
              icon: ()=><VerifiedUserIcon/>,
              tooltip: 'Verify',
              onClick: (event, rowData) => handleStatusVerify(rowData)
            },
            {
              icon: ()=><BlockIcon/>,
              tooltip: 'Not Verify',
              onClick: (event, rowData) => handleStatusChange(rowData)
            }
        
          ]}
       
          options={{
            actionsColumnIndex: -1
          }}
      />
    )
  }

return(
  
    <div className={classes.root}>
    <div className={classes.subdiv}>
        {SimpleAction()}
        </div>
        </div>
)

}