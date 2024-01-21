import React, { useEffect, useState } from "react";
import "./AddProducts.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
// import axios from "axios";

const AddProducts = ({ user }) => {
  const [post, setPost] = useState([
    {
      title: "",
      description: "",
      brand: "",
      price: "",
      discountPercentage: "",
      category: "",
    },
  ]);

  const addNew = async () => {
    try {
      const response = await axios.post("http://localhost:3000/products", post);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <div className="all-inputs">
        <p>Main</p>
        <div className="inline-inputs">
          <label className="inp-name mb-2 text-center justify-content-center">
            <p>Name</p> <p>*</p>
          </label>
          <input
            type="name"
            id="title"
            className="form-control w-75 mb-3"
            required
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            value={post.title}
            name="title"
          />

          <div className="inp-price-others d-flex justify-content-between mb-4">
            <div>
              <label className="mb-3">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                className="form-control"
                required
                onChange={(e) => setPost({ ...post, price: e.target.value })}
                value={post.price}
              />
            </div>
            <div>
              <label className="mb-4">Discount price</label>
              <input
                type="text"
                name="discountPercentage"
                id="discountPercentage"
                className="form-control"
                required
                onChange={(e) =>
                  setPost({ ...post, discountPercentage: e.target.value })
                }
                value={post.discountPercentage}
              />
            </div>
          </div>

          <div className="d-block">
            <label className="inp-desc mb-1 text-center justify-content-center">
              <p>Description</p> <p>*</p>
            </label>
            <textarea
              name="description"
              id="description"
              cols="108"
              rows="2"
              className="text-area p-2 mb-3"
              required
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              value={post.description}
            ></textarea>
          </div>
          <div className="inp-brand-others d-flex justify-content-between gap-5">
            <div>
              <label className="mb-1 d-flex gap-1">
                <p>Brand</p> <p>*</p>
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="form-control"
                required
                onChange={(e) => setPost({ ...post, brand: e.target.value })}
                value={post.brand}
              />
            </div>
            <div className="w-75">
              <label className="mb-3 pt-2">Category</label>
              <select
                name="category"
                id="category"
                className="w-25 p-2"
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                value={post.category}
              >
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skincare</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home-decoration</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <Link to="/">
          <button type="submit" onClick={addNew}>
            Save
          </button>
        </Link>
        <button>Cancel</button>
      </footer>
    </div>
  );
};

export default AddProducts;
