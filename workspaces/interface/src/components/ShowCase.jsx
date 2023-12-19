import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ShowCase = () => {
    const [mega, setMega] = useState(0)
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
                <div key={cat.mark} className="py-2 border-b border-gray-400">
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
        <div className="bg-stone-100 py-4">
            <div className="relative" style={{ margin: '0 15%' }}>
                <div className="grid grid-cols-3 gap-8">
                    {baseCategories.map((cat, num) => {
                        let active = num + 1
                        return (
                            <div
                                key={cat.mark}
                                onMouseEnter={() => setMega(active)}
                                onMouseLeave={() => setMega(0)}
                                className={`bg-gradient-to-r from-main bg-accentTwo ${mega === active ? "rounded-t-md" : "rounded-md"} text-white flex items-center justify-center py-2 cursor-pointer`}
                            >
                                <p className="font-bold uppercase">{cat?.name}</p>
                                {mega === active ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                            </div>
                        )
                    })}
                </div>

                <div onMouseLeave={() => setMega(0)} className={`${mega === 0 && 'hidden'} absolute grid grid-cols-3 gap-8 w-full bg-main rounded-md z-10 shadow-xl`}>
                    <div onMouseEnter={() => setMega(1)} className={mega === 1 ? "bg-accentOne text-white rounded-bl p-2" : "p-2 text-gray-200"}>
                        {renderMidCategories(5)}
                    </div>

                    <div onMouseEnter={() => setMega(2)} className={mega === 2 ? "bg-accentOne text-white p-2" : "p-2 text-gray-200"}>
                        {renderMidCategories(6)}
                    </div>

                    <div onMouseEnter={() => setMega(3)} className={mega === 3 ? "bg-accentOne text-white rounded-br p-2" : "p-2 text-gray-200"}>
                        {renderMidCategories(7)}
                    </div>
                </div>
            </div>
        </div>
    )
}
