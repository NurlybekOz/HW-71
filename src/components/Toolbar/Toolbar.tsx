import {NavLink} from "react-router-dom";

interface ToolbarProps {
    isAdmin: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({isAdmin}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
            <div className="container">
                <NavLink to={isAdmin ? '/admin' : '/'} className="navbar-brand">
                    Turtle Pizza {isAdmin && "- Admin"}
                </NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {!isAdmin ? ('') : (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/admin/dishes" className="nav-link">Dishes</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/orders" className="nav-link">Orders</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;
