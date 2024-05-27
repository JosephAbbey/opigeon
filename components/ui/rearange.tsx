"use client";

import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import React from "react";

const DragHandle = ({
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children">) => (
  <div
    draggable
    className={cn(
      "flex cursor-grab items-center text-primary opacity-10 transition-opacity hover:opacity-100",
      className,
    )}
    {...props}
  >
    <GripVertical className="p-1" />
  </div>
);

const DragableContext = React.createContext<{
  onDrag: (index: number) => void;
  onDrop: (index: number) => void;
}>({ onDrag: () => {}, onDrop: () => {} });

interface DragableProps extends React.ComponentProps<"div"> {
  index: number;
}
const Dragable = ({ index, className, children, ...props }: DragableProps) => {
  const { onDrag, onDrop } = React.useContext(DragableContext);
  const [dragging, setDragging] = React.useState(false);
  const [over, setOver] = React.useState(false);

  return (
    <div
      onDrop={(e) => {
        setOver(false);
        onDrop(index);
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        setOver(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setOver(false);
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.dataTransfer.dropEffect = "move";
        e.preventDefault();
      }}
    >
      <div
        className={cn(
          "flex flex-row items-stretch transition-opacity",
          className,
          dragging && "opacity-50",
        )}
        {...props}
      >
        <DragHandle
          onDragStart={() => {
            onDrag(index);
            setDragging(true);
          }}
          onDragEnd={() => setDragging(false)}
        />
        <div className="flex-grow">{children}</div>
      </div>
      {over && <div className="m-4 ml-10 rounded-sm p-5 ring ring-ring" />}
    </div>
  );
};

interface DragAreaProps extends React.ComponentProps<"div"> {
  onDragDrop: (from: number, to: number) => void;
}
const DragArea = ({ onDragDrop, children, ...props }: DragAreaProps) => {
  const [dragging, setDragging] = React.useState<number | null>(null);

  return (
    <DragableContext.Provider
      value={{
        onDrag: (i) => {
          setDragging(i);
        },
        onDrop: (i) => {
          if (dragging !== null) {
            if (dragging !== i) {
              onDragDrop(dragging, i + 1);
            }
            setDragging(null);
          }
        },
      }}
    >
      <div {...props}>{children}</div>
    </DragableContext.Provider>
  );
};

export { DragHandle, Dragable, DragableContext, DragArea };
