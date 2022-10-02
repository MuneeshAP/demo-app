import React, { useState } from 'react'
import { NavLink ,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"

const Carddetails = () => {
    
    const [inpval, setInpval] = useState({
        bankName: "",
        cardNumber: "",
        cvv: "",
        expMonth: "",
        expYear:""
    });

    const [ errorMessage, setError] = useState("");
    const [ errCode, setErrCode ]  = useState("");

    const history = useNavigate();


    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            setErrCode("");
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addCarddata = async (e) => {
        e.preventDefault();

        const { bankName, cardNumber, cvv, expMonth ,expYear} = inpval;

        if (bankName === "") {
            toast.warning("Bank Name is required!", {
                position: "top-center"
            });
        } else if (cardNumber === "") {
            toast.error("cardNumber is required!", {
                position: "top-center"
            });
        } else if ((cardNumber.length ) < 15) {
            toast.warning("You entered less than sixteen digit in card number", {
                position: "top-center"
            });
        } else if (cvv === "") {
            toast.error("Cvv is required!", {
                position: "top-center"
            });
        } else if (cvv.length > 4) {
            toast.error("You entered more than four digit in cvv", {
                position: "top-center"
            });
        } else if (cvv.length < 2) {
            toast.error("You entered less than two digit in cvv", {
                position: "top-center"
            });
        } else if (expMonth === "") {
            toast.error("Expire month is required!", {
                position: "top-center"
            });
        }
        else if (expMonth.length > 3) {
            toast.error("You entered more than three digit in expire month", {
                position: "top-center"
            });
        }else if (expMonth.length <= 1) {
            toast.error("You entered less than one digit in expire month ", {
                position: "top-center"
            });   
        } else if (expYear.length > 5) {
            toast.error("You entered more than five digit in expire year", {
                position: "top-center"
            });
        }else if (expYear.length <2) {
            toast.error("You entered less than two digit in expire year", {
                position: "top-center"
            }); 
        } else {
            let token = sessionStorage.getItem("usersdatatoken");        

            const data = await fetch("/v1/card", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    bankName, cardNumber, cvv, expMonth ,expYear
                })
            });

            const res = await data.json();


            if (res.status === 400 || !res) {
                    setError(res.error);
                    setErrCode(res.status);    
            } else {
                toast.success("Card details Successfully added 😃!", {
                    position: "top-center"
                });
                history('/dash');
                setInpval({ ...inpval, bankName: "", cardNumber: "", password: "", cpassword: "" });

            }                
            
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Add card details</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="bankName">Bank name</label>
                            <input type="text" onChange={setVal} value={inpval.baNkname} name="bankName" id="bankName" placeholder='Enter Your Bank name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="cardNumber">Card number</label>
                            <input type="number" onChange={setVal} value={inpval.cardNumber} name="cardNumber" id="cardNumber" placeholder='Enter Your Card number' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="cvv">cvv</label>
                            <div className="two">
                                <input type="number" onChange={setVal} name="cvv" id="cvv" placeholder='Enter Your Cvv' />
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="expmonth">Validity details</label>
                            <div className="two">
                                <input type="number" value={inpval.expMonth} onChange={setVal} name="expMonth" id="expMonth" placeholder='Enter Exp month' /><br></br>
                                <span style={{marginLeft:"10px"}}></span>
                                <input type="number" value={inpval.expYear} onChange={setVal} name="expYear" id="expYear" placeholder='Enter Exp year' />
                            </div>
                        </div>

                        <button className='btn' onClick={addCarddata}>Submit</button>
                        <span>{ errCode === 400 ? <h3> {errorMessage}</h3> : "" }</span>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Carddetails