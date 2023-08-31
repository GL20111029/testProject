/**
 * 第一题
 */
import React, { FC } from 'react';
import './style.less';

/**
 * 渲染测试数据
 */
export const cardDataList: IDirectVoucher[] = [
  {
    title: '杭州市通用5元券',
    subTitle:
      '杭味面馆非常好吃，太好吃了，相当不错，味道鲜美，特别划算，快快抢购，聚划算',
  },
  {
    title: '杭州市10元券',
    subTitle: '兰州拉面非常好吃',
  },
];

/**
 * 券卡片渲染数据类型
 */
export interface IDirectVoucher {
  /** 标题 */
  title?: string;
  /** 副标题 */
  subTitle?: string;
}

export interface ICardProps {
  data: IDirectVoucher;
}

/**
 * 卡片组件
 */
const Card: FC<ICardProps> = props => {
  // -------- 在这里完成代码 --------
  const { data } = props;
  return (
    <div className="card">
      <div>{data.title}</div>
      <div>待实现</div>
    </div>
  );
};

/**
 * 以下为测试用例，无需修改
 */
export default () =>
  cardDataList.map(data => <Card key={data.title} data={data} />);
