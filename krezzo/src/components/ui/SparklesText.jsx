"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  particleColor,
  particleDensity,
  particleSpeed,
  position = "absolute",
  style,
  ...props
}) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = Math.floor(particleDensity || 150);
    const initialParticles = Array.from({ length: particleCount }).map((_, i) => generateParticle(i));
    setParticles(initialParticles);

    function handleResize() {
      setParticles(Array.from({ length: particleCount }).map((_, i) => generateParticle(i)));
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [minSize, maxSize, particleColor, particleDensity]);

  function generateParticle(i) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    const rect = canvas?.getBoundingClientRect();
    if (!rect) return null;

    const size = Math.floor(Math.random() * (maxSize ? maxSize : 5 - (minSize ? minSize : 1)) + (minSize ? minSize : 1));
    const speed = particleSpeed ? particleSpeed : 1;

    return {
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: size,
      color: particleColor || "#FFFFFF",
      speed: speed,
    };
  }

  useEffect(() => {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let animationFrameId;
    let previousTimestamp = 0;
    const FRAME_RATE = 60;
    const FRAME_INTERVAL = 1000 / FRAME_RATE;

    const animate = (timestamp) => {
      animationFrameId = requestAnimationFrame(animate);
      const deltaTime = timestamp - previousTimestamp;

      if (deltaTime >= FRAME_INTERVAL) {
        previousTimestamp = timestamp - (deltaTime % FRAME_INTERVAL);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        setParticles((prevParticles) => {
          return prevParticles.map((particle) => {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            ctx.fill();

            const newY = particle.y - (0.2 * particle.speed);
            if (newY < -particle.size) {
              return {
                ...particle,
                x: Math.random() * canvas.width,
                y: canvas.height + particle.size,
              };
            }
            return {
              ...particle,
              y: newY,
            };
          });
        });
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [id, particles]);

  return (
    <canvas
      id={id}
      className={cn("", className)}
      style={{ position, background, ...style }}
      {...props}
    />
  );
};

export const SparklesText = ({
  children,
  className,
  background,
  minSize,
  maxSize,
  particleColor,
  particleDensity,
  particleSpeed,
  containerClassName,
  ...props
}) => {
  const id = React.useId();
  return (
    <div className={cn("relative inline-block", containerClassName)}>
      <div className="relative z-10">
        <motion.span
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className={cn("", className)}
          {...props}
        >
          {children}
        </motion.span>
      </div>

      <SparklesCore
        id={id}
        className="absolute inset-0 z-0"
        background={background}
        minSize={minSize}
        maxSize={maxSize}
        particleColor={particleColor}
        particleDensity={particleDensity}
        particleSpeed={particleSpeed}
      />
    </div>
  );
}; 