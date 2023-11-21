import { useState, useEffect } from "react";
import "./MocktailList.css";

interface Drinks {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    completed: boolean;
}

function MocktailList() {
    const [searchbarValue, setsearchbarValue] = useState("");
    const [mocktails, setMocktails] = useState<Drinks[]>([]);

    useEffect(() => {
        setTimeout(() => {
            // Fetch data from the API
            fetch(
                "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
            )
                .then((response) => response.json())
                .then((data) => setMocktails(data.drinks))
                .catch((error) => console.error("Error fetching data:", error));
        }, 100);
    }, []);

    const handleCompleteClick = (id: string) => {
        setMocktails((prevMocktails) =>
            prevMocktails.map((mocktail) =>
                mocktail.idDrink === id
                    ? { ...mocktail, completed: !mocktail.completed }
                    : mocktail
            )
        );
    };

    const handleDeleteClick = (id: string) => {
        setMocktails((prevMocktails) =>
            prevMocktails.filter((mocktail) => mocktail.idDrink !== id)
        );
    };

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
                    <ul>
                        {mocktails.length < 1 && (
                            <h2>Mark's To-drink list...</h2>
                        )}
                        {mocktails.map((mocktail) => (
                            <li
                                key={mocktail.idDrink}
                                className={`mocktailTodo ${
                                    mocktail.completed ? "completed" : ""
                                }`}
                            >
                                <div>
                                    <img
                                        src={mocktail.strDrinkThumb}
                                        alt={mocktail.strDrink}
                                    />
                                    <h3>{mocktail.strDrink}</h3>
                                </div>
                                <div className="buttonDiv">
                                    <button
                                        className="mocktailCompleted"
                                        onClick={() =>
                                            handleCompleteClick(
                                                mocktail.idDrink
                                            )
                                        }
                                    >
                                        {mocktail.completed
                                            ? "Uncomplete"
                                            : "Complete"}
                                    </button>
                                    <button
                                        className="mocktailDelete"
                                        onClick={() =>
                                            handleDeleteClick(mocktail.idDrink)
                                        }
                                    >
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
