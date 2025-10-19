import React from "react";
import { request2 } from "@/common/apis/modules";

import style from "./page.module.scss";

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

export async function generateMetadata() {
  console.log('generateMetadata--->');
  return {
    title: '我是about页面',
    description: 'tang-nextjs',
  }
}

// export async function generateStaticParams() {
//   console.log('generateStaticParams--->');
//   return [
//     { id: '1' },
//     { id: '2' },
//     { id: '3' },
//   ]
// }

// 定义组件 props 类型
interface IAboutProps {
  data: IAboutData;
}

const AboutPage = async (props?: IAboutProps) => {
  console.log('AboutPage props--->', props);

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
