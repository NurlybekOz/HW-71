import './App.css';
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import Home from "./Containers/Home/Home.tsx";
import NewDish from "./Containers/NewDish/NewDish.tsx";
import {Route, Routes} from "react-router-dom";
import EditDish from "./Containers/EditDish/EditDish.tsx";
import Orders from "./Containers/Orders/Orders.tsx";

const App = () => {
    return (
        <>
            <header className="mb-5">
                <Toolbar isAdmin={window.location.pathname.startsWith("/admin")} />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Home />} />
                    <Route path="/admin/dishes" element={<Home />} />
                    <Route path="/admin/new-dish" element={<NewDish />} />
                    <Route path="/admin/edit-dish/:idDish" element={<EditDish />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </main>
        </>
    );
};

export default App;
