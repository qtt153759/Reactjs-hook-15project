import React, { useState, useContext } from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    const openSidebar = () => {
        setIsSidebarOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    return (
        <AppContext.Provider
            value={{
                isModalOpen,
                isSidebarOpen,
                closeModal,
                openModal,
                closeSidebar,
                openSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
