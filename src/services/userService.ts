import APIBase from './httpBase'

export interface UpdateProfilePayload {
  name: string
  lastName: string
  email: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export interface UserProfileResponse {
  id: string
  name: string
  lastName: string
  email: string
  profilePicture: string | null
  role: 'user' | 'admin'
  isVerified: boolean
  subscriptionStatus: 'none' | 'pending' | 'active'
}

class UserService extends APIBase {
  async updateProfile(payload: UpdateProfilePayload) {
    return this.put<{ data: { user: UserProfileResponse }; message: string }>(
      'auth/profile',
      payload,
    )
  }

  async changePassword(payload: ChangePasswordPayload) {
    return this.put<{ message: string }>('auth/change-password', payload)
  }

  async uploadProfilePicture(file: File) {
    const formData = new FormData()
    formData.append('image', file)
    return this.put<{ data: { user: UserProfileResponse }; message: string }>(
      'auth/profile-picture',
      formData,
    )
  }

  async deleteProfilePicture() {
    return this.delete<{ data: { user: UserProfileResponse }; message: string }>(
      'auth/profile-picture',
    )
  }
}

export const userService = new UserService()
export default UserService
