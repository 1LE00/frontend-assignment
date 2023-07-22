import axios from "axios";
import Product from "../product/Product";
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const [products, setProducts] = useState([]);
    const API_URL = 'https://fakestoreapi.com/products';

    /**
     * @returns {Object} List of 20 product items
     */
    const fetchProducts = async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }

    const { isLoading, error, data } = useQuery(['products'], fetchProducts);
    /* Set products after the data has been received from useQuery */
    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data])
    /**
     * @param {error} Error occured during fetching
     * @returns {HTMLElement} The HTML element representing the error message  
     */
    if (error) {
        return <>
            <section style={{ padding: 'var(--padding-inline)' }}>
                <p className="font-semibold text-red-800">{error.message}!!!</p>
                <p className="font-semibold text-red-600">{`Couldn't fetch products from the server. Please try again later.`}</p>
            </section>
        </>
    }

    return <>
        {isLoading
            ?
            <>
                {/* Skeletons */}
                <section className="animate-pulse" style={{ paddingInline: 'var(--padding-inline)', paddingBlockStart: '3rem' }}>
                    <section className="bg-gray-200 h-8 w-60 rounded-[4px]"></section>
                </section>
                <section className="products py-12 flex gap-12 flex-wrap justify-center min-[1506px]:justify-normal min-[1506px]:gap-8">
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
                    <section className="animate-pulse">
                        <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                    </section>
                    <section className="animate-pulse">
                        <section className="bg-gray-200 h-72  shadow-light rounded-lg max-w-250 min-w-250"></section>
                    </section>
                </section>
                {/* Skeletons */}
            </>
            :
            <>
                <h1 className="font-bold text-500 pt-12" style={{ paddingInline: 'var(--padding-inline)' }}>List of Our Products</h1>
                <section className="products py-12 flex gap-12 flex-wrap justify-center min-[1506px]:justify-normal min-[1506px]:gap-8">
                    {products.sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase())).map(product =>
                        <Product
                            key={product.id}
                            loading={isLoading}
                            id={product.id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                        />)
                    }
                </section>
            </>}
    </>
}
