import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from '../config/global'
import { IconPlus } from '@tabler/icons-react'

export const Post = () => {

    const editorData = useRef(null)

    const [base, setBase] = useState()
    const [mid, setMid] = useState()
    const [sub, setSub] = useState()

    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [resp1, resp2, resp3] = await Promise.all([
                fetch(base_url + 'basecategory'),
                fetch(base_url + 'midcategory'),
                fetch(base_url + 'subcategory'),
            ])

            const data1 = await resp1.json()
            const data2 = await resp2.json()
            const data3 = await resp3.json()

            setBaseCategories(data1)
            setMidCategories(data2)
            setSubCategories(data3)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <MainLayout>
            <div>
                <p className="mb-2">Зураг сонгох</p>
                <label className="flex items-center justify-center w-28 h-28 border-dashed border border-stone-200 rounded-md cursor-pointer">
                    <input type="file" hidden />
                    <IconPlus />
                </label>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col">
                    <label className="text-xs mb-1">Гарчиг</label>
                    <input type="text" className="h-8 text-sm outline-none border border-stone-200 py-1 px-2 rounded-md" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs mb-1">Огноо</label>
                    <input type="datetime-local" className="h-8 text-sm outline-none border border-stone-200 py-1 px-2 rounded-md" />
                </div>
            </div>
            <div className="my-4 grid grid-cols-3 gap-4">
                <div>
                    <label className="text-xs mb-1">Үндсэн цэс</label>
                    <select onChange={(e) => setBase(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                        <option>--- сонгох ---</option>
                        {
                            baseCategories.map((item) => {
                                return <option key={item.mark} value={item.mark}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label className="text-xs mb-1">Дунд цэс</label>
                    <select onClick={(e) => setMid(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                        <option>--- сонгох ---</option>
                        {
                            midCategories.map((item) => {
                                return <option key={item.mark} value={item.mark}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label className="text-xs mb-1">Дэд цэс</label>
                    <select onClick={(e) => setSub(e.target.value)} className="h-8 text-sm w-full bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                        <option>--- сонгох ---</option>
                        {
                            subCategories.map((item) => {
                                return <option key={item.mark} value={item.mark}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <Editor
                apiKey='bq0t7hixxbs2y6iib4l4hvj79103oganol8cqcadoyolejrs'
                onInit={(evt, editor) => editorData.current = editor}
                initialValue=""
                init={{
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
                <button className='w-24 ml-2 bg-green-700 text-white font-bold rounded-md py-1' type='button'>Нийтлэх</button>
            </div>
        </MainLayout>
    )
}