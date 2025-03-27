"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const HoverCard = ({
  children,
  className,
  content,
  direction = "right",
  align = "center",
  wrapperClassName,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const getDirection = () => {
    switch (direction) {
      case "top":
        return { x: 0, y: -10 };
      case "bottom":
        return { x: 0, y: 10 };
      case "left":
        return { x: -10, y: 0 };
      case "right":
      default:
        return { x: 10, y: 0 };
    }
  };

  const getAlign = () => {
    switch (align) {
      case "start":
        return direction === "top" || direction === "bottom" ? "flex-start" : undefined;
      case "end":
        return direction === "top" || direction === "bottom" ? "flex-end" : undefined;
      case "center":
      default:
        return direction === "top" || direction === "bottom" ? "center" : undefined;
    }
  };

  const getPlacement = () => {
    switch (direction) {
      case "top":
        return "bottom-full left-0 mb-2";
      case "bottom":
        return "top-full left-0 mt-2";
      case "left":
        return "right-full top-0 mr-2";
      case "right":
      default:
        return "left-full top-0 ml-2";
    }
  };

  return (
    <div
      className={cn("relative inline-block", wrapperClassName)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {children}
      <div
        className={cn(
          "absolute z-50 w-auto pointer-events-none",
          getPlacement(),
          { "opacity-0": !isHovering }
        )}
        style={{
          alignItems: getAlign(),
        }}
      >
        <motion.div
          initial={{ opacity: 0, ...getDirection() }}
          animate={{
            opacity: isHovering ? 1 : 0,
            x: isHovering ? 0 : getDirection().x,
            y: isHovering ? 0 : getDirection().y,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className={cn("", className)}
        >
          {content}
        </motion.div>
      </div>
    </div>
  );
}; 