// import React, { useState } from 'react'
// import styled from 'styled-components'
// import avatar from '../../img/avatar.png'
// import { signout } from '../../utils/Icons'
// import { menuItems } from '../../utils/menuItems'
// import {Link} from 'react-router-dom'
// import { useGlobalContext } from './context/globalContext';

// function Navigation({active, setActive}) {
    
//   const { setIsLoggedIn } = useGlobalContext();
//     return (
//         <NavStyled>
//             <div className="user-con">
//                 <img src={avatar} alt="" />
//                 <div className="text hide">
//                     <h2>Mike</h2>
//                     <p>Your Money</p>
//                 </div>
//             </div>
//             <ul className="menu-items">
//                 {menuItems.map((item) => {
//                     return <li
//                         key={item.id}
//                         onClick={() => setActive(item.id)}
//                         className={active === item.id ? 'active hide': 'hide'}
//                     >
//                         {item.icon}
//                         <span className='hide'>{item.title}</span>
//                     </li>
//                 })}
//             </ul>
//             <div className="bottom-nav">
//                 <li>
//                     <Link to="/login">
//                     {setIsLoggedIn(false)}
//                         <span className='signout'>{signout}</span> <span className='hide'>Sign Out</span>
//                     </Link>
//                 </li>
//             </div>
//         </NavStyled>
//     )
// }

// const NavStyled = styled.nav`
//     .bottom-nav{
//         li{
//             .signout{
//                 @media (max-width: 1024px){
//                     font-size: 40px;
//                 } 
//             }   
//         }
//     }
//     padding: 2rem 1.5rem;
//     width: fit-content;
//     height: 100%;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     gap: 2rem;
//     @media (max-width:600px){
//         flex-direction: row;
//         flex: wrap;
//         width: 100%;
//         padding: 0px;
//     }
//     .hide{
//         @media (min-width: 601px) and (max-width: 1024px){
//             display: none;
//         }       
//     }
//     @media (max-width: 600px){
//         height: fit-content;
//         .hide{
//             display: none;
//         }    
//     }
//     .user-con{
//         height: 100px;
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         img{
//             width: 80px;
//             height: 80px;
//             border-radius: 50%;
//             object-fit: cover;
//             background: #fcf6f9;
//             border: 2px solid #FFFFFF;
//             padding: .2rem;
//             box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
//         }
//         h2{
//             color: rgba(34, 34, 96, 1);
//         }
//         p{
//             color: rgba(34, 34, 96, .6);
//         }
//     }

//     .menu-items{
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         li{
//             display: grid;
//             grid-template-columns: 40px auto;
//             align-items: center;
//             margin: .6rem 0;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all .4s ease-in-out;
//             color: rgba(34, 34, 96, .6);
//             padding-left: 1rem;
//             position: relative;
//             i{
//                 color: rgba(34, 34, 96, 0.6);
//                 font-size: 2rem;
//                 transition: all .4s ease-in-out;
                
//                 @media (min-width: 601px) and (max-width: 1024px){
//                     font-size: 3.5rem;
//                     display:flex;
//                 } 
//             }
//         }
//         @media (max-width: 600px){
//             flex-direction: row;
//         }
//     }

//     .active{
//         color: rgba(34, 34, 96, 1) !important;
//         i{
//             color: rgba(34, 34, 96, 1) !important;
//         }
//         &::before{
//             content: "";
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 4px;
//             height: 100%;
//             background: #222260;
//             border-radius: 0 10px 10px 0;
//         }
        
//     }
// `;

// export default Navigation



import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useGlobalContext } from '../../context/globalContext';
import { FaUserAlt } from "react-icons/fa";
import { useAuth } from '../LandingPage/useAuth';
import { useMsal } from '@azure/msal-react';

function Navigation({ active, setActive }) {
  // const { setIsLoggedIn } = useGlobalContext();

  // Logout handler
  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };
  const { isAuthenticated, login, logout, isLoggingIn } = useAuth();
  const { instance, accounts } = useMsal();
  return (
    <NavStyled>
      <div className="user-con">
        {/* <img src={avatar} alt="" /> */}
        <span className='text-5xl border-4 border-gery-800 text-red-800 rounded-full'><FaUserAlt /> </span>
        <div className="text hide">
            {/* insert username of user */}
          <h2 className='font-extrabold text-2xl'>{accounts[0].username}</h2>  
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? 'active hide' : 'hide'}
          >
            {item.icon}
            <span className="hide">{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <li >
        <button onClick={logout}>
          <span className="signout">{signout}</span> <span className="hide">Sign Out</span>
          </button>
        </li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  .bottom-nav {
    cursor: pointer;
    li {
      .signout {
        @media (max-width: 1024px) {
          font-size: 40px;
        }
      }
    }
  }
  padding: 2rem 1.5rem;
  width: fit-content;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding: 0px;
  }

  .hide {
    @media (min-width: 601px) and (max-width: 1024px) {
      display: none;
    }
  }

  @media (max-width: 600px) {
    height: fit-content;
    .hide {
      display: none;
    }
  }

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 2rem;
        transition: all 0.4s ease-in-out;

        @media (min-width: 601px) and (max-width: 1024px) {
          font-size: 3.5rem;
          display: flex;
        }
      }
    }

    @media (max-width: 600px) {
      flex-direction: row;
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
