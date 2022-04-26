import { render, screen } from '@testing-library/react'
// import LandingPage from '../Components/LandingPage/LandingPage'
import { Provider } from "react-redux";
import store from "../store/index";
import { BrowserRouter } from "react-router-dom";
import Card from '../Components/Card/Card'



describe('card', () => {

    render(
        <Provider store={store}>
            <BrowserRouter>

                <Card />
            </BrowserRouter>

        </Provider >

    )





    it("debe tener un <h4> con el texto Continent", () => {
        expect(screen.getByText("Continent:"));
        // expect(element.type).toBe("text");
    });







    // const element = expect(screen.getByText("Continent:"));



    // console.log(element)
    // const element = (screen.getAllByRole('img'));
    // expect(element.length).toBe(4);

    // expect(screen.queryAllByText("INGRESAR")).toBeInTheDocument()
})
