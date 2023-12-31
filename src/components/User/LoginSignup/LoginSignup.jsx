import React, { useEffect, useRef, useState } from 'react'
import styles from "./LoginSignup.module.css"
import { Face, LockOpen, MailOutline, Password } from '@mui/icons-material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CgProfile } from 'react-icons/cg'
import { loginUser, registerUser } from '../../../Redux/AuthReducer/action'
import { USER_LOGIN_SUCCESS, USER_SIGNUP_SUCCESS } from '../../../Redux/AuthReducer/actionTypes'
import Footer from '../../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {
    const dispatch = useDispatch();
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: '',
        email: "",
        password: "",
    });
    const [tab, setTab] = useState("login")
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")
    const location = useLocation();
    const comingFrom = location?.state?.from?.pathname || "/";
    const navigate = useNavigate();

    const loginSubmit = (e) => {
        e.preventDefault();
        if (loginEmail && loginPassword) {
            const payload = {
                email: loginEmail,
                password: loginPassword
            }
        
            dispatch(loginUser(payload)).then((res) => {
                if (res === USER_LOGIN_SUCCESS) {
                    toast.success("Login SuccessFully !", {
                        position: toast.POSITION.TOP_CENTER
                    })
                    navigate(comingFrom, { replace: true })
                } else {
                    toast.error("Email or Password not match !", {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
        }
    }

    const registerDataChange = (e) => {
        const { name, value } = e.target;
        if (name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({
                ...user,
                [name]: value
            })
        }


    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        console.log("myForm", myForm, "user", user)


        dispatch(registerUser(myForm)).then((res) => {
            if (res === USER_SIGNUP_SUCCESS) {
                toast.success("Register SuccessFully !", {
                    position: toast.POSITION.TOP_CENTER
                })
                navigate("/login-signUp", { replace: true })
                setTab("login")
            }
            else {
                toast.error("something went wrong !", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        });

    }


    useEffect(() => {
        if (tab === "login") {

            switcherTab.current?.classList.add(styles.shiftToNeutral)
            switcherTab.current?.classList.remove(styles.shiftToRight);

            registerTab.current?.classList.remove(styles.shiftToNeutralForm);
            loginTab.current?.classList.remove(styles.shiftToLeft);


        }
        if (tab === "register") {
            switcherTab.current?.classList.remove(styles.shiftToNeutral);
            switcherTab.current?.classList.add(styles.shiftToRight);


            registerTab.current?.classList.add(styles.shiftToNeutralForm);
            loginTab.current?.classList.add(styles.shiftToLeft);

        }
    }, [tab])

    return (
        <>
            <Navbar />
            <div className={styles.loginSignUpContainer}>
                <div className={styles.loginSignUpBox}>
                    <div>
                        <div className={styles.loginSignUpToggle}>
                            <p onClick={() => setTab("login")}>Login</p>
                            <p onClick={() => setTab("register")}>Register</p>
                        </div>
                        <button ref={switcherTab} > </button>
                    </div>
                    {tab === "login" ? (<form className={styles.loginForm} ref={loginTab} onSubmit={loginSubmit}>
                        <div className={styles.loginEmail}>
                            <MailOutline />
                            <input type="email" placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.loginPassword}>
                            <LockOpen />
                            <input
                                type="password"
                                placeholder='Password'
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to={"/password/forgot"}>Forgot Password</Link>
                        <input type="submit" value={"Login"} className={styles.loginBtn} />
                    </form>) :
                        (<form className={styles.signUpForm}
                            onSubmit={registerSubmit}
                            ref={registerTab}
                            encType='multipart/form-data'
                        >
                            <div className={styles.signUpName}>
                                <Face />
                                <input
                                    type="text"
                                    placeholder='Name'
                                    required
                                    name='name'
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className={styles.signUpEmail}>
                                <MailOutline />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}

                                />
                            </div>
                            <div className={styles.signUpPassword}>
                                <LockOpen />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    value={password}
                                    name='password'
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div id='registerImage'>
                                {/* <img src="iuyuiyui" alt="Avatar preview" /> */}
                                <CgProfile className={styles.img} />
                                <input
                                    type="file"
                                    name='avatar'
                                    accept='image/'
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input type="submit" value={"Register"} className={styles.signUpBtn} />
                        </form>)}
                </div>

            </div>

        </>
    )
}

export default LoginSignup
