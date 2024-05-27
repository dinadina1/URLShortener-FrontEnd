// import required packages
import { Link, Outlet, useNavigate } from 'react-router-dom'
import userServices from '../../Services/userService'
import { useEffect, useState } from 'react';

const DashboardNav = () => {

  // State for loading
  const [isLoading, setIsLoading] = useState(true);

  // State for user
  const [user, setUser] = useState({});

  // define useNavigate
  const navigate = useNavigate();

  // useEffect for get current logged in user
  useEffect(() => {

    // redirect to login if user is not logged in
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }

    // Function to get current logged in user
    const getCurrentUser = async () => {
      try {
        // get currently logged in user
        const response = await userServices.getCurrentUser();

        // set loading to false
        if (response.status == 200 || response.status == 201)
          setUser(response.data);
        setIsLoading(false);
      } catch (err) {
        // reload page
        window.location.reload();

        // alert("Something went wrong");
      }
    }

    // call getCurrentUser function
    if (token) {
      getCurrentUser();
    }
  }, []);


  // logout function
  const handleLogout = async () => {
    try {

      // remove token from localstorage
      localStorage.removeItem('token');

      // navigate to home route
      navigate('/login');

    } catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <>
      {
        isLoading ? (
          <div className="container" style={{ height: "90vh" }}>
            <div className="d-flex justify-content-center pt-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>

        ) : (

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
                      <Link to={"/"} className="nav-link active">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/shortener"} className="nav-link active">Shortener</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/analytics"} className="nav-link active">Analytics</Link>
                    </li>
                  </ul>
                  <form className="d-flex">
                    <li className='nav-link me-3 pt-2 fw-bold'>{user.name}</li>
                    <button className="btn btn-outline-secondary me-3" onClick={() => handleLogout()}>Logout</button>
                  </form>
                </div>
              </div>
            </nav>

            <Outlet />
          </>
        )
      }
    </>
  )
}

export default DashboardNav