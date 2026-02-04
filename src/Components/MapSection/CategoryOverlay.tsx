type NearbyCategory = 'schools' | 'hospitals' | 'offices' | 'parks' | 'malls';

const CATEGORIES: NearbyCategory[] = [
  'schools',
  'hospitals',
  'offices',
  'parks',
  'malls',
];

export const CategoryOverlay = ({
  activeCategory,
  onSelect,
}: {
  activeCategory: NearbyCategory | null;
  onSelect: (c: NearbyCategory | null) => void;
}) => {
  return (
    <div className="absolute top-4 left-4 z-[1000] flex gap-2">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => onSelect(isActive ? null : category)}
            className={`
              rounded-md border px-3 py-1.5 text-sm capitalize transition-colors
              ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
