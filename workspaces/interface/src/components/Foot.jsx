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
                    <Link to={`/post/mid/${cat.mark}`} className="font-bold hover:text-yellow-400">{cat?.name}</Link>
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
                <Link to={`/post/sub/${cat.mark}`} key={cat.mark} className="ml-4 hover:text-yellow-400">{cat?.name}</Link>
            ))
    }

    return (
        <div className="bg-slate-900 py-8 text-sm">
            <div className="grid grid-cols-4 gap-4" style={{ margin: '0 15%' }}>
                <div className="text-gray-200">
                    {renderMidCategories(5)}
                </div>

                <div className="text-gray-200">
                    {renderMidCategories(6)}
                </div>

                <div className="text-gray-200">
                    {renderMidCategories(7)}
                </div>

                <div className="flex flex-col text-white">
                    <Link to="/" className="font-bold hover:text-yellow-400">Тухай</Link>
                    <Link to="/" className="font-bold hover:text-yellow-400">Мэдээ</Link>
                    <Link to="/" className="font-bold hover:text-yellow-400">Ил тод байдал</Link>
                    <Link to="/" className="font-bold hover:text-yellow-400">Сан</Link>
                    <Link to="/" className="font-bold hover:text-yellow-400">Холбоо барих</Link>
                </div>
            </div>
        </div>
    )
}