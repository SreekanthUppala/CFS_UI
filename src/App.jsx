import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import List from "./Pages/List";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<List />}
                />

                <Route
                    path="/add"
                    element={<Add />}
                />
              <Route 
                path="/edit/:id" 
                element={<Edit />}
               />
            </Routes>

        </BrowserRouter>
    );
}

export default App;