import { useState, useEffect } from "react";
import { parseJwt } from "../misc/Helpers";
import { config } from "../misc/Costants"
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

export const SignIn = () => {

    const navigate = useNavigate();

    const { getUser, userIsAuthenticated, userLogin } = useAuth()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e: any) => {

        e.preventDefault();

        const location = window.location.hostname;

        const rqstConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        };
        const baseUrl: string = config.url.API_BASE_URL + `/api/auth/authenticate`;

        const response = await fetch(baseUrl, rqstConfig);

        const responseJson = await response.json();

        if (!response.ok) {
            throw new Error('Something went wrong!');
        } else {
            console.log('ok');
            const accessToken = responseJson.accessToken
            const parsedJwt = parseJwt(accessToken);
            const user = { parsedJwt, accessToken };

            userLogin(user);

            navigate('/'); // Navigate to the desired path
        }
    };

    return (
        <>
            <div className="container">
                <div className="container col-lg-4 mt-5 d-flex flex-column align-items-center justify-content-center">
                    <div className="row justify-content-center">
                        <div className="card mb-3">

                            <div className="card-body">

                                <div className="pt-4 pb-2">
                                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                    <p className="text-center small">Enter your username & password to login</p>
                                </div>

                                <form className="row g-3 needs-validation">

                                    <div className="col-12">
                                        <label className="form-label">Username</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                                            <input type="text" name="username" className="form-control" id="yourUsername"
                                                required onChange={e => setUsername(e.target.value)} value={username} />
                                            <div className="invalid-feedback">Please enter your username.</div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Password</label>
                                        <input type="password" name="password" className="form-control" id="yourPassword"
                                            required onChange={e => setPassword(e.target.value)} value={password} />
                                        <div className="invalid-feedback">Please enter your password!</div>
                                    </div>

                                    <div className="col-12">
                                        <button className="btn main-color btn-primary w-100" type="submit" onClick={handleSignIn}>Login</button>
                                    </div>
                                    <div className="col-12">
                                        <p className="small mb-0">Don't have account? <Link to="/signup">Create an account</Link></p>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}