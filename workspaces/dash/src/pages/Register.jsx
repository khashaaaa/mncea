import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertContext } from '../context/AlertProvider'
import { Button } from '../components/Button'
import { AuthLayout } from '../layouts/AuthLayout'
import { base_url } from '../config/global'
import { Alert } from '../components/Alert'

export const Register = () => {
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
        if (!msg) {
            closeAlert()
        }
        if (isAlertOpen) {
            const timeoutId = setTimeout(() => {
                closeAlert()
            }, 3000)

            return () => clearTimeout(timeoutId)
        }
    }, [isAlertOpen, closeAlert, msg])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleRegister = async () => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }

            const raw = await fetch(base_url + 'user', options)
            const resp = await raw.json()

            setAlertType(resp.ok ? 'success' : 'error')
            openAlert()
            setMsg(resp.message)

            if (resp.ok) {
                setTimeout(() => navigate('/login'), 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const AlertContent = <p>{msg}</p>

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
            {isAlertOpen && <Alert content={AlertContent} type={alertType} />}
            <div className="w-80">
                <p className="text-center">Бүртгүүлэх хэсэг</p>
                {renderInput('Хэрэглэгчийн нэр', 'username')}
                {renderInput('Утасны дугаар', 'mobile')}
                {renderInput('Нууц үг', 'password', 'password')}
                <div className="mt-4 flex justify-end">
                    <Button text="Болсон" color="green" click={handleRegister} />
                </div>
            </div>
        </AuthLayout>
    )
}