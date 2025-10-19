"use client";

import { Spin } from "antd";
import { usePageLoading } from "@/client/hooks/usePageLoading";
import style from "./index.module.scss";

interface ILoadingProps {
  children: React.ReactNode;
  minLoadingTime?: number;
  maxLoadingTime?: number;
  enableIntersectionObserver?: boolean;
}

export const Loading = ({ 
  children, 
  minLoadingTime = 300,
  maxLoadingTime = 3000,
  enableIntersectionObserver = true
}: ILoadingProps) => {
  const { isLoading, loadingKey } = usePageLoading({
    minLoadingTime,
    maxLoadingTime,
    enableIntersectionObserver
  });

  if (isLoading) {
    return (
      <div className={style.loadingContainer} key={loadingKey}>
        <div className={style.loadingContent}>
          <Spin size="large" />
          <div className={style.loadingText}>页面加载中...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};