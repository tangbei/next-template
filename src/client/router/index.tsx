"use client"

import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginGuard from "./guard/LoginGuard";

/**
 * 初始化路由组件
 * @returns 
 */
export const BuildRouter = ({ children }: Readonly<{ children: React.ReactNode }>) => {

  return (
    <div>
      <Header />
    
      <LoginGuard>
        {children}
      </LoginGuard>

      <Footer />
    </div>
  );
};