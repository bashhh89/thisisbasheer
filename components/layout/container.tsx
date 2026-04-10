import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "narrow" | "prose";
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  const sizes = {
    default: "max-w-editorial",
    wide: "max-w-[88rem]",
    narrow: "max-w-4xl",
    prose: "max-w-prose",
  } as const;

  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-10 lg:px-16", sizes[size], className)}
      {...props}
    />
  );
}
