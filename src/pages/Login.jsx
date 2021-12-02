import React, {useState} from 'react';
import MyInput from "../components/UI/input/myInput";
import MyButton from "../components/UI/button/myButton";
import {useDispatch} from "react-redux";

const Login = () => {
    const [userid, setUserid] = useState('user')
    const dispatch = useDispatch()
    const login = () => {
        dispatch({type: 'SET_USERID', value: userid});
        localStorage.setItem('userid', userid)

        dispatch({type: 'SET_AUTH', value: true});
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <MyInput
                    value={userid}
                    type="text"
                    labeltext="USER ID"
                    onChange={(e) => setUserid(e.target.value)}
                />
                <MyButton onClick={login}>LOGIN</MyButton>
            </form>
        </div>
    );
};

export default Login;