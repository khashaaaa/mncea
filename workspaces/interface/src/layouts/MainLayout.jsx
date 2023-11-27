import { Head } from "../components/Head"

export const MainLayout = ({ children }) => {

    return (
        <div>
            <Head />
            <div>
                {children}
            </div>
        </div>
    )
}