"use client"

import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";
import {FaCartPlus, FaHome, FaPrint, FaShoppingBag, FaUniversity, FaWallet, FaWrench} from "react-icons/fa";
import {FaBoxArchive} from "react-icons/fa6";

const Layout = ({children}) => {
    return (
        <>
            <Sidebar title="AccountA" menu={menu}/>
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


const menu = [
    {
        menu: "Menu",
    },
    {
        label: "Dashboard",
        href: "/",
        icon: <FaHome/>
    },
    {
        label: "Items",
        icon: <FaBoxArchive/>,
        child: [
            {
                label: "Items",
                href: "/items",
            },
            {
                label: "Categories",
                href: "/categories",
            }
        ]
    },
    {
        label: "Sales",
        icon: <FaCartPlus/>,
        child: [
            {
                label: "Sales",
                href: "/sales",
            },
            {
                label: "Customers",
                href: "/customers",
            }
        ]
    },
    {
        label: "Purchases",
        icon: <FaWallet/>,
        child: [
            {
                label: "Purchases",
                href: "/purchases",
            },
            {
                label: "Vendors",
                href: "/vendors",
            }
        ],
    },
    {
        label: "Banking",
        icon: <FaUniversity/>,
        child: [
            {
                label: "Accounts",
                href: "/accounts",
            },
            {
                label: "Transactions",
                href: "/transactions",
            },
            {
                label: "Transfer",
                href: "/transfer",
            },
            {
                label: "Reconciliations",
                href: "/reconciliations",
            }
        ]
    },
    {
        label: "Reports",
        icon: <FaPrint/>,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: <FaWrench/>
    },
]