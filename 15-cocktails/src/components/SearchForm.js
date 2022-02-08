import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
    const { setSearchTerm } = useGlobalContext();
    const searchValue = useRef("");
    const searchCocktail = () => {
        setSearchTerm(searchValue.current.value);
    };
    useEffect(() => {
        // Bao giờ khởi động cũng focus
        searchValue.current.focus();
    }, []);
    const handleSubmit = (e) => {
        // Tránh việc gõ xong 1 cái enter là trang phải reload lại từ đầu
        e.preventDefault();
    };
    return (
        <section className="section search">
            <form action="" className="search-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">search your favorite cocktail</label>
                    <input
                        type="text"
                        id="name"
                        ref={searchValue}
                        onChange={searchCocktail}
                    />
                </div>
            </form>
        </section>
    );
};

export default SearchForm;
