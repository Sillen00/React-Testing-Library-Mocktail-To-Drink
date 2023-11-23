import {describe, it, expect} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import SortMocktailsButtons from "../src/SortMocktailsButtons";

import {vi} from "vitest";

// SortMocktailsButtons.jsx-----------------------------------------------------------------------------------------------------------
describe("SortMocktailsButtons.jsx tests", () => {
    // SORT BUTTONS TEXT TEST -----------------------
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

    //"CLEAR ALL" BUTTON TEST -----------------------
    it("should call clearAllDrinks function when 'Clear All' button is clicked", () => {
        const mockClearAllDrinks = vi.fn();
        render(
            <SortMocktailsButtons
                activeButton={null}
                showAllMocktails={() => {}}
                showCompletedMocktails={() => {}}
                showNonCompletedMocktails={() => {}}
                clearAllDrinks={mockClearAllDrinks}
            />
        );

        fireEvent.click(screen.getByText("Clear All"));
        expect(mockClearAllDrinks).toHaveBeenCalled();
    });

    // "ALL" BUTTON TEST -----------------------
    it('should call showAllMocktails function when "All" button is clicked', () => {
        const mockShowAllMocktails = vi.fn();
        render(
            <SortMocktailsButtons
                activeButton="Completed"
                showAllMocktails={mockShowAllMocktails}
                showCompletedMocktails={() => {}}
                showNonCompletedMocktails={() => {}}
                clearAllDrinks={() => {}}
            />
        );

        fireEvent.click(screen.getByText("All"));
        expect(mockShowAllMocktails).toHaveBeenCalledWith("All");
    });

    // "COMPLETED" BUTTON TEST -----------------------
    it('should call showCompletedMocktails function when "Complete" button is clicked', () => {
        const showCompletedMocktails = vi.fn();
        render(
            <SortMocktailsButtons
                activeButton="All"
                showAllMocktails={() => {}}
                showCompletedMocktails={showCompletedMocktails}
                showNonCompletedMocktails={() => {}}
                clearAllDrinks={() => {}}
            />
        );

        fireEvent.click(screen.getByText("Completed"));
        expect(showCompletedMocktails).toHaveBeenCalledWith("Completed");
    });

    // "NON COMPLETED" BUTTON TEST -----------------------
    it('should call showNonCompletedMocktails function when "Complete" button is clicked', () => {
        const showNonCompletedMocktails = vi.fn();
        render(
            <SortMocktailsButtons
                activeButton="All"
                showAllMocktails={() => {}}
                showCompletedMocktails={() => {}}
                showNonCompletedMocktails={showNonCompletedMocktails}
                clearAllDrinks={() => {}}
            />
        );

        fireEvent.click(screen.getByText("Non Completed"));
        expect(showNonCompletedMocktails).toHaveBeenCalledWith("Non Completed");
    });
});
