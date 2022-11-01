import axios from 'axios'


const apiURL = "http://192.168.1.101:7142/api"
const localApiURL =  "https://localhost:7142/api"
const apiPortatil = "http://26.15.152.96:7142/api"





class ServerService  {

    setupAxiosInterceptors(token){
   
        axios.interceptors.request.use(
           (config)=> {
               if (this.isUserLoggedIn()) {
               config.headers.authorization = "Bearer: " + token
               }
               return config
           }
        )
        console.log("REQUEST INTERCEPTORS SET")
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('signInToken');
        if(user===null) return false
        return true

    }

    handleError401(){
   
        axios.interceptors.response.use(response => {
            return response;
         }, error => {
           if (error.response.status === 401) {
            
           }
           return error;
         });
   
    }

    

    getConfig(){
        return       {
                        headers: {
                            'Authorization' : 'Bearer ' + sessionStorage.getItem('JWT')
                        }
                     }
        }

    postSavedProfile(walletAddress) {

        return axios.post(`${apiURL}/profile/save`,
        {
            "WalletAddress" : `${walletAddress}`,
            "Username":"",  
            "Bio": "",
            "TwitterHandle": "",
            "ProfilePic": ""
        },
        this.getConfig())
    }

    postSignedHash(originalMessage,signedMessage,walletAddress) {

        return axios.post(`${apiURL}/auth/verify`,
        {
            "OriginalMessage" : `${originalMessage}`,
            "SignedMessage":`${signedMessage}`,     
            "WalletAddress": `${walletAddress}`,
            "Nonce": "hahasalu2"
        })
    }


    postUpdatedProfile(walletAddress,username,bio,twitterhandle,profilepic) {

        return axios.post(`${apiURL}/profile/save`,
        {
            "WalletAddress" : `${walletAddress}`,
            "Username": `${username}`,  
            "Bio": `${bio}`,
            "TwitterHandle": `${twitterhandle}`,
            "id":0
        },
        this.getConfig())

        
    }
    

    getWalletInfo(walletAddress) {

        return axios.get(`${apiURL}/profile/${walletAddress}`,this.getConfig())
    }

    postProfilePicture(imageFile) {
        return axios.post(`${apiURL}/profile/changeavatar`,
        imageFile
        ,this.getConfig())
    }
   
}

export default new ServerService 