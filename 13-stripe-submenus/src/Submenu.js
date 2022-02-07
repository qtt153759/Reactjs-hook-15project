import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";
const Submenu = () => {
    const {
        isSubmenuOpen,
        location,
        page: { page, links },
    } = useGlobalContext();
    const container = useRef(null);
    // Reder động bootStrap luôn
    const [columns, setColumns] = useState("col-2");
    useEffect(() => {
        const submenu = container.current;
        const { center, bottom } = location;
        submenu.style.left = `${center}px`;
        submenu.style.top = `${bottom}px`;
        if (links.length > 4) {
            setColumns("col-4");
        } else {
            setColumns(`col-${links.length}`);
        }
    }, [location]);
    return (
        <aside
            className={isSubmenuOpen ? "submenu show" : "submenu"}
            ref={container}
        >
            <h4>{page}</h4>
            {/* Bình thường thì map được r, nhưng đây muốn dùng ref để dynamic width cơ */}
            <div className={`submenu-center ${columns}`}>
                {links.map((link, index) => {
                    const { label, icon, url } = link;
                    return (
                        <a href={url} key={index}>
                            {icon}
                            {label}
                        </a>
                    );
                })}
            </div>
        </aside>
    );
};

export default Submenu;
