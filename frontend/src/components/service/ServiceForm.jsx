import { useState } from "react"
import Input from "../form/Input"
import BtnSubmit from "../form/BtnSubmit"

export default function ServiceForm({handleSubmit, textBtn, projectData}){
    const [service, setService] = useState({})


    const submit = (e) => {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <div className="flex justify-center">
            <form className="w-80 md:w-100"  onSubmit={submit}>
                <Input
                    type="text"
                    name="name"
                    text="Nome do Serviço"
                    placeholder="Insira o nome do serviço"
                    // value={projectData.service ? projectData.service.name : ''}
                    handleOnChange={handleChange}
                />
                <Input
                type="number"
                name="cost"
                text="Custo do Serviço"
                placeholder="Insira o custo do serviço"
                // value={projectData.service ? projectData.service.cost : ''}
                handleOnChange={handleChange}
                />
                <Input
                type="text"
                name="desc"
                text="Desrição do Serviço"
                placeholder="Descreva o serviço"
                // value={projectData.service ? projectData.service.desc : ''}
                handleOnChange={handleChange}
                />
                <BtnSubmit text={textBtn} />
            </form>
        </div>
    )
}