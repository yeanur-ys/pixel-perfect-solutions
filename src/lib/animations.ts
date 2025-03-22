
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
    // Create the observer only once
    if (!observer.current) {
      observer.current = new IntersectionObserver((observedEntries) => {
        setEntries(observedEntries);
      }, defaultOptions);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [defaultOptions.threshold, defaultOptions.root, defaultOptions.rootMargin]);

  useEffect(() => {
    const { current: currentObserver } = observer;
    if (currentObserver) {
      // Disconnect and reconnect only when elements change
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

// Optimize scroll animation hook with better performance
export const useScrollAnimation = (elementRef: React.RefObject<HTMLElement>, animationClass: string): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use a more performant approach with better options
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once when element becomes visible
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Once visible, stop observing to save resources
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1, // Lower threshold for better performance
        rootMargin: '50px 0px', // Pre-load animations slightly before they come into view
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [elementRef, animationClass]);

  return isVisible;
};
