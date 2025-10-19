"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface UsePageLoadingOptions {
  minLoadingTime?: number; // 最小加载时间（毫秒）
  maxLoadingTime?: number; // 最大加载时间（毫秒）
  enableIntersectionObserver?: boolean; // 是否启用交叉观察器
}

export const usePageLoading = (options: UsePageLoadingOptions = {}) => {
  const {
    minLoadingTime = 300,
    maxLoadingTime = 3000,
    enableIntersectionObserver = true
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingKey, setLoadingKey] = useState(0);
  const pathname = usePathname();
  
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();
  const minLoadingTimeRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver>();
  const mainContentRef = useRef<HTMLElement>();

  useEffect(() => {
    // 页面切换时显示 loading
    setIsLoading(true);
    setLoadingKey(prev => prev + 1);
    
    // 清除之前的定时器
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    if (minLoadingTimeRef.current) {
      clearTimeout(minLoadingTimeRef.current);
    }

    const startTime = Date.now();

    // 监听页面加载完成事件
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      minLoadingTimeRef.current = setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // 方法1: 监听 DOM 内容加载完成
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // 方法2: 监听页面可见性变化
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleLoad();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 方法3: 使用 Intersection Observer 监听主要内容区域
    if (enableIntersectionObserver) {
      const mainContent = document.querySelector('main') || document.body;
      if (mainContent) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                handleLoad();
              }
            });
          },
          { threshold: 0.1 }
        );
        observerRef.current.observe(mainContent);
      }
    }

    // 方法4: 监听所有图片加载完成
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages > 0) {
      const handleImageLoad = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          handleLoad();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener('load', handleImageLoad);
          img.addEventListener('error', handleImageLoad);
        }
      });

      if (loadedImages === totalImages) {
        handleLoad();
      }
    }

    // 备用超时机制
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadingTime);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (minLoadingTimeRef.current) {
        clearTimeout(minLoadingTimeRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname, minLoadingTime, maxLoadingTime, enableIntersectionObserver]);

  return {
    isLoading,
    loadingKey,
    setIsLoading
  };
};
