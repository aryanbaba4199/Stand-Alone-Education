import axios from "axios";

const API_URL = ''
export const userApi = {
    registration  : `/api/users/registration`,
    
}

export const adminApi = {
    uploadVideo : '/api/admin/videos',
    dashboard : '/api/admin/dashboard',
    course : '/api/admin/course',
    city : '/api/admin/city',
    category : '/api/admin/course/category',
    subCategory : '/api/admin/course/subcategory',
}


export const posterFunction = async(uri, formData) =>{
    try{
       const res = await axios.post(uri, formData);
       if(res.status===200){
          return res.data;    
       }
       
    }catch(err){
        throw err?.response?.data?.error;
    }
}

export const getterFunction = async(uri)=>{
    try{
        const res = await axios.get(uri);
        if(res.status===200){
           return res.data;    
        }
    }catch(e){
        throw e?.response?.data?.error;
    }
}


export const deleterFunction = async(uri, id)=>{
    try{
        const res = await axios.delete(`${uri}?id=${id}`);
        if(res.status===200){
           return res.data;    
        }
    }catch(e){
        throw e?.response?.data?.error;
    }
}