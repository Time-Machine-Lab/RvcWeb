/*
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\userStore.ts
 */
import { defineStore } from "pinia";
import { UserInfoVO } from "@/api/user/userTypes";
export const useUserStore = defineStore({
  id: "profileStore",
  state: () => ({
    userInfo: <UserInfoVO>{},
  }),
  getters: {
    getProfile(): UserInfoVO {
      return this.userInfo;
    },
  },
  actions: {
    setProfile(userInfo: UserInfoVO) {
      this.userInfo = userInfo;
    },
  },
});
