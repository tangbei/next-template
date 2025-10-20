import React from "react";
import type { ResolvingMetadata } from 'next'
import { request2 } from "@/common/apis/modules";

import style from "./page.module.scss";

type IProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// 定义数据类型
interface IAboutData {
  id: number;
  title: string;
  desc: string;
}

// getStaticProps 在 App Router 中不支持，使用 generateStaticParams 替代

// 获取服务端数据
async function getData(): Promise<IAboutData> {
  const res = await request2<IAboutData>({ id: 999 });
  return res?.data || {};
}

/**
 * 动态元数据依赖于动态信息，例如当前路由参数、外部数据或父段中的 metadata，可以通过导出返回 Metadata 对象 的 generateMetadata 函数来设置。
 * @returns 
 */
export async function generateMetadata({ params, searchParams }: IProps, parent: ResolvingMetadata) {
  console.log('generateMetadata--->');
  return {
    title: '我是about页面',
    description: 'tang-nextjs',
  }
}

// 定义组件 props 类型
interface IAboutProps {
  data: IAboutData;
}

const AboutPage = async () => {
  // console.log('AboutPage props--->', props);

  const data = await getData();

  return (
    <div className={style.about}>
      <h1>About Page</h1>
      <div className="mt-4">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="mt-2 text-gray-600">{data.desc}</p>
        {/* <div onClick={() => { console.log('click--->'); }}>click me</div> */}
      </div>
    </div>
  );
};

export default AboutPage;
