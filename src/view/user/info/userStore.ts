import { defineStore } from 'pinia'
import { Profile } from '@/view/user/info/userTypes'
export const useUserStore = defineStore({
    id: 'profileStore',
    state: () => ({
        profile: <Profile>({

        })
    }),
    getters: {
        getProfile():Profile {
            return this.profile
        }
    },
    actions: {
        setProfile(profile: Profile) {
            this.profile = profile
        }
    }
})