import React from 'react';
import { NavLink } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { Link } from 'react-router-dom';

export const Navbar = () => {

  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />
  }

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>         {/*create a navigation bar */}
      <div className='container-fluid'>                                           {/* cut of the corner of the pages a little bit */}
        <span className='navbar-brand'> Luv 2 Read</span>                         {/*The text will be displayed in the left hand corner of nav bar */}
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>  {/* ul - unordered list */}
            <li className='nav-item'>
              <NavLink className='nav-link' to='/home'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>Search Books</NavLink>
            </li>
            {authState.isAuthenticated &&
              <li className='nav-item'>
                <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
              </li>
            }
             {authState.isAuthenticated &&
              <li className='nav-item'>
                <NavLink className='nav-link' to='/fees'>Pay fees</NavLink>
              </li>
            }
            {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin' &&
            <li className='nav-item'>
              <NavLink className='nav-link' to='/admin'>Admin</NavLink>
            </li>

            }
          </ul>
          <ul className='navbar-nav ms-auto'>
            {!authState.isAuthenticated ?
              <li className='nav-item m-1'>
                <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>
              </li>
              :
              <li>
                <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}