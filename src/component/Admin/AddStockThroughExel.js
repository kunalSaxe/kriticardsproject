import { Button } from '@material-ui/core';
import {useState} from 'react'
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import * as XLSX from 'xlsx'
import {postDataAndImage } from '../FetchNodeService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
    
  },
}));



export default function AddStockThroughExel(props)  {
    const classes = useStyles();
    const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
 
  const [excelData, setExcelData]=useState(null);



  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
          setExcelFileError(null);
          setExcelFile(selectedFile);

  }

  const handleUploadCsv=async()=>{
    alert("hey")
      var formData=new FormData()
      formData.append("file",excelFile)
      var result= await postDataAndImage('carditem/insertcardthroughcsv',formData)
      if(result)
      {
        Swal.fire({
          title: 'Kriti Cards.com',
          text: 'Order submitted ',
          imageUrl: '/kc.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',      
    
  })
  
}
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    else{
      setExcelData(null);
    }
  }
  return (
    <div className="container">

      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
<div style={{display:"flex",justifyContent:'center',alignItems:'center',fontSize:'25px',fontWeight:'600px',letterSpacing:1}}>
  <u>Upload Excel file</u>
       </div>   

<div  style={{display:"flex",justifyContent:'center',alignItems:'center',}}>
<input
        accept=".xls,.xlsx,.csv"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFile} 
        required

      />
      <label htmlFor="contained-button-file">
        <Button  style={{margin:20}} variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>



          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <Button  style={{margin:20}} variant='contained' color='primary' type='submit' onClick={()=>handleUploadCsv()} 
          >Submit</Button>
</div>
        </form>
      </div>
    </div>
);
}

