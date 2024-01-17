import { useEffect, useRef, useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { Editor } from '@tinymce/tinymce-react'
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from '../config/global'
import { IconPhotoPlus, IconPlus, IconX } from '@tabler/icons-react'
import { Button } from '../components/Button'
import Cookiez from 'js-cookie'
import { MenuContext } from '../context/MenuProvider'

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
    const str = Cookiez.get('user')
    const user = str ? JSON.parse(str) : null

    const { setActive } = useContext(MenuContext)

    const navigate = useNavigate()

    const editorData = useRef(null)

    const [title, setTitle] = useState('')
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime())
    const [language, setLanguage] = useState('mn')
    const [priority, setPriority] = useState('')
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
        setActive('post')
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

        setImageFile(ev.target.files[0])
        setPreview(newPreview)
        setImage(ev.target.files?.[0]?.name)
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
                language,
                priority,
                admin: user?.username,
                base_category: baseCategory,
                mid_category: midCategory,
                sub_category: subCategory,
            }

            if (image) {
                postData.thumbnail = image

                const imgForm = new FormData()
                imgForm.append('file', imageFile)

                const thumbnailOptions = {
                    method: 'POST',
                    body: imgForm,
                }

                const thumbnailResponse = await fetch(base_url + 'post/thumbnail', thumbnailOptions)
                const thumbnailResult = await thumbnailResponse.json()

                if (!thumbnailResult.ok) {
                    // Handle thumbnail upload failure if needed
                    console.error('Thumbnail upload failed:', thumbnailResult.message)
                    return
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

            const postResponse = await fetch(base_url + 'post', postOptions)
            const postResult = await postResponse.json()

            if (postResult.ok) {
                navigate('/post')
            } else {
                // Handle post request failure if needed
                console.error('Post request failed:', postResult.message)
            }
        } catch (error) {
            console.error('Error while saving post:', error.message)
        }
    }

    return (
        <MainLayout>
            <div className='flex items-end'>
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

                <div className="ml-4 flex flex-col">
                    <label className="text-xs mb-1">Хэл</label>
                    <select defaultValue={language} onChange={(e) => setLanguage(e.target.value)} className="h-8 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option value="mn">Монгол</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div className="ml-4 flex flex-col">
                    <label className="text-xs mb-1">Төрөл</label>
                    <select onChange={(e) => setPriority(e.target.value)} className="h-8 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option>--- төрөл сонгох ---</option>
                        <option value="featured">Онцлох</option>
                        <option value="relevant">Чухал</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Гарчиг</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className="h-8 outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Огноо</label>
                    <input type="datetime-local" value={currentDateTime} onChange={(e) => setCurrentDateTime(e.target.value)} className="h-8 outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300" />
                </div>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4">
                <div>
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Үндсэн цэс</label>
                    <select onChange={(e) => setBaseCategory(e.target.value)} className="h-8 w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option>--- сонгох ---</option>
                        {baseCategories.map((item) => (
                            <option key={item.mark} value={item.mark}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs mb-1">Дунд цэс</label>
                    <select onClick={(e) => setMidCategory(e.target.value)} className="h-8 w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option>--- сонгох ---</option>
                        {midCategories.map((item) => (
                            <option key={item.mark} value={item.mark}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs mb-1">Дэд цэс</label>
                    <select onClick={(e) => setSubCategory(e.target.value)} className="h-8 w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
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
                    height: "480px",
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'emoticons', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'pagebreak'
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | code charmap emoticons pagebreak | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    extended_valid_elements: 'iframe[src|style|seamless|scrolling|frameborder|allowtransparency|allowfullscreen]'
                }}
            />

            <div className='mt-4 flex justify-end'>
                <Button click={SavePost} text="Нийтлэх" color="green" icon={<IconPlus />} />
            </div>
        </MainLayout>
    )
}