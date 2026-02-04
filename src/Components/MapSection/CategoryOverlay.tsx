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
    <div
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1000,
        display: 'flex',
        gap: 8,
      }}
    >
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() =>
            onSelect(activeCategory === category ? null : category)
          }
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #ccc',
            background: activeCategory === category ? '#2563eb' : 'white',
            color: activeCategory === category ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
