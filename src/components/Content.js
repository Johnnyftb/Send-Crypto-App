import { useEthers, useSendTransaction } from "@usedapp/core";
import { utils } from "ethers";
import React from 'react';

export default function Content() {

    const { activateBrowserWallet, account, deactivate } = useEthers();
    const [sentSuccess, setSentSuccess] = React.useState(false);
    
    const [formData, setFormData] = React.useState({
        ethAmount: 0,
        address: '',
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const { sendTransaction, state } = useSendTransaction()
    const status = state.status;
    const transactionHash = state.transaction ? state.transaction.hash : "Waiting";

    function handleSubmit() {
        sendTransaction({to: formData.address, value: utils.parseEther(formData.ethAmount).toString() });
        setSentSuccess(prev => !prev);
    }

    function backToHome() {
        setSentSuccess(prev => !prev);
        setFormData({
            ethAmount: 0,
            address: ""
        })
    }
    
    return (
        <section className="content bg-light">
            {!sentSuccess ? (
                <div className="container p-5 text-dark d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="fw-bold">Send Crypto to Anyone</h1>
                        {!account ? (
                            <button className="btn bg-primary px-3 py-1 rounded-pill border border-none text-light mt-2" onClick={activateBrowserWallet}>Connect Wallet</button>
                        ) : (
                            <div className="d-flex align-items-center">
                                <button className="btn bg-secondary px-3 py-1 rounded-pill border border-none text-light mt-2" onClick={deactivate}>Disconnect</button>
                                <p className="lead mb-0 mt-1 ms-2">{account}</p>
                            </div>
                        )}
                        <div className="bg-secondary rounded w-100 p-2 mt-4">
                            <div className="d-flex align-items-center">
                                <p className="lead fw-bold mb-0 me-2">Amount ($ETH)</p>
                                <input type="number" className="border border-none w-50 rounded-pill w-50 px-1" placeholder="For e.g. 5" name="ethAmount" onChange={handleChange}/>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                                <p className="lead fw-bold mb-0 me-2">To (Address)</p>
                                <input type="text" className="border border-none rounded-pill w-50 px-1" placeholder="0xabcd...." name="address" onChange={handleChange}/>
                            </div>
                            {!account || !formData.address || formData.ethAmount <= 0 ? (
                                <button className="btn bg-dark px-3 py-1 rounded-pill border-none text-light mt-2 ">Disabled</button>
                            ) : (
                                <button className="btn bg-primary px-3 py-1 rounded-pill border-none text-light mt-2 " onClick={() => handleSubmit()}>Send</button>
                            )}
                        </div>
                        <p className="mt-5 mb-0">Please use Rinkeby test network</p>
                        <p className="">Contract: </p>
                    </div>
                    <img src="/images/breadman.png" alt="" className="img-fluid" />
                </div>
            ) : (
                <div className="container p-5 d-flex flex-column align-items-center justify-content-center text-dark">
                    <h1 className="display-5 fw-bold">Transaction Sent!</h1>
                    <p className="text-secondary">View your transaction details below</p>
                    <p className="lead">Transaction Status: {status}</p>
                    <p className="lead">Transaction Hash: {state.transaction ? <a href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}>{transactionHash}</a> : "Waiting"}</p>
                    <button className="btn px-4 py-2 bg-primary text-light fs-5 rounded-pill" onClick={backToHome}>Send more crypto!</button>
                </div>
            )}
            
        </section>
    )
}