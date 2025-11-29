

// form 데이터 변경 처리 함수
export const changeFormInput = (e, setter) => {
  const { name, value } = e.target;
  setter(prev => ({
    ...prev,
    [name]: value,
  }));
};

// form 제출 처리 함수
export const submitForm = (e) => {

  // 폼 데이터
  const form = new FormData(e.target)
  const data = {}

  // 모둔 고유 키 추출
  const keys = [...new Set(form.keys())];


  // 각 키를 기준으로, 복수개/단수개 구분하여 저장
  keys.forEach(key => {
    const values = form.getAll(key)
    data[key] = values.length > 1 ? values : values[0]
  })

  return data;
}