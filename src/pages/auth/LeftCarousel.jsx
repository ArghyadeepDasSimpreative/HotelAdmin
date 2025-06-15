import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import bokingOneImage from "../../assets/booking-one.png";
import bokingTwoImage from "../../assets/booking-two.png";

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1
  }
};

const slides = [
  {
    image: bokingOneImage,
    heading: "Book Your Dream Stay",
    subtext: "Find and reserve rooms effortlessly"
  },
  {
    image: bokingTwoImage,
    heading: "Manage With Ease",
    subtext: "Seamless hotel operations in your hand"
  }
];

export default function LeftCarousel() {
  return (
    <div className="w-full h-full">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        arrows={false}
        showDots={true}
        containerClass="w-full h-full"
        itemClass="w-full h-full"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-full overflow-hidden"
          >
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end items-start px-8 pb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-4xl font-bold mb-3"
              >
                {slide.heading}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-black text-lg bg-white px-4 py-2 rounded shadow"
              >
                {slide.subtext}
              </motion.p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
