import {describe, it, expect} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import SortMocktailsButtons from "../src/SortMocktailsButtons";
import MocktailList from "../src/MocktailList";

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
        });
    });

    it("should show 'Mark's To-drink list...' text when list is empty.", () => {
        render(<MocktailList />);
        const loadingElement = screen.getByText("Mark's To-drink list...");
        expect(loadingElement).toBeInTheDocument();
    });
});
