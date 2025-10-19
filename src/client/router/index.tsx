'use client'

import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginGuard from "./guard/LoginGuard";

import style from "./index.module.scss";

interface IBuildRouterProps {
  children: React.ReactNode
}

/**
 * 初始化路由组件
 * @returns 
 */
export const BuildRouter = ({ children }: Readonly<IBuildRouterProps>) => {

  return (
    <div className={style.container}>
      <Header />
    
      <LoginGuard>
        <main className={style['main-container']}>
          {children}
        </main>
      </LoginGuard>

      <Footer />
    </div>
  );
};