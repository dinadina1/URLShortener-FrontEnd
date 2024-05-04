// import required packages
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import { RiErrorWarningLine } from "react-icons/ri";
import userServices from '../../Services/userService';

// validate form values
const validate = values => {

    // error object
    const errors = {};

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

    // return error object
    return errors;
}

const Login = () => {

    // call useNavigate hook to navigate to different routes
    const navigate = useNavigate();

    // formik validation
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate,
        onSubmit: async (values) => {

            try {
                // api call to signup user
                const response = await userServices.login(values);

                // check if user is created successfully
                if (response) {

                    // set token in localstorage
                    localStorage.setItem('token', response.data.token);



                    // navigate to login route
                    setTimeout(() => {
                        navigate('/dashboard');
                        alert("Logged in successfully")
                    }, 1000);
                } else {
                    alert("Login failed");
                }
            } catch (err) {
                alert(err.response.data.message);
            }
        }
    });

    return (
        <>
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                <strong>Demo Credentials</strong> <br />
                <b>Email:</b> hacker@gmail.com
                <b>  Password:</b> 123456
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div className="form-container">
                <div className="card">
                    <h2>Login</h2>

                    <div className="login_register">

                        <Link to={"/login"} className='loggedin'>Login</Link>
                        <Link to={"/signup"} className="">Signup</Link>
                    </div>

                    <form className="form" onSubmit={formik.handleSubmit}>

                        <label htmlFor="email">email</label>
                        <input type="email"
                            placeholder="Email Adress"
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
                                <div className='text-danger pb-2'>
                                    <RiErrorWarningLine />
                                    {formik.errors.email}
                                </div>
                            ) : null
                        }

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
                        {
                            formik.touched.password && formik.errors.password ? (
                                <div className='text-danger pb-2'>
                                    <RiErrorWarningLine />
                                    {formik.errors.password}
                                </div>
                            ) : null
                        }

                    </form>

                    <button type="submit" className="login_btn" onClick={formik.handleSubmit}>Login</button>
                    <Link to={"/forgot-password"} className="fp">Forgot password?</Link>

                </div>
            </div>
        </>
    )
}

export default Login