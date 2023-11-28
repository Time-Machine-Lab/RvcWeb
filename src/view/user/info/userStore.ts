import { defineStore } from 'pinia'
import { profile } from '@/view/user/info/userTypes'
export const useUserStore = defineStore({
    id: 'profileStore',
    state: () => ({
        profile: <profile>({

        })
    }),
    getters: {
        getProfile():profile {
            return this.profile
        }
    },
    actions: {
        setProfile(profile: profile) {
            this.profile = profile
        }
    }
})