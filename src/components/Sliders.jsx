import React, { useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { link } from 'd3';
import { useNavigate } from 'react-router-dom';




const cardData = [
  {
    image: '/assets/images/img1.png',
    description: 'This is card 1',
    buttonText: 'View Details',
    link: '/tokenization/gold/'
  },
  {
    image: '/assets/images/img2.png',
    description: 'This is card 2',
    buttonText: 'View Details',
    link:'/green-tokenization'
  },
  {
    image: '/assets/images/img3.png',
    description: 'View Details',
    buttonText: 'Explore',
    link:'/tokenization/real-estate/'
  },
  {
    image: '/assets/images/img4.png',
    description: 'This is card 4',
    buttonText: 'View Details',
    link:'/tokenization/art'
  },
  {
    image: '/assets/images/img5.png',
    description: 'This is card 5',
    buttonText: 'View Details',
    link:'/tokenization/Commodities'
  },
  {
    image: '/assets/images/img6.png',
    description: 'This is card 6',
    buttonText: 'View Details',
    link:'/tokenization/carbon-credits'
  },
  {
    image: '/assets/images/img7.png',
    description: 'This is card 7',
    buttonText: 'View Details',
    link:'/tokenization/private-equity'
  },
  {
    image: '/assets/images/img8.png',
    description: 'This is card 8',
    buttonText: 'View Details',
    link:'/tokenization/other-assets'
  },
];

const Sliders = () => {
  const sliderRef = useRef(null); // Ref to control slider programmatically
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    arrows: false, // Disable default arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative max-w-6xl mx-auto mt-10 px-6 bg-gradient-to-br rounded-xl py-8 shadow-xl">
      {/* Custom Left and Right Arrow Buttons */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute left-[-15px] top-1/2 transform -translate-y-1/2 text-gray-900 p-4 rounded-full shadow-lg hover:bg-green-200 transition-all duration-300"
      >
        <span className="text-xl">&lt;</span> {/* Left Arrow */}
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 text-gray-900 p-4 rounded-full hover:bg-green-200 transition-all duration-300"
      >
        <span className="text-xl">&gt;</span> {/* Right Arrow */}
      </button>

      <Slider ref={sliderRef} {...settings}>
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="px-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 overflow-hidden transform hover:scale-[1.03] transition-all duration-500 ease-in-out group">
              {/* Animated border line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out"></div>
              <div className="absolute top-0 right-0 h-full w-1 bg-primary-dark transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-in-out"></div>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out"></div>
              <div className="absolute bottom-0 left-0 h-full w-1 bg-primary-dark transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-in-out"></div>

              {/* Card Image */}
              <img
                src={card.image}
                alt="Card"
                className="w-96 h-40 object-cover   mt-1"
              />

              {/* Card Content */}
              <div className="p-4">
                <p className="text-white text-sm mb-3">{card.description}</p>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 text-sm font-semibold rounded-full shadow-lg hover:shadow-indigo-400 hover:scale-105 transition-all duration-300"
                  onClick={() => navigate(card.link)}>
                  {card.buttonText}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default Sliders;

