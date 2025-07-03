import { NavLink } from "react-router";

export default function BtnLink({ref, style, text, icon}){
    return <NavLink to={ref} className={style}><span className="p-1">{icon}</span>{text}</NavLink>
}