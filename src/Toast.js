import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = (message, type) => {
    if(type===true){
        toast.success(message,{
            position:"bottom-right",
            autoClose:3000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover: true,
            rtl:true,
            draggable:true,
            progress: undefined,
            theme: 'colored',
        });
    }
    else{
        toast.error(message,{
            position:"bottom-right",
            autoClose:3000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover: true,
            rtl:true,
            draggable:true,
            progress: undefined,
            theme: 'colored',
        });
    }

};

export default Toast;
