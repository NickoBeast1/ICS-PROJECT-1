// src/useCooldown.js
import { useState, useEffect } from 'react';

const COOLDOWN_TIME = 60; // Cooldown time in seconds

export const useCooldown = () => {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(cooldown - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const startCooldown = () => setCooldown(COOLDOWN_TIME);

  return { cooldown, startCooldown };
};
