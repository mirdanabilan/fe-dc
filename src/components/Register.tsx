import React, {useState} from 'react';
import "./css/form.css"
import {Formik, Field, Form, ErrorMessage, yupToFormErrors} from 'formik';
import * as Yup from "yup";
import IUser from "../types/user.type";
import {register} from "../services/auth.service";
import { Switch, Route, Link } from "react-router-dom";

const Register: React.FC = () => {

    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: IUser = {
        name: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("This field can't be empty!"),
        email: Yup.string()
                  .email("This is not a valid email!")
                  .required("This filed can't be empty!"),
        password: Yup.string()
                     .test(
                         "len",
                         "Password must be between 6-20 characters!",
                         (val:any) =>
                          val &&
                          val.toString().length >= 6 &&
                          val.toString().length <= 40
                     ).required("This filed can't be empty!")
    });

    const handleRegister = (formValue: IUser) => {
        const {name, email, password} = formValue;
        register(name, email, password)
        .then((response) => {
            setMessage(response.data.message);
            setSuccessful(true);
        }, (error) => {
            const resMessage =
            (error.response && 
             error.response.data && 
             error.response.data.message) ||
             error.message ||
             error.toString();
             setMessage(resMessage);
             setSuccessful(false);
            }   
        );
    };

    return(
        <div className="login-body">
            <div style={{marginTop:180}}>
                <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
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
                                    <p>Register</p>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="name">Name</label>
                                    <Field 
                                        name="firstName" 
                                        type="text" 
                                        className="form-control"
                                    />
                                    <ErrorMessage 
                                        name="firstName" 
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email">E-mail</label>
                                    <Field 
                                        name="email" 
                                        type="email" 
                                        className="form-control"
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
                                        className="btn btn-primary btn-block">
                                    <Link to={"/login"} style={{color:"white"}}>Register</Link>
                                </button>
                            </div>
                            <div className="form-text">
                                Already have an account? <Link to={"/login"}>Login Here!</Link>
                            </div>
                        </div>

                        {message && (
                            <div className="form-group">
                            <div className={
                                    successful ? "alert alert-success" : "alert alert-danger"} 
                                 role="alert">
                                {message}
                             </div>
                            </div>
                        )}
                    </Form>
                    </Formik>
            </div>
        </div>
    
    );
}; export default Register;