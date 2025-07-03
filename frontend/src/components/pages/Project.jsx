import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Loading from "../layout/Loading"
import ProjectForm from "../project/ProjectForm"
import Message from "../project/Message"
import ServiceForm from "../service/ServiceForm"
import {v4 as uuidv4} from "uuid"
import ServiceCard from "../service/ServiceCard"

export default function Project(){
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                    "Content-Type": "application/json"
                },
            }).then((resp) => resp.json())
            .then((data) =>{
                setProject(data)
                setServices(data.services)
            }).catch((err) => console.log(err))
    }, [id])
    function showForm(){
        setShowProjectForm(!showProjectForm)
    }
    function showFormService(){
        setShowServiceForm(!showServiceForm)
    }
    function editProject(project){
        setMessage('')
        if(project.budget < project.cost){
             setMessage('O orçamento não pode ser menor que o custo total.')
            setType('bg-red-200 text-red-600')
            return
        }
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
            }).then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setMessage('Projecto Actualizado com Sucesso')
                setType('bg-green-200 text-green-600')
            }).catch((err) => console.log(err))
            setShowProjectForm(!showProjectForm)
        }, 300)
    }


    //CRUD para o serviço

    // function create
    function createServie(project){
        setMessage('')
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()
        const lastServiceCost = parseFloat(lastService.cost)
        const newCost = parseFloat(project.cost) + lastServiceCost

        //Verficar o valor do custo
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
            setType('bg-red-200 text-red-600')
            project.services.pop()
            return false
        }
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProject(data)
            setShowServiceForm(false)
        }).catch((err) => console.log(err))

    }

    //function Remove
    function remove(id, cost){
        setMessage('')
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )
        const projectUpdated = project
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "applcation/json"
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
            setMessage('Serviço removido com Sucesso')
            setType('bg-green-200 text-green-600')
        })
    }



    return(
        <div>
             
            {project.name ? (
            <div className="flex items-center justify-between my-1">
                <h1 className="text-2xl font-bold p-2 bg-slate-800 text-yellow-400">
                    {project.name}
                </h1>
                <button className="font-bold p-2 bg-slate-800 text-white rounded hover:text-yellow-400" onClick={showForm}>{!showProjectForm ? ('Editar Projecto') : ('Fechar')}</button>
            </div>
            ) : (<Loading />) }
              {message && (<Message type={type} msg={message} />)}
            {(!showProjectForm && project.category)? 
            (
            <div className="border-b mt-3"> 
                <p className="py-1"><span className="font-bold">Categoria: </span>{project.category.name}</p>
                <p className="py-1"><span className="font-bold">Orçamento: </span>AOA{project.budget}</p>
                <p className="py-1"><span className="font-bold">Total Utilizado: </span>AOA{project.cost}</p>
            </div>
            ) : (
            <div className="flex justify-center border-b pb-2">
                <ProjectForm handleSubmit={editProject} projectData={project} btnText="Concluir Edição" />
            </div>
            )
            }
            <div className=" my-1 border-b pb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold p-2">
                        Adicione um Serviço:
                    </h1>
                    <button className="font-bold p-2 bg-slate-800 text-white rounded hover:text-yellow-400" onClick={showFormService}>{!showServiceForm ? ('Adicionar Serviço') : ('Fechar')}</button>
                    
                </div>
                {showServiceForm && (
                        <ServiceForm handleSubmit={createServie} textBtn="Adicionar Serviço" projectData={project} />
                    )}
            </div>
                <h2 className="font-bold text-lg">Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
                {services.length > 0 && (
                    services.map((service) => (
                        <ServiceCard 
                        id={service.id} 
                        name={service.name} 
                        cost={service.cost} 
                        desc={service.desc}
                        handleRemove={remove}
                        key={service.id} 
                        />
                    ))
                )}
                {services.length === 0 && (
                    <h2>Nenhum Serviço Adicionado!</h2>
                )}
            </div>
        </div>
    )
}