interface SpinerProps {
  size?: 'small' | 'medium' | 'large';
}

const sizeOptions = {
  small: 8,
  medium: 12,
  large: 16,
};

function Spinner({ size = 'large' }: SpinerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`h-${sizeOptions[size]} w-${sizeOptions[size]} animate-spin rounded-full border-4 border-solid border-primary border-t-transparent`}
      ></div>
    </div>
  );
}

export default Spinner;
