import { render, screen } from '@testing-library/react'
import LandingPage from '../Components/LandingPage/LandingPage'
import { Provider } from "react-redux";
import store from "../store/index";
import { BrowserRouter } from "react-router-dom";


describe('LandingPage', () => {
    it('renders appropriately', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LandingPage />
                </BrowserRouter>
            </Provider>

        )


        const element = (screen.getAllByRole('img'));
        expect(element.length).toBe(4);
    })




})