import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DataContext from "../../context/DataContext";
import { useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as Minus } from "../../assets/icons/icon-minus.svg";
import { ReactComponent as Plus } from "../../assets/icons/icon-plus.svg";
import { ReactComponent as Cart } from "../../assets/icons/icon-cart-white.svg";
import { ReactComponent as Arrow } from '../../assets/icons/arrow-left-long-solid.svg';

export default function Details() {
    const [fetchData, setFetchData] = useState(true);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const API_URL = `https://fakestoreapi.com/products/${id}`;

    const { value, setValue, setCartItems } = useContext(DataContext);

    /**
     *  for some reason it stays where it is when a product is 
     *  clicked in the home page so need to scroll to (0,0)
     */
    useEffect(() => {
        window.scrollTo(0, 0);
        // Make the value for quantity equal to 1 during first render 
        setValue(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * @throws {Error} If id is null or if is not in range of 1-20
     * @returns {Object} Details of a specific product 
     */
    const fetchProducts = async () => {
        if (id === null) {
            setFetchData(false);
            throw new Error('Product ID not defined');
        } else {
            if (parseInt(id) > 21 || parseInt(id) === 0) {
                setFetchData(false);
                throw new Error(`We don't have a product with id ${id}`);
            } else {
                const response = await axios.get(API_URL);
                return response.data;
            }
        }
    }
    /**
     *  Set enabled to false to disable automatic refetching when id is not passed
     *  or when it is not in the range of 1-20
     */
    const { isLoading, error, data } = useQuery(['product', id], fetchProducts, {
        enabled: fetchData
    });
    /**
     * @param {error} Error occured during fetching
     * @returns {HTMLElement} The HTML element representing the error message  
     */
    if (error) {
        return <>
            <section style={{ padding: 'var(--padding-inline)' }} className="error">
                <p>Oops!</p>
                <p className="font-semibold text-red-600">{error.message}</p>
                <p>Go back to <Link to='/' className="font-medium capitalize decoration-solid underline">homepage</Link></p>
            </section>
        </>
    }
    /**
     * Increments the value of quantity of item 
     * Limit is set to 10 so that there won't be more than 10 products added at a time
     */
    function handleIncrement() {
        if (value !== 10) {
            setValue(value + 1);
        }
    }
    /**
     * Decrements the value of quantity of item 
    */
    function handleDecrement() {
        if (value !== 1) {
            setValue(value - 1);
        }
    }
    /**
     * Adds the item to the cart
     * If the item already exist, it updates the quantity andt total price of the item
     */
    function addToCart() {
        setCartItems((prevCartItems) => {
            const productExists = prevCartItems.products.some((product) => product.id === data?.id);
            if (productExists) {
                return {
                    ...prevCartItems,
                    products: prevCartItems.products.map((product) => {
                        if (product.id === data?.id) {
                            return {
                                ...product,
                                quantity: product.quantity + value,
                                total: value * data?.price,
                            };
                        }
                        return product;
                    }),
                };
            } else {
                return {
                    products: [
                        ...prevCartItems.products,
                        {
                            id: data?.id,
                            title: data?.title,
                            quantity: value,
                            rate: data?.price,
                            total: value * data?.price,
                            image: data?.image
                        },
                    ],
                    count: prevCartItems.products.length + 1,
                };
            }
        });
    }

    return (
        <section className="details-container lg:flex flex-col items-center">
            {/* Go Back to Homepage */}
            {isLoading ?
                /* Skeletons */
                <section className="animate-pulse mb-12 lg:self-start">
                    <section className="bg-gray-200 h-10 w-28 mb-2 rounded-md"></section>
                </section>
                /* Skeletons */
                :
                <Link to='/' title="Go back to Homepage"
                    className="go-back group flex gap-2 text-100 py-[0.6rem] px-[1.5rem] items-center w-28 bg-light-mode-bg shadow-light rounded-md mb-9 lg:self-start hover:bg-primary-orange transition-colors duration-[500ms] ease-in">
                    <Arrow className='group-hover:fill-white transition-colors duration-[500ms] ease-out' />
                    <b className="back text-neutral-very-dark-blue group-hover:text-white transition-colors duration-[500ms] ease-out">Back</b>
                </Link>}
            {/* Go Back to Homepage */}

            <section className="details w-full flex flex-col gap-8 md:flex-row justify-between max-w-5xl items-center xl:justify-center xl:gap-32 mb-12">
                {/* Product-Image */}
                <section className="img-holder self-center w-full md:w-[50%] max-w-sm">
                    {isLoading ?
                        /* Skeletons */
                        <section className="animate-pulse">
                            <section className="bg-gray-200 h-64 w-full rounded-md mb-2"></section>
                        </section>
                        /* Skeletons */
                        : <img src={data?.image} alt={data?.title} title={data?.title} className="max-w-sm w-full" />
                    }
                </section>
                {/* Right Container */}
                <section className="right-container w-full flex flex-col gap-8 md:w-[50%] md:max-w-[29rem] ">
                    {/* Details of Product */}
                    <section className="details-content flex flex-col gap-4">
                        {isLoading ?
                            /* Skeletons */
                            <section className="animate-pulse">
                                <section className="bg-gray-200 h-8 w-40 rounded-[4px]"></section>
                            </section>
                            /* Skeletons */
                            :
                            /* Category-Section */
                            <section className="category uppercase w-max font-black tracking-[4px] text-100 text-primary-orange">
                                {data?.category}
                            </section>
                        }
                        {isLoading ?
                            /* Skeletons */
                            <section className="animate-pulse">
                                <section className="bg-gray-200 h-4 rounded-[4px] w-full mb-2"></section>
                                <section className="bg-gray-200 h-4 rounded-[4px] w-3/4 mb-2"></section>
                                <section className="bg-gray-200 h-4 rounded-[4px] w-1/2"></section>
                            </section>
                            /* Skeletons */
                            :
                            /* Title of the product */
                            <h2 className="title text-neutral-very-dark-blue font-black text-500">{data?.title}</h2>
                        }
                        {isLoading ?
                            /* Skeletons */
                            <section className="animate-pulse">
                                <section className="bg-gray-200 rounded-[4px] h-4 w-full mb-2"></section>
                                <section className="bg-gray-200 rounded-[4px] h-4 w-full mb-2"></section>
                                <section className="bg-gray-200 rounded-[4px] h-4 w-full mb-2"></section>
                                <section className="bg-gray-200 rounded-[4px] h-4 w-full mb-2"></section>
                                <section className="bg-gray-200 rounded-[4px] h-4 w-3/4 mb-2"></section>
                                <section className="bg-gray-200 rounded-[4px] h-4 w-1/2"></section>
                            </section>
                            /* Skeletons */
                            :
                            /* Product-Description */
                            <p className="description text-100 text-neutral-dark-grayish-blue">{data?.description}</p>
                        }
                        {isLoading ?
                            /* Skeletons */
                            <section className="animate-pulse">
                                <section className="bg-gray-200 h-8 w-24 rounded-[4px]"></section>
                            </section>
                            /* Skeletons */
                            :
                            /* Product Price */
                            <section className="price flex gap-2 text-500 font-semibold">
                                <b className="text-primary-orange">$</b>
                                <strong className="text-neutral-very-dark-blue">{data?.price}</strong>
                            </section>
                        }
                    </section>
                    {/* Product-Footer */}
                    <footer className='section-footer flex flex-col flex-wrap gap-8 sm:flex-row'>
                        {isLoading ?
                            /* Skeletons */
                            <section className="animate-pulse flex flex-wrap">
                                <section className="bg-gray-200 h-12 w-full rounded-md sm:w-56"></section>
                            </section>
                            /* Skeletons */
                            :
                            /* Calculations */
                            <section className="calculation flex items-center gap-5 bg-neutral-100 rounded-md sm:w-56 ">
                                {/* Minus */}
                                <button className="p-4 hover:bg-primary-pale-orange h-11 rounded-l-md lg:h-full" onClick={handleDecrement}>
                                    <Minus className='select-none' />
                                </button>
                                {/* Quantity */}
                                <section className="number flex-grow text-center font-medium">{value}</section>
                                {/* Plus */}
                                <button className="p-4 hover:bg-primary-pale-orange rounded-r-md lg:h-full" onClick={handleIncrement}>
                                    <Plus className='select-none' />
                                </button>
                            </section>
                        }
                        {isLoading ?
                            /* Skeletons */
                            <section className="animate-pulse">
                                <section className="bg-gray-200 h-12 w-full rounded-md sm:w-52"></section>
                            </section>
                            /* Skeletons */
                            :
                            /* Add to Cart */
                            <section
                                className="add-to-cart bg-primary-orange text-white flex gap-2 justify-center p-4 rounded-md sm:w-52 hover:cursor-pointer hover:bg-opacity-75 transition"
                                onClick={addToCart}>
                                <Cart /> <b>Add to cart</b>
                            </section>
                        }
                    </footer>
                </section>
            </section>
        </section>
    )
}
