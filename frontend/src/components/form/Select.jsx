export default function Select({name, text, options, handleOnChange, value}){
    return (
        <div className="flex flex-col w-full items-start my-4">
            <label className="text-slate-900 font-bold" htmlFor={name}>{text}:</label>
            <select className="bg-white px-2 py-3 w-full text-gray-800 outline-none" name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma Opção</option>
                {options.map((op) => (
                    <option value={op.id} key={op.id}>{op.name}</option>
                ))}
            </select>
        </div>
    )
}