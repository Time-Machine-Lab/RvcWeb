/*
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\userTypes.ts
 */
export type Profile = {
  id: 0;
  avatar: ""; //头像链接
  nickName: ""; //昵称
  description: ""; //简介
  register_date: ""; //注册时间
  sex: ""; //性别
  fans_num: 0; //粉丝数量
  follow_num: 0; //关注数
};

export type ProfileForm = {
  avatar: "";
  nickName: "";
  description: "";
  sex: "";
  birthday: "";
};

export type OtherUser = {
  id: number;
  avatar: string;
  nickName: string;
  description: string;
};
