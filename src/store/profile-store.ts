import { create } from "zustand"

interface ProfileState {
  profileImage: string | null
  userName: string | null
  setProfileImage: (image: string | null) => void
  setUserName: (name: string | null) => void
  updateProfile: (image: string | null, name: string | null) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileImage: null,
  userName: null,
  setProfileImage: (image) => set({ profileImage: image }),
  setUserName: (name) => set({ userName: name }),
  updateProfile: (image, name) => set({ profileImage: image, userName: name })
}))
