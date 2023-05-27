import { useState, useEffect, useContext  } from "react";
import { parseJwt } from "../misc/Helpers";
import { config } from "../misc/Costants"
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

export const SignUp = () => {

    const { getUser, userIsAuthenticated, userLogin } = useAuth()

    const navigate = useNavigate();

    const [fName, setFName] = useState('');
    const [mName, setMName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSignUp = async (e: any) => { 

        e.preventDefault();

        const rqstConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fName": fName,
                "mName": mName,
                "lName": lName,
                "email": email,
                "contactNumber": contactNumber,
                "address": address,
                "username": username,
                "password": password
            })
        };

        const baseUrl: string = config.url.API_BASE_URL + `/api/auth/signup`;

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
            <section className="register d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div className="card">

                                <div className="card-body">

                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                        <p className="text-center small">Enter below details to create account</p>
                                    </div>

                                    <form className="row g-3 needs-validation">
                                        <div className="col-4">
                                            <input type="text" name="fName" className="form-control" placeholder="First Name" required
                                                onChange={e => setFName(e.target.value)} value={fName}></input>
                                        </div>

                                        <div className="col-4">
                                            <input type="text" name="mName" className="form-control" placeholder="Middle Name" required
                                                onChange={e => setMName(e.target.value)} value={mName}></input>
                                        </div>

                                        <div className="col-4">
                                            <input type="text" name="lName" className="form-control" placeholder="Last Name" required
                                                onChange={e => setLName(e.target.value)} value={lName}></input>
                                        </div>

                                        <div className="col-6">
                                            <input type="email" name="email" className="form-control" placeholder="Email" required 
                                                onChange={e => setEmail(e.target.value)} value={email}/>
                                        </div>

                                        <div className="col-6">
                                            <input type="text" name="contactNumber" className="form-control" placeholder="Contact Number" required 
                                                onChange={e => setContactNumber(e.target.value)} value={contactNumber}/>
                                        </div>

                                        <div className="col-12">
                                            <textarea name="address" className="form-control" placeholder="Address" required style={{ resize: "none" }} 
                                                onChange={e => setAddress(e.target.value)} value={address}/>
                                        </div>
                                        
                                        <div className="col-12">
                                            <div className="input-group has-validation">
                                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                <input type="text" name="username" className="form-control" placeholder="Choose your user name to login to the application" 
                                                    required onChange={e => setUsername(e.target.value)} value={username} />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <input type="password" name="password" className="form-control" placeholder="Choose your password to login to the application" 
                                                required onChange={e => setPassword(e.target.value)} value={password} />
                                        </div>

                                        <div className="col-12">
                                            <button className="btn main-color btn-primary w-100" type="submit" onClick={handleSignUp}>Create Account</button>
                                        </div>
                                        <div className="col-12">
                                            <p className="small mb-0">Already have an account? <a href="/login">Log in</a></p>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </>
    );
}