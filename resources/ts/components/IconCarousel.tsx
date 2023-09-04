import { useRef, useEffect, useState } from 'react';

interface Icon {
  title: string;
  icon: string;
}

interface IconCarouselProps {
  icons: Icon[];
  autoPlay?: boolean;
}

function IconCarousel({ icons, autoPlay = true }: IconCarouselProps) {
  const [positionCarousel, setPositionCarousel] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const onTransitionEnd = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      if (positionCarousel === 0) {
        setPositionCarousel(carousel.scrollWidth - carousel.clientWidth);
      } else {
        setPositionCarousel(0);
      }
    }
  };

  useEffect(() => {
    if (autoPlay) {
      const carousel = carouselRef.current;
      if (carousel) {
        setPositionCarousel(carousel.scrollWidth - carousel.clientWidth);
      }
    }
  }, [autoPlay]);

  return (
    <div className={`max-w-[480px] overflow-hidden md:max-w-[640px]`}>
      <div
        ref={carouselRef}
        className="flex"
        style={{
          transform: `translateX(-${positionCarousel}px)`,
          transition: autoPlay
            ? `transform ${icons.length * 1}s ease-in-out 1s`
            : 'none',
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {icons &&
          icons.map((icon, index) => (
            <div
              key={index}
              className="flex w-24 shrink-0 flex-col items-center justify-end p-6 text-sm md:w-32 md:text-base"
            >
              <img
                className="h-20 w-20 object-contain"
                src={`/uploads/${icon.icon}`}
                alt={icon.title}
              />
              <p className="py-3 text-dark">{icon.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default IconCarousel;
