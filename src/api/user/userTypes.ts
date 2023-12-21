/*
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\api\user\userTypes.ts
 */
export type Profile = {
  /**
     * 用户头像
     */
  avatar?: string;
  /**
   * 生日
   */
  birthsday?: string;
  /**
   * 简介
   */
  description?: string;
  /**
   * 粉丝数
   */
  fansNum?: string;
  /**
   * 关注数
   */
  followNum?: string;
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 性别
   */
  sex?: string;
  /**
   * uid
   */
  uid?: string;
  /**
   * 用户名
   */
  username?: string;
  [property: string]: any;
};

export type ProfileForm = {
  avatar?: string;
  nickName?: string;
  description?: string;
  sex?: string;
  birthday?: string;
};

export type OtherUser = {
  id: number;
  avatar: string;
  nickName: string;
  description: string;
};

export type UserInfoVO = {
  /**
   * 用户头像
   */
  avatar?: string;
  /**
   * 生日
   */
  birthsday?: string;
  /**
   * 简介
   */
  description?: string;
  /**
   * 粉丝数
   */
  fansNum?: string;
  /**
   * 关注数
   */
  followNum?: string;
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 性别
   */
  sex?: string;
  /**
   * uid
   */
  uid?: string;
  /**
   * 用户名
   */
  username?: string;
  [property: string]: any;
}

export type EmailCodeForm = {
  /**
   * 前置验证码
   */
  code?: string;
  /**
   * 邮箱账号
   */
  email: string;
  /**
   * 0为注册，1为登录，2为修改密码
   */
  type: number;
  /**
   * 前置验证码唯一标识
   */
  uuid?: string;
  [property: string]: any;
}

export type RegisterForm = {
  /**
   * 邮箱
   */
  email: string;
  /**
   * 邮箱验证码
   */
  emailCode: string;
  /**
   * 密码
   */
  password: string;
  [property: string]: any;
}

export type LoginForm = {
  /**
   * 验证码
   */
  email: string;
  /**
   * 验证码和密码只传其中一个即可
   */
  emailCode?: null | string;
  /**
   * 验证码和密码只传其中一个即可
   */
  password?: null | string;
  [property: string]: any;
}
