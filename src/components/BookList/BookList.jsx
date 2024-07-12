import React from "react";
import { useGlobalContext } from "../../context.";
import Book from "../BookList/Book";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const { books, user, setUserDetails } = useGlobalContext();
  console.log(user)
  let genres = new Set();
  const booksWithCovers = books.map((singleBook) => {
    genres.add(singleBook.genre);
    return {
      ...singleBook,
      id: singleBook.id,
      cover_img: coverImg,
    };
  });
  genres = Array.from(genres);

  return (
    <section className="booklist">
      <div className="container">
        <>
          {genres.map((genre) => {
            return (
              <>
                <div className="section-title">
                  <h2>{genre}</h2>
                </div>
                <div className="booklist-content grid">
                  {booksWithCovers.map((item, index) => {
                    if (item.genre === genre) {
                      return <Book key={index} {...item} />;
                    } else{
                      return <></>
                    }
                  })}
                </div>
              </>
            );
          })}
        </>
      </div>
    </section>
  );
};

export default BookList;
