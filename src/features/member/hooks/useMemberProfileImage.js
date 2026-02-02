import { api } from '../../../base/utils/fetchUtils'
import { useLoginMemberStore } from '../../../base/stores/useLoginMemberStore'
import { useSnackbar } from '../../../base/provider/SnackbarProvider'
import { useEffect, useState } from 'react'
import { useLoginMember } from '../../../base/hooks/useLoginMember'

/**
 * 회원 프로필 이미지 변경 훅
 * - 파일 선택 + 업로드 요청 전담
 * - 성공 여부(boolean) 반환
 */


export function useMemberProfileImage() {
  const { showSnackbar } = useSnackbar()

  const [profileFile, setProfileFile] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const { handleEditLoginMember } = useLoginMember()


  const changeProfileImage = (file) => {
    if (!file) return
    setLoading(true)
    setProfileFile(file)
    setProfilePreview(URL.createObjectURL(file))
    setLoading(false)
  }

  // 초기화 함수
  const resetProfileImage = () => {
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview)
    }
    setProfileFile(null)
    setProfilePreview(null)
  }

  // preview URL 정리(메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview)
      }
    }
  }, [profilePreview])

  const submitProfileImage = async () => {

    if (!profileFile) {
      showSnackbar('이미지를 선택해주세요.', 'warning')
      return
    }

    const formData = new FormData()
    formData.append('file', profileFile)

    setLoading(true)
    let success = false

    await api.postImage('/members/me/profile-image', {
      onSuccess: (rp) => {
        showSnackbar('프로필 이미지가 변경되었습니다.', 'success')
        success = true
        handleEditLoginMember({ profileImageUrl : rp.data })
      },
      onError: (rp) => {
        showSnackbar(rp?.message || "프로필 이미지 변경에 실패했습니다.")
      },

      onFinally: () => {
        setLoading(false)
      }
    },
      formData
    )

    return success
  }

  return {
    profilePreview,
    submitProfileImage,
    loading,
    changeProfileImage,
    resetProfileImage
  }
}
