import React, {useState} from 'react';
import "./css/form.css"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../services/auth.service";
import { RouteComponentProps } from "react-router-dom";
import { Switch, Route, Link } from "react-router-dom";



interface RouterProps {
    history: string;
}

type Props = RouteComponentProps<RouterProps>;

const Login: React.FC<Props> = ({history}) => {
    
    //hooks
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    //menentukan type dan initial value
    const initialValues: {
        // type nya username dan password
        email: string;
        password: string;
    } = {
        // initial state nya username dan password
        email: "",
        password: ""
    };

    // menentukan field yang wajib diisi
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This field can't be empty!"),
        password: Yup.string().required("This filed can't be empty!")
    });

    const handleLogin = (
        formValue: {
            email:string;
            password:string;
        }) => {
            const {email, password} = formValue;
            setMessage("");
            setLoading(true);
            login(email, password).then(
                () => {
                    history.push("/profile")
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                    (error.response && 
                     error.response.data && 
                     error.response.data.message) ||
                     error.message ||
                     error.toString();
                     setLoading(false);
                     setMessage(resMessage);
                }
            );
        };
        return(
            <div className="login-body">
                <div style={{marginTop:180}}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                    <Form className="form-card">
                        <div className="login-card">
                            <div>
                                <div className="form-img">
                                    <img 
                                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                        alt="profile-img"
                                        className="profile-img-card"
                                    />
                                </div>
                                <div className='form-title'>
                                    <p>Log In</p>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email">E-mail</label>
                                    <Field 
                                        name="email" 
                                        type="email" 
                                        className="form-control form-input"
                                    />
                                    <ErrorMessage 
                                        name="email" 
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="password">Password</label>
                                    <Field 
                                        name="password" 
                                        type="password" 
                                        className="form-control"
                                    />
                                    <ErrorMessage 
                                        name="password" 
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" 
                                    className="btn btn-primary btn-block" 
                                    disabled={loading}>
                                    <span>Login</span>
                                </button>
                            </div>
                            <div className="form-text">
                                Don't have an account yet? <Link to={"/register"}>Register Here!</Link>
                            </div>
                        </div>
                        
                        {message && (
                            <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                             </div>
                            </div>
                        )}
                    </Form>
                    </Formik>
                </div>
            </div>  
        );
}; export default Login;