import "./Login.css"
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap"
import Button from "../../Components/Button/Button"
import React, { useState } from 'react';
import { LoginApi } from "../../ApiCalls/AuthApi";
import toast from 'react-hot-toast';
import toasterConfig from "../../Helpers/ToasterConfig";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        toast.loading("Logging in...")
        const response:any = await LoginApi(username, password)
        console.log(response)
        
        if (response.data.status === 200){
            localStorage.setItem("loggedIn", "0");
            // localStorage.setItem("role", JSON.stringify(response.data.data.role));
            // localStorage.setItem("username", JSON.stringify(response.data.data.role));
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            localStorage.setItem("tokenExpiry", JSON.stringify(response.data.data.token_expiry));
            localStorage.setItem("requester", response.data.data.requester);
            toast.dismiss()
            toast.success('Login Sucess!', toasterConfig);

            setTimeout(()=>{
                window.location.reload();
            }, 2000)
        } else {
            toast.dismiss()
            toast.error('Login Failed.', toasterConfig);
        }
    }

    

    // console.log(username, password)

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
                                autoComplete="off"
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
                                autoComplete="false"
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
