import { Link } from "react-router-dom";

/**
 * @returns {HTMLElement} that describes 404 scenaria
 */
export default function Missing() {
  return (
    <section className="missing flex flex-col items-center justify-center py-16">
      <h1 className="error-code text-900 font-black text-primary-orange tracking-[2rem]">404</h1>
      <h2 className="text-500 mb-2 font-medium">Page Not Found</h2>
      <p className="font-medium">Go back to <Link to='/' className="text-neutral-very-dark-blue font-black underline ml-1">Homepage</Link></p>
    </section>
  )
}
