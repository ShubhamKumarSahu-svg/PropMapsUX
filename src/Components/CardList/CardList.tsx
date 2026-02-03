import { cn } from "@shadcn-ui/lib/utils";
import { PropertyCard, type PropertyCardProps } from "../PropCard/PropertyCard";

export type CardListProps = {
  cards: PropertyCardProps[];
  className?: string;
  onCardClick?: (cardIndex: number, card: PropertyCardProps) => void;
  selectedCardIndex?: number;
};

export const CardList = ({ cards, className, onCardClick, selectedCardIndex }: CardListProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {cards.map((cardProps, index) => (
        <div key={index} className="mb-4" onClick={() => onCardClick?.(index, cardProps)}>
          <PropertyCard {...cardProps} isSelected={selectedCardIndex === index} />
        </div>
      ))}
    </div>
  );
};
