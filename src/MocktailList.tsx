import {useState, useEffect} from "react";
import "./MocktailList.css";
import SortMocktailsButtons from "./SortMocktailsButtons";

interface Drinks {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    completed: boolean;
}

function MocktailList() {
    const [searchbarValue, setsearchbarValue] = useState("");
    const [mocktails, setMocktails] = useState<Drinks[]>([]);
    const [searchResults, setSearchResults] = useState<Drinks[]>([]);
    const [filter, setFilter] = useState<string>("All"); // Default filter is "All"
    const [activeButton, setActiveButton] = useState<string | null>(null);

    useEffect(() => {
        if (searchbarValue.trim() === "") {
            setSearchResults([]); // Clear search results when the search bar is empty
            return;
        }

        // Fetch data from the API based on the search query
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchbarValue}`)
            .then((response) => response.json())
            .then((data) => setSearchResults(data.drinks || []))
            .catch((error) => console.error("Error fetching data:", error));
    }, [searchbarValue]);

    const handleCompleteClick = (id: string) => {
        setMocktails((prevMocktails) =>
            prevMocktails.map((mocktail) => (mocktail.idDrink === id ? {...mocktail, completed: !mocktail.completed} : mocktail))
        );
    };

    const handleDeleteClick = (id: string) => {
        setMocktails((prevMocktails) => prevMocktails.filter((mocktail) => mocktail.idDrink !== id));
    };

    const handleAddToMocktails = (drink: Drinks) => {
        setMocktails((prevMocktails) => [...prevMocktails, drink]);
        setSearchResults([]); // Clear search results after adding a drink
        setsearchbarValue(""); // Clear the search bar
    };

    const showCompletedMocktails = (buttonName: string) => {
        setActiveButton(buttonName);
        setFilter("Completed");
    };

    const showNonCompletedMocktails = (buttonName: string) => {
        setActiveButton(buttonName);
        setFilter("Non Completed");
    };

    const showAllMocktails = (buttonName: string) => {
        setActiveButton(buttonName);
        setFilter("All");
    };

    const getFilteredMocktails = () => {
        if (filter === "Completed") {
            return mocktails.filter((mocktail) => mocktail.completed);
        } else if (filter === "Non Completed") {
            return mocktails.filter((mocktail) => !mocktail.completed);
        } else {
            return mocktails;
        }
    };

    const clearAllDrinks = () => {
        setMocktails([]);
    };

    return (
        <div>
            <div className="APISearchbarWrapper">
                <input
                    placeholder="Searchbar"
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
                        {/* SEARCH RESULTS ---------------------------------------------------- */}
                        {searchResults.length > 0 && (
                            <>
                                <h2>Search Results</h2>
                                {searchResults.map((result) => (
                                    <li
                                        data-testid={`mocktailsearchresult${result.idDrink}`}
                                        key={result.idDrink}
                                        className="mocktailTodo"
                                        onClick={() => handleAddToMocktails(result)}
                                    >
                                        <div>
                                            <img src={result.strDrinkThumb} alt={result.strDrink} />
                                            <h3>{result.strDrink}</h3>
                                        </div>
                                    </li>
                                ))}
                            </>
                        )}
                        {/* IF YOU DONT GOT ANY MOCKTAILS IN YOUR LIST SHOW THIS ----------------------- */}
                        {mocktails.length < 1 && searchResults.length === 0 && <h2>Mark's To-drink list...</h2>}

                        {/* BUTTONS TO SORT THE LIST */}

                        <SortMocktailsButtons
                            activeButton={activeButton}
                            showAllMocktails={showAllMocktails}
                            showCompletedMocktails={showCompletedMocktails}
                            showNonCompletedMocktails={showNonCompletedMocktails}
                            clearAllDrinks={clearAllDrinks}
                        />

                        {/* MOCKTAILS LIST -------------------------------------------------------------- */}
                        {getFilteredMocktails().map((mocktail) => (
                            <>
                                <li key={mocktail.idDrink} className={`mocktailTodo ${mocktail.completed ? "completed" : ""}`}>
                                    <div>
                                        <img src={mocktail.strDrinkThumb} alt={mocktail.strDrink} />
                                        <h3>{mocktail.strDrink}</h3>
                                    </div>
                                    <div className="buttonDiv">
                                        <button className="mocktailCompleted" onClick={() => handleCompleteClick(mocktail.idDrink)}>
                                            {mocktail.completed ? "Uncomplete" : "Complete"}
                                        </button>
                                        <button className="mocktailDelete" onClick={() => handleDeleteClick(mocktail.idDrink)}>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default MocktailList;
