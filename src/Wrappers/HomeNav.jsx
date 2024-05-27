// import required packages
import { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const HomeNav = () => {

  // define useNavigate
  const navigate = useNavigate();

  // redirect to home page if user is logged in
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">URL Shortener</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form className="d-flex" role="search">
              <Link to={"/signup"} className="btn btn-outline-secondary me-3" type="submit">Sign up</Link>
              <Link to={"/login"} className="btn btn-outline-secondary me-3" type="submit">Sign in</Link>
            </form>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
}

export default HomeNav