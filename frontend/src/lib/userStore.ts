import { create } from 'zustand'
import { User, UserStore } from './types'

const userStore = create<UserStore>((set) => ({
	user: null,
	setUser: (partial) =>
		set((state) => ({
			user: { ...state.user, ...partial } as User,
		})),
	clearUser: () => set({ user: null }),
}))

const useUser = () => userStore((s) => s.user)
const useSetUser = () => userStore((s) => s.setUser)
const useClearUser = () => userStore((s) => s.clearUser)

export { useClearUser, useSetUser, useUser }
