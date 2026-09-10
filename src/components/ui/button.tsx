import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-bright/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-teal text-white shadow-sm hover:bg-teal-ink hover:-translate-y-px',
        secondary:
          'bg-surface-raised text-ink border border-line hover:bg-white hover:border-line-strong',
        outline:
          'border border-line bg-surface text-ink hover:border-teal/40 hover:text-teal-ink',
        ghost: 'text-ink-muted hover:bg-surface-raised hover:text-ink',
        inverted:
          'bg-white text-ink hover:bg-teal-soft',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
