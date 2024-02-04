import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { MenuContext } from "../context/MenuProvider"
import { Editor } from "@tinymce/tinymce-react"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { Alert } from "../components/Alert"
import Cookiez from 'js-cookie'
import { base_url } from "../../environment/url"
import { AlertContext } from "../context/AlertProvider"

export const CreatePage = () => {

    const access_token = Cookiez.get('access_token')
    const str = Cookiez.get('user')
    const user = str ? JSON.parse(str) : null

    const navigate = useNavigate()

    const { setActive } = useContext(MenuContext)
    const { isAlertOpen, openAlert } = useContext(AlertContext)

    const [msg, setMsg] = useState(null)
    const [errType, setErrType] = useState('')
    const [title, setTitle] = useState('')
    const [language, setLanguage] = useState('mn')
    const [page, setPage] = useState('')
    const editorData = useRef(null)

    useEffect(() => {
        setActive('page')
        if (!access_token) {
            navigate('/login')
        }
    }, [])

    const SavePage = useCallback(async () => {
        if (!page || !title) {
            setMsg(!page ? 'Хуудас сонгоно уу' : 'Гарчиг оруулна уу')
            openAlert()
            return
        }

        const editorContent = editorData.current.getContent()

        const pageData = {
            title,
            content: editorContent,
            admin: user?.username,
            page,
            language
        }

        const pageOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(pageData),
        }

        const pageRaw = await fetch(`${base_url}/page`, pageOptions)
        const pageResp = await pageRaw.json()

        if (pageResp.ok) {
            navigate('/')
        }
    }, [page, title, user, language, access_token, navigate, openAlert])

    return (
        <MainLayout>
            {isAlertOpen && <Alert content={msg} type={errType} />}
            <div className="flex mb-4">
                <div className="flex flex-col">
                    <label className="text-xs mb-1">Хэл</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-8 w-30 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option value="mn">Монгол</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div className="ml-4 flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Цэс</label>
                    <select value={page} onChange={(e) => setPage(e.target.value)} className="h-8 w-48 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option value="">--- хуудас сонгох ---</option>
                        <option value="about">Тухай</option>
                        <option value="news">Мэдээ</option>
                        <option value="transparency">Ил тод байдал</option>
                        <option value="fund">Сан</option>
                        <option value="contact">Холбоо барих</option>
                    </select>
                </div>
            </div>
            <div className="mb-4 flex flex-col">
                <label className="text-xs mb-1"><span className="text-red-600">*</span> Гарчиг</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300" />
            </div>
            <Editor
                apiKey='bq0t7hixxbs2y6iib4l4hvj79103oganol8cqcadoyolejrs'
                onInit={(evt, editor) => editorData.current = editor}
                initialValue=""
                init={{
                    height: "480px",
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'emoticons', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'pagebreak'
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | charmap emoticons pagebreak | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <div className='mt-4 flex justify-end'>
                <Button click={SavePage} text="Нийтлэх" color="green" icon={<IconPlus />} />
            </div>
        </MainLayout>
    )
}
