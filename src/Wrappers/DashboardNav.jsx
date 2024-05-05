// import required packages
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import userServices from '../../Services/userService'

export async function loader() {

  // get currently logged in user
  const user = await userServices.getCurrentUser();

  // return the user data
  return user;
}

const DashboardNav = () => {

  // define useNavigate
  const navigate = useNavigate();

  // define userLoaderData
  const user = useLoaderData();

  // logout function
  const handleLogout = async () => {
    try {

      // remove token from localstorage
      localStorage.removeItem('token');

      // navigate to home route
      navigate('/');

    } catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{}}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">URL Shortener</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={""} className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={"shortener"} className="nav-link active">Shortener</Link>
              </li>
              <li className="nav-item">
                <Link to={"analytics"} className="nav-link active">Analytics</Link>
              </li>
            </ul>
            <form className="d-flex">
              <li className='nav-link me-3 pt-2 fw-bold'>{user.data.name}</li>
              <button className="btn btn-outline-secondary me-3" onClick={() => handleLogout()}>Logout</button>
            </form>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
}

export default DashboardNav