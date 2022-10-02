import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './mix.css';


const Profile = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);

    const history = useNavigate();

    const DashboardValid = async () => {
        let token = sessionStorage.getItem("usersdatatoken");

        const res = await fetch("/v1/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            setLoginData(data);
        }
    }


    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

  return (
    <div>{
        data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" ,color: 'rgb(105, 94, 151)'}}>
                <img src="./man.png" style={{ width: "150px", marginTop: 20 }} alt="" />
                <h2>{logindata ? logindata.user.username : ""}</h2>
                <h2>{logindata ? logindata.user.email : ""}</h2>
            </div>
        </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
            Loading... &nbsp;
            <CircularProgress />
        </Box>
    }
    </div>
  )
}

export default Profile
