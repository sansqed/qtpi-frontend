import "./Login.css"
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap"

const Login = () => {
    return(
        <div className="login-container">
            <div className="login-box">
                <div className="login-body">
                    <span className="login-title">ERP System</span>
                    <Form>
                        <FormGroup className="login-form">
                            <FormLabel className="login-label">Username</FormLabel>
                            <Form.Control type="text" placeholder="Enter username" className="login-input"/>
                        </FormGroup>
                        <FormGroup className="login-form">  
                            <FormLabel className="login-label">Password</FormLabel>
                            <Form.Control type="password" placeholder="Enter password" className="login-input"/>
                        </FormGroup>
                    </Form>
                    <button>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Login;