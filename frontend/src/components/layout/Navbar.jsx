import { NavLink } from "react-router"
import logo from "../../assets/coin.png"
export default function Navbar(){
    return (
        <div className="flex justify-between items-center bg-slate-800 text-white p-4 shadow-md">
            <NavLink to="/">
                <img  src={logo} alt="Cost" className="h-10 w-10 animate-bounce" />
            </NavLink>
            <nav className="flex items-center space-x-4">
                <ul className="flex space-x-4">
                    <li className="hover:text-yellow-400"><NavLink to="/">Home</NavLink></li>
                    <li className="hover:text-yellow-400"><NavLink to="/projects">Projectos</NavLink></li>
                    <li className="hover:text-yellow-400"><NavLink to="/empresa">Empresa</NavLink></li>
                    <li className="hover:text-yellow-400"><NavLink to="/contacto">Contacto</NavLink></li>
                </ul>
            </nav>    
        </div>
    )
}