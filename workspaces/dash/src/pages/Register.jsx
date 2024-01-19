import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertContext } from '../context/AlertProvider'
import { Button } from '../components/Button'
import { AuthLayout } from '../layouts/AuthLayout'
import { base_url } from '../../environment/url'
import { Alert } from '../components/Alert'
import Cookiez from 'js-cookie'

export const Register = () => {
    const access_token = Cookiez.get('access_token')
    const navigate = useNavigate()
    const { isAlertOpen, openAlert, closeAlert } = useContext(AlertContext)

    const [msg, setMsg] = useState(null)
    const [alertType, setAlertType] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        mobile: '',
        password: '',
    })

    useEffect(() => {
        if (access_token) {
            navigate('/')
        }
        if (!msg) {
            closeAlert()
        }
    }, [isAlertOpen])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleRegister = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }

        const raw = await fetch(`${base_url}/user`, options)
        const resp = await raw.json()

        setAlertType(resp.ok ? 'success' : 'error')

        if (resp.ok) {
            navigate('/login')
        }
        else {
            openAlert()
            setMsg(resp.message)
        }
    }

    const renderInput = (label, name, type = 'text') => (
        <div className="mt-4 flex flex-col">
            <label className="mb-1 text-xs">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="outline-none border border-stone-200 rounded-md text-sm py-1 px-2 focus:ring ring-sky-200 focus:bg-sky-50 duration-300"
            />
        </div>
    )

    return (
        <AuthLayout>
            {isAlertOpen && <Alert content={msg} type={alertType} />}
            <div className="w-80 bg-gray-200 p-4 rounded-xl">
                <p className="text-center">Бүртгүүлэх хэсэг</p>
                {renderInput('Хэрэглэгчийн нэр', 'username')}
                {renderInput('Утасны дугаар', 'mobile')}
                {renderInput('Нууц үг', 'password', 'password')}
                <div className="mt-4 flex items-center justify-between">
                    <Link to="/login" className="text-blue-600 text-sm">Нэвтрэх</Link>
                    <Button text="Болсон" color="green" click={handleRegister} />
                </div>
            </div>
        </AuthLayout>
    )
}