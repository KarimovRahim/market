import React from 'react'
import MusicExperienceSwiper from '../components/MusicExperienceSwiper.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import CountdownTimer from '../components/CountDownTimer.jsx';
import { products } from '../components/ProductsData.jsx';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SiApple } from 'react-icons/si';
import { Link } from 'react-router-dom';
import 'swiper/css/pagination';
import 'swiper/css';

import HeadPhones from '../assets/HeadPhones.png';
import computer from '../assets/computer.png';
import camera from '../assets/camera.png';
import gaming from '../assets/gaming.png';
import phones from '../assets/phone.png';
import watch from '../assets/watch.png';
import music from '../assets/music.png';
import back2 from '../assets/back2.jpg';
import back4 from '../assets/back4.png';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import back from '../assets/back.png';
import img1 from '../assets/img1.jpg';

const Home = () => {
  const data = [
    {
      id: 1,
      categorys: "Phones",
      img: phones,
      color: "text-gray-900",
    },
    {
      id: 2,
      categorys: "Computers",
      img: computer,
      color: "text-gray-900",
    },
    {
      id: 3,
      categorys: "Smart Watch",
      img: watch,
      color: "text-gray-900",
    },
    {
      id: 4,
      categorys: "Camera",
      img: camera,
      back: "bg-red-600",
      color: "text-white",
    },
    {
      id: 5,
      categorys: "Head Phones",
      img: HeadPhones,
      color: "text-gray-900",
    },
    {
      id: 6,
      categorys: "Gaming",
      img: gaming,
      color: "text-gray-900",
    },
  ]

  return (
    <div className="w-full flex flex-col items-center px-3 sm:px-4 md:px-6">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 md:gap-8 items-start mt-4 md:mt-6 lg:mt-8 mb-8 md:mb-12 lg:mb-16">
        <div className="w-full lg:w-1/4 bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 lg:sticky lg:top-6">
          <h3 className="font-semibold text-lg md:text-xl text-gray-900 mb-3 md:mb-4">Categories</h3>
          <div className="flex flex-col gap-2 md:gap-3">
            {["Woman's Fashion", "Men's Fashion", "Electronics", "Home & Lifestyle", "Medicine", "Sports & Outdoor", "Baby's & Toys", "Groceries & Pets", "Health & Beauty"].map((category, index) => (
              <label key={index} className="font-normal text-sm md:text-base text-gray-700 hover:text-red-600 cursor-pointer transition-colors py-1">
                {category}
              </label>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-3/4 bg-black rounded-lg md:rounded-xl overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            speed={1000}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="h-full [&_.swiper-pagination]:!bottom-3 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!h-2 md:[&_.swiper-pagination-bullet]:!w-3 md:[&_.swiper-pagination-bullet]:!h-3 [&_.swiper-pagination-bullet]:!bg-gray-400 [&_.swiper-pagination-bullet]:!opacity-80 [&_.swiper-pagination-bullet]:!mx-1 [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet-active]:!opacity-100"
          >
            {[1, 2, 3, 4, 5].map((slide) => (
              <SwiperSlide key={slide}>
                <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 lg:p-8">
                  <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex items-center gap-3 md:gap-4">
                      <SiApple className="text-3xl md:text-4xl lg:text-5xl text-white" />
                      <label className="font-normal text-sm md:text-base lg:text-lg text-white">iPhone 14 Series</label>
                    </div>
                    <label className="font-semibold text-3xl md:text-4xl lg:text-5xl text-white mt-4 md:mt-6">
                      Up to 10% <br /> off Voucher
                    </label>
                    <Link 
                      to="/shop" 
                      className="w-fit font-medium text-sm md:text-base text-white mt-4 md:mt-6 pb-1 border-b border-gray-400 hover:border-white transition-colors"
                    >
                      Shop now →
                    </Link>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-4 md:mt-0">
                    <img 
                      src={img1} 
                      alt="iPhone 14" 
                      className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col mt-8 md:mt-12 lg:mt-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 md:w-3 h-6 md:h-8 bg-red-600 rounded"></div>
          <label className="font-semibold text-sm md:text-base text-red-600">Today's</label>
        </div>
        <div className="flex flex-col p-[20px] gap-[40px] sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 md:mb-8 lg:mb-12">
          <label className="font-semibold text-2xl md:text-3xl lg:text-4xl text-gray-900">Flash Sales</label>
          <CountdownTimer />
        </div>
      </div>

      <div className="w-full bg-gray-50 py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-6xl">
          <ProductCarousel />
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col mt-8 md:mt-12 lg:mt-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 md:w-3 h-6 md:h-8 bg-red-600 rounded"></div>
          <label className="font-semibold text-sm md:text-base text-red-600">Categories</label>
        </div>
        <label className="font-semibold text-2xl md:text-3xl lg:text-4xl text-gray-900 mt-2 md:mt-4">Browse by Category</label>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 lg:gap-6 mt-6 md:mt-8">
        {data.map((item) => (
          <div 
            key={item.id} 
            className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-lg md:rounded-xl transition-all hover:shadow-lg ${item.back || 'bg-white'} border border-gray-100`}
          >
            <img 
              src={item.img} 
              alt={item.categorys} 
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
            />
            <label className={`font-medium text-xs md:text-sm lg:text-base ${item.color} mt-3 md:mt-4 text-center`}>
              {item.categorys}
            </label>
          </div>
        ))}
      </div>

      <div className="w-full mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 lg:mb-20">
        <MusicExperienceSwiper musicImage={music} />
      </div>

      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="bg-white rounded-lg md:rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  {product.label}
                </div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6 md:mt-8 lg:mt-10">
        <Link to="/Shop">
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 md:py-3 px-6 md:px-8 rounded-lg transition-colors inline-flex items-center gap-2">
            <span className="text-sm md:text-base">More Products</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </Link>
      </div>

      <div className="w-full max-w-6xl flex flex-col mt-8 md:mt-12 lg:mt-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 md:w-3 h-6 md:h-8 bg-red-600 rounded"></div>
          <label className="font-semibold text-sm md:text-base text-red-600">Featured</label>
        </div>
        <label className="font-semibold text-2xl md:text-3xl lg:text-4xl text-gray-900 mt-2 md:mt-4">New Arrival</label>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
        <div className="bg-black rounded-lg md:rounded-xl overflow-hidden h-64 md:h-80 lg:h-96 relative"
          style={{
            backgroundImage: `url(${back})`,
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 lg:left-8 w-full md:w-2/3 lg:w-1/2">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 md:p-6">
              <label className="font-semibold text-lg md:text-xl lg:text-2xl text-white">Play Station 5</label>
              <label className="font-medium text-xs md:text-sm text-white/90 mt-2 md:mt-3 block">
                Black and White version of the PS5 coming out on sale.
              </label>
              <Link 
                to="/shop" 
                className="inline-block font-medium text-sm md:text-base text-white mt-3 md:mt-4 pb-1 border-b border-gray-400 hover:border-white transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-gray-900 rounded-lg md:rounded-xl overflow-hidden h-60 md:h-64 relative"
            style={{
              backgroundImage: `url(${back2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute bottom-4 left-4 w-full md:w-3/4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 md:p-4">
                <label className="font-semibold text-base md:text-lg text-white">Women's collection</label>
                <label className="font-medium text-xs md:text-sm text-white/90 mt-1 md:mt-2 block">
                  Featured woman collections that give you another vibe.
                </label>
                <Link 
                  to="/shop" 
                  className="inline-block font-medium text-xs md:text-sm text-white mt-2 md:mt-3 pb-1 border-b border-gray-400 hover:border-white transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg md:rounded-xl overflow-hidden h-60 md:h-64 relative"
            style={{
              backgroundImage: `url(${back4})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute bottom-4 left-4 w-full md:w-3/4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 md:p-4">
                <label className="font-semibold text-base md:text-lg text-white">Speakers</label>
                <label className="font-medium text-xs md:text-sm text-white/90 mt-1 md:mt-2 block">
                  Amazon wireless speakers
                </label>
                <Link 
                  to="/shop" 
                  className="inline-block font-medium text-xs md:text-sm text-white mt-2 md:mt-3 pb-1 border-b border-gray-400 hover:border-white transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 lg:mt-20 mb-12 md:mb-16 lg:mb-20">
        {[
          { icon: icon1, title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140" },
          { icon: icon2, title: "24/7 CUSTOMER SERVICE", description: "Friendly 24/7 customer service" },
          { icon: icon3, title: "MONEY BACK GUARANTEE", description: "We return money within 30 days" }
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-lg md:rounded-xl shadow-sm p-6 md:p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <img src={feature.icon} alt={feature.title} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <label className="font-semibold text-base md:text-lg text-gray-900 mt-4 md:mt-6">
              {feature.title}
            </label>
            <label className="font-medium text-xs md:text-sm text-gray-600 mt-2">
              {feature.description}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home