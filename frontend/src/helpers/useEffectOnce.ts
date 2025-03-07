import { useEffect } from "react";

// To avoid problems caused by React. In DevMode useEffect is called 2 times.
export function useEffectOnce(callback: React.EffectCallback) {
  useEffect(() => {
    const id = setTimeout(() => callback(), 0);
    return () => clearTimeout(id);
  }, []);
}
