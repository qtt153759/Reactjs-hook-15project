import React, { useState, useContext, useEffect, useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("a");
    const [cocktails, setCocktails] = useState([]);
    // Mỗi lần searchTern change -> rerender => cả function fetchDrinks cũng làm lại vs tham chiếu khác=>useCallback
    const fetchDrinks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}${searchTerm}`);
            const data = await response.json();
            const { drinks } = data;
            if (!drinks) {
                setCocktails([]);
            } else {
                const newCocktails = drinks.map((item) => {
                    const {
                        idDrink,
                        strDrink,
                        strDrinkThumb,
                        strAlcoholic,
                        strGlass,
                    } = item;
                    return {
                        id: idDrink,
                        name: strDrink,
                        image: strDrinkThumb,
                        info: strAlcoholic,
                        glass: strGlass,
                    };
                });
                setCocktails(newCocktails);
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }, [searchTerm]);
    //nếu useEffect dùng fetchDrinks() thì warning: nên có fetchDrinks in useEffect dependency,
    // tuy nhiên nếu để fetchDrinks vào thì sẽ có vòng lặp vô hạn vì fetchDrinks reRender tham chiếu lại nhiều lần
    // khi state thay đổi do fetchDrinks có nhiều set quá=> fetchDrinks dùng callBack
    useEffect(() => {
        fetchDrinks();
    }, [searchTerm, fetchDrinks]);
    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
                setSearchTerm,
                cocktails,
                setCocktails,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
