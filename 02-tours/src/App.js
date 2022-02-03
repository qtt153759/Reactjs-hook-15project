import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
    const [isLoading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);
    const removeTour = (id) => {
        const newTours = tours.filter((tour) => tour.id !== id);
        setTours(newTours);
    };
    const fetchTour = async () => {
        try {
            const response = await fetch(url);
            const tours = await response.json();
            console.log("check ", tours);
            if (tours && tours.length > 0) {
                setTours(tours);
            }
            setLoading(false);
        } catch (e) {
            setLoading(true);
            console.log(e);
        }
    };
    useEffect(() => {
        fetchTour();
    }, []);
    if (tours.length === 0) {
        return (
            <main>
                <div className="title">
                    <h2>No tours left</h2>
                    <button className="btn" onClick={() => fetchTour()}>
                        Refresh All
                    </button>
                </div>
            </main>
        );
    }
    return (
        <main>
            {isLoading && <Loading />}
            {!isLoading && tours && (
                <Tours tours={tours} removeTour={removeTour} />
            )}
        </main>
    );
}

export default App;
