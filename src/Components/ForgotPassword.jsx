// import required packages
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import React from 'react'
import userServices from '../../Services/userService';
import { RiErrorWarningLine } from 'react-icons/ri';

// formik validate
const validate = values => {

    // create errors object
    const errors = {};

    // check if email is empty or valid
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    // return errors
    return errors;
}

const forgotPassword = () => {

    // define useNavigate hook
    const navigate = useNavigate();

    // form validation
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validate,
        onSubmit: async (values) => {
            try {
                // call api for send email because forgot password
                const response = await userServices.forgotPassword(values);

                alert(response.data.message);
                navigate('/reset-password');
                formik.resetForm();
            }
            catch (error) {
                console.log(error);
                alert(error.response.data.message);
            }
        }
    })

    return (
        <>
            <div className="form-container">
                <div className="card" style={{ padding: "40px 100px 80px 100px" }}>
                    <h2 className='pb-5'>Forgot Password</h2>

                    <form className="form" onSubmit={formik.handleSubmit}>

                        <label htmlFor="email" style={{ display: "block" }}>Enter your email</label>
                        <input type="email"
                            placeholder="Ex: johndeo@gmail.com"
                            className="email"
                            id='email'
                            name='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />

                        {/* display error message if email is invalid or empty */}
                        {
                            formik.touched.email && formik.errors.email ? (
                                <small className='text-danger pb-2' style={{ display: "block" }}>
                                    <RiErrorWarningLine />
                                    {formik.errors.email}
                                </small>
                            ) : null
                        }

                        <button type="submit" className="login_btn" onClick={formik.handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default forgotPassword