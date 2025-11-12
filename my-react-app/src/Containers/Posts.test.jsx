import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import postsReducer, { fetchPosts } from "../slices/postsSlice";
import Posts from "./Posts";
import '@testing-library/jest-dom';


vi.mock("../slices/postsSlice", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        fetchPosts: vi.fn(() => () => { }),
    };
});

describe("Posts component with mocked API", () => {
    test("відображає список постів після успішного fetch", () => {
        const preloadedState = {
            posts: {
                items: [
                    { id: 1, title: "Test Post 1" },
                    { id: 2, title: "Test Post 2" },
                ],
                loading: false,
                error: null,
            },
        };

        const store = configureStore({
            reducer: { posts: postsReducer },
            preloadedState,
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Posts />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Post 2/i)).toBeInTheDocument();
    });

    test("показує індикатор завантаження", () => {
        const store = configureStore({
            reducer: { posts: postsReducer },
            preloadedState: {
                posts: { items: [], loading: true, error: null },
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Posts />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/завантаження/i)).toBeInTheDocument();
    });

    test("показує помилку", () => {
        const store = configureStore({
            reducer: { posts: postsReducer },
            preloadedState: {
                posts: { items: [], loading: false, error: "Помилка з'єднання" },
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Posts />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/помилка з'єднання/i)).toBeInTheDocument();
    });
});