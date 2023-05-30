import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { useAuth } from '../../context/AuthContext'

export const Navbar = () => {

    const { getUser, userIsAuthenticated, userLogout } = useAuth()

    const logout = () => {
        userLogout()
    }

    const unauthStyle = () => {
        return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
    }

    const authStyle = () => {
        return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
    }

    const getUserName = () => {
        const user = getUser()
        return user ? user.parsedJwt.name : ''
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <NavLink className='nav-link' to='/home'><span className='navbar-brand'>Luv 2 Read</span></NavLink>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Books</NavLink>
                        </li>
                        {userIsAuthenticated() && 
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
                            </li>
                        }
                    </ul>
                   

                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            <NavLink type='button' className='btn btn-outline-light' to='/login' style={unauthStyle()}>Sign In</NavLink>
                        </li>
                        <li className='nav-item m-1'>
                            <span className='navbar-brand' style={authStyle()}>{`Hi ${getUserName()}`}</span>
                        </li>
                        <li className='nav-item m-1'>
                            <NavLink type='button' className='btn btn-outline-light' to='/login' style={authStyle()} onClick={logout}>Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}