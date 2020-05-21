

import stringConstants from './stringConstants.jsx'
import loginResponse from './response/loginresponse.json'

const axios = require("axios");


export function registerUser(userDetails){
   return  axios.put(stringConstants.DEV_SERVICE_URL+"registerUser",userDetails)
}


export function loginUser(userName,password){
    // axios.get(stringConstants.DEV_SERVICE_URL+"userLogin?username="+userName+"&password="+password)
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(loginResponse),500)
    })

}

export function updateEffortDetails(effortId,effort){
    return axios.put(stringConstants.DEV_SERVICE_URL+"updateEffortDetails/"+effortId,{effort})
}

export function logEffortDetails(logEffort){
    return axios.put(stringConstants.DEV_SERVICE_URL+"logEffortDetails/",{
        logEffort
    })
}

export function deleteEffortDetails(effortId){
    return axios.put(stringConstants.DEV_SERVICE_URL+"deleteEffortDetails?id="+effortId)
}




