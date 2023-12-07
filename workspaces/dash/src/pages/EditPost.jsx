import { useEffect, useRef, useState, useCallback } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from '../config/global'
import { IconPlus, IconX } from '@tabler/icons-react'
import { Button } from '../components/Button'
import { useParams } from 'react-router-dom'

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

    const { mark } = useParams()

    const editorData = useRef(null)
    const [preview, setPreview] = useState(null)
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime())
    const [baseCategory, setBaseCategory] = useState('')
    const [midCategory, setMidCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')

    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [currentPost, setCurrentPost] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [postResponse, baseResponse, midResponse, subResponse] = await Promise.all([
                fetch(base_url + 'post/' + mark),
                fetch(base_url + 'basecategory'),
                fetch(base_url + 'midcategory'),
                fetch(base_url + 'subcategory')
            ])

            const [postData, baseData, midData, subData] = await Promise.all([
                postResponse.json(),
                baseResponse.json(),
                midResponse.json(),
                subResponse.json()
            ])

            setCurrentPost(postData.data)
            setBaseCategories(baseData)
            setMidCategories(midData)
            setSubCategories(subData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const imageProcess = useCallback((ev) => {
        const newPreview = [URL.createObjectURL(ev.target.files?.[0])]
        const newImageFile = ev.target.files?.[0]

        setPreview(newPreview)
        setImage(newImageFile)
    }, [])

    const imageCancel = useCallback(() => {
        setCurrentPost({ thumbnail: null })
        setPreview(null)
        setImage(null)
    }, [])

    const SavePost = async () => {
        const editorContent = editorData.current.getContent()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content: editorContent,
                posted_date: currentDateTime,
                thumbnail: image,
                admin: 'asdfasdfasdf',
                base_category: baseCategory,
                mid_category: midCategory,
                sub_category: subCategory,
            }),
        }

        const raw = await fetch(base_url + 'post', options)
        const resp = await raw.json()
        console.log(resp)
    }

    return (
        <MainLayout>
            <div>
                <p className="mb-2">Зураг сонгох</p>
                <label className="flex items-center justify-center w-28 h-28 border-dashed border-2 border-stone-200 rounded-md cursor-pointer">
                    <input type="file" onChange={imageProcess} hidden />
                    {(currentPost?.thumbnail || preview) && (
                        <div className="relative cursor-default">
                            <IconX onClick={imageCancel} className="absolute right-0 cursor-pointer" />
                            <img src={currentPost?.thumbnail ? `/${currentPost.thumbnail}` : preview[0]} alt="Image Preview" />
                        </div>
                    )}
                    {!currentPost?.thumbnail && !preview && <IconPlus />}
                </label>

            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Гарчиг</label>
                    <input type="text" defaultValue={currentPost?.title} onChange={(e) => setTitle(e.target.value)} className="h-8 text-sm outline-none border border-stone-200 py-1 px-2 rounded-md" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs mb-1"><span className="text-red-600">*</span> Огноо</label>
                    <input type="datetime-local" value={currentDateTime} onChange={(e) => setCurrentDateTime(e.target.value)} className="h-8 text-sm outline-none border border-stone-200 py-1 px-2 rounded-md" />
                </div>
            </div>

            <div className="my-4 grid grid-cols-3 gap-4">
                {
                    currentPost?.base_category &&
                    <div>
                        <label className="text-xs mb-1"><span className="text-red-600">*</span> Үндсэн цэс</label>
                        <select defaultValue={currentPost?.base_category} onChange={(e) => setBaseCategory(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
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
                        <select defaultValue={currentPost?.mid_category} onChange={(e) => setMidCategory(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
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
                        <select defaultValue={currentPost?.sub_category} onChange={(e) => setSubCategory(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
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
                onInit={(evt, editor) => editorData.current = editor}
                initialValue={currentPost?.content}
                init={{
                    height: '800px',
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
                <Button onClick={SavePost} text="Нийтлэх" color="green" />
            </div>
        </MainLayout>
    )
}