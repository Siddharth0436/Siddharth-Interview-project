import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import ProtectedRoute from "../components/protectedRoute";
import Task from "./task";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard"

                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>} />

                <Route path="/tasks"
                    element={
                        <ProtectedRoute>
                            <Task />
                        </ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;