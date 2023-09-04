import { TouchEvent, useEffect, useState } from 'react';

interface Image {
  title: string;
  image: string;
  url: string;
  description: string;
}

interface ImageSliderProps {
  images: Image[];
  autoPlay?: boolean;
}

function ImageSlider({ images, autoPlay = true }: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentCaption, setCurrentCaption] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [isResetSlide, setIsResetSlide] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const onPrev = () => {
    setIsResetSlide(false);
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    if (currentCaption > 0) {
      setCurrentCaption(currentCaption - 1);
    } else {
      setCurrentCaption(images.length - 1);
    }
  };

  const onNext = () => {
    setIsResetSlide(false);
    if (currentSlide < images.length + 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (currentCaption < images.length - 1) {
      setCurrentCaption(currentCaption + 1);
    } else {
      setCurrentCaption(0);
    }
  };

  const onTransitionEnd = () => {
    if (currentSlide === 0) {
      setIsResetSlide(true);
      setCurrentSlide(images.length);
      setCurrentCaption(images.length - 1);
    } else if (currentSlide === images.length + 1) {
      setIsResetSlide(true);
      setCurrentSlide(1);
      setCurrentCaption(0);
    }
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsAutoPlay(false);
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    setIsAutoPlay(true);
    const touch = e?.changedTouches[0];
    if (touch.clientX < touchStartX) {
      onNext();
    }
    if (touch.clientX > touchStartX) {
      onPrev();
    }
  };

  useEffect(() => {
    setIsAutoPlay(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    const autoPlaySlider = setInterval(() => {
      setIsResetSlide(false);
      setCurrentSlide((prevSlide: number): number => {
        if (prevSlide < images.length + 1) {
          return prevSlide + 1;
        }
        return prevSlide;
      });
      setCurrentCaption((prevCaption: number): number => {
        if (prevCaption < images.length - 1) {
          return prevCaption + 1;
        }
        return 0;
      });
    }, 5000);

    if (!autoPlay || !isAutoPlay) {
      clearInterval(autoPlaySlider);
    }
    return () => clearInterval(autoPlaySlider);
  }, [isAutoPlay]);

  useEffect(() => {
    if (navigator.maxTouchPoints > 0) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div>
      <div className="relative mx-auto mb-4 overflow-hidden rounded-xl drop-shadow-lg">
        {!isMobile && images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="btn-prev absolute bottom-0 top-0 z-10 m-4 hidden items-center justify-center border-0 text-center disabled:hover:cursor-pointer sm:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={onNext}
              className="btn-next absolute bottom-0 right-0 top-0 z-10 m-4 hidden items-center justify-center border-0 text-center disabled:hover:cursor-pointer sm:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}
        {images.length > 1 ? (
          <div
            onTransitionEnd={onTransitionEnd}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isResetSlide ? 'none' : 'transform 0.5s ease-in-out',
            }}
            className="slider flex flex-nowrap transition-transform duration-500 ease-in-out"
          >
            <div className="w-full shrink-0 rounded-xl">
              <a href={images[images.length - 1].url}>
                <img
                  className="w-full"
                  src={`/uploads/${images[images.length - 1].image}`}
                  alt={images[images.length - 1].title}
                />
              </a>
            </div>
            {images &&
              images.map((image, index) => (
                <div key={index} className="w-full shrink-0 rounded-xl">
                  <a href={image.url}>
                    <img
                      className="w-full"
                      src={`/uploads/${image.image}`}
                      alt={image.title}
                    />
                  </a>
                </div>
              ))}
            <div className="w-full shrink-0 rounded-xl">
              <a href={images[0].url}>
                <img
                  className="w-full"
                  src={`/uploads/${images[0].image}`}
                  alt={images[0].title}
                />
              </a>
            </div>
          </div>
        ) : (
          <div className="w-full shrink-0 rounded-xl">
            <a href={images[0].url}>
              <img
                className="w-full"
                src={`/uploads/${images[0].image}`}
                alt={images[0].title}
              />
            </a>
          </div>
        )}
      </div>
      <div className="relative mx-auto h-32 py-2 text-center">
        {images &&
          images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full duration-500 ease-in-out ${
                index === currentCaption ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h5 className="text-xl font-semibold text-primary">
                {image.title}
              </h5>
              <p>{image.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ImageSlider;
