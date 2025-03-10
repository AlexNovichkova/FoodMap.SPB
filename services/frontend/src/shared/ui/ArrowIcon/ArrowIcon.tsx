export const ArrowIcon: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      className={className}
      width='18'
      height='29'
      viewBox='0 0 18 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.0566 15.7207L4.55273 28.2891C3.9082 28.8691 2.94141 28.8691 2.36133 28.2891L0.878906 26.8066C0.298828 26.2266 0.298828 25.2598 0.878906 24.6152L10.8047 14.625L0.878906 4.69922C0.298828 4.05469 0.298828 3.08789 0.878906 2.50781L2.36133 1.02539C2.94141 0.445312 3.9082 0.445312 4.55273 1.02539L17.0566 13.5938C17.6367 14.1738 17.6367 15.1406 17.0566 15.7207Z'
        fill='currentColor'
      />
    </svg>
  );
};
