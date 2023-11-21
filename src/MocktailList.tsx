import { useState, useEffect } from "react";
import "./MocktailList.css";

interface Drinks {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

function MocktailList() {
    const [searchbarValue, setsearchbarValue] = useState("");
    const [mocktails, setMocktails] = useState<Drinks[]>([]);

    useEffect(() => {
        // Fetch data from the API
        fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
        )
            .then((response) => response.json())
            .then((data) => setMocktails(data.drinks))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <div className="APISearchbarWrapper">
                <input
                    id="APISearchbar"
                    type="text"
                    name="Searchbar"
                    value={searchbarValue}
                    onChange={(e) => setsearchbarValue(e.target.value)}
                />
            </div>

            <main>
                <div className="mocktailsWrapper">
                    <h2>Mark's To-drink list</h2>
                    <ul>
                        {mocktails.map((mocktail) => (
                            <li key={mocktail.idDrink} className="mocktailTodo">
                                <div>
                                    <img
                                        src={mocktail.strDrinkThumb}
                                        alt={mocktail.strDrink}
                                    />
                                    <h3>{mocktail.strDrink}</h3>
                                </div>
                                <div className="buttonDiv">
                                    <button className="mocktailCompleted">
                                        Complete
                                    </button>
                                    <button className="mocktailDelete">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default MocktailList;
