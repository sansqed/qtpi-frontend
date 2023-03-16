import "./Login.css"
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap"
import Button from "../../Components/Button/Button"
import React, { useState } from 'react';
import { LoginApi } from "../../ApiCalls/UsersApi";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [isInvalid, setIsInvalid] = useState({
        username: false,
        password: false,
    })

    const handleChange = (e:any) => {
        const {name, value} = e.target

        if(name === "username")
            setUsername(value)
        else if (name === "password")
            setPassword(value)
    }

    const signIn = async() => {
        const response:any = await LoginApi(username, password)
        console.log(response)
        localStorage.setItem("loggedIn", "1");
        window.location.reload();
        // if (response.status === 200){
        //     localStorage.setItem("role", JSON.stringify(response.data.data.role));
        //     localStorage.setItem("username", JSON.stringify(response.data.data.role));
        // } else {

        // }
    }

    console.log(username, password)

    return(
        <div className="login-container">
            <div className="login-box">
                <div className="login-body">
                    <h1 className="login-title">ERP System</h1>
                    <Form>
                        <FormGroup className="login-form">
                            <FormLabel className="login-label">
                                Username
                            </FormLabel>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                className="login-input"
                                name="username"
                                onChange={(e)=>{handleChange(e)}}
                            />
                        </FormGroup>
                        <FormGroup className="login-form">  
                            <FormLabel className="login-label">
                                Password
                            </FormLabel>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                className="login-input"
                                name="password"
                                onChange={(e)=>{handleChange(e)}}
                            />
                        </FormGroup>
                    </Form>
                    <Button
                        type="sign-in"
                        handleClick={()=>{signIn()}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login;