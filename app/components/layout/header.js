import {FaBars} from "react-icons/fa";

const Header = ({title}) => {
    return (
        <header className="header">
            <div className="flex justify-between items-center h-full p-4">
                <div className="">
                    <FaBars
                        className="md:hidden"
                        role="button"
                        onClick={() => {
                            window.document.querySelector('.sidebar').classList.toggle('open')
                            window.document.querySelector('.sidebar-overlay').classList.toggle('open')
                        }}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header