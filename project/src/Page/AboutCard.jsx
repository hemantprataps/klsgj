import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { json } from "react-router-dom";


import "../Style/BookCard.css"










export const BookCard = ({ book }) => {


    const handelGetData = () => {
        axios.get(" http://localhost:8000/UserOrder").then((res) => {
            localStorage.setItem("value", JSON.stringify(res.data))
        })
    }

    const [data, getData] = useState([])
    // const [dataa, setData] = useState([])


    const [counter, setCounter] = useState(false)

    const [addd, setAdd] = useState(true)

    const [postData, setPostData] = useState([])


    const [count, setCount] = useState(0)



    const handleOrderpost = (id) => {




        axios.get(`http://localhost:8000/deals?id=${id}`).then((res) => {
            getData(res.data)
            //   console.log(res.data)



        })


        setCount(1)

        if (count === 1) {
            setCounter(true)
            setAdd(false)
        }
    }



    const handleAll = () => {



        axios.get("http://localhost:8000/UserOrder").then((res) => {
            localStorage.setItem("value", JSON.stringify(res.data))
        })

        axios.get(`http://localhost:8000/UserOrder`).then((res) => {
            setPostData(res.data)

            setAdd(data.quantity)
        })



        const handleAllPatch = (id) => {
            axios.patch(`http://localhost:8000/UserOrder/${id}`, { quantity: count + 1 || 0 })
        }

        const handleAllPost = (data) => {
            axios.post(`http://localhost:8000/UserOrder`, data)
            handelGetData()
        }


        for (let i = 0; i < postData.length; i++) {

            if (data[0].id === postData[i].id) {
                handleAllPatch(book.id)
            } else {
                handleAllPost(data[0])
            }
        }





    }










    useEffect(() => {
        // handleOrderpost(book.id)
        if (count === 0) {
            setCounter(false)
        }

    }, [count]);


    const handleCount = (value) => {
        setCount(count + value)
        handleAll()

        localStorage.setItem("data", JSON.stringify(count))
    }






    return <div>

        <Box >

            <Box className="Book_Card1">

                <Box className="Book_Card_Right_Side">

                    {book.tag2 !== "" && <span className="RedBox">{book.tag2}</span>}
                    <Box>{book.txt_tertiary}</Box>
                    <h3>{book.font_xxxl}</h3>

                    <Box className="cancel">
                        <Text>Free Cancellation</Text>
                    </Box>

                    <Box className="valid">
                        <p className="validText"> valid for :  </p> <p className="validValue">{` ${book.txt_primary}`}  </p>

                        <p className="validText" id="marginAdd"> valid on :  </p> <p className="validValue">{` ${book.txt_primary2}`}  </p>

                        <p className="validText" id="marginAdd"> Timings :  </p> <p className="validValue">{` ${book.txt_primary3}`}  </p>
                    </Box>

                    <Box className="buttonBox">
                        <Button>Menu</Button>

                        <Button>Details</Button>

                    </Box>
                </Box>

                <Box className="Book_Card_Left_Side">

                    <Box className="OfferBox">
                        <span>{book.tag}</span>
                    </Box>

                    <Box className="Cardprice">
                        <Text>₹</Text>      <p className="croosPrice">{book.txt_strike_through}</p>

                        <Text className="bigRupee">₹</Text>
                        <Text className="bigRupee">{book.font_xxxl2}</Text>
                    </Box>
                    <Box>
                        <Button className="AddButton" onClick={() => { handleOrderpost(book.id) }}>Add</Button>


                        <Box className="Counter">
                            <Button className="reduce" onClick={() => { handleCount(-1) }}>-</Button>  <Button className="ehite">{count}</Button>   <Button className="reduce" onClick={() => { handleCount(1) }}>+</Button>
                        </Box>




                    </Box>
                </Box>
            </Box>


        </Box>




    </div>
}