import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTwitter } from "react-icons/fa";
import { links, socials } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    //dùng ref cần phải tương tác tốt với css
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);
    useEffect(() => {
        // Lợi ích lớn nhất của việc tham chiếu ref tới div là lấy thông số chiều cao vị trí của css rồi render động
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        if (showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.height = "";
        }
    }, [showLinks]);
    return (
        <nav>
            <div className="nav-center">
                <div className="nav-header">
                    <img src={logo} alt="logo" />
                    <button
                        className="nav-toggle"
                        onClick={() => setShowLinks(!showLinks)}
                    >
                        <FaBars />
                    </button>
                </div>
                <div className={"links-container"} ref={linksContainerRef}>
                    <ul className="links" ref={linksRef}>
                        {links &&
                            links.length > 0 &&
                            links.map((link) => {
                                const { id, url, text } = link;
                                return (
                                    <li key={id}>
                                        <a href={url}>{text}</a>
                                    </li>
                                );
                            })}
                    </ul>
                </div>

                <ul className="social-icons">
                    <ul className="links">
                        {socials &&
                            socials.length > 0 &&
                            socials.map((socials) => {
                                const { id, url, icon } = socials;
                                return (
                                    <li key={id}>
                                        <a href={url}>{icon}</a>
                                    </li>
                                );
                            })}
                    </ul>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
