import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Bugungi sana. Render ichida `new Date()` chaqirmaslik uchun —
 * react-compiler uni memoizatsiya qilib, sana eskirib qolishi mumkin.
 * Ekran har fokuslanganda kun o'zgargan bo'lsa yangilanadi.
 */
export function useToday(): Date {
  const [today, setToday] = useState(() => new Date());

  useFocusEffect(
    useCallback(() => {
      const now = new Date();
      setToday((prev) => (isSameDay(prev, now) ? prev : now));
    }, [])
  );

  return today;
}
