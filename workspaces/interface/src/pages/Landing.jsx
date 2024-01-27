import { useContext, useEffect, useState } from "react"
import { NewsGrid } from "../components/NewsGrid"
import { ShowCase } from "../components/ShowCase"
import { ResponsiveContext } from "../context/ResponsiveProvider"
import { MainLayout } from "../layouts/MainLayout"

export const Landing = () => {

    const { deviceSize } = useContext(ResponsiveContext)

    const [margin, setMargin] = useState(null)

    useEffect(() => {
        let s
        switch (deviceSize) {
            case 'mobile':
                s = '0 1rem'
                break
            case 'tablet':
                s = '0 5%'
                break
            case 'smallMonitor':
                s = '0 10%'
                break
            default:
                s = '0 15%'
        }
        setMargin(s)
    }, [deviceSize])

    return (
        <MainLayout>
            <ShowCase margin={margin} />
            <NewsGrid margin={margin} />
        </MainLayout>
    )
}