import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          `
          w-full 
          h-11 
          px-3 
          bg-white 
          text-gray-700 
          text-sm
          rounded-lg
          border border-gray-300

          placeholder:text-gray-400

          transition-all
          duration-150

          hover:border-gray-400

          focus:outline-none
          focus:border-blue-500 
          focus:ring-2 
          focus:ring-blue-500
          focus:ring-offset-1

          disabled:opacity-50 
          disabled:cursor-not-allowed
        `,
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
