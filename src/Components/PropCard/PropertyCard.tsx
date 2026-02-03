import * as React from "react";
import { Card, CardHeader } from "@shadcn-ui/components/ui/card";

export type PropertyCardProps = {
  name: string;
  isSelected?: boolean;
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  isSelected,
}) => {
  return (
    <Card className={isSelected ? "border-2 border-blue-500" : ""}>
      <CardHeader>{name}</CardHeader>
    </Card>
  );
};
