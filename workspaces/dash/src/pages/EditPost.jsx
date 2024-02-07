import { useEffect, useRef, useState, useCallback, useContext } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Editor } from '@tinymce/tinymce-react'
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from '../../environment/url'
import { IconPhotoPlus, IconX } from '@tabler/icons-react'
import { Button } from '../components/Button'
import Cookiez from 'js-cookie'
import { MenuContext } from '../context/MenuProvider'
import { v4 as uuidv4 } from 'uuid'

export const EditPost = () => {

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

    const navigate = useNavigate()

    const { setActive } = useContext(MenuContext)

    const { mark } = useParams()

    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [currentPost, setCurrentPost] = useState(null)

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [image, setImage] = useState(null)

    const editorData = useRef(null)

    const [formData, setFormData] = useState({
        title: '',
        base_category: 0,
        mid_category: 0,
        sub_category: 0,
        content: '',
        thumbnail: '',
        language: '',
        priority: '',
        admin: user?.username,
        posted_date: getCurrentDateTime()
    })

    useEffect(() => {
        setActive('post')
        if (!access_token) {
            navigate('/login')
        }
        FetchDatas()
    }, [])

    const FetchDatas = async () => {
        try {
            const [postResponse, baseResponse, midResponse, subResponse] = await Promise.all([
                fetch(`${base_url}/post/${mark}`),
                fetch(`${base_url}/basecategory`),
                fetch(`${base_url}/midcategory`),
                fetch(`${base_url}/subcategory`)
            ])

            const [postData, baseData, midData, subData] = await Promise.all([
                postResponse.json(),
                baseResponse.json(),
                midResponse.json(),
                subResponse.json()
            ])
            setCurrentPost(postData.data)
            setFormData({
                title: postData.data?.title || '',
                base_category: postData.data?.base_category || 0,
                mid_category: postData.data?.mid_category || 0,
                sub_category: postData.data?.sub_category || 0,
                content: postData.data?.content || '',
                thumbnail: postData.data?.thumbnail || '',
                language: postData.data?.language || '',
                priority: postData.data?.priority || '',
                admin: user?.username,
                posted_date: postData.data?.posted_date || ''
            })
            setBaseCategories(baseData)
            setMidCategories(midData)
            setSubCategories(subData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const imageProcess = useCallback((ev) => {
        const file = ev.target.files[0]

        if (file) {
            const uniqueName = uuidv4()
            const extension = file.name.split('.').pop()
            const newFileName = `${uniqueName}.${extension}`

            setPreview(URL.createObjectURL(file))
            setImageFile(new File([file], newFileName, { type: file.type }))
            setImage(newFileName)
        }
    }, [])

    const imageCancel = useCallback(() => {
        RemoveImage()
        setImageFile(null)
        setPreview(null)
        setImage(null)
    }, [])

    const Proceed = async () => {

        const editorContent = editorData.current.getContent()

        formData.content = editorContent
        if (image) {
            const imgForm = new FormData()
            imgForm.append('file', imageFile)

            const imageOptions = { method: 'POST', body: imgForm }

            const rawImg = await fetch(`${base_url}/post/thumbnail`, imageOptions)
            const imgResp = await rawImg.json()

            if (!imgResp.ok) {
                console.error(imgResp.message)
                return
            }

            formData.thumbnail = image
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(formData),
        }

        const rawPost = await fetch(`${base_url}/post/${mark}/edit`, options)
        const postResp = await rawPost.json()

        if (postResp.ok) {
            navigate('/post')
        }
    }

    const RemoveImage = async () => {
        const imageOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ thumbnail: currentPost?.thumbnail })
        }

        if (currentPost?.thumbnail) {
            const rawImg = await fetch(`${base_url}/post/sweep`, imageOptions)
            const imgResp = await rawImg.json()

            setCurrentPost({ thumbnail: null })

            if (!imgResp.ok) {
                console.error(imgResp.message)
                return
            }
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify({
                thumbnail: null
            }),
        }
        const rawPost = await fetch(`${base_url}/post/${mark}/edit`, options)
        await rawPost.json()
    }

    return (
        <MainLayout>
            <div className='flex items-end'>
                <label className="flex items-center justify-center w-28 h-28 border-dashed border-2 border-stone-200 rounded-md cursor-pointer">
                    <input type="file" onChange={imageProcess} hidden />
                    {(currentPost?.thumbnail || preview) && (
                        <div className="relative cursor-default">
                            <IconX onClick={imageCancel} className="bg-white rounded absolute right-0 cursor-pointer" />
                            <img src={currentPost?.thumbnail ? `${base_url}/post/thumbnail/${currentPost?.thumbnail}` : preview} alt="Image Preview" />
                        </div>
                    )}
                    {!currentPost?.thumbnail && !preview && <IconPhotoPlus />}
                </label>
                <div className="ml-4 flex flex-col">
                    <label className="text-xs mb-1">Хэл</label>
                    <select defaultValue={currentPost?.language} onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))} className="h-8 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option value="mn">Монгол</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <div className="ml-4 flex flex-col">
                    <label className="text-xs mb-1">Төрөл</label>
                    <select defaultValue={currentPost?.priority} onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))} className="h-8 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option value="regular">Энгийн</option>
                        <option value="featured">Онцлох</option>
                        <option value="relevant">Чухал</option>
                    </select>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Гарчиг</label>
                    <input type="text" defaultValue={currentPost?.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="h-8 text-sm outline-none border border-stone-200 py-1 px-2 rounded-md" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Огноо</label>
                    <input type="datetime-local" value={getCurrentDateTime()} onChange={(e) => setFormData(prev => ({ ...prev, posted_date: e.target.value }))} className="h-8 text-sm outline-none border border-stone-200 py-1 px-2 rounded-md" />
                </div>
            </div>

            <div className="my-4 grid grid-cols-3 gap-4">
                {
                    currentPost?.base_category &&
                    <div>
                        <label className="text-xs mb-1"><span className="text-red-600">*</span> Үндсэн цэс</label>
                        <select defaultValue={currentPost?.base_category} onChange={(e) => setFormData(prev => ({ ...prev, base_category: parseInt(e.target.value) }))} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                            <option>--- сонгох ---</option>
                            {baseCategories.map((item) => (
                                <option key={item.mark} value={item.mark}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                }
                {
                    currentPost?.mid_category &&
                    <div>
                        <label className="text-xs mb-1">Дунд цэс</label>
                        <select defaultValue={currentPost?.mid_category} onChange={(e) => setFormData(prev => ({ ...prev, mid_category: parseInt(e.target.value) }))} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                            <option>--- сонгох ---</option>
                            {midCategories.map((item) => (
                                <option key={item.mark} value={item.mark}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                }
                {
                    currentPost?.sub_category &&
                    <div>
                        <label className="text-xs mb-1">Дэд цэс</label>
                        <select defaultValue={currentPost?.sub_category} onChange={(e) => setFormData(prev => ({ ...prev, sub_category: parseInt(e.target.value) }))} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                            <option>--- сонгох ---</option>
                            {subCategories.map((item) => (
                                <option key={item.mark} value={item.mark}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                }
            </div>
            <Editor
                apiKey='bq0t7hixxbs2y6iib4l4hvj79103oganol8cqcadoyolejrs'
                onInit={(evt, val) => editorData.current = val}
                initialValue={currentPost?.content}
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
                <Button click={Proceed} text="Нийтлэх" color="green" />
            </div>
        </MainLayout>
    )
}