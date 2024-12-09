import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles


const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post(`/api/signin`, { username: email, password: password })
            console.log("response.data = ", response.data)
            if (response.data.status == 'success') {
                toast.success("Login successful! Redirecting..."); // Show success toast
                router.push("/events");
            } else {
                toast.error("Invalid username or password. Please try again."); // Show error toast
                console.log("Login Failed")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default LoginForm;
