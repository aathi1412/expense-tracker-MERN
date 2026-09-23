import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Expense from "./pages/dashboard/Expense";
import Home from "./pages/dashboard/Home";
import Income from "./pages/dashboard/Income";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Root />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/dashboard' element={<Home />}/>
                <Route path='/income' element={<Income />}/>
                <Route path='/expense' element={<Expense />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App

const Root = () => {

    // check access token exists or not in localStorage
    const isAuthenticated = !!localStorage.getItem("accessToken");

    return isAuthenticated ? (
            <Navigate to="/dashboard" />
        )
    : (
            <Navigate to="/login" />
        );
};
