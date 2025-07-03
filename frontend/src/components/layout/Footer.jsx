import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'


export default function Footer() { 
    return (
        <footer className="bg-slate-800 text-white py-4">
            <div className="container mx-auto text-center">
                <ul className='flex justify-center space-x-4 mb-4'>
                    <li className='text-2xl hover:text-yellow-400'><FaFacebook /></li>
                    <li className='text-2xl hover:text-yellow-400'><FaInstagram /></li>
                    <li className='text-2xl hover:text-yellow-400'><FaLinkedin /></li>
                </ul>
                <p><span className='font-bold text-yellow-400'>Costs</span> &copy; 2025 - Todos os direitos reservados</p>
            </div>
        </footer>
    )
}