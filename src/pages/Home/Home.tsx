import { useState, useEffect } from "react";
import { Product, Loader, SelectInput } from "../../components";
import { AiFillStar } from "react-icons/ai";
import author1 from "../../assets/reviews/author1.jpeg";
import author2 from "../../assets/reviews/author2.jpeg";
import {
  getAllProducts,
  getAllCategories,
} from "../../services/Products/Products.service";
import { useLocation, useNavigate } from "react-router-dom";

interface ProductType {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  quantity?: number;
}

interface BannerType {
  discount: string;
  largeText1: string;
  largeText2: string;
  saleTime: string;
  smallText: string;
  midText: string;
  product: string;
  buttonText: string;
  image: string;
  desc: string;
}

interface OptionType {
  value: string | number;
  title: string;
}

const filterSortOptions = [
  {
    title: "Ascending",
    value: "asc",
  },
  {
    title: "Descending",
    value: "desc",
  },
];

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    []
  );
  const [categoriesOptions, setCategoriesOptions] = useState<OptionType[]>([]);
  const [selectedSort, setSelectedSort] = useState<OptionType>(
    filterSortOptions[0]
  );

  const location = useLocation();
  const navigate = useNavigate();

  const updateQueryParams = (categories: OptionType[], sort: OptionType) => {
    const params = new URLSearchParams();

    if (categories.length > 0) {
      params.set("categories", categories.map((c) => c.value).join(","));
    }
    if (sort) {
      params.set("sort", sort.value as string);
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  const fetchAllProducts = async (limit: any, sort: any, categories: any) => {
    try {
      setLoading(true);

      const products: ProductType[] = await getAllProducts(
        limit,
        sort,
        categories
      );

      if (Array.isArray(products)) {
        setProducts(products);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      setLoading(true);

      const categories = await getAllCategories();

      if (Array.isArray(categories)) {
        const availableCategories = categories.map((item: any) => ({
          title: item,
          value: item,
        }));
        setCategoriesOptions(availableCategories);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newSelected: any) => {
    setSelectedCategories(newSelected);
    updateQueryParams(newSelected, selectedSort);
  };

  const handleSortChange = (newSelected: any) => {
    setSelectedSort(newSelected);
    updateQueryParams(selectedCategories, newSelected);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortParam = params.get("sort");
    const categoryParam = params.get("categories");

    if (sortParam) {
      const foundSort = filterSortOptions.find(
        (opt) => opt.value === sortParam
      );
      if (foundSort) setSelectedSort(foundSort);
    }

    if (categoryParam) {
      const categoryValues = categoryParam.split(",");
      const foundCategories = categoryValues
        .map((value) =>
          categoriesOptions.find((option) => option.value === value)
        )
        .filter(Boolean) as OptionType[];
      setSelectedCategories(foundCategories);
    }
  }, [location.search, categoriesOptions]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    fetchAllProducts(15, selectedSort.value, selectedCategories);
  }, [selectedSort, selectedCategories]);

  console.log("selectedSort", selectedSort);
  console.log("selectedCategories", selectedCategories);
  return (
    <>
      <section className="max-w-7xl mx-auto">
        <div className="text-center my-10 text-gray-500">
          <h2 className="text-3xl font-extrabold md:text-5xl">
            Our Latest Product
          </h2>
        </div>

        <div className="flex items-center justify-end gap-4 px-4">
          <SelectInput
            options={categoriesOptions}
            selectedValues={selectedCategories}
            onChange={handleCategoryChange}
            placeholder="Filter By Categories"
            isMulti={true}
          />

          <SelectInput
            options={filterSortOptions}
            selectedValues={selectedSort}
            onChange={handleSortChange}
            placeholder="Filter By Sort"
          />
        </div>

        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <Loader width="w-14" height="h-14" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 items-center gap-4 mt-5 w-full sm:grid-cols-2 md:grid-cols-3">
            {products?.map((product: any) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        ) : null}

        <div className="testimonial w-full mt-20">
          <h3 className="text-gray-800 text-center text-3xl font-bold">
            What People Say About Us
          </h3>
          <div className="card-container flex flex-col md:flex-row p-5 gap-5">
            <div className="card rounded-2xl flex gap-4 p-5 bg-[#F6F6F6]">
              <div className="img-container">
                <img
                  src={author1}
                  alt="Robert"
                  className="rounded-xl w-[180px] h-[180px]"
                />
              </div>
              <div className="content-container">
                <h2 className="text-xl font-semibold text-[#1E1D1D]">Robert</h2>
                <p className="w-2/3 text-gray-500">
                  Don't waste time just order! This is the best website to
                  purchase smart watches
                </p>
                <p className="flex mt-3">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </p>
              </div>
            </div>

            <div className="card rounded-2xl flex gap-4 p-5 bg-[#F6F6F6]">
              <div className="img-container">
                <img
                  src={author2}
                  alt="Hamza"
                  className="rounded-xl w-[180px] h-[180px]"
                />
              </div>
              <div className="content-container">
                <h2 className="text-xl font-semibold text-[#1E1D1D]">Hamza</h2>
                <p className="w-2/3 text-gray-500">
                  I've been purchasing smart watches of Aryan for a long time.
                  All the products are good quality.
                </p>
                <p className="flex mt-3">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
