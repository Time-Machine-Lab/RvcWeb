/*
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\view\user\info\userStore.ts
 */
import { defineStore } from "pinia";
import { Profile } from "@/api/user/userTypes";
export const useUserStore = defineStore({
  id: "profileStore",
  state: () => ({
    profile: <Profile>{},
  }),
  getters: {
    getProfile(): Profile {
      return this.profile;
    },
  },
  actions: {
    setProfile(profile: Profile) {
      this.profile = profile;
    },
  },
});
