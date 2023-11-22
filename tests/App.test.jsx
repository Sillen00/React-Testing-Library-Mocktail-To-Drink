import {describe, it, expect, afterEach} from "vitest";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import SortMocktailsButtons from "../src/SortMocktailsButtons";
import MocktailList from "../src/MocktailList";

afterEach(() => {
    cleanup();
});

describe("something truthy and falsy", () => {
    it("true to be true", () => {
        expect(true).toBe(true);
    });

    it("false to be false", () => {
        expect(false).toBe(false);
    });
});

// SortMocktailsButtons.jsx-----------------------------------------------------------------------------

describe("SortMocktailsButtons.jsx tests", () => {
    it("Should have the button texts in component", async () => {
        // Mock functions for props
        const mockShowAllMocktails = () => {};
        const mockShowCompletedMocktails = () => {};
        const mockShowNonCompletedMocktails = () => {};
        const mockClearAllDrinks = () => {};

        render(
            <SortMocktailsButtons
                activeButton="All"
                showAllMocktails={mockShowAllMocktails}
                showCompletedMocktails={mockShowCompletedMocktails}
                showNonCompletedMocktails={mockShowNonCompletedMocktails}
                clearAllDrinks={mockClearAllDrinks}
            />
        );

        await waitFor(() => {
            expect(screen.getByText("All")).toBeInTheDocument();
            expect(screen.getByText("Completed")).toBeInTheDocument();
            expect(screen.getByText("Non Completed")).toBeInTheDocument();
            expect(screen.getByText("Clear All")).toBeInTheDocument();
        });
    });

    it("should remove Mark's To-drink list... when selecting a mocktail", async () => {
        render(<MocktailList />);

        const searchInput = screen.getByPlaceholderText("Searchbar"); // Assuming you have a placeholder text

        fireEvent.change(searchInput, {target: {value: "a"}});

        // Get all elements with the test ID "mocktailsearchresult"
        const searchResults = screen.getByTestId("mocktailsearchresult-17222");

        expect(searchResults).toBeInTheDocument();
        await waitFor(() => {
            userEvent.click(searchResults);
        });

        await waitFor(() => {
            expect(screen.queryByText("Mark's To-drink list...")).toBeNull();
        });
    });

    // test('calls showAllMocktails function when "All" button is clicked', () => {
    //     const mockShowAllMocktails = jest.fn();
    //     render(
    //         <SortMocktailsButtons
    //             activeButton="Completed"
    //             showAllMocktails={mockShowAllMocktails}
    //             showCompletedMocktails={() => {}}
    //             showNonCompletedMocktails={() => {}}
    //             clearAllDrinks={() => {}}
    //         />
    //     );

    //     fireEvent.click(screen.getByText("All"));
    //     expect(mockShowAllMocktails).toHaveBeenCalledWith("All");
    // });

    // test('calls clearAllDrinks function when "Clear All" button is clicked', () => {
    //     const mockClearAllDrinks = jest.fn();
    //     render(
    //         <SortMocktailsButtons
    //             activeButton={null}
    //             showAllMocktails={() => {}}
    //             showCompletedMocktails={() => {}}
    //             showNonCompletedMocktails={() => {}}
    //             clearAllDrinks={mockClearAllDrinks}
    //         />
    //     );

    //     fireEvent.click(screen.getByText("Clear All"));
    //     expect(mockClearAllDrinks).toHaveBeenCalled();
    // });
});

// MocktailList.jsx-----------------------------------------------------------------------------
it("should show 'Mark's To-drink list...' text when list is empty.", () => {
    render(<MocktailList />);
    const loadingElement = screen.getByText("Mark's To-drink list...");
    expect(loadingElement).toBeInTheDocument();
});
