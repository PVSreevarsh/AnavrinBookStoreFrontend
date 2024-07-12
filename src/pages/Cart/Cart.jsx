import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Cart.css";
import { useGlobalContext } from "../../context.";

const Cart = () => {
  const { cartItems, setCartItems, user, setUserDetails } = useGlobalContext();

  useEffect(() => {
    setUserDetails({ user: "sreevarsh" });
    console.log(user);
  }, []);

  useEffect(() => {
    console.log("here");
    const localUser = localStorage.getItem("user");
    console.log(localUser);
    setUserDetails(JSON.parse(localUser));
    getCartDetails();
  }, []);

  const getCartDetails = useCallback(async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      let response = await fetch(
        "http://localhost:3001/users/cart/" + user.email,
        requestOptions
      );
      response = JSON.parse(JSON.stringify(response));
      setCartItems(Object.values(response));
    } catch (error) {
      return [];
    }
  }, []);

  const [proceedToPay, setProceedToPay] = useState(false);
  const totalPrice = cartItems.reduce((accumulator, book) => {
    return accumulator + book.price;
  }, 0);

  const AddressForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const {orderPlaced, setOrderPlaced} = useState(false)
    
    const saveAddress = (data) => {
      setOrderPlaced(true)
    };


    return (
      <>
        {orderPlaced ? (
          <div className="orderPlaced">
            <h2>Order has been placed</h2>
          </div>
         
        ) : (
          <div id="register">
          <p className="form-title">Address</p>
          <form className="App" onSubmit={handleSubmit(saveAddress)}>
            <input
              placeholder="Address Line 1"
              type="text"
              {...register("address_1", { required: true })}
            />
            {errors.address_1 && (
              <span style={{ color: "red" }}>
                Address line 1 is mandatory{" "}
              </span>
            )}
            <input
              placeholder="Address Line 2"
              type="text"
              {...register("address_2", { required: true })}
            />
            {errors.address_2 && (
              <span style={{ color: "red" }}>
                Address line 2 is mandatory{" "}
              </span>
            )}
            <input
              placeholder="City"
              type="text"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <span style={{ color: "red" }}>City is mandatory </span>
            )}
            <input
              placeholder="Pincode"
              type="text"
              {...register("pincode", { required: true })}
            />
            {errors.pincode && (
              <span style={{ color: "red" }}>Pincode is mandatory </span>
            )}
            <div>
              <input type="radio" id="standard" name="delivery" />
              <label for="standard">Standard Delivery</label>
              <input type="radio" id="express" name="delivery" />
              <label for="express">Express Delivery</label>
            </div>
            <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
          </form>
        </div>
        )}
      </>
    );
  };

  const CartDetails = () => {
    return (
      <section className="book-details">
        <div className="container">
          {cartItems.map((book, index) => {
            return (
              <>
                <div key={index} className="book-details-info">
                  <div className="book-details-item title">
                    <span className="fw-6 fs-24">{book?.title}</span>
                  </div>
                  <div className="book-details-item title">
                    <span className="fw-6 fs-16">{book?.author}</span>
                    <span className="text-italic" style={{ float: "right" }}>
                      <strong>&#x20b9;{book?.price}</strong>
                    </span>
                  </div>
                  <div className="book-details-item description">
                    <span>...{book?.description}</span>
                  </div>
                  {/* <div className="book-details-item">
                    <span className="fw-6">Price </span>
                    <span className="text-italic">{book?.price}</span>
                  </div> */}
                </div>
                <button
                  type="button"
                  className="flex flex-c back-btn btn"
                  style={{ color: "red" }}
                  onClick={() => {
                    setCartItems(
                      cartItems.filter((all) => {
                        return all.id !== book.id;
                      })
                    );
                  }}
                >
                  {/* <FaGooglePay size={22} /> */}
                  Remove
                </button>
              </>
            );
          })}
          <button
            type="button"
            className="flex flex-c back-btn btn"
            style={{ float: "right" }}
            onClick={() => {
              setProceedToPay(true);
            }}
          >
            {/* <FaGooglePay size={22} /> */}
            <span className="fs-24 fw-8">Pay:</span>
            <strong className="fs-24"> {totalPrice}</strong>
          </button>
        </div>
      </section>
    );
  };

  return (
    <>
      {proceedToPay ? <AddressForm></AddressForm> : <CartDetails></CartDetails>}
    </>
  );
};

export default Cart;
