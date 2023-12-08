import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { Button } from '../components/Button'
import { Alert } from '../components/Alert'
import { AlertContext } from '../context/AlertProvider'
import { base_url } from '../config/global'

export const Login = () => {
    const navigate = useNavigate()
    const { isAlertOpen, openAlert, closeAlert } = React.useContext(AlertContext)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [msg, setMsg] = useState(null)
    const [alertType, setAlertType] = useState('')

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

    const handleLogin = async () => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }

            const response = await fetch(base_url + 'user/login', options)
            const data = await response.json()

            if (response.ok) {
                setAlertType('success')
                openAlert()
                setMsg(data.message)

                setTimeout(() => navigate('/'), 3000)
            } else {
                setAlertType('error')
                openAlert()
                setMsg(data.message || 'Нэвтрэлт амжилтгүй. Дахин оролдоно уу.')
            }
        } catch (error) {
            console.error('Login error:', error)
            setAlertType('error')
            openAlert()
            setMsg(error.message)
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
                <p className="text-center">Нэвтрэх хэсэг</p>
                {renderInput('Хэрэглэгчийн нэр', 'username')}
                {renderInput('Нууц үг', 'password', 'password')}
                <div className="mt-4 flex justify-end">
                    <Button text="Нэвтрэх" color="green" click={handleLogin} />
                </div>
            </div>
        </AuthLayout>
    )
}