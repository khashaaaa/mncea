import { IconBrandFacebook, IconBrandX, IconBrandYoutube } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Foot = () => {

    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        GetMenuData()
    }, [])

    const GetMenuData = async () => {
        try {
            const [baseRaw, midRaw, subRaw] = await Promise.all([
                fetch(`/server/basecategory`),
                fetch(`/server/midcategory`),
                fetch(`/server/subcategory`),
            ])

            const [baseResp, midResp, subResp] = await Promise.all([
                baseRaw.json(),
                midRaw.json(),
                subRaw.json(),
            ])

            setBaseCategories(baseResp)
            setMidCategories(midResp)
            setSubCategories(subResp)
        } catch (error) {
            console.error("Error fetching menu data:", error)
        }
    }

    const renderMidCategories = (parentMark) => {
        return midCategories
            .filter((cat) => cat.parent === parentMark)
            .map((cat, num) => (
                <div key={cat.mark}>
                    <Link to={`/post/mid/${cat.mark}`} className="font-bold hover:text-gray-400">{cat?.name}</Link>
                    <div className="flex flex-col">
                        {renderSubCategories(cat.mark)}
                    </div>
                </div>
            ))
    }

    const renderSubCategories = (midCategoryMark) => {
        return subCategories
            .filter((cat) => cat.parent === midCategoryMark)
            .map((cat, num) => (
                <Link to={`/post/sub/${cat.mark}`} key={cat.mark} className="ml-4 hover:text-gray-400">{cat?.name}</Link>
            ))
    }

    const year = new Date().getFullYear()

    return (
        <div className="bg-gray-800 text-sm">
            <div className="grid grid-cols-4 gap-4 py-8" style={{ margin: '0 15%' }}>
                <div className="text-gray-200">
                    {renderMidCategories(5)}
                </div>

                <div className="text-gray-200">
                    {renderMidCategories(6)}
                </div>

                <div className="text-gray-200">
                    {renderMidCategories(7)}
                </div>

                <div>
                    <div className="flex flex-col text-white">
                        <Link to="/page/about" className="font-bold hover:text-gray-400">Тухай</Link>
                        <Link to="/page/news" className="font-bold hover:text-gray-400">Мэдээ</Link>
                        <Link to="/page/transparency" className="font-bold hover:text-gray-400">Ил тод байдал</Link>
                        <Link to="/page/fund" className="font-bold hover:text-gray-400">Сан</Link>
                        <Link to="/page/contact" className="font-bold hover:text-gray-400">Холбоо барих</Link>
                    </div>

                    <div className="mt-4 flex">
                        <IconBrandFacebook size={18} color='white' className='mr-2 rounded-full h-6 w-6 bg-sky-800 p-1 cursor-pointer hover:bg-sky-700' />
                        <IconBrandYoutube size={18} color='white' className='mr-2 rounded-full h-6 w-6 bg-sky-800 p-1 cursor-pointer hover:bg-sky-700' />
                        <IconBrandX size={18} color='white' className='rounded-full h-6 w-6 bg-sky-800 p-1 cursor-pointer hover:bg-sky-700' />
                    </div>
                </div>

            </div>
            <div className="bg-slate-900 h-12 flex justify-center items-center">
                <p className="text-white font-bold">&#169;{year} Боловсролын магадлан итгэмжлэх үндэсний зөвлөл.</p>
            </div>
        </div>
    )
}