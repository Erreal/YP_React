import React, { useContext, useState, createContext, useEffect } from 'react';
import { API_URL } from './constants';
import { requestData } from './requestApi';

export const Basket = createContext({});
const IngredientContext = createContext([]);
export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const dataUrl = `${API_URL}/ingredients`;
  useEffect(() => {
    requestData(dataUrl)
      .then((data) => {
        if (data.success) {
          setIngredients(data.data);
        } else {
          console.error('Server failed request');
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <IngredientContext.Provider
      // Add required values to the value prop within an object (my preference)
      value={{ ingredients }}
    >
      {children}
    </IngredientContext.Provider>
  );
};
export function useAPI() {
  const context = useContext(IngredientContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
