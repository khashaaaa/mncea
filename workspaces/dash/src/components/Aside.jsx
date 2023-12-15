import { useContext } from "react"
import { MenuContext } from "../context/MenuProvider"
import { Link, useNavigate } from "react-router-dom"
import Cookiez from 'js-cookie'
import { IconCategory, IconComponents, IconNews, IconPower, IconUserCog } from "@tabler/icons-react"

export const Aside = () => {

    const navigate = useNavigate()

    const access_token = Cookiez.get('access_token')

    const { menuOpen, setActive } = useContext(MenuContext)

    const user = Cookiez.get('user')
    const userJSON = user ? JSON.parse(user) : null

    const Logout = () => {
        if (access_token) {
            Cookiez.remove('access_token')
            Cookiez.remove('user')
            navigate('/login')
        }
        else {
            return
        }
    }

    return (
        <div className="bg-white rounded-2xl ml-4 mb-4 mt-4 p-4 shadow">
            <div className="flex justify-between items-center">
                <p>Сайн байна уу? <b>{userJSON?.username}</b></p>
                <button onClick={Logout} type="button" className="ml-4 bg-red-600 rounded-full p-1 hover:bg-red-500 duration-300"><IconPower color="white" /></button>
            </div>
            <div className="mt-8 grid grid-rows-4 gap-2 text-sm">
                <Link to="/" onClick={() => setActive('post')} className={`flex items-center rounded-md px-4 py-1 duration-300 hover:bg-sky-700 hover:border-sky-700 hover:text-white ${menuOpen === 'post' && 'bg-sky-800 text-white'}`}>
                    <IconNews />
                    <p className="ml-2">Мэдээлэл</p>
                </Link>
                <Link to="/headcategory" onClick={() => setActive('headcategory')} className={`flex items-center rounded-md px-4 py-1 duration-300 hover:bg-sky-700 hover:border-sky-700 hover:text-white ${menuOpen === 'headcategory' && 'bg-sky-800 text-white'}`}>
                    <IconCategory />
                    <p className="ml-2">Толгой цэс</p>
                </Link>
                <Link to="/specialcategory" onClick={() => setActive('specialcategory')} className={`flex items-center rounded-md px-4 py-1 duration-300 hover:bg-sky-700 hover:border-sky-700 hover:text-white ${menuOpen === 'specialcategory' && 'bg-sky-800 text-white'}`}>
                    <IconComponents />
                    <p className="ml-2">Онцгой цэс</p>
                </Link>
                <Link to="/usercontrol" onClick={() => setActive('user')} className={`flex items-center rounded-md px-4 py-1 duration-300 hover:bg-sky-700 hover:border-sky-700 hover:text-white ${menuOpen === 'user' && 'bg-sky-800 text-white'}`}>
                    <IconUserCog />
                    <p className="ml-2">Хэрэглэгч</p>
                </Link>
            </div>
        </div>
    )
}