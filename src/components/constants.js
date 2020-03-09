import moment from "moment";

export const formatDate = date => {
  return moment(date)
    .utcOffset(900)
    .format("YYYY-MM-DD HH:mm:ss");
};
export const profiles = [
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/1.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/2.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/3.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/4.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/5.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/6.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/7.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/8.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/9.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/10.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/11.jpg",
  "https://luokaiii.oss-cn-shanghai.aliyuncs.com/tenement/12.jpg"
];

export const HouseStatusText = {
  CREATED: "审核中",
  ADDED: "已上架",
  OUT: "已下架",
  FAILED: "审核失败"
};

export const HouseOwnerTypeText = {
  ALL: "整租",
  PART: "合租",
  APART: "公寓"
};

export const HousePlanText = [
  "",
  "一居室",
  "两居室",
  "三居室",
  "四居室",
  "五居室及以上"
];

export const HouseTypeTagText = {
  SELL: "在售",
  RENT: "出租"
};

export const HouseListText = {
  SELL: "精选二手房",
  RENT: "精选出租房"
};
