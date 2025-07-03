import {BsPencil, BsFillTrashFill} from "react-icons/bs"
export default function ServiceCard({id, name, cost, desc, handleRemove}){
    const remove = (e) => {
        e.preventDefault()
        // console.log(id)
        handleRemove(id, cost)
    }
    return (
        <div className="flex flex-col my-2 bg-white p-2 text-slate-600 border border-slate-800 rounded  w-80 md:w-60 ">
            <h1 className="bg-slate-800 p-2 text-yellow-400 font-bold text-lg text-center mb-2">{(name.length > 20) ? "Texto" : name }</h1>
            <p className="my-2"><span className="font-bold">Custo Total:</span> AOA{cost} </p>
            <p className="my-2"> {desc} </p>
            <div className="flex items-center justify-between my-2">
                <button className="flex items-center border p-2 hover:text-yellow-400 hover:bg-slate-800 ml-auto" onClick={remove}>
                    <BsFillTrashFill /> Apagar
                </button>
            </div>
        </div>
    )

}