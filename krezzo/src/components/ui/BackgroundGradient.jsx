"use client";
import { cn } from "../../utils/cn";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  as: Component = "div",
  gradientColor = "rgba(55, 65, 81, 0.1)",
  gradientSize = "75%",
  animate = true,
  speed = "2s",
  ...props
}) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !animate) return;

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, animate]);

  const getGradientTransform = () => {
    if (!animate || !isHovering) return '';
    
    // Calculate the gradient circle position
    const { x, y } = mousePosition;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <Component
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-slate-900 border border-slate-800 dark:border-slate-700 rounded-lg p-6",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 z-0 transition-transform",
          animate ? "transform-gpu" : ""
        )}
        style={{
          transform: getGradientTransform(),
          background: `radial-gradient(${gradientSize} circle at center, ${gradientColor} 0%, transparent 75%)`,
          transition: `transform ${speed} cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
      <div className={cn("relative z-10", className)}>
        {children}
      </div>
    </Component>
  );
}; 