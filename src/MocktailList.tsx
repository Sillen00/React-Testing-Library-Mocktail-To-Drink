import { useState } from "react";
import "./MocktailList.css";

function MocktailList() {
    const [searchbarValue, setsearchbarValue] = useState("");

    return (
        <div>
            <input
                id="APISearchbar"
                type="text"
                name="Searchbar"
                value={searchbarValue}
                onChange={(e) => setsearchbarValue(e.target.value)}
            />

            <main>
                <div className="wrapper">
                    <div className="mocktails">
                        <h2>Mark's To-drink list</h2>
                        <ul>
                            <li>Mocktail 1</li>
                            <li>Mocktail 2</li>
                            <li>Mocktail 3</li>
                            <li>Mocktail 4</li>
                            <li>Mocktail 5</li>
                            <li>Mocktail 6</li>
                            <li>Mocktail 7</li>
                            <li>Mocktail 8</li>
                            <li>Mocktail 9</li>
                            <li>Mocktail 10</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MocktailList;
