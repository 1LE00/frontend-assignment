import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    let [value, setValue] = useState(1);
    /**
     * Set cart items from local storage if it is defined
     * If not initiliaze it as an object with 
     * Keys products ste to empty array and count to zero
     */
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || {
        products: [],
        count: 0
    });

    /* Store cart items to local storage whenever it changes */
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <DataContext.Provider value={{
            value, setValue, cartItems, setCartItems
        }}>
            {children}
        </DataContext.Provider>
    );
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DataContext