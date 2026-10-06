import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Expense from "./pages/dashboard/Expense";
import Home from "./pages/dashboard/Home";
import Income from "./pages/dashboard/Income";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/UserContext";
import ProtectedRoute from "./components/layouts/ProtectedRoute";

function App() {
    return (
        <UserProvider>
            <Toaster />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/income"
                        element={
                            <ProtectedRoute>
                                <Income />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/expense"
                        element={
                            <ProtectedRoute>
                                <Expense />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;

const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return isAuthenticated ? (
        <Navigate to="/dashboard" replace />
    ) : (
        <Navigate to="/login" replace />
    );
};