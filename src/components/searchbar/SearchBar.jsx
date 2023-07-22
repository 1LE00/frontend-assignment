import { useEffect, useRef, useState } from "react";
import Product from "../product/Product";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchresults] = useState([]);
    const [filteredSearch, SetFilteredSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputField = useRef();
    const [error, setError] = useState('');
    const API_URL = 'https://fakestoreapi.com/products';
    /**
     * 
     * @param {e} event generated when form is submitted 
     * @returns {Error} if the search input is empty and if the product name is not found in the api
     * @returns {Array} Array of product objects if the search input is not empty
     */
    const handleSubmit = (e) => {
        setIsLoading(true)
        e.preventDefault();
        if (inputField.current.value === '') {
            setError('Please type the name of the product you would like to search');
            SetFilteredSearch([]);
            setIsLoading(false)
            return
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setSearchresults(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts()
    }

    /**
     * If the search input matches the title of any products returned from fetchproducts function
     * @returns {Array} Array of products that matches the search
     * If the search input doesn't match any of the title
     * @returns {Array} An empty array 
     */
    useEffect(() => {
        if (inputField.current.value.length !== 0) {
            const result = searchResults.filter(result => (result.title.toLowerCase()).includes(search.toLowerCase()));
            if (result.length === 0) {
                setError(true);
                SetFilteredSearch([]);
                return
            }
            SetFilteredSearch(result);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults])
    return (
        <>
            <section className="searchbar max-w-screen-sm">
                <h1 className="text-neutral-very-dark-blue text-300 mb-3 font-medium md:text-500">Search for a product</h1>
                <form
                    name="searchForm"
                    onSubmit={handleSubmit}>
                    <label htmlFor="search" className="sr-only">Search for a product</label>
                    <input
                        type="text"
                        name="q"
                        ref={inputField}
                        id="search"
                        autoComplete="off"
                        placeholder="Search for a product"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setError('');
                        }}
                        className="p-5 w-full border border-solid rounded focus-within:placeholder:text-100 placeholder:text-400" />
                    {error && <p className="text-red-600 text-200 mt-2 font-medium">{error}</p>}
                </form>
                {/* Display when searching for a product that doesn't exist */}
                {error && error !== 'Please type the name of the product you would like to search' &&
                    <h3 className="mt-4 err">{`${filteredSearch.length} Results found`}</h3>
                }
                {/* Display when the searched products are found */}
                {filteredSearch.length > 0 && <h3 className="mt-4">{`${filteredSearch.length} Results found`}</h3>}
            </section>
            <section className="products flex gap-12 flex-wrap justify-center min-[1506px]:justify-normal min-[1506px]:gap-8">
                {isLoading ?
                    <>
                        {/* Skeletons */}
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                        </section>
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                        </section>
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                        </section>
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                        </section>
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                        </section>
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                        </section>
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                        </section>
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                        </section>
                        {/* Skeletons */}
                    </>
                    :
                    filteredSearch.sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase())).map(product =>
                        <Product
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                        />)
                }
            </section>
        </>
    )
}
