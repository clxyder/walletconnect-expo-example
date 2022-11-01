//https://cors.redoc.ly/https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:0xCD9375D40FF8cF1F34796b364870207a0FD88dEc

import axios from "axios";


// Replace with your Alchemy API key:
const apiKey = "uB64FuPU7Jl1hCt9qvGjxvYEJNfJxVnK";
const apiKeyMatic = "SCPj5IrvHIBluX8OZaGOxHryUq7gH0Yj"
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
const maticBaseURL = `https://polygon-mainnet.g.alchemy.com/nft/v2/${apiKeyMatic}/getNFTs/`
// Replace with the wallet address you want to query:
//const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";
//const fetchURL = `${baseURL}?owner=${ownerAddr}`;

class RaribleService {
    retrieveUserNFT(ownerAddr) {
        //console.log('executed service');
        return axios.get(`${baseURL}?owner=${ownerAddr}`)
    }

    retrieveUserNFTmatic(ownerAddr) {
        //console.log('executed service');
        return axios.get(`${maticBaseURL}?owner=${ownerAddr}`)
    }
    // retrieveUserNFT() {
    //     //console.log('executed service');
    //     return axios.get(`https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:0xCD9375D40FF8cF1F34796b364870207a0FD88dEc&size=200&blockchains=ETHEREUM`) 
    // }
    
    retrieveNFTimx(ownerAddr) {

        // const options = {
        //     method: 'GET',
        //     url: 'https://api.ropsten.x.immutable.com/v1/assets',
        //     headers: {'Content-Type': 'application/json'}

            return axios.get(`https://api.ropsten.x.immutable.com/v1/assets`,{user: ownerAddr})

    
    }
}

export default new RaribleService