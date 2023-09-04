import { MdClose, MdDensityMedium } from 'react-icons/md';

interface NavigationToggleProps {
  isOpen: boolean;
}

function NavigationToggle({ isOpen }: NavigationToggleProps) {
  return (
    <button>
      <MdDensityMedium
        className={`absolute right-0 top-0 h-8 w-8 text-secondary duration-200 ease-in-out ${
          isOpen && 'scale-0'
        }`}
      />
      <MdClose
        className={`absolute right-0 top-0 h-8 w-8 text-secondary duration-200 ease-in-out ${
          !isOpen && 'scale-0'
        }`}
      />
    </button>
  );
}

export default NavigationToggle;
