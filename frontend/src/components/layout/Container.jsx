export default function Container(props){
    return (
        <div className="w-100 mx-auto bg-gray-200 min-h-screen shadow-md mt-4 mb-4 p-4 rounded md:w-150 lg:w-200">
            {props.children}            
        </div>
    )
}