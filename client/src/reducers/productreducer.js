

const initialState = {
    categories: [],
    products: [],
    loading: false,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'c-Request':
      case 'p-Request':
        return { ...state, loading: true, error: null };
  
      case 'c-Success':
        return { ...state, loading: false, categories: action.payload };
  
      case 'p-Success':
        return { ...state, loading: false, products: action.payload };
  
      case 'c-Failure':
      case 'p-Failure':
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  
  