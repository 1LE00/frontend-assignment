import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export default function Product({ id, title, image, price }) {
    const navigate = useNavigate();
    /**
     * Navigate the user to product details page when the user clicks on the product
     * in the home page or search page
     */
    const handleProductClick = () => {
        navigate(`/products?id=${id}`);
    }

    return (
        <section
            className={`product product-${id} bg-white shadow-light rounded-lg max-w-250 min-w-250 hover:cursor-pointer`}
            onClick={handleProductClick}
            title='Click to view details'>
            <section className='product-image-holder max-w-250 min-w-250 h-40 hover:cursor-pointer'>
                <img src={image} alt={title} title={title} loading='lazy' className="h-full mx-auto p-5 transition-all" />
            </section>
            <section className={`product-content flex flex-col p-4 gap-4 text-left`}>
                <dl className='name flex text-200 text-neutral-dark-grayish-blue gap-1 min-[604px]:min-h-[40.8px]'>
                    {/* Limit the title to 50 lengths of characters */}
                    <dd className='value' title={title}>{title.trim().length >= 50 ? title.slice(0, 50) + '...' : title}</dd>
                </dl>
                <dl className='price flex text-200 text-neutral-dark-grayish-blue gap-1'>
                    <dd className='value'>{`$ ${price}`}</dd>
                </dl>
            </section>
        </section>
    )
}

Product.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}
