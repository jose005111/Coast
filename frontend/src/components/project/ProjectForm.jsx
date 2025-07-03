import { useEffect, useState } from "react"
import BtnSubmit from "../form/BtnSubmit"
import Input from "../form/Input"
import Select from "../form/Select"

export default function ProjectForm({handleSubmit, btnText, projectData}){
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({ ...project, [e.target.name]: e.target.value })
    } 
    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }
        })
    }

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        }).then((res) => res.json())
        .then((data) => {
            setCategories(data)
        }).catch((err) => console.log(err))
    }, [])
    return (
        <form className="w-80 md:w-100" onSubmit={submit}>
            <Input
                type="text"
                name="name"
                text="Nome do Projecto"
                placeholder="Insira o nome do Projecto"
                value={project.name ? project.name : ''}
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                name="budget"
                text="Orçamento do Projecto"
                placeholder="Insira o orçamento do Projecto"
                value={project.budget ? project.budget : ''}
                handleOnChange={handleChange}
            />

            <Select
                text="Selecione a Categoria"
                name="categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category? project.category.id : ''}
            />
            <BtnSubmit text={btnText}  />
        </form>
    )
}