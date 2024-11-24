import { Link } from "react-router-dom";

type HeroBannerProps = {
  heroBanner: {
    smallText: string;
    midText: string;
    largeText1: string;
    product: string;
    buttonText: string;
    image?: any;
  };
};

const HeroBanner: React.FC<HeroBannerProps> = ({ heroBanner }) => {
  return (
    <div className="text-white bg-black py-24 px-10 relative w-full">
      <div>
        <p className="text-2xl">{heroBanner.smallText}</p>
        <h3 className="text-6xl mt-4">{heroBanner.midText}</h3>
        <h1 className="text-9xl uppercase mt-4">{heroBanner.largeText1}</h1>

        {/* <img
          src={urlFor(heroBanner.image)}
          alt="Product"
          className="hero-banner-image hidden md:block"
        /> */}

        <div className="mt-5">
          <Link to={`/product/${heroBanner.product}`}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {heroBanner.buttonText}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
