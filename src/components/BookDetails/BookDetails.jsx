import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context.";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaAmazon, FaArrowLeft, FaCartArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3001/books";

const BookDetails = () => {
  const { id } = useParams();
  const { cartItems, setCartItems, user } = useGlobalContext();
  const [book, setBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}/${id}`);
        const data = await response.json();

        if (data) {
          const { author, description, genre, price, title } = data;
          // const {description, title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            description: description,
            id,
            title: title,
            author: author,
            genre: genre[0],
            price: price,
            cover_img: coverImg,
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getBookDetails();
  }, [id]);

  const onCartAdd = useCallback(async (data) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", user.token);
      const raw = JSON.stringify({
        cart: {[data.id]: data},
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:3001/users/cart/add", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      return [];
    }
  }, []);

  const addToCart = (e) => {
    e.preventDefault();
    const key = Object.keys(cartItems).length;
    let bookToBeAdded = {};
    bookToBeAdded[key] = book;
    setCartItems((prevItems) => [...prevItems, book]);
    onCartAdd(book);
    setAddedToCart(true);
  };

  return (
    <section key={id} className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/book")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item title">
              <span className="fw-6 fs-16">{book?.author}</span>
            </div>
            <div className="book-details-item description">
              <span>...{book?.description}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Price </span>
              <span className="text-italic">{book?.price}</span>
            </div>
            {addedToCart ? (
              <div className="book-details-item description">
                <span>Added to Cart</span>
              </div>
            ) : (
              <button
                type="button"
                className="flex flex-c back-btn"
                onClick={addToCart}
              >
                <FaCartArrowDown size={22} />
                <span className="fs-18 fw-6">Add To Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
