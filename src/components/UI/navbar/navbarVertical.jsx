import React, {useState} from 'react';
import classes from "./navbarVertical.module.css";
import HamburgerButton from "../button/hamburgerButton";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const NavbarVertical = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const logout = () => {
        dispatch({type: 'SET_AUTH', value: false});
        localStorage.removeItem('auth')
        localStorage.removeItem('userid')
    }

    const navbarOptions = [
        {name: 'ABOUT', to: '/about'},
        {name: 'TASKS', to: '/tasks'},

    ]
    const [enabled, setEnabled] = useState(false)
    return (
        isAuth ?
            <div className={`${classes.navbar} ${enabled ? classes.navbar_expanded : ''}`}>
                <HamburgerButton onClick={() => {
                    setEnabled(!enabled);
                }}/>
                {
                    navbarOptions.map((option, index) => (
                        <Link
                            key={'option_' + option.name + index}
                            to={option.to}
                            onClick={() => setEnabled(false)}
                        >{option.name}</Link>))
                }
                <Link
                    to='/login'
                    onClick={logout}
                >LOGOUT</Link>
            </div>
            :
            <div/>
    );
};

export default NavbarVertical;