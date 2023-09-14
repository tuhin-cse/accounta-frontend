import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";

const Layout = ({children}) => {
    return (
        <>
            <Sidebar title="AccountA"/>
            <Header title="AccountA"/>
            <div className="content">
                <div className="p-6">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout