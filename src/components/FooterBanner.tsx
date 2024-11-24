import { Link } from "react-router-dom";

// Define the type for the footerBanner prop
type FooterBannerProps = {
  footerBanner: {
    discount: string;
    largeText1: string;
    largeText2: string;
    saleTime: string;
    smallText: string;
    midText: string;
    product: string;
    buttonText: string;
    image: any; // Replace `any` with the proper type if the `image` structure is known
    desc: string;
  };
};

const FooterBanner: React.FC<FooterBannerProps> = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div className="py-20 px-10 bg-gray-400 rounded-2xl relative text-black w-full mt-20">
      <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:justify-between">
        <div className="left">
          <h3 className="font-extrabold text-7xl">{largeText1}</h3>
          <h3 className="font-extrabold text-7xl">{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        {/* <img
          src={urlFor(image)}
          alt="Footer Banner"
          className="w-2/3 md:absolute md:w-2/6 -top-1/4 left-[22rem]"
        /> */}

        <div className="right">
          <h3 className="font-extrabold text-7xl">{midText}</h3>
          <p>{desc}</p>
          <Link to={`/product/${product}`}>
            <button className="relative mt-5 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {buttonText}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
