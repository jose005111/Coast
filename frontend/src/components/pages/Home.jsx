import { FaPlus } from 'react-icons/fa'
import saving from '../../assets/cost.png'
import BtnLink from '../BtnLink'


export default function Home(){
    return (
        <div className='flex flex-col items-center text-center text-slate-800'>
            <h1 className='text-4xl font-bold my-2'>Bem Vindo ao <span className='bg-slate-800 text-yellow-400 p-1'>Costs</span></h1>
            <p className=' my-2'>Comece a gerenciar os seus projectos agora mesmo!</p>
            <BtnLink ref="/newproject" style="flex items-center text-white bg-slate-800 p-2 rounded hover:bg-slate-950 hover:text-yellow-400" text="Projecto" icon={<FaPlus />} />
            <img className='w-100' src={saving} alt="" />   
        </div>
    )
}