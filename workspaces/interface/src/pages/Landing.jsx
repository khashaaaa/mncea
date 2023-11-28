import { Carousel } from "../components/Carousel"
import { PreviewGrid } from "../components/PreviewGrid"
import { ShowCase } from "../components/ShowCase"
import { MainLayout } from "../layouts/MainLayout"

export const Landing = () => {

    return (
        <MainLayout>
            <ShowCase />
            <Carousel />
            <PreviewGrid />
        </MainLayout>
    )
}