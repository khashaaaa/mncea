import { useContext, useEffect, useRef } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { MenuContext } from "../context/MenuProvider"
import { Editor } from "@tinymce/tinymce-react"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "../components/Button"

export const CreatePage = () => {

    const { menuOpen, setActive } = useContext(MenuContext)

    const editorData = useRef(null)

    useEffect(() => {
        setActive('page')
    }, [])

    return (
        <MainLayout>
            <div className="flex mb-4">
                <select className="h-8 w-40 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                    <option value="mn">Монгол</option>
                    <option value="en">English</option>
                </select>
                <select className="ml-4 h-8 w-40 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                    <option>Тухай</option>
                    <option>Мэдээ</option>
                    <option>Ил тод байдал</option>
                    <option>Сан</option>
                    <option>Холбоо барих</option>
                </select>
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
                <Button text="Нийтлэх" color="green" icon={<IconPlus />} />
            </div>
        </MainLayout>
    )
}