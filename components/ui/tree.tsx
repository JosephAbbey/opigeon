"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Mail } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export function Expandable({ item }: { item: expandable }) {
  const [open, setOpen] = React.useState(false);

  return (
    <li>
      <Button
        className="w-full justify-start"
        variant="ghost"
        onClick={() => setOpen(!open)}
      >
        <ChevronRight
          className={cn(
            "mr-3 h-4 w-4 transition-transform duration-500",
            open && "rotate-90",
          )}
        />
        <span className="*:mr-3 *:h-4 *:w-4">{item.icon}</span> {item.title}
      </Button>
      <Tree
        notebook={item.subnotes}
        className={cn(
          "ml-6 h-0 overflow-hidden border-l *:-translate-y-20 *:transition-transform *:duration-500",
          open && "h-auto *:translate-y-0",
        )}
      />
    </li>
  );
}

type tree = (
  | {
      title: string;
      path: string;
      icon: React.ReactNode;
    }
  | expandable
)[];

type expandable = {
  title: string;
  path: string;
  icon: React.ReactNode;
  subnotes: tree;
};

export interface TreeProps
  extends React.ButtonHTMLAttributes<HTMLUListElement> {
  notebook: tree;
}

const Tree = React.forwardRef<HTMLUListElement, TreeProps>(function Tree(
  { notebook, ...props },
  ref,
) {
  return (
    <ul ref={ref} {...props}>
      {notebook.map((item) =>
        Object.hasOwn(item, "subnotes") ? (
          <Expandable key={item.path} item={item as expandable} />
        ) : (
          <li key={item.path}>
            <Button className="w-full justify-start" asChild variant="link">
              <Link href={`/edit/${item.path}`}>
                <span className="*:mr-3 *:h-4 *:w-4">{item.icon}</span>{" "}
                {item.title}
              </Link>
            </Button>
          </li>
        ),
      )}
    </ul>
  );
});

export default Tree;
