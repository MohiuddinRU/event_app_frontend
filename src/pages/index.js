import Head from "next/head";
import {useState} from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import SignupForm from "@/components/SignupForm/SignupForm";
import styles from "@/styles/Home.module.css";

export default function Home() {
    const [activeTab, setActiveTab] = useState("login");  // Manage active form (Login/Signup)
    return (
        <>
            <Head>
                <title>Custom Events</title>
                <meta name="description" content="Custom Event App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className={styles.page}>
                <main className={styles.main}>
                    <h1>Event App</h1>
                    <div className="d-flex justify-content-center my-4">
                        <button
                            className={`btn ${activeTab === 'login' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`btn ${activeTab === 'signup' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setActiveTab('signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div>
                        {activeTab === "login" && <LoginForm />}
                        {activeTab === "signup" && <SignupForm />}
                    </div>
                </main>
            </div>
        </>
    );
}
