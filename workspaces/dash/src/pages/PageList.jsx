import { useContext, useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { MenuContext } from "../context/MenuProvider"
import { Link } from "react-router-dom"
import { IconPencilPlus } from "@tabler/icons-react"
import { Button } from "../components/Button"

export const PageList = () => {

    const [language, setLanguage] = useState('mn')

    const { menuOpen, setActive } = useContext(MenuContext)

    useEffect(() => {
        setActive('page')
    }, [])

    return (
        <MainLayout>
            <div className="flex items-center">
                <Link to="/createpage">
                    <Button color="green" text="Хуудас нэмэх" icon={<IconPencilPlus />} />
                </Link>
                <select defaultValue={language} onChange={(e) => setLanguage(e.target.value)} className="ml-4 bg-white rounded-md border border-stone-200 px-2 py-1">
                    <option value="mn">Монгол</option>
                    <option value="en">English</option>
                </select>
            </div>
        </MainLayout>
    )
}