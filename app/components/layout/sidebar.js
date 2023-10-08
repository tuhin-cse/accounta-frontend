"use client"

import Link from "next/link";
import {useEffect} from "react";

const Sidebar = ({title, menu}) => {

    useEffect(() => {
        const items = document.querySelectorAll('.menu > li');
        items.forEach(item => {
            let link = item.querySelector('a');
            let submenu = item.querySelector('.submenu');
            if (!!link && !!submenu) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    link.classList.toggle('active');
                    submenu.classList.toggle('active');
                    submenu.style.maxHeight = submenu.classList.contains('active') ? submenu.scrollHeight + "px" : 0;
                })
            }
        })
    }, [])


    return (
        <aside className="sidebar">
            <div className="title">
                {title}
            </div>
            <ul className="menu">
                {menu.map((item, index) => (
                    <li key={index}>
                        {item.menu && <div className="nav-menu">{item.menu}</div>}
                        {item.label && !item.child && (
                            <Link href={item.href || '#!'} className="nav-link">
                                {item.icon && <span className="icon">{item.icon}</span>}
                                <span className="label">{item.label}</span>
                            </Link>
                        )}
                        {item.child && (
                            <>
                                <a role="button" className="nav-link has-arrow">
                                    {item.icon && <span className="icon">{item.icon}</span>}
                                    <span className="label">{item.label}</span>
                                </a>
                                <ul className="submenu">
                                    {item.child.map((item, index) => (
                                        <li key={index}>
                                            <Link href={item.href || '#!'} className="nav-link">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            </>

                        )}
                    </li>
                ))}
            </ul>

        </aside>
    )
}

export default Sidebar