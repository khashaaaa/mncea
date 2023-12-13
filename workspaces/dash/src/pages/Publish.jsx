import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import { Editor } from '@tinymce/tinymce-react'
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from '../config/global'
import { IconPhotoPlus, IconPlus, IconX } from '@tabler/icons-react'
import { Button } from '../components/Button'
import Cookiez from 'js-cookie'

export const Publish = () => {

    const getCurrentDateTime = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = (now.getMonth() + 1).toString().padStart(2, '0')
        const day = now.getDate().toString().padStart(2, '0')
        const hours = now.getHours().toString().padStart(2, '0')
        const minutes = now.getMinutes().toString().padStart(2, '0')
        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const editorData = useRef(null)

    const [title, setTitle] = useState('')
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime())
    const [baseCategory, setBaseCategory] = useState('')
    const [midCategory, setMidCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')

    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (!access_token) {
            navigate('/login')
        }
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [resp1, resp2, resp3] = await Promise.all([
                fetch(base_url + 'basecategory'),
                fetch(base_url + 'midcategory'),
                fetch(base_url + 'subcategory'),
            ])

            const [data1, data2, data3] = await Promise.all([resp1.json(), resp2.json(), resp3.json()])

            setBaseCategories(data1)
            setMidCategories(data2)
            setSubCategories(data3)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const imageProcess = useCallback((ev) => {
        const newPreview = [URL.createObjectURL(ev.target.files?.[0])]
        const newImage = ev.target.files?.[0]?.name?.toLowerCase()

        setImageFile(ev.target.files[0])
        setPreview(newPreview)
        setImage(newImage)
    }, [])

    const imageCancel = useCallback(() => {
        setImageFile(null)
        setPreview(null)
        setImage(null)
    }, [])

    const SavePost = async () => {
        try {
            const editorContent = editorData.current.getContent()

            const postData = {
                title,
                content: editorContent,
                posted_date: currentDateTime,
                thumbnail: image,
                admin: 'asdfasdfasdf',
                base_category: baseCategory,
                mid_category: midCategory,
                sub_category: subCategory,
            }

            const imgForm = new FormData()
            imgForm.append('file', imageFile)

            const thumbnailOptions = {
                method: 'POST',
                body: imgForm,
            }

            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify(postData),
            }

            const [thumbnailResponse, postResponse] = await Promise.all([
                fetch(base_url + 'post/thumbnail', thumbnailOptions),
                fetch(base_url + 'post', postOptions),
            ])

            const [thumbnailResult, postResult] = await Promise.all([
                thumbnailResponse.json(),
                postResponse.json()
            ])

            if (thumbnailResult.ok && postResult.ok) {
                navigate('/')
            }
        } catch (error) {
            console.error('Error while saving post:', error.message)
        }
    }



    return (
        <MainLayout>
            <div>
                <p className="mb-2">Өнгөц зураг сонгох</p>
                <label className="flex items-center justify-center w-28 h-28 border-dashed border-2 border-stone-200 rounded-md cursor-pointer hover:bg-stone-100 duration-300">
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
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Гарчиг</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className="h-8 text-sm outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Огноо</label>
                    <input type="datetime-local" value={currentDateTime} onChange={(e) => setCurrentDateTime(e.target.value)} className="h-8 text-sm outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300" />
                </div>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4">
                <div>
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Үндсэн цэс</label>
                    <select onChange={(e) => setBaseCategory(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option>--- сонгох ---</option>
                        {baseCategories.map((item) => (
                            <option key={item.mark} value={item.mark}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs mb-1">Дунд цэс</label>
                    <select onClick={(e) => setMidCategory(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option>--- сонгох ---</option>
                        {midCategories.map((item) => (
                            <option key={item.mark} value={item.mark}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs mb-1">Дэд цэс</label>
                    <select onClick={(e) => setSubCategory(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option>--- сонгох ---</option>
                        {subCategories.map((item) => (
                            <option key={item.mark} value={item.mark}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <Editor
                apiKey='bq0t7hixxbs2y6iib4l4hvj79103oganol8cqcadoyolejrs'
                onInit={(evt, editor) => editorData.current = editor}
                initialValue=""
                init={{
                    height: "500px",
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
                <Button click={SavePost} text="Нийтлэх" color="green" icon={<IconPlus />} />
            </div>
        </MainLayout>
    )
}