import React from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { request4, request5 } from '@/common/apis/modules/serverApi';

import style from './page.module.scss';

interface IToolsData {
  id: number;
  title: string;
  desc: string;
  url: string;
}

export async function generateMetadata() {
  try {
    const res = await request4({});
    return {
      title: res.data?.title,
      description: res.data?.desc,
    }
  } catch (error) {
    return {
      title: '工具推荐oo',
      description: '各种前端工具推荐',
    }
  }
}

/**
 * 获取列表数据
 * @returns 
 */
async function getData(): Promise<IToolsData[]> {
  const res = await request5<IToolsData[]>({});
  return res?.data || [];
}

/**
 * 工具推荐页面
 * @returns 
 */
const ToolsPage = async () => {
  const tools = await getData() as IToolsData[];

  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];

  return (
    <div className={style.toolsContainer}>
      <div className={style.toolsLabel}>推荐工具：<span>各种前端工具推荐</span></div>
      <div className={style.gridContainer}>
        {
          tools.length > 0 && tools.map((item) => (
            <Card
              key={item.id}
              actions={actions}
            >
              <div>{item.title}</div>
            </Card>
          ))
        }
      </div>
    </div>
  );
};

export default ToolsPage;