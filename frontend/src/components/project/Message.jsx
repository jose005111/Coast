import { useEffect, useState } from "react"

export default function Message({type, msg}){
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if(!msg){
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])
    return (
        <>
            {visible && (
                <div className={`p-2  rounded-lg mx-auto text-center font-bold ${type}`}>{msg}</div>
            )}
        </>
    )
}
