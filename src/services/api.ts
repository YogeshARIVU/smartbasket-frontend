
import axios, { type AxiosError } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Demo authentication is currently handled by the frontend.
        // Add a real access token here when backend authentication is implemented.
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.code === "ECONNABORTED") {
            console.error("SmartBasket API request timed out.");
        } else if (!error.response) {
            console.error(
                "Cannot connect to SmartBasket backend. Check whether Spring Boot is running."
            );
        } else {
            console.error(
                `SmartBasket API error: ${error.response.status}`,
                error.response.data
            );
        }

        return Promise.reject(error);
    }
);

// Reusable API error message
export function getApiErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as
            | { message?: string; error?: string }
            | undefined;

        return (
            data?.message ||
            data?.error ||
            error.message ||
            "Something went wrong. Please try again."
        );
    }

    return "An unexpected error occurred.";
}

export default api;
