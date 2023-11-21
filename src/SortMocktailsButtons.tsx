import {ReactElement} from "react";
import "./SortMocktailsButtons.css";

interface Props {
    activeButton: string | null;
    showAllMocktails: (buttonName: string) => void;
    showCompletedMocktails: (buttonName: string) => void;
    showNonCompletedMocktails: (buttonName: string) => void;
    clearAllDrinks: () => void;
}

function SortMocktailsButtons({
    activeButton,
    showAllMocktails,
    showCompletedMocktails,
    showNonCompletedMocktails,
    clearAllDrinks,
}: Props): ReactElement {
    return (
        <div className="allButtons">
            <div className="sortButtonsDiv">
                <button className={activeButton === "All" ? "active" : ""} onClick={() => showAllMocktails("All")}>
                    All
                </button>
                <button className={activeButton === "Completed" ? "active" : ""} onClick={() => showCompletedMocktails("Completed")}>
                    Completed
                </button>
                <button
                    className={activeButton === "Non Completed" ? "active" : ""}
                    onClick={() => showNonCompletedMocktails("Non Completed")}
                >
                    Non Completed
                </button>
            </div>

            <button onClick={clearAllDrinks} className="clearAllButton">
                Clear All
            </button>
        </div>
    );
}

export default SortMocktailsButtons;
