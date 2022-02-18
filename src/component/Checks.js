import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
function isEmpty(txt) {
  if (txt.length == 0) {
    return true;
  } else {
    return false;
  }
}

function isAlphabets(txt) {
  if (/^[a-z A-Z]+/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function isDigits(txt) {
  if (/^[0-9]+/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function isMobile(txt) {
  if (/^[0-9]{10}/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function isEmail(txt) {
  if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function errorMessage(message) {
  toast.error(`🐞 ${message}`, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}


function checkEmail(txt)
{if(checkRequire(txt))
 { var reg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(reg.test(txt)==false)
    {return false}
    else
    {return true}
}
else
{return false}

 }


function checkRequire(txt){
    if(txt.length==0 || txt.indexOf(' ') == 0 )
    { 
    return false }
    else
    { 
    return true}
}

function isBlank(txt)
{ if(txt.length==0)
    return true
  else 
    return false
}
function checkPassword(txt){
    if(txt.length<=5)
    return false
    else
    return true
}

function checkUserPassword(txt){
    var reg=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    if(reg.test(txt)==false)
    return false
    else
    return true
}

function checkPin(txt){
    var reg=/^[0-9]{6}$/
    if(reg.test(txt)==false)
     return false
     else
     return true
}


function checkMobile(txt){
  var reg=/^[0-9]{10}$/
       if(reg.test(txt)==false)
        return false
        else
        return true
    
    }

 function checkPhone(txt){
        var reg=/^[0-9]+$/
             if(reg.test(txt)==false)
              return false
              else
              return true
          
      }

      function checkGst(txt){
        var reg=/[a-zA-Z0-9]{15}/
             if(reg.test(txt)==false)
              return false
              else
              return true
          
          }



export {isEmpty,isAlphabets,isEmail,isMobile,isDigits,errorMessage,checkEmail,checkRequire}

