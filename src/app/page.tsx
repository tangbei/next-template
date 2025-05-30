'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import styles from "./page.module.css";


/**
 * 主页面
 * @returns 
 */
const Home = () => {
  const router = useRouter();

  const onHandleRouterClick = () => {
    router.push('/products/22');
  };

  return (
    <div className={styles.page}>
      我是主页面

      <div>
        <Link href="/products/11">products - Link跳转</Link>
        <div>
          <Button onClick={onHandleRouterClick}>products - useRouter跳转</Button>
        </div>
        <Link href="/person">Link跳转 - 路由组跳转</Link>
      </div>
    </div>
  );
}

export default Home;