import React, { useEffect, useState } from "react";
import people from "./data";
import {
    FaChevronLeft,
    FaChevronRight,
    FaQuoteRight,
    FaRandom,
} from "react-icons/fa";

const Review = () => {
    const [index, setIndex] = useState(0);
    const { name, job, image, text } = people[index];
    const nextPerson = () => {
        setIndex((index) => {
            return (index = index === people.length - 1 ? 0 : ++index);
        });
    };
    const prevPerson = () => {
        setIndex((index) => {
            return (index = index === 0 ? people.length - 1 : --index);
        });
    };
    const randomPerson = () => {
        setIndex((index) => {
            let randomNumber = Math.floor(Math.random() * people.length);
            while (randomNumber === index) {
                randomNumber = Math.floor(Math.random() * people.length);
            }
            return randomNumber;
        });
    };
    return (
        <article className="review">
            <div className="img-container">
                <img src={image} alt={name} className="person-img" />
                <span className="quote-icon">
                    <FaQuoteRight />
                </span>
            </div>
            <h4 className="author">{name}</h4>
            <p className="job">{job}</p>
            <p className="info">{text}</p>
            <div className="button-container">
                <button className="prev-btn" onClick={() => prevPerson()}>
                    <FaChevronLeft />
                </button>
                <button className="next-btn" onClick={() => nextPerson()}>
                    <FaChevronRight />
                </button>
            </div>
            <button className="random-btn" onClick={() => randomPerson()}>
                <FaRandom />
            </button>
        </article>
    );
};

export default Review;
