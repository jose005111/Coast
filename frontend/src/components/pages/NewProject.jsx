import { useNavigate } from "react-router"
import ProjectForm from "../project/ProjectForm"

export default function NewProject(){
    const navigate = useNavigate()

    function createProject(Project){
        // initialize cost and services
        Project.cost = 0
        Project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            // redirect to /projects
            navigate("/projects", { state: { message: "Projecto criado com sucesso!" } })

        }).catch(err => console.log(err))
    }
    return (
        <div className="flex flex-col items-center text-center text-slate-800">
            <h1 className="font-bold text-4xl my-2">Criar Projecto</h1>
            <p className="my-2">Crie o seu projecto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projecto" handleSubmit={createProject} />
        </div>
    )
}