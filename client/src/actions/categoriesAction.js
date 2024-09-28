

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch({ type: 'c-Request' });
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      
      const data = await response.json();
      console.log('Fetched categories:', data[0].slug); 
      dispatch({ type:'c-Success', payload: data });
    } catch (err) {
      dispatch({ type:'c-Failure', payload: err.message });
    }
  };
};
