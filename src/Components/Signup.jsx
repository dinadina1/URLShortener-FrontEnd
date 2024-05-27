// import required packages
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import { RiErrorWarningLine } from "react-icons/ri";
import userServices from '../../Services/userService';
import { useState } from 'react';


// validate form values
const validate = values => {

    // error object
    const errors = {};

    // check if name is valid or empty
    if (!values.name) {
        errors.name = 'Name is required';
    } else if (values.name.length < 3) {
        errors.name = 'Name must be 3 characters long';
    }

    // check if email is valid or empty
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // check if password is valid or empty
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be 6 characters long';
    }

    // check if location is valid or empty
    if (!values.location) {
        errors.location = 'Location is required';
    } else if (values.location.length < 3) {
        errors.location = 'Location must be 3 characters long';
    }

    // return error object
    return errors;
}

const Signup = () => {

    // State for isBtnLoading
    const [isBtnLoading, setIsBtnLoading] = useState(false);

    // State for error
    const [isError, setIsError] = useState(null);

    // call useNavigate hook to navigate to different routes
    const navigate = useNavigate();

    // formik validation
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            location: ""
        },
        validate,
        onSubmit: async (values) => {

            setIsBtnLoading(true);
            setIsError(null);
            try {
                // api call to signup user
                const response = await userServices.register(values);

                // check if user is created successfully
                if (response) {

                    // navigate to login route
                    navigate('/login');
                    setIsBtnLoading(false);
                    formik.resetForm();
                    alert("Registration success")
                }
            } catch (err) {
                setIsBtnLoading(false);
                setIsError(err.response.data.message);
            }
        }
    })

    return (
        <>
            <div className="form-container">
                <div className="card">
                    <h2>Signup</h2>

                    <div className="login_register">

                        <Link to={"/login"} className='login'>Login</Link>
                        <Link to={"/signup"} className="register">Signup</Link>
                    </div>

                    <form className="form" onSubmit={formik.handleSubmit} >

                        <label htmlFor="name">name</label>
                        <input type="text"
                            placeholder="name"
                            className="pass"
                            id='name'
                            name='name'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />

                        {/* display error message if name is invalid or empty */}
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger mb-2">
                                <RiErrorWarningLine />
                                {formik.errors.name}
                            </div>
                        ) : null}

                        <label htmlFor="email">email</label>
                        <input type="email"
                            placeholder="Email Address"
                            className="email"
                            id='email'
                            name='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />

                        {/* display error message if email is invalid or empty */}
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger mb-2">
                                <RiErrorWarningLine />
                                {formik.errors.email}
                            </div>
                        ) : null}

                        <label htmlFor="password">password</label>
                        <input type="password"
                            placeholder="password"
                            className="pass"
                            id='password'
                            name='password'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />

                        {/* display error message if password is invalid or empty */}
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger mb-2">
                                <RiErrorWarningLine />
                                {formik.errors.password}
                            </div>
                        ) : null}

                        <label htmlFor="location">location</label>
                        <input type="text"
                            placeholder="location"
                            className="pass"
                            id='location'
                            name='location'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.location}
                        />

                        {/* display error message if location is invalid or empty */}
                        {formik.touched.location && formik.errors.location ? (
                            <div className="text-danger mb-2">
                                <RiErrorWarningLine />
                                {formik.errors.location}
                            </div>
                        ) : null}

                        {
                            isError && (
                                <div className="text-danger mb-2">
                                    {isError}
                                </div>
                            )
                        }

                    </form>
                    {
                        isBtnLoading ? (
                            <button type="submit" className="login_btn" onClick={formik.handleSubmit}>
                                <span className="spinner-border p-0" role="status" style={{ height: "23px", width: "23px" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </span>
                            </button>
                        ) : (
                            <button type="submit" className="login_btn" onClick={formik.handleSubmit}>Singup</button>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Signup