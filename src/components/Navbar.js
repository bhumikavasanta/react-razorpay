import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../Firebase'

export const Navbar = (props) => {
  const navigate = useNavigate()
  const logoutHandler = async()=>{
    await logout()
    navigate("/")

  }
  


  return (

    <>
      <div className="container-fluid p-0 mb-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Blog App</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav align-content-center">
                {!props.currentUser&&<li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Login</Link>
                </li>}
                {props.currentUser&&<>
                <li className="nav-item">
                  <Link className="nav-link" to="/Bloglist">All Blogs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/MyBlogs">My Blogs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Addblog">Add Blog</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/" onClick={logoutHandler}>Logout</Link>
                </li>
                <li className="nav-item">
                  <h6 className='nav-link'>{props.currentUser.email}</h6>
                </li>
                </>}
              </ul>
            </div>
          </div>
        </nav>
      </div>


    </>
  )
}
