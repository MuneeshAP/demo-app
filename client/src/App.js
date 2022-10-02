import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Profile from "./components/Profile";
import Carddetails from "./components/Carddetails";


function App() {

  const [data, setData] = useState(false);
  const [card, setCard] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


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
      console.log("user not valid");
    } else {
      setLoginData(data)
      setCard(true);
      history("/dash");
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    },2000)

  }, [])

  return (
    <>
      {
        data === true && card === true ? (
          <>
            <Header />

            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />              
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/card/form" element={<Carddetails/>} />
              <Route path="*" element={<Error />} />
            </Routes>
          </>

        ) :  data === true && card === false ? (
              <>
              <Header />
                  <Routes>              
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />              
                  </Routes> 
              </>) : 
                  data === false && card === false ?<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box> : ""
      }


    </>
  );
}

export default App;
