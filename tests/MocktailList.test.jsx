import {describe, it, expect} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import MocktailList from "../src/MocktailList";

// import {vi} from "vitest";

// MocktailList.jsx-----------------------------------------------------------------------------------------------------------------------------------------------
describe("MocktailList.jsx tests", () => {
    // LOADING TEXT TEST -----------------------
    it("should show 'Mark's To-drink list...' text when list is empty.", () => {
        render(<MocktailList />);
        const loadingElement = screen.getByText("Mark's To-drink list...");
        expect(loadingElement).toBeInTheDocument();
    });

    // ADD MOCKTAIL AND LOADING TEXT DISAPEARS -----------------------
    it("should remove Mark's To-drink list... when selecting a mocktail", async () => {
        render(<MocktailList />);
        const searchInput = screen.getByPlaceholderText("Searchbar");
        fireEvent.change(searchInput, {target: {value: "a"}});
        expect(searchInput.value).toBe("a");

        const li = await waitFor(() => screen.getByText(/A1/i));
        await waitFor(() => {
            fireEvent.click(li);
        });

        await waitFor(() => {
            expect(screen.queryByText("Mark's To-drink list...")).toBeNull();
        });
    });

    // COMPLETE MOCKTAIL TEST -----------------------
    it("should change text to uncomplete when clicking on a completed mocktail", async () => {
        render(<MocktailList />);
        const searchInput = screen.getByPlaceholderText("Searchbar"); // Assuming you have a placeholder text
        fireEvent.change(searchInput, {target: {value: "a"}});
        expect(searchInput.value).toBe("a");

        const AddItemLi = await waitFor(() => screen.getByText("A1"));
        fireEvent.click(AddItemLi);

        //Click on button with text "Completed"
        const completedButton = screen.getByText("Complete");
        fireEvent.click(completedButton);

        const unCompletedButton = screen.getByText("Uncomplete");
        expect(unCompletedButton).toBeInTheDocument();
    });

    // DELETE MOCKTAIL TEST ----------------------------------------
    it("should remove mocktail from list when clicking on delete button", async () => {
        render(<MocktailList />);
        const searchInput = screen.getByPlaceholderText("Searchbar");
        fireEvent.change(searchInput, {target: {value: "a"}});
        expect(searchInput.value).toBe("a");

        const AddItemLi = await waitFor(() => screen.getByText(/A1/i));
        fireEvent.click(AddItemLi);

        //Click on button with text "Completed"
        const completedButton = screen.getByText("Complete");
        fireEvent.click(completedButton);

        //Click on button with text "Delete"
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        expect(screen.queryByText(/A1/i)).toBeNull();
    });
});
