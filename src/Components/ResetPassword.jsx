// import required packages
import { useFormik } from "formik"
import { RiErrorWarningLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import userServices from "../../Services/userService";

// formik validation
const validate = values => {

  // create error object
  const errors = {};

  // check if password is empty or valid
  if (!values.newPassword) {
    errors.newPassword = 'Password is required'
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Password must be at least 6 characters'
  }

  // check if confirm password is empty or valid
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required'
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'Given passwords does not match'
  }

  // check password reset code is empty or valid
  if (!values.passwordResetCode) {
    errors.passwordResetCode = 'Password reset code is required'
  } else if (values.passwordResetCode.length !== 6) {
    errors.passwordResetCode = 'Password reset code must be 6 characters long'
  }

  // return error object
  return errors;
}

const ResetPassword = () => {

  // define useNavigate hook
  const navigate = useNavigate();

  // form validation
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
      passwordResetCode: ''
    },
    validate,
    onSubmit: async (values) => {
      try {
        // api call to reset password
        const response = await userServices.resetPassword(values);
        alert(response.data.message);

        // navigate to home
        navigate('/');

        // reset form
        formik.resetForm();
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    }
  })

  return (
    <>
      <div className="form-container">
        <div className="card">
          <h2>Reset Password</h2>

          <form className="form" style={{ padding: "40px 100px 80px 100px" }} onSubmit={formik.handleSubmit}>

            <label htmlFor="password">new password</label>
            <input type="password"
              placeholder="new password"
              className="pass"
              id='password'
              name="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />

            {/* display error message if password is invalid or empty */}
            {
              formik.touched.newPassword && formik.errors.newPassword ? (
                <small className='text-danger pb-2'>
                  <RiErrorWarningLine />
                  {formik.errors.newPassword}
                </small>
              ) : null
            }

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password"
              placeholder="confirm-password"
              className="pass"
              id='confirm-password'
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />

            {/* display error message if password is invalid or empty */}
            {
              formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <small className='text-danger pb-2'>
                  <RiErrorWarningLine />
                  {formik.errors.confirmPassword}
                </small>
              ) : null
            }

            <label htmlFor="token">token</label>
            <input type="text"
              placeholder="Password reset code"
              className="email"
              id='token'
              name="passwordResetCode"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.passwordResetCode}
            />

            {/* display error message if password is invalid or empty */}
            {
              formik.touched.passwordResetCode && formik.errors.passwordResetCode ? (
                <small className='text-danger pb-2'>
                  <RiErrorWarningLine />
                  {formik.errors.passwordResetCode}
                </small>
              ) : null
            }

            <button type="submit" className="login_btn" onClick={formik.handleSubmit}>Save</button>
          </form>

        </div>
      </div>
    </>

  )
}

export default ResetPassword