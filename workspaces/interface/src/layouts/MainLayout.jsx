import { Foot } from "../components/Foot"
import { Head } from "../components/Head"

export const MainLayout = ({ children }) => {

    return (
        <div>
            <Head />
            {children}
            <Foot />
        </div>
    )
}