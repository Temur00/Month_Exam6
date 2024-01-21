import React, { useEffect, useState } from "react";
import "./Products.scss";
import { Link, Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { Form } from "react-bootstrap";
import axios from "axios";

const ITEMS_PER_PAGE = 3;

const AllProducts = ({ user, setEditing }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searched, setSearched] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/products`);
      const str = await res.data;
      setProducts(str);
    } catch (error) {
      console.log(error);
    }
  };

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

  // Pagination
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = searchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(searchedProducts.length / ITEMS_PER_PAGE);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product? ❌")) {
      axios
        .delete(`http://localhost:3000/products/${id}`)
        .then((res) => {
          console.log("Product deleted successfully ✅", res.data);
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
            {currentProducts.map((product) => (
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
                  <button onClick={() => setEditing(product.id)}>
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
        <div className="d-flex justify-content-center">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
      <div className="text-center">
        <Link to={"/AddProducts"}>
          <button className="w-25 mt-5 btn btn-success">Add Product</button>
        </Link>
      </div>
    </div>
  );
};

export default AllProducts;
