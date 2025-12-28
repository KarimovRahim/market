// MusicExperienceSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const MusicExperienceSlider = ({ musicImage }) => {
  return (
    <div className="w-[1170px] h-[500px] bg-[#000000] flex flex-row items-center justify-center relative">
      <div className="w-[1070px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          speed={3500}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="pb-[40px] [&_.swiper-pagination]:!bottom-[10px] [&_.swiper-pagination-bullet]:!w-[10px] [&_.swiper-pagination-bullet]:!h-[10px] [&_.swiper-pagination-bullet]:!bg-[#888] [&_.swiper-pagination-bullet]:!opacity-80 [&_.swiper-pagination-bullet]:!mx-[5px] [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet-active]:!opacity-100"
        >
          {/* Слайд 1 */}
          <SwiperSlide>
            <div className="w-[1070px] m-auto flex flex-row justify-between">
              <div className="w-[440px] flex flex-col">
                <label htmlFor="" className="font-semibold text-[16px] text-[#00FF66]">Categories</label>
                <label htmlFor="" className="font-semibold text-[48px] text-[#ffffff] mt-[32px]">Enhance Your <br /> Music Experience</label>
                <div className="w-[320px] h-[62px] flex flex-row justify-between mt-[32px]">
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">5</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Days</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">23</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Hours</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">59</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Minutes</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">35</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Seconds</label>
                  </div>
                </div>
                <button className="w-[171px] h-[56px] bg-[#00FF66] rounded-[5px] font-medium text-[16px] text-[#000000] mt-[40px]">Buy Now!</button>
              </div>
              <img src={musicImage} alt="" className="w-[600px] h-[420px]" />
            </div>
          </SwiperSlide>

          {/* Слайд 2 */}
          <SwiperSlide>
            <div className="w-[1070px] m-auto flex flex-row justify-between">
              <div className="w-[440px] flex flex-col">
                <label htmlFor="" className="font-semibold text-[16px] text-[#00FF66]">Premium Audio</label>
                <label htmlFor="" className="font-semibold text-[48px] text-[#ffffff] mt-[32px]">Ultimate Sound <br /> Quality</label>
                <div className="w-[320px] h-[62px] flex flex-row justify-between mt-[32px]">
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">3</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Days</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">12</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Hours</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">45</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Minutes</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">20</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Seconds</label>
                  </div>
                </div>
                <button className="w-[171px] h-[56px] bg-[#00FF66] rounded-[5px] font-medium text-[16px] text-[#000000] mt-[40px]">Shop Now</button>
              </div>
              <img src={musicImage} alt="" className="w-[600px] h-[420px]" />
            </div>
          </SwiperSlide>

          {/* Слайд 3 */}
          <SwiperSlide>
            <div className="w-[1070px] m-auto flex flex-row justify-between">
              <div className="w-[440px] flex flex-col">
                <label htmlFor="" className="font-semibold text-[16px] text-[#00FF66]">Wireless Tech</label>
                <label htmlFor="" className="font-semibold text-[48px] text-[#ffffff] mt-[32px]">Freedom of <br /> Wireless Sound</label>
                <div className="w-[320px] h-[62px] flex flex-row justify-between mt-[32px]">
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">7</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Days</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">6</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Hours</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">30</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Minutes</label>
                  </div>
                  <div className="w-[62px] h-[62px] bg-[#ffffff] rounded-full flex flex-col justify-center items-center">
                    <label htmlFor="" className="font-semibold text-[16px] text-[#000000]">15</label>
                    <label htmlFor="" className="font-medium text-[11px] text-[#000000]">Seconds</label>
                  </div>
                </div>
                <button className="w-[171px] h-[56px] bg-[#00FF66] rounded-[5px] font-medium text-[16px] text-[#000000] mt-[40px]">View All</button>
              </div>
              <img src={musicImage} alt="" className="w-[600px] h-[420px]" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MusicExperienceSlider;