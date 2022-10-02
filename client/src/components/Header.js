import React, { useContext,useEffect ,useState } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate , NavLink } from "react-router-dom"

const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
            sessionStorage.removeItem("usersdatatoken");
            history("/login");       
            window.location.reload(false);
 
    }

    const goProf = () => {
        history("/profile")
    }

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("*")
    }

    return (
        <>
            <header>
                <nav>
                    
                <NavLink to="/login">{logindata ?
                    <h1>{logindata.user.username}</h1>:
                    <h1>Welcome</h1>
                    }</NavLink>
                    <div className="avtar">
                        {
                            logindata.user ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.user.username[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }

                    </div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.user ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Dashboard</MenuItem>
                                    <MenuItem onClick={() => {
                                        goProf()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : ""
                        }

                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header