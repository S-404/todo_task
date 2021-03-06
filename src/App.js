import React, {useEffect} from 'react';
import {BrowserRouter as Router,} from "react-router-dom";
import NavbarVertical from "./components/UI/navbar/navbarVertical";
import AppRouter from "./components/appRouter";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch()
    const login = () => {
        dispatch({type: 'SET_USERID', value: localStorage.getItem('userid')})
        dispatch({type: 'SET_AUTH', value: true})
    }
    const isLoading = (val) => {
        dispatch({type: 'SET_isLoading', value: val})
    }
    useEffect(() => {
        if (localStorage.getItem('auth') && localStorage.getItem('userid')) {
            login();
        }
        if(localStorage.getItem('selectedUG')){
            dispatch({type: 'SET_SELECTED_UG', value: +localStorage.getItem('selectedUG')})
        }
        isLoading(false)
    }, [])
    return (
        <Router>
            <NavbarVertical/>
            <AppRouter/>
        </Router>
    )

}

export default App;
