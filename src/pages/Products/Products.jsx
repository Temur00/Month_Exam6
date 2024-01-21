import React, { useEffect, useState } from "react";
import "./Products.scss";
import { Navigate, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
// import productsData from "../../../db.json";
import { Form } from "react-bootstrap";

// Edit

import "axios";

import axios from "axios";

const AllProducts = ({ user, setEditing }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searched, setSearched] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/products`);
      const str = await res.data;
      setProducts(str);
    } catch (error) {
      console.log(error);
    }
  };

  // const done = useNavigate();

  // const fetchProducts = () => {
  //   try {
  //     setProducts(productsData.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setSearched(e.target.value);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const searchedProducts = searched
    ? filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searched.toLowerCase()) ||
          product.description.toLowerCase().includes(searched.toLowerCase()) ||
          product.brand.toLowerCase().includes(searched.toLowerCase()) ||
          product.category.toLowerCase().includes(searched.toLowerCase())
      )
    : filteredProducts;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product? ❌")) {
      axios
        .delete(`http://localhost:3000/products/${id}`)
        .then((res) => {
          console.log("Product deleted succesfully ✅", res.data);
        })
        .catch((error) => {
          console.log("The product was not deleted ❌");
        });
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="all-things">
        <div className="up-part d-flex justify-content-between">
          <p className="all-products">All products</p>
          <Form.Control
            className="search-input w-25"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
          <select
            name="selectedCategory"
            className="form-select w-25 h-25"
            onChange={handleCategory}
            value={selectedCategory}
          >
            <option value="all">All</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
            <option value="groceries">Groceries</option>
            <option value="home-decoration">Home-decoration</option>
          </select>
        </div>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th className="product-name">Name</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchedProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td className="product-name">{product.title}</td>
                <td className="descrp">{product.description}</td>
                <td className="brand">{product.brand}</td>
                <td className="price">{product.price}</td>
                <td className="disc-price">{product.discountPercentage}</td>
                <td>{product.category}</td>
                <td className="actions d-flex">
                  <button onClick={AllProducts}>
                    <img src="edit.png" alt="img" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    <img src="delete.png" alt="img" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="text-center">
        <button className="w-25 btn btn-success">Add Product</button>
      </div>
    </div>
  );
};

export default AllProducts;
