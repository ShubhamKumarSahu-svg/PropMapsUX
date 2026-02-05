import { Button } from '../../../shadcn-ui/components/ui/button';
import {
  NEARBY_CATEGORIES as CATEGORIES,
  type NearbyCategory,
} from '../types/maps';

export const CategoryOverlay = ({
  activeCategory,
  onSelect,
}: {
  activeCategory: NearbyCategory | null;
  onSelect: (c: NearbyCategory | null) => void;
}) => {
  return (
    <div className="absolute top-4 left-4 z-1000 flex gap-2">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <Button
            key={category}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(isActive ? null : category)}
            className="capitalize"
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
};
