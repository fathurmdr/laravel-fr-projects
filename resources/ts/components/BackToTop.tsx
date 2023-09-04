import { useState, useEffect } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

function BackToTop() {
  const [show, setShow] = useState(false);

  const onScroll = () => {
    if (window.scrollY > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <a
      href="#home"
      className={`fixed bottom-4 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-primary transition-opacity duration-300 ${
        show ? 'hover:animate-pulse' : ''
      }`}
      style={{ opacity: show ? '100' : '0' }}
      id="to-top"
    >
      <MdKeyboardArrowUp className="text-tosca text-5xl" />
    </a>
  );
}

export default BackToTop;
