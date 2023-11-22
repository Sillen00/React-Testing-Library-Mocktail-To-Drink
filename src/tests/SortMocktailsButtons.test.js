// import {jest} from "@jest/globals";
// import {render, screen, waitFor} from "@testing-library/react";
// import SortMocktailsButtons from "../SortMocktailsButtons";
// import userEvent from "@testing-library/user-event";

// test.skip("SortMocktailsButtons.jsx should have the button texts in component", () => {
//     // Mock functions for props
//     const mockShowAllMocktails = jest.fn();
//     const mockShowCompletedMocktails = jest.fn();
//     const mockShowNonCompletedMocktails = jest.fn();
//     const mockClearAllDrinks = jest.fn();

//     render(
//         <SortMocktailsButtons
//             activeButton="All"
//             showAllMocktails={mockShowAllMocktails}
//             showCompletedMocktails={mockShowCompletedMocktails}
//             showNonCompletedMocktails={mockShowNonCompletedMocktails}
//             clearAllDrinks={mockClearAllDrinks}
//         />
//     );

//     expect(screen.getByText("All")).toBeInTheDocument();
//     expect(screen.getByText("Completed")).toBeInTheDocument();
//     expect(screen.getByText("Non Completed")).toBeInTheDocument();
// });
