import { useCallback, useEffect, useState } from "react";

export function useInView() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const ref = useCallback((el: HTMLElement | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsInView(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return { ref, isInView };
}
