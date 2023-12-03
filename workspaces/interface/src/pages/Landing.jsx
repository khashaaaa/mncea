import { Carousel } from "../components/Carousel"
import { NewsGrid } from "../components/NewsGrid"
import { ShowCase } from "../components/ShowCase"
import { MainLayout } from "../layouts/MainLayout"

export const Landing = () => {

    return (
        <MainLayout>
            <ShowCase />
            <Carousel />
            <NewsGrid />
        </MainLayout>
    )
}