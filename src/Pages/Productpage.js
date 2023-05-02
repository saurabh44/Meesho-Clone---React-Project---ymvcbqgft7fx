import React, { useContext, useEffect, useState } from "react";
// import { FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import { CartCoontext } from "../Context/Context";
import "./productDetails.css"

import PacmanLoader from "react-spinners/PacmanLoader";

const Productpage = () => {

  const Globalstate = useContext(CartCoontext);

  const dispatch = Globalstate.dispatch;
  const params = useParams();
  const [details, setDetails] = useState({});
  const [loader, setLoader] = useState(false);


  var qty = "quantity";
  var val = 1;
  details[qty] = val;

  // const [clicked, setClicked] = useState(false);
  // function clickHandle() {
  //   setClicked(true);
  // }

  function addtoCart() {
    dispatch({ type: 'ADD', payload: details })

  }
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/${params.id}`
        );
        const data = await response.json();

        setTimeout(() => {
          setDetails(data);
          setLoader(true);
          // console.log(details);

        }, 2000)
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  if (!loader) {
    return (
      <PacmanLoader

        color="rgb(244, 51, 151)"
        cssOverride={{
          left: '42%',
          position: 'absolute',
          textAlign: 'center',
          top: '42%'
        }}
        size={45}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

    );
  }

  return (
    <>
      <Header />
      {/* <div className=" detailsCard"   >
        <div className="details"  >
          <div className="big-img">
            <img src={details.image} alt="" />

          </div>

          <div className="box">
            <div className="row">
              <h2>{details.title}</h2>
            </div>
            <span className="rating" style={{ backgroundColor: details.rating.rate >= 3.5 ? " #23bb75" : "rgb(244, 182, 25) " }}>
              {details.rating.rate} <FaRegStar color="#fff" /> </span>
            <p>{details.description}</p>
            <span>₹{details.price}</span>
            <button className="btn" onClick={addtoCart}>Add to Cart</button>
          </div>
        </div>
      </div> */}


      <main id="single-product">
        <div class="pro-details-container margin-top">
          <div class="left-column">
            <img src={details.image} alt="${title}" />
          </div>
          <div class="right-column">
            <div class="product-description">
              <span>{details.category}</span>
              <div class="pro-rating">
                <span>{details.rating.rate}</span>
              </div>
              <h1>{details.title}</h1>
              <h3></h3>

            </div>
            <div class="product-configuration">
              {details.description}
            </div>
            <div id="single-product-price">
              <h2> <span class="price">₹ {details.price}</span></h2>
              <h2><span class="disscount-single"></span></h2>
            </div>

            <div class="product-price">
              <span></span>
              <div>
                {/* <button class="cart-btn" onClick={addtoCart} id="cart-btn">Add to cart</button> */}
                <button className="btn" onClick={addtoCart}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>

      </main>

    </>
  );
};

export default Productpage;
