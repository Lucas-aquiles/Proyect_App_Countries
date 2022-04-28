import React, { useState } from 'react';
import './Paginado.css'


export default function Paginado({ sizeArray, allCountries, paginado, pagina, setPagina, setSize }) {

    // const [numero, setNumero] = useState("1")
    // pagina current page

    const [pageNumberLimit, setpageNumberList] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5); // 10//15
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0) // 5//10




    const pageNumber = []//1.2.3.4.5.6.7.8.9.10.....25
    for (let i = 1; i <= Math.ceil(allCountries / sizeArray); i++) {

        pageNumber.push(i)
    }



    const handleNextbtn = () => {
        setPagina(pagina + 1); // 6

        if (pagina + 1 > maxPageNumberLimit) { // 6>5
            console.log(pagina)
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit); //5+5 //10+5
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit); //0+5//5+5
        }

    }

    const handlePrevbtn = () => {
        setPagina(pagina - 1);  //

        if ((pagina - 1) % pageNumberLimit === 0) {
            console.log(pagina)
            // si siempre es divisible por   %  5 ==== 0

            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            //  15-5 = 10

            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit); // 10-5 = 5
        }
    }

    let pageIncrementBtn = null;
    if (pageNumber.length > maxPageNumberLimit) {
        pageIncrementBtn = <button onClick={handleNextbtn}> &hellip; </button>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <button onClick={handlePrevbtn}> &hellip; </button>;
    }

    // function handleLoadMore() {
    //     setSize(sizeArray + 5)
    // }


    let maximu = 1
    return (
        <div className='containerPag'>
            <button onClick={e => handlePrevbtn(e)} disabled={pagina === pageNumber[0] ? true : false}  >Previous</button>
            {pageDecrementBtn}


            {
                pageNumber.map((number) => {
                    //   6<11 y 6>5 {    }
                    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                        return <div key={maximu++} className='pageNumbers'>
                            <button onClick={() => {
                                paginado(number);
                            }} className={pagina === number ? "active" : null}  >
                                {number}
                            </button>
                        </div>


                    } else {
                        return null;
                    }
                }
                )
            }
            {pageIncrementBtn}

            <button onClick={e => handleNextbtn(e)} disabled={pagina === pageNumber[pageNumber.length - 1] ? true : false}     >Next</button>
            {/* <button className='loadmore' onClick={e => handleLoadMore(e)} >
                Load More</button> */}

        </div>)









}