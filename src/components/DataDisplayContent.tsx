import { cn } from "@/lib/utils";
import type { ReactNode, CSSProperties } from "react";

const DataDisplayContent = ({
  dataType,
  cardVariant,
  children,
}: {
  dataType: string;
  cardVariant: string;
  children: ReactNode;
}) => {
  return (
    <ul
      className={cn(
        "grid auto-grid",
        dataType === "artistDetails" ? "gap-4" : "gap-8"
      )}
      style={
        {
          "--min-col-size": cardVariant === "chartCard" ? "1fr" : "200px",
        } as CSSProperties
      }
    >
      {children}
    </ul>
  );
};

export default DataDisplayContent