import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
const URL = "http://localhost:3001";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [user, setUserDetails] = useState({});

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/books`);
      let data = await response.json();
      data = data.data;

      if (data) {
        const newBooks = data.map((bookSingle) => {
          let { _id, author, image, price, firstby } = bookSingle;
          const [
            key,
            author_name,
            conver_i,
            edition_count,
            first_publish_year,
            title,
          ] = [_id, author, image, price, "2011", bookSingle.title];
          // let {key: _id, author_name: author, cover_i: image, edition_count: price, first_publish_year, title} = bookSingle;

          return {
            id: _id,
            author: author,
            cover_id: image,
            edition_count: price,
            genre: bookSingle.genre[0],
            first_publish_year: first_publish_year,
            title: title,
          };
        });

        setBooks(newBooks);
        console.log(newBooks, "<<<<<<");

        if (newBooks.length > 1) {
          setResultTitle("Read now");
        } else {
          setResultTitle("No Search Result Found!");
        }
      } else {
        setBooks([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
        cartItems,
        setCartItems,
        user,
        setUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
