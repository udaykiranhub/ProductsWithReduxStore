

const initialState = {
  categories: [],
  loading: false,
  error: null,
};
console.log("reducer for the category");
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'c-Request':
      return {...state,loading: true,error: null,};
    case 'c-Success':
      console.log("sucess"); return { ...state, loading: false,categories: action.payload,  };
    case 'c-Failure':
      return { ...state, loading: false, error: action.payload, };
    default:
      return state;
  }
};

export default categoryReducer;
console.log("category reducer!");
