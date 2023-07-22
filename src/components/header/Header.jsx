import { Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import cart from '../../assets/icons/icon-cart.svg';
import avatar from '../../assets/images/image-avatar.png';
import deleteIcon from '../../assets/icons/icon-delete.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/icon-menu.svg';
import { ReactComponent as Close } from '../../assets/icons/icon-close.svg';

export default function Header() {
    const cartRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isCartClicked, setIsCartClicked] = useState(false);
    const { cartItems, setCartItems } = useContext(DataContext);
    /**
     * Remove overflow from the body when the window size exceeds or equals 768
     * Caused by toggling the navbar in small screens
     */
    useEffect(() => {
        const handleResize = () => {
            if (window.screen.width >= 768) {
                document.body.classList.remove('overflow-hidden');
                setIsClicked(false);
            }
        }
        window.addEventListener('resize', handleResize);
    }, [])
    /**
     * Close the cart if user clicks outside of the cart element
     * Need to inspect why it closes on deletion of item from the cart
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setIsCartClicked(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    /* Toggle navbar in small screens */
    function handleClick() {
        if (window.screen.width <= 768) {
            document.body.classList.toggle('overflow-hidden');
            setIsClicked(previousValue => {
                return !previousValue
            });
        }
    }
    /* Toogle Cart Open/Close */
    function handleCartClick() {
        setIsCartClicked(previousValue => {
            return !previousValue
        });
    }
    /**
     * @param {event} object that creates the event  
     * use that object to get the product id of the item to be deleted
     * @returns list of cart items after deletion of said cart item
     */
    function deleteProduct(event) {
        const dataId = event.target.getAttribute('data-id');
        const fileredCart = cartItems.products.filter(product => product.id !== parseInt(dataId));
        setCartItems(
            {
                count: fileredCart.length,
                products: fileredCart
            }
        );
    }

    return (
        <header className="header flex bg-white shadow-light justify-between items-center md:justify-normal md:gap-20 md:py-0 lg:gap-32 ">
            {/* Icons */}
            <section className="header-left flex gap-6 items-center">
                <Hamburger onClick={handleClick} className='hover:cursor-pointer md:hidden' />
                <Link className='main-logo' to='/'><Logo /></Link>
            </section>
            {/* Nav-Container */}
            <section className={`${isClicked ? 'block' : 'hidden'} nav-container bg-[rgba(0,0,0,0.75)] fixed z-10 inset-0 md:static md:block md:bg-transparent`}>
                {/* Navbar */}
                <nav
                    className={`${isClicked ? 'flex flex-col left-0' : 'hidden'} 
                navbar bg-white relative p-5 max-w-[200px] w-full h-screen z-10 gap-8 -left-[360px] top-0 md:static md:flex md:h-auto md:p-0`}>
                    <Close onClick={handleClick} className='hover:cursor-pointer md:hidden' />
                    {/* Links */}
                    <section className="links flex flex-col gap-4 md:flex-row md:gap-10">
                        <Link className='text-neutral-very-dark-blue font-bold md:text-neutral-dark-grayish-blue md:text-300 md:font-medium md:relative md:overflow-hidden md:py-8 transition-colors md:hover:text-neutral-very-dark-blue md:after:absolute md:after:bg-primary-orange md:after:bottom-0 md:after:left-0 md:after:h-1 md:after:w-0 md:hover:after:w-full md:after:transition-all' to='/' onClick={handleClick}>Home</Link>
                        <Link className='text-neutral-very-dark-blue font-bold md:text-neutral-dark-grayish-blue md:text-300 md:font-medium md:relative md:overflow-hidden md:py-8 transition-colors md:hover:text-neutral-very-dark-blue md:after:absolute md:after:bg-primary-orange md:after:bottom-0 md:after:left-0 md:after:h-1 md:after:w-0 md:hover:after:w-full md:after:transition-all ' to='/search' onClick={handleClick}>Search</Link>
                    </section>
                    {/* Links */}
                </nav>
            </section>
            {/* Header-right */}
            <section className="header-right flex gap-3 items-center min-[375px]:gap-6 md:gap-12 md:justify-end md:ml-auto">
                {/* Cart */}
                <section className="cart relative" ref={cartRef} >
                    {/* Cart Number */}
                    {cartItems.count > 0 && <span className={"cart-number bg-primary-orange rounded-lg text-white text-[0.5rem] font-bold py-[1px] px-[5px] absolute -right-[5px] -top-[9px]"}>{cartItems.count}</span>}
                    <img src={cart} id="cart" alt="Cart button" title="Cart" className='hover:cursor-pointer' onClick={handleCartClick} />
                    {/* Cart Content */}
                    <section className={`cart-content ${isCartClicked ? '-right-12  md:-right-[100px]' : 'hidden'} flex flex-col bg-white rounded-lg shadow-[4px_4px_10px_rgba(0,0,0,.15)] m-2 max-w-[305px] absolute top-12 z-[2] md:top-10 min-[320px]:w-[275px] min-[375px]:w-[320px]`}>
                        <h4 className='text-200 border-b-2 border-solid border-neutral-grayish-blue border-opacity-50 p-5 font-semibold'>Cart</h4>
                        {/* Cart Empty */}
                        {!cartItems.count ?
                            <section className="cart-empty grid place-items-center h-[143px]">
                                <span>Your cart is empty.</span>
                            </section>
                            :
                            <section className="cart-body flex flex-col py-5 gap-4 max-h-96 overflow-auto">
                                {/* Cart Body */}
                                {cartItems.products.map(item => {
                                    return <section key={item.id} className="item flex w-100 gap-4 px-5 bg-white hover:cursor-pointer hover:bg-neutral-grayish-blue  hover:bg-opacity-10 ">
                                        {/* Cart Image */}
                                        <section className="cart-img w-10 flex-shrink-0 flex-grow-0">
                                            <img src={item.image} id={`item-${item.id}`} alt={item.title} title={item.title} className='rounded-md ' />
                                        </section>
                                        {/* Cart Description */}
                                        <section className="item-description flex flex-col flex-grow">
                                            {/* Cart Title */}
                                            <h4 className='text-black font-bold text-xs text-400 leading-5 break-all'>{item.title.length > 100 ? item.title.slice(0, 100) + '...' : item.title}</h4>
                                            {/* Cart Pricing */}
                                            <section className="cart-calculation flex gap-1 items-center">
                                                <span className="rate text-neutral-dark-grayish-blue text-100">{`$ ${item.rate}`}</span>
                                                <span className='multiply text-neutral-dark-grayish-blue text-100'>x</span>
                                                <span className="quantity text-neutral-dark-grayish-blue text-100">{item.quantity}</span>
                                                <span className="equals text-neutral-dark-grayish-blue text-100">=</span>
                                                <span className="total text-black font-medium text-100 ">{`$ ${item.total.toFixed(2)}`}</span>
                                            </section>
                                        </section>
                                        {/* Cart Delete */}
                                        <section className="del-img flex-shrink-0 flex-grow-0 hover:cursor-pointer self-center" data-id={item.id} onClick={deleteProduct}>
                                            <img src={deleteIcon} id="delete" alt="Delete" title="Delete this item from cart" data-id={item.id} />
                                        </section>
                                    </section>
                                })}
                                {/* Cart Body */}
                            </section>}
                    </section>
                </section>
                {/* Avatar */}
                <div className="avatar aspect-square w-6 rounded-full border-2 border-solid border-transparent md:w-10 md:hover:border-primary-orange md:hover:cursor-pointer transition-colors">
                    <img src={avatar} id="avatar" alt="Avatar icon" title="Avatar" />
                </div>
            </section>
        </header>
    );
}