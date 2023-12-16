import { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
  props?: any;
}

export default forwardRef<HTMLDivElement, Props>(function ScrollBox(
  { children, className, ...props }: Props,
  ref
) {
  return (
    <div
      id="scroll-box"
      className={`w-full h-full overflow-y-auto overflow-x-hidden pr-2 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
