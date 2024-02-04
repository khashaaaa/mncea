import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { MenuContext } from '../context/MenuProvider'
import { MainLayout } from '../layouts/MainLayout'
import { IconPhotoPlus, IconPlus, IconX } from '@tabler/icons-react'
import Cookiez from 'js-cookie'
import { Button } from '../components/Button'
import { base_url } from '../../environment/url'
import { Alert } from '../components/Alert'
import { AlertContext } from '../context/AlertProvider'

export const CreatePartner = () => {

    const navigate = useNavigate()

    const access_token = Cookiez.get('access_token')

    const { setActive } = useContext(MenuContext)
    const { isAlertOpen, openAlert } = useContext(AlertContext)

    const [msg, setMsg] = useState(null)
    const [errType, setErrType] = useState('')

    const [name, setName] = useState('')
    const [website, setWebsite] = useState('')

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        setActive('partnership')
        if (!access_token) {
            navigate('/login')
        }
    }, [])

    const imageProcess = useCallback((ev) => {
        const newPreview = [URL.createObjectURL(ev.target.files?.[0])]

        setImageFile(ev.target.files[0])
        setPreview(newPreview)
        setImage(ev.target.files?.[0]?.name)
    }, [])

    const imageCancel = useCallback(() => {
        setImageFile(null)
        setPreview(null)
        setImage(null)
    }, [])

    const SavePartner = async () => {
        try {

            if (!name) {
                setMsg('Нэр оруулна уу')
                openAlert()
                return
            }
            if (!website) {
                setMsg('Вэб хаяг оруулна уу')
                openAlert()
                return
            }
            const postData = {
                name,
                website
            }

            if (image) {
                postData.logo = image

                const imgForm = new FormData()
                imgForm.append('file', imageFile)

                const imageOptions = {
                    method: 'POST',
                    body: imgForm,
                }

                const imageRaw = await fetch(`${base_url}/partnership/logo`, imageOptions)
                const imageResp = await imageRaw.json()

                if (!imageResp.ok) {
                    console.error(imageResp.message)
                }
            }

            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify(postData),
            }

            const postResponse = await fetch(`${base_url}/partnership`, postOptions)
            const postResult = await postResponse.json()

            if (postResult.ok) {
                navigate('/partnership')
            } else {
                console.error(postResult.message)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <MainLayout>
            {isAlertOpen && <Alert content={msg} type={errType} />}
            <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Нэр</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} className="h-8 outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Вэбсайт</label>
                    <input type="text" onChange={(e) => setWebsite(e.target.value)} className="h-8 outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300" />
                </div>
            </div>
            <label className="mt-4 w-28 h-28 flex items-center justify-center border-dashed border-2 border-stone-200 rounded-md cursor-pointer hover:bg-stone-100 duration-300">
                <input type="file" onChange={imageProcess} hidden />
                {preview ? (
                    <div className="relative cursor-default">
                        <IconX onClick={imageCancel} className="bg-white absolute right-0 cursor-pointer rounded" />
                        <img src={preview} alt={image} />
                    </div>
                ) : (
                    <IconPhotoPlus />
                )}
            </label>
            <div className='mt-4 flex justify-end'>
                <Button click={SavePartner} text="Хадгалах" color="green" icon={<IconPlus />} />
            </div>
        </MainLayout>
    )
}