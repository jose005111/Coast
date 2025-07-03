import loading from "../../assets/loading.svg"
export default function Loading(){
    return(        
        <div className="flex justify-center">
            <div className="absolute">
                <img className="" src={loading} alt="" />
            </div>
        </div>
    )
}