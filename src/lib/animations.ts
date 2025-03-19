
import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  const observer = useRef<IntersectionObserver | null>(null);

  const defaultOptions = {
    threshold: 0.15,
    root: null,
    rootMargin: '0px',
    ...options,
  };

  useEffect(() => {
    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, defaultOptions);

    return () => observer.current?.disconnect();
  }, [defaultOptions.threshold, defaultOptions.root, defaultOptions.rootMargin]);

  useEffect(() => {
    const { current: currentObserver } = observer;
    if (currentObserver) {
      currentObserver.disconnect();
      
      if (elements.length > 0) {
        elements.forEach(element => currentObserver.observe(element));
      }
    }
    
    return () => currentObserver?.disconnect();
  }, [elements]);

  return {
    setRef: (element: Element | null) => {
      if (element && !elements.includes(element)) {
        setElements(prevElements => [...prevElements, element]);
      }
    },
    entries
  };
};

export const useAnimatedVisibility = (initialVisible: boolean = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [shouldRender, setShouldRender] = useState(initialVisible);

  useEffect(() => {
    if (isVisible) setShouldRender(true);
  }, [isVisible]);

  const handleAnimationEnd = () => {
    if (!isVisible) setShouldRender(false);
  };

  return {
    isVisible,
    setIsVisible,
    shouldRender,
    handleAnimationEnd
  };
};

export const useScrollAnimation = (elementRef: React.RefObject<HTMLElement>, animationClass: string): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, animationClass]);

  return isVisible;
};
