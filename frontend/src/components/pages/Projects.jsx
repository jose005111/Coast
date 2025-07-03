import { useLocation } from "react-router"
import Message from "../project/Message"
import BtnLink from "../BtnLink"
import {FaPlus} from "react-icons/fa"
import ProjectCard from "../project/ProjectCard"
import { useEffect, useState } from "react"
import Loading from "../layout/Loading"

export default function Projects(){
    const location = useLocation()
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
    let message = ''
    if(location.state){
        message = location.state.message
    }
    //Buscar todos os projectos
    useEffect(() => {   
        const controller = new AbortController()
        const timeOut = setTimeout(() => controller.abort(), 3000)    
       setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                signal: controller.signal
            }).then((resp) => {
                if(!resp.ok) throw new Error('Erro na requisição')
                return resp.json()})
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            }).catch((err) =>{
                if(err.name === 'AbortError'){
                    console.log('Requisição abortada por timeOut')
                    setRemoveLoading(true)
                }else{
                    console.error(err)
                }
                })
                return() =>{
                    clearTimeout(timeOut)
                    controller.abort()
                }
       }, 300)
    }, [])
    //Remover Projectos
    function removeProject(id){
        setProjectMessage('')
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projecto Deletado com Sucesso!')
        }).catch((err) => console.log(err))
    }
        
    return (
        <>
            <div className="flex items-center justify-between mb-10">
                <h1 className="font-bold text-4xl text-slate-800">Meus Projectos</h1>
                <BtnLink ref="/newproject" style="flex items-center text-white bg-slate-800 p-2 rounded hover:bg-slate-950 hover:text-yellow-400" text="Projecto" icon={<FaPlus />} />
            </div>
            {message && (
                <Message type="bg-green-200 text-green-600" msg={message} />
            )}
            {projectMessage && (
                <Message type="bg-green-200 text-green-600" msg={projectMessage} />
            )}
            
                {!removeLoading && (<Loading />)}
            {/* flex flex-wrap justify-center md:justify-between */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
                {projects.length > 0 && (
                    projects.map((project) => (
                        <ProjectCard
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        handleRemove={removeProject}
                        key={project.id}
                        />
                    ))
                )}
                {removeLoading && projects.length === 0 && (
                    <div className="mx-auto">
                        <p className="text-2xl text-slate-800">Não há projectos cadastrados</p>
                    </div>
                )}
            </div>
        </>
    )
}