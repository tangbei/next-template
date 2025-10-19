'use client'

import { isClientEnv } from "@/common/utils";
import { builderAPI } from "./api";
import { BuildRouter } from "@/client/router";
import { App, ConfigProvider } from "antd";

type IClientBuilderProps = {
  children: React.ReactNode
};

/**
 * 初始化客户端组件
 * @returns 
 */
const ClientBuilder = ({ children }: Readonly<IClientBuilderProps>) => {

  // 客户端初始化操作
  if (isClientEnv()) {

    builderAPI();

    // TODO
  }

  return (
    <ConfigProvider>
      <App>
        <BuildRouter>
          {children}
        </BuildRouter>
      </App>
    </ConfigProvider>
  );
};

export default ClientBuilder;