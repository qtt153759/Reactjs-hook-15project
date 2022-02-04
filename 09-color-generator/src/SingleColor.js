import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index, hexColor }) => {
    const [alert, setAlert] = useState(false);
    //  cách chèn dấu vào array
    const bcg = rgb.join(",");
    const hex = rgbToHex(...rgb);
    const hexValue = `#${hexColor}`;
    useEffect(() => {
        const random = Math.floor(Math.random() * 100);
        const timeout = setTimeout(() => {
            setAlert(false);
        }, 5000);
        return () => {
            clearTimeout(timeout);
        };
    }, [alert]);
    return (
        <article
            className={`color ${index > 10 && "color-light"}`}
            style={{ backgroundColor: `rgb(${bcg})` }}
            onClick={() => {
                setAlert(true);
                // cách copy bằng click
                navigator.clipboard.writeText(hexValue);
            }}
        >
            {console.log("rerender")}
            <p className="percent-value">{weight}%</p>
            <p className="color-value">{hexValue}</p>
            {alert && <p className="alert">copied to clipboard</p>}
        </article>
    );
};

export default SingleColor;
