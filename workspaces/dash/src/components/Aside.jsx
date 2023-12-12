import { IconPower } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"
import Cookiez from 'js-cookie'

export const Aside = () => {

    const access_token = Cookiez.get('access_token')
    const user = Cookiez.get('user')
    const userJSON = JSON.parse(user)

    const navigate = useNavigate()

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
            <div className="mt-8 grid grid-rows-4 gap-2">
                <Link to="/" className="border border-stone-200 rounded-lg px-4 py-1 focus:ring ring-sky-400">
                    <p>Нийтлэл</p>
                </Link>
                <Link to="/category" className="border border-stone-200 rounded-lg px-4 py-1 focus:ring ring-sky-400">
                    <p>Цэс</p>
                </Link>
            </div>
        </div>
    )
}