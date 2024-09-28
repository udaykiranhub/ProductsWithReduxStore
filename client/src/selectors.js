
export const selectProducts = (state) => state.productData.products || []; 
export const selectCategories = (state) => state.productData.categories || [];
console.log("selectrs:",selectCategories,selectProducts)