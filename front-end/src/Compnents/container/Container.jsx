import React, { useState, useEffect } from 'react'
import "./Container.css"
import Web3 from 'web3';
import axios from 'axios';
import { contractAdd } from '../../utils/utils'
import { loadAccountAddress, checkBalance } from '../../Api/api'

export default function Container({ setAccount }) {
    let [balDetail, setBalDetail] = useState("")
    let [testAddress, setTestAddress] = useState("Please Enter your Metamask Id in Url")
    let [chkBal, setChkBal] = useState("")
    const sevenDaysBeforeDate = new Date(new Date().setDate(new Date().getDate() - 7));
    const sevenmintsBeforeDate = new Date(new Date().setMinutes(new Date().getMinutes()));



    const get = async () => {
        let add = await loadAccountAddress();
        console.log(add);
        let acc = add?.substring(0, 6) + "..." + add?.substring(add?.length - 6)
        setAccount(acc);
        let a = window.location.href;
        let splitRef = a.split("/")
        let chkRef = splitRef.find((ref) => {
            if (ref == add) {
                return true
            }
        })
        console.log(chkRef);
        if (chkRef == undefined) {
            setTestAddress("Please Enter Your Correct Metamask Id in Url")
            setBalDetail("")

            console.log("enter correct add");
        } else {
            let balance = await checkBalance(add);
            if (balance > 0) {
                setTestAddress("")
                setChkBal(balance)
                setBalDetail("Your Balance Is:")
                const userAdd=  {userId:add}
                let JWtoken = await axios.post("http://localhost:5000/api/users/getToken",userAdd) 
                console.log("JWT responce:", JWtoken.data.token);
                let data={
                    tokenId: contractAdd,
                    userId: add
                }
                //https://foundingfather.herokuapp.com
              let res=  await axios.post("http://localhost:5000/api/users/insertWalletId",
              data,{
                    headers: {'x-access-token': JWtoken.data.token}
                    });
                console.log("data res", res);
            } else {
                setTestAddress("")
                setBalDetail("Your Balance Is Low")
                console.log("your balance is low");
            }
        }
    }
    



    useEffect(() => {
        get()

    }, [])
    return (
        <div>
            <div className="cardContainer">
                <div className="inCard">
                    <div>{testAddress}</div>

                    <div>{balDetail}{chkBal}</div>


                </div>
            </div>
        </div>
    )
}
