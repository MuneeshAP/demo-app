import React, { useContext, useEffect ,useState} from 'react'
import { NavLink ,useNavigate} from "react-router-dom"
import './mix.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {

    const [data, setData] = useState(Boolean);
    const [cards,setCards] = useState([]);   
    const [errorMessage,setError] = useState(); 

    const DashboardValid = async () => {
        let token = sessionStorage.getItem("usersdatatoken");        

            const res = await fetch("/v1/cards", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const cardData = await res.json();

        if (cardData.status === 400 || !cardData) {
        
            setError(cardData.message);
            setData(false);

        } else {
            setCards(cardData.cards);
            setData(true);
        }
    }

    useEffect(() => {
        DashboardValid();
        }, [])

    return (        

        
        <div id='forScroll'>
            {
                data === true && (cards.length>0)?           
                <div style={{  display:"flex", flexDirection:"column" ,alignItems: "center"}}>
                    {
                    cards.map((card) => ( 
                        <div className="card">
                    <div className="container">
                    <ol key = { card.bankName } >
                    <br></br>
                    <h2>Bank name: {card.bankName}</h2>
                    <br></br>
                    <h3>Card Number: { card.cardNumber }</h3> 
                    <br></br>
                    <h3>CVV: { card.cvv }</h3> <br></br>
                    <h3>Exp. Month: { card.expMonth}</h3><br></br>
                    <h3>Exp. Year: { card.expYear}</h3><br></br>
                    </ol>
                    </div>
                </div>
                ))}
                    <div className="card">
                    <div className="container">
                    <NavLink to="/card/form"> <button style={{ fontSize:"25px" }} className='cardbtn'>Add card</button></NavLink>
                    </div>
                </div>
                  
                    </div> : <div style= {{ display: 'flex', justifyContent: "center", alignItems: "center", height: "90vh" }}>
                    { 
                        data === false && cards !== 0  ? 
                        <div style={{ textAlign: "center" }}>
                            <h1>{errorMessage}
                            </h1><br></br>                        
                            <h3>Please Add your card details here</h3>
                            <br></br>
                            <NavLink to="/card/form"> <button style={{ fontSize:"25px" }} className='cardbtn'>Add card</button></NavLink>
                        </div> : ""
                        }
                        
                </div>
            }

        </div>

    )
}

export default Dashboard