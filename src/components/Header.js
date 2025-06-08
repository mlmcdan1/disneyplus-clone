import React, { useEffect } from 'react'
import { auth, provider } from "../firebase"
import styled from 'styled-components'
import { useNavigate, Link } from "react-router-dom";
import {
      selectUserName,
      setUserLogin, 
      setSignOut
} from "../features/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }));

                if (window.location.pathname === "/login") {
                    navigate("/");
                }
            }
        });

        return () => unsubscribe();
    }, [dispatch, navigate])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result)=>{
           // console.log(result);
           let user = result.user
           dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL

           }))
           navigate("/");
        })
    }

    const signOut = () => {
        auth.signOut()
            .then(()=>{
                dispatch(setSignOut());
                navigate("/login");

            })
        
    }


    return (
        <Nav>
            <Logo src="/logo.svg"/>
            { !userName ? (
                <LoginContainer>
                    <Login onClick={signIn}>Login</Login>
                </LoginContainer>
                ):
                <>
                <NavMenu>
                <Link to="/">
                    <img 
                        src = "/home-icon.svg"
                        alt='home icon'
                    />
                    <span>HOME</span>
                </Link>
                <Link to="/search">
                    <img 
                        src = "/search-icon.svg"
                        alt='search icon'
                    />
                    <span>SEARCH</span>
                </Link>
                <Link to="/watchlist">
                    <img 
                        src = "/watchlist-icon.svg"
                        alt='watch icon'
                    />
                    <span>WATCHLIST</span>
                </Link>
                <Link to="/original">
                    <img 
                        src = "/original-icon.svg"
                        alt='star icon'
                    />
                    <span>ORIGINAL</span>
                </Link>
                <Link to="/movies">
                    <img 
                        src = "/movie-icon.svg"
                        alt='movie icon'
                    />
                    <span>MOVIES</span>
                </Link>
                <Link to="/series">
                    <img 
                        src = "/series-icon.svg"
                        alt='tv icon'
                    />
                    <span>SERIES</span>
                </Link>


            </NavMenu>

            <UserImg
                onClick={signOut}
                src="https://www.pngkey.com/png/full/880-8806085_incredibles-2-disney-pixar-dash-incredibles-png.png"
                alt='small logo'
            />
            </>
            }
           

        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;

`
const Logo = styled.img`
    width: 80px;

`
const NavMenu = styled.div`
    display: flex; 
    flex: 1;
    margin-left: 25px;
    align-items: center; 

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        text-decoration: none; 
        color: white;
        img{
            height: 20px; 
        }

        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative; 

            &:after {
                content: "";
                height: 2px; 
                background: white;
                position: absolute;

                left: 0;
                right: 0; 
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);


            }
        }

        &:hover{
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }

`
const UserImg = styled.img`
        width: 48px;
        height: 48px;
        border-radius: 50%;
        curser: pointer;

`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0,0,0, 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }


`

const LoginContainer =styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end; 
`