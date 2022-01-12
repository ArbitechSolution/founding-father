import Web3 from 'web3';
import {contractAbi, contractAdd} from '../utils/utils'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

let accountAd;
let accounts;
const contractOf=()=>{
    let newContract = new web3.eth.Contract(contractAbi, contractAdd);
    return newContract;
}
console.log(contractOf().methods);
const getAccounts = async () => {
    const web3 = window.web3;
    try {
        accounts = await web3.eth.getAccounts();
        return accounts;
    } catch (error) {
        console.log("Error while fetching acounts: ", error);
        return null;
    }
};
export const loadAccountAddress = async () => {
    let acc;
    let isConnected = false;
    try {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
           await window.web3.eth.getChainId((err, netId) => {
                console.log("networkId==>", netId);
                switch (netId.toString()) {
                  case "97":
                    console.log("This is mainnet");
                    toast.success("Connected With Etherium Network")
                    isConnected=true;
                    console.log(isConnected);
                    // jQuery("#network").text("This is mainnet");
                    // Accounttype = "1";
                    // network = "mainnet";
                    isConnected=true;
                    break;
                  default:
                    toast.error("Wallet connected to incorrect network Please Connect to Etherium Mainnet")
                    // console.log("This is an unknown network.");
                    // jQuery("#network").text("This is the unknown test network.");
                }
                
                
              }
             );
             if (isConnected == true) {    
                let accounts = await getAccounts();
                return accounts[0];
               
                // acc = accountAd.substring(0, 6) + "..." + accountAd.substring(accountAd.length - 6)
                //   setAccount(acc);
                
                
            }
        } else {
            toast.error("wallet connected to the incorrect netowork")
        }
        if (isConnected == true) {    
            let accounts = await getAccounts();
            return accounts[0];
           
            // acc = accountAd.substring(0, 6) + "..." + accountAd.substring(accountAd.length - 6)
            //   setAccount(acc);
            
            
        }
        console.log(isConnected);   
                
       
    } catch (error) {
        console.log("Error while connecting metamask", error);
    }
};
export const loadAccontAddress=async()=>{
    let isConnected= false;
    try{
        if(window.ethereum){
           window.web3 = new Web3(window.ethereum);
           await window.ethereum.enable();
           isConnected = true;
        }else if(window.web3){
           window.web3 = new Web3(window.web3.currentProvider);
           isConnected = true;
        }else {
           isConnected = false;
           console.log("Metamask is not installed, please install it on your browser to connect.");
         }
         if(isConnected=== true){
           let accounts= await getAccounts();
        //    console.log(accounts[0]);
        return accounts[0];
         
         }
        
    }catch(error){
        console.log("Error while loding web3", error);
        
    }
}

export const checkBalance=async(add)=>{
let balance= await contractOf().methods. balanceOf (add).call()
return balance;
}