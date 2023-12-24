import { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Editor } from '@tinymce/tinymce-react'
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from '../config/global'
import { Button } from '../components/Button'
import Cookiez from 'js-cookie'
import { MenuContext } from '../context/MenuProvider'

export const EditPage = () => {

    const access_token = Cookiez.get('access_token')
    const str = Cookiez.get('user')
    const user = str ? JSON.parse(str) : null

    const navigate = useNavigate()

    const { setActive } = useContext(MenuContext)

    const { mark } = useParams()

    const [title, setTitle] = useState('')
    const [language, setLanguage] = useState('')
    const [page, setPage] = useState('')

    const editorData = useRef(null)

    const [currentPage, setCurrentPage] = useState(null)

    useEffect(() => {
        setActive('page')
        if (!access_token) {
            navigate('/login')
        }
        fetchData()
    }, [])

    const fetchData = async () => {
        try {

            const pageRaw = await fetch(base_url + 'page/' + mark)
            const pageResp = await pageRaw.json()

            setCurrentPage(pageResp.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const SavePage = async () => {
        const editorContent = editorData.current.getContent()

        const pageData = {
            title,
            content: editorContent,
            admin: user?.username,
            page,
            language
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(pageData)
        }

        const raw = await fetch(base_url + 'page', options)
        const resp = await raw.json()

        if (resp.ok) {
            navigate('/')
        }
    }

    return (
        <MainLayout>
            <div className="flex mb-4">
                {
                    currentPage?.page ?
                        <div className="mr-4 flex flex-col">
                            <label className="text-xs mb-1"><span className="text-red-600">*</span> Цэс</label>
                            <select defaultValue={currentPage?.page} onChange={(e) => setPage(e.target.value)} className="h-8 w-40 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                                <option>--- сонгох ---</option>
                                <option value="about">Тухай</option>
                                <option value="news">Мэдээ</option>
                                <option value="transparency">Ил тод байдал</option>
                                <option value="fund">Сан</option>
                                <option value="contact">Холбоо барих</option>
                            </select>
                        </div>
                        :
                        null
                }
                {
                    currentPage?.language ?
                        <div className="flex flex-col">
                            <label className="text-xs mb-1">Хэл</label>
                            <select defaultValue={currentPage?.language} onChange={(e) => setLanguage(e.target.value)} className="h-8 w-40 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                                <option value="mn">Монгол</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        :
                        null
                }
            </div>
            <div className="mb-4 flex flex-col">
                <label className="text-xs mb-1"><span className="text-red-600">*</span> Гарчиг</label>
                <input type="text" defaultValue={currentPage?.title} onChange={(e) => setTitle(e.target.value)} className="h-8 outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300" />
            </div>
            <Editor
                apiKey='bq0t7hixxbs2y6iib4l4hvj79103oganol8cqcadoyolejrs'
                onInit={(evt, editor) => editorData.current = editor}
                initialValue={currentPage?.content}
                init={{
                    height: '500px',
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
                <Button onClick={SavePage} text="Нийтлэх" color="green" />
            </div>
        </MainLayout>
    )
}