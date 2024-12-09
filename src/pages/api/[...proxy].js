import axios from 'axios';

const backendBaseURL = process.env.API_URL; // Backend URL from .env

export default async function handler(req, res) {
    try {
        // Construct the URL for your backend
        const backendURL = `${backendBaseURL}${req.url}`;
        console.log("url = ",req.url)
        console.log("backendBaseURL = ", backendBaseURL)
        console.log(req.body)

        // Forward the request method, headers, and body to the backend
        const response = await axios({
            method: req.method,
            url: backendURL,
            headers: req.headers,
            data: req.body,
        });

        // Pass back the backend response to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Proxy error:", error.message);

        // Handle error response
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: "Something went wrong!" };
        res.status(status).json(data);
    }
}
