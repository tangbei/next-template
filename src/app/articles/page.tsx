import React from "react";
import type { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { request2 } from "@/common/apis/modules";
import { getSortedArticlesData } from "@/common/mock/utils";

import style from "./page.module.scss";

type IProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// 定义数据类型
interface IArticlesData {
  id: string;
  date: string;
  title?: string;
}

// getStaticProps 在 App Router 中不支持，使用 generateStaticParams 替代

// 获取服务端数据
async function getData(): Promise<IArticlesData[]> {
  // const res = await request2<IAboutData>({ id: 999 });
  const res = getSortedArticlesData();
  console.log('getSortedArticlesData', res);
  return res || [];
}

/**
 * 动态元数据依赖于动态信息，例如当前路由参数、外部数据或父段中的 metadata，可以通过导出返回 Metadata 对象 的 generateMetadata 函数来设置。
 * @returns 
 */
export async function generateMetadata({ params, searchParams }: IProps, parent: ResolvingMetadata) {
  console.log('generateMetadata--->');
  return {
    title: '我是文章列表',
    description: 'tang-nextjs',
  }
}

// 定义组件 props 类型
interface IAboutProps {
  data: IArticlesData[];
}

const ArticlesPage = async () => {
  // console.log('AboutPage props--->', props);

  const articles = await getData();

  return (
    <div className={style.articlesContainer}>
      {
        articles.map((item) => (
          <Link
            key={item.id}
            className={style.articlesLi}
            href={`/articles/${item.id}`}
          >
            <div>{item.title}</div>
            <img src='/images/icon_right.svg' />
          </Link>
        ))
      }
    </div>
  );
};

export default ArticlesPage;
