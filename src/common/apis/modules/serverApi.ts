import TBRequest from "@/common/apis/request";

export const request2 = <T>(params: any) => {
  return TBRequest<any, T>({
    url: '/tang/about',
    method: 'post',
    data: params
  });
};