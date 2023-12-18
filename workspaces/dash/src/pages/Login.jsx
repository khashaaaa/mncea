import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { Button } from '../components/Button'
import { Alert } from '../components/Alert'
import { AlertContext } from '../context/AlertProvider'
import { base_url } from '../config/global'
import Cookiez from 'js-cookie'

export const Login = () => {
    const access_token = Cookiez.get('access_token')
    const navigate = useNavigate()
    const { isAlertOpen, openAlert, closeAlert } = React.useContext(AlertContext)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [msg, setMsg] = useState(null)
    const [alertType, setAlertType] = useState('')

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

    const handleLogin = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }

        const response = await fetch(base_url + 'user/login', options)
        const data = await response.json()

        if (data.ok) {
            Cookiez.set('access_token', data?.access_token)
            Cookiez.set('user', JSON.stringify(data?.data))
            navigate('/')
        } else {
            setAlertType('error')
            openAlert()
            setMsg(data.message || 'Нэвтрэлт амжилтгүй. Дахин оролдоно уу.')
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
                <p className="text-center">Нэвтрэх хэсэг</p>
                {renderInput('Хэрэглэгчийн нэр', 'username')}
                {renderInput('Нууц үг', 'password', 'password')}
                <div className="mt-4 flex items-center justify-between">
                    <Link to="/register" className="text-blue-600 text-sm">Бүртгүүлэх</Link>
                    <Button text="Нэвтрэх" color="green" click={handleLogin} />
                </div>
            </div>
        </AuthLayout>
    )
}