

export const fetchProducts = (category = '', searchTerm = '') => async (dispatch) => {
  console.log("category is:",category)
  console.log('Search is:',searchTerm)
  dispatch({ type: 'p-Request' });
  try {
    const response = await fetch(`https://dummyjson.com/products${category ? `/category/${category}` : ''}`);
    const data = await response.json();

    const filteredProducts = data.products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch({ type: 'p-Success', payload: filteredProducts });
  } catch (error) {
    dispatch({ type: 'p-Failure', payload: error.message });
  }
};
