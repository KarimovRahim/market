import React from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { products } from './ProductsData';

const ProductCarousel = () => {
  return (
    <div className="w-full py-8">
      <div className="relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          speed={2500}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-[40px] [&_.swiper-pagination]:!bottom-[10px] [&_.swiper-pagination-bullet]:!w-[10px] [&_.swiper-pagination-bullet]:!h-[10px] [&_.swiper-pagination-bullet]:!bg-[#888] [&_.swiper-pagination-bullet]:!opacity-80 [&_.swiper-pagination-bullet]:!mx-[5px] [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet-active]:!opacity-100"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow h-full flex flex-col">
                {/* Бейдж NEW */}
                <div className="relative mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {product.label}
                  </div>
                </div>

                {/* Информация о товаре */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2 h-10">
                    {product.name}
                  </h3>

                  <div className="text-lg font-bold text-gray-900 mb-4">
                    ${product.price}
                  </div>

                  {/* Кнопка Add To Cart */}
                  <Link to={"/Shop"}>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-2 mt-auto">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add To Cart
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper >
      </div>

      {/* Кнопка More Products под каруселью */}
      <div className="text-center mt-8">
        <Link to={"/Shop"}>
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-md transition-colors inline-flex items-center gap-2">
            <span>More Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCarousel;