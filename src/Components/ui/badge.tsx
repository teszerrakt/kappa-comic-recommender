import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        kappa: "bg-kappa-green/15 text-kappa-green border-kappa-green/30",
        muted: "bg-kappa-gray/15 text-kappa-gray border-kappa-gray/30",
        info: "bg-kappa-blue/15 text-kappa-blue border-kappa-blue/30",
        warning: "bg-kappa-gold/15 text-kappa-gold border-kappa-gold/30",
        danger: "bg-kappa-red/15 text-kappa-red border-kappa-red/30",
        purple: "bg-kappa-purple/15 text-kappa-purple border-kappa-purple/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
