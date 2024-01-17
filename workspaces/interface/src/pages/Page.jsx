import { useParams } from "react-router-dom"
import { SpecialMenu } from "../components/SpecialMenu"
import { MainLayout } from "../layouts/MainLayout"
import { useContext, useEffect, useState } from "react"
import { base_url } from "../../../dash/src/config/global"
import { LanguageContext } from "../context/LanguageProvider"

export const Page = () => {

    const { page } = useParams()

    const { language } = useContext(LanguageContext)

    const [pg, setPage] = useState(null)

    const GetPages = async () => {
        const obj = {
            language,
            page
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }
        const raw = await fetch(`${base_url}page/name`, options)
        const resp = await raw.json()

        setPage(resp.data)
    }

    useEffect(() => {
        GetPages()
    }, [language, page])

    return (
        <MainLayout>
            <SpecialMenu />
            <div style={{ margin: '2rem 15%' }}>
                {
                    pg ?
                        <div>
                            <p className="font-bold text-2xl">{pg.title}</p>
                            <div key={pg.mark} dangerouslySetInnerHTML={{ __html: pg.content }} className="mt-8">
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        </MainLayout>
    )
}