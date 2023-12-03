import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { MainLayout } from "../layouts/MainLayout"
import Select from 'react-select'

export const Post = () => {

    const editorRef = useRef(null)

    return (
        <MainLayout>
            <p className="text-lg">Мэдээлэл нэмэх хуудас</p>

            <div className='mt-4'>
                <Editor
                    apiKey='bq0t7hixxbs2y6iib4l4hvj79103oganol8cqcadoyolejrs'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                        height: 500,
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
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
                <Select className="w-full" />
                <Select className="w-full" />
                <Select className="w-full" />
            </div>

            <div className='mt-4 flex justify-end'>
                <button className='bg-sky-800 text-white rounded-md px-4 py-1' type='button'>Нийтлэх</button>
            </div>
        </MainLayout>
    )
}