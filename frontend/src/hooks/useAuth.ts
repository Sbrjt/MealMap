import { AuthStore } from '@/types'
import { create } from 'zustand'

const useAuth = create<AuthStore>((set) => ({
	user: null,
	setUser: (newUser) => set(() => ({ user: newUser })),
}))

export default useAuth
