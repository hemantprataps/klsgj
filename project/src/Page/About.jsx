import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../Redux/Books/Action";
import { BookCard } from "./AboutCard";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../Style/about.css"
export const BookList = () => {

    const [data, setData] = useState([])


    let value = JSON.stringify(localStorage.getItem("data"))



    const dispatch = useDispatch()

    const books = useSelector((store) => store.books)
    console.log("book", books)
    const [searchParams] = useSearchParams()





    const handelGetData = () => {
        axios.get(" http://localhost:8000/UserOrder").then((res) => {
            setData(res.data)
        })
    }


    const loacation = useLocation()
    useEffect(() => {
        const order = searchParams.get("order");
        let paramsObject = {


            params: {
                category: searchParams.getAll("category"),
                _sort: order && 'release_year',
                _order: order
            }
        }
        dispatch(getBooks(paramsObject));



        handelGetData()

    }, [value])

    return <div>
        <Box className="BookCard">

            <Box className="Book_Card3">

                {books.length > 0 && books.map((el) => {
                    return <BookCard key={el.id}
                        book={el}
                    />
                })}
            </Box>

            <Box className="Book_Card2">
                <Box><h3>Your Order </h3></Box>
                <Box className="menuBox">
                    {/* <Box><h3>Please add an option</h3></Box>
                    <Box><h3>Your Order is empty</h3></Box> */}


                    {data.map((el) => {

                        return <div>
                            <Box className="text_hidden">{el.quantity >= 1 && el.font_xxxl}</Box>
                            <Box>{el.quantity >= 1 && el.quantity}</Box>
                        </div>
                    })}
                </Box>

                <Box className="total">Total</Box>
            </Box>


        </Box>

    </div>
}






// module.css

