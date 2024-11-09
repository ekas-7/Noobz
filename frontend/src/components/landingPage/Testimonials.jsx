import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';
import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

const Testimonials = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  
  const [start, setStart] = useState(false);

  const items = [
    {
        quote: "qwertyuiop",
        name: "name",
        title: "title",
    },
    {
        quote: "qwertyuiop",
        name: "name",
        title: "title",
    },
    {
        quote: "qwertyuiop",
        name: "name",
        title: "title",
    },
    {
        quote: "qwertyuiop",
        name: "name",
        title: "title",
    }
]

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-6 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg max-w-xs transition-transform transform hover:scale-105"
          >
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-5">
              "Aurea helped me identify my skin condition quickly and accurately. The recommendations were spot-on!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="font-semibold text-gray-800">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Verified User</p>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Testimonials;