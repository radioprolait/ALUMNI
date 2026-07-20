'use client';
import React, { useState, useEffect } from 'react';
import styles from './HeroSlider.module.css';

interface HeroSliderProps {
  images: string[];
  title: string;
  subtitle: string;
}

export default function HeroSlider({ images, title, subtitle }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={styles.sliderContainer}>
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`${styles.slide} ${idx === currentIndex ? styles.active : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
