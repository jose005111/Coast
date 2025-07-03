import {BsPencil, BsFillTrashFill} from "react-icons/bs"
import { NavLink } from "react-router"
import style from "./ProjectCard.module.css"
export default function ProjectCard({id, name, budget, category, handleRemove}){
    const remove = (e) => {
        e.preventDefault()
        // console.log(id)
        handleRemove(id)
    }
    return (
        <div className="flex flex-col my-2 bg-white p-2 text-slate-600 border border-slate-800 rounded  w-80 md:w-60 ">
            <h1 className="bg-slate-800 p-2 text-yellow-400 font-bold text-lg text-center mb-2">{(name.length > 20) ? "Texto" : name }</h1>
            <p className="my-2"><span className="font-bold">Orçamento:</span> AOA{budget} </p>
            <p className="my-2"><span className={`bg-gray-400 px-2 rounded-full mr-2 ${style[category.toLowerCase()]}`}></span> {category} </p>
            <div className="flex items-center justify-between my-2">
                <NavLink to={`/project/${id}`} className={`flex items-center border p-2 hover:text-yellow-400 hover:bg-slate-800`}>
                    <BsPencil /> Editar
                </NavLink>
                <button className="flex items-center border p-2 hover:text-yellow-400 hover:bg-slate-800" onClick={remove}>
                    <BsFillTrashFill /> Apagar
                </button>
            </div>
        </div>
    )

}