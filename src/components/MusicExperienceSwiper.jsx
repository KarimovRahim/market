import React from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const MusicExperienceSlider = ({ musicImage }) => {
  return (
    <div className="w-full bg-black rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden my-6 md:my-8 lg:my-10">
      <div className="w-full px-3 sm:px-4 md:px-6 py-6 md:py-8 lg:py-10">
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
          className="w-full pb-8 md:pb-10 lg:pb-12 [&_.swiper-pagination]:!bottom-2 md:[&_.swiper-pagination]:!bottom-4 [&_.swiper-pagination-bullet]:!w-2 md:[&_.swiper-pagination-bullet]:!w-3 [&_.swiper-pagination-bullet]:!h-2 md:[&_.swiper-pagination-bullet]:!h-3 [&_.swiper-pagination-bullet]:!bg-gray-500 [&_.swiper-pagination-bullet]:!opacity-70 [&_.swiper-pagination-bullet]:!mx-1 [&_.swiper-pagination-bullet-active]:!bg-green-400 [&_.swiper-pagination-bullet-active]:!opacity-100"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
              {/* Text Content */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <label className="font-semibold text-sm md:text-base text-green-400 mb-2 md:mb-3">
                  Categories
                </label>
                <label className="font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mt-4 md:mt-6 lg:mt-8 leading-tight">
                  Enhance Your <br className="hidden sm:block" /> Music Experience
                </label>

                {/* Timer */}
                <div className="w-full max-w-xs md:max-w-sm flex flex-row justify-between mt-6 md:mt-8 lg:mt-10">
                  {[
                    { value: "5", label: "Days" },
                    { value: "23", label: "Hours" },
                    { value: "59", label: "Minutes" },
                    { value: "35", label: "Seconds" }
                  ].map((item, index) => (
                    <div key={index} className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex flex-col justify-center items-center">
                      <label className="font-semibold text-sm md:text-base lg:text-lg text-gray-900">
                        {item.value}
                      </label>
                      <label className="font-medium text-xs md:text-sm text-gray-600">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Link to={"/Shop"}>
                  <button className="w-full max-w-xs md:w-48 h-12 md:h-14 bg-green-400 hover:bg-green-500 rounded-lg md:rounded-xl font-medium text-base md:text-lg text-gray-900 mt-6 md:mt-8 lg:mt-10 transition-colors">
                    View All
                  </button>
                </Link>
              </div>

              {/* Image */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <img
                  src={musicImage}
                  alt="Music Experience"
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
              {/* Text Content */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <label className="font-semibold text-sm md:text-base text-green-400 mb-2 md:mb-3">
                  Premium Audio
                </label>
                <label className="font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mt-4 md:mt-6 lg:mt-8 leading-tight">
                  Ultimate Sound <br className="hidden sm:block" /> Quality
                </label>

                {/* Timer */}
                <div className="w-full max-w-xs md:max-w-sm flex flex-row justify-between mt-6 md:mt-8 lg:mt-10">
                  {[
                    { value: "3", label: "Days" },
                    { value: "12", label: "Hours" },
                    { value: "45", label: "Minutes" },
                    { value: "20", label: "Seconds" }
                  ].map((item, index) => (
                    <div key={index} className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex flex-col justify-center items-center">
                      <label className="font-semibold text-sm md:text-base lg:text-lg text-gray-900">
                        {item.value}
                      </label>
                      <label className="font-medium text-xs md:text-sm text-gray-600">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Link to={"/Shop"}>
                  <button className="w-full max-w-xs md:w-48 h-12 md:h-14 bg-green-400 hover:bg-green-500 rounded-lg md:rounded-xl font-medium text-base md:text-lg text-gray-900 mt-6 md:mt-8 lg:mt-10 transition-colors">
                    View All
                  </button>
                </Link>
              </div>

              {/* Image */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <img
                  src={musicImage}
                  alt="Premium Audio"
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
              {/* Text Content */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <label className="font-semibold text-sm md:text-base text-green-400 mb-2 md:mb-3">
                  Wireless Tech
                </label>
                <label className="font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mt-4 md:mt-6 lg:mt-8 leading-tight">
                  Freedom of <br className="hidden sm:block" /> Wireless Sound
                </label>

                {/* Timer */}
                <div className="w-full max-w-xs md:max-w-sm flex flex-row justify-between mt-6 md:mt-8 lg:mt-10">
                  {[
                    { value: "7", label: "Days" },
                    { value: "6", label: "Hours" },
                    { value: "30", label: "Minutes" },
                    { value: "15", label: "Seconds" }
                  ].map((item, index) => (
                    <div key={index} className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-full flex flex-col justify-center items-center">
                      <label className="font-semibold text-sm md:text-base lg:text-lg text-gray-900">
                        {item.value}
                      </label>
                      <label className="font-medium text-xs md:text-sm text-gray-600">
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Link to={"/Shop"}>
                  <button className="w-full max-w-xs md:w-48 h-12 md:h-14 bg-green-400 hover:bg-green-500 rounded-lg md:rounded-xl font-medium text-base md:text-lg text-gray-900 mt-6 md:mt-8 lg:mt-10 transition-colors">
                    View All
                  </button>
                </Link>
              </div>

              {/* Image */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <img
                  src={musicImage}
                  alt="Wireless Tech"
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MusicExperienceSlider;