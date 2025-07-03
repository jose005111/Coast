export default function Input({type, name, text, placeholder, value, handleOnChange}){
    return (
        <div className="flex flex-col w-full items-start my-4">
            <label className="text-slate-900 font-bold" htmlFor={name}>{text}:</label>
            <input className="bg-white p-2 w-full outline-none"
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}