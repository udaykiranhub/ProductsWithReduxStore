
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from './actions/productAction';
import { fetchCategories } from "./actions/categoriesAction";
import { selectProducts, selectCategories } from './selectors';
import { Card, Row, Col, Container, InputGroup, Form, Pagination } from "react-bootstrap";
import "./product.css";//styling to products
const Products = () => {
  const dispatch = useDispatch();//for managing the store 

const [searchParams] = useSearchParams();
 const selectedCategory = searchParams.get('category') || '';
  
const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [manage,setManage]=useState(0);

  //poducts per page 6
  const productsPerPage = 6; 

  const products = useSelector((state)=>{ return state.productData.products });//directly
  const categories = useSelector(selectCategories);
console.log("categories are:",categories);

  const { loading, error } = useSelector((state) => state.productData);
//firsdt
  useEffect(() => {
    dispatch(fetchCategories());//default parameters
    setSearchTerm('');//default empty
      setCurrentPage(1); //default page
        dispatch(fetchProducts(selectedCategory, ''));//sending to the action
        }, [dispatch, selectedCategory]);
//second
console.log("searched item is:",searchTerm);
  useEffect(() => {
    //render every key input
   

const handler = setTimeout(() => {

      dispatch(fetchProducts(selectedCategory, searchTerm));
      
  }, 1000);

//clear the time out ,because it storkes the every key ...
  return () => {
    clearTimeout(handler);
  };
    
  }, [dispatch, selectedCategory, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);//
  const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    
 const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
//by clicking
    setCurrentPage(page);
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    window.history.pushState({}, '', `?category=${selectedValue}`);
    dispatch(fetchProducts(selectedValue, ''));
    setSearchTerm(''); // Clear search term
    setCurrentPage(1); // Reset to first page on category change
  };

  if (loading)
     return <div className='loading'><h3>Loading...</h3></div>;
  if (error) 
    return <div className='loading'><h3>Error:</h3> {error}</div>;

  return (
    <Container>
     <p className='heading'>
     <h1 className="my-4" >Products</h1>
     </p>

      {/* Searching the produc  */}
      <div className='search' >
      <InputGroup className="mb-4">
     
      <Form.Control type="text" placeholder="Search products by title"
         value={searchTerm}  onChange={(e) =>{setSearchTerm(e.target.value)
            
         }}/>
    
      </InputGroup>
      </div>

      {/* Category  */}
      <h4>Select Category</h4>
  <div className='select'>
  <Form.Select className="mb-4" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </Form.Select>
  </div>

      {/* Products  */}
      <Row>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Col xs={12} md={4} className="mb-4" key={product.id}>
             <div className='product'>
             <Card>
                <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text><strong>Price: ${product.price}</strong></Card.Text>
                </Card.Body>
              </Card>
             </div>
            </Col>
          ))
        ) : (
          <p>No products found</p>
        )}
      </Row>

      
       <Pagination className="justify-content-center my-4">
      <Pagination.First 
        onClick={() => handlePageChange(1)} 
        disabled={currentPage === 1} 
      />
      <Pagination.Prev 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
      />
      
      {/* pages numbers*/}
      {[...Array(totalPages)].map((_, index) => (
  <Pagination.Item 
    key={index + 1} 
    active={index + 1 === currentPage} 
    onClick={() => handlePageChange(index + 1)}
  >
    {index + 1}
  </Pagination.Item>
))}

      

      
      <Pagination.Next 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
      />
      <Pagination.Last 
        onClick={() => handlePageChange(totalPages)} 
        disabled={currentPage === totalPages} 
      />
    </Pagination>

    </Container>
  );
};

export default Products;


