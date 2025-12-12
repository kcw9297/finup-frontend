import { navigate, showSnackbar, logout } from '../../base/config/globalHookConfig'

// 환경 변수 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 내부 백엔드 서버에 REST API 요청 전송
 * GET 요청만 params 사용, 그 외 요청은 body를 이용할 것
 * @param endpoint 요청 URL(Endpoint)
 * @param options API 요청에 전송되는 추가 정보
 * @returns 내부 REST API 요청 결과 JSON 객체
 */
async function fetchInner(endpoint, options = {}, body = {}) {

  // [1] 기본 옵션 모음
  const baseOptions = {
    method: 'GET',      // HTTP Method
    params: {},         // URL 등에 존재하는 파라미터
    headers : {},       // HTTP Header
    public: false,      // '/public' 요청인 경우
    admin: false,       // '/admin' 요청인 경우
  }


  // [2] 필요 데이터 선언
  options = { ...baseOptions, ...options} // API 요청 Options
  const requestUrl = buildUrl(endpoint, options) // 요청 URL
  const method = options.method?.toUpperCase() || 'GET' // 실행 메소드
  const hasBody = method !== 'GET' && method !== 'HEAD' // Body 포함가능 여부
  const csrfToken = await getCsrf() // CSRF 공격 방지 토큰 값

  // [3] REST API 요청 수행
  const headers = { // header
    'Content-Type': 'application/json',
    ...(hasBody && csrfToken && { 'X-XSRF-TOKEN': csrfToken }),
    ...options.headers,
  }

  try {
    const response = await fetch(requestUrl, {
      headers,
      method,
      credentials: 'include', // 브라우저가 자동으로 저장된 쿠키를 헤더에 포함하여 전송 (CrossOrigin 시에도 허용)
      ...(hasBody && { body: JSON.stringify(body) })
    })


    // [4] 요청 응답
    const rp = await toJson(response);


    // [5] 성공/실패 처리
    if (!response.ok || !rp.success) {
      console.log('요청 처리 실패', rp)

      // 토큰 만료 혹은 로그인이 필요한 서비스인 경우
      if (['UNAUTHORIZED', 'TOKEN_EXPIRED'].includes(rp.status)) {

        // 스낵바 출력
        showSnackbar(rp.message || "로그인이 필요합니다.")

        // 딜레이 후 리다이렉트
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        
        // 이미 /login 페이지에 있으면 리다이렉트 안 함
        if (currentPath === '/login') return;

        // returnUrl 생성
        const returnUrl = currentPath + currentSearch;
        const loginUrl = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
        console.log('Navigate to:', loginUrl);
        logout();
        window.location.href = loginUrl;

        // 리다이렉트 값을 넘기고 반환
        return { ...rp, redirected: true }
      }

      // 권한이 부족한 경우
      if (rp.status === 'ACCESS_DENIED') {

        // 스낵바 출력
        showSnackbar(rp.message || '잘못된 요청입니다.')

        // 딜레이 후 리다이렉트
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 300);

        // 리다이렉트 값을 넘기고 반환
        return { ...rp, redirected: true }
      }
      
      // 유효성 검사 이외 오류는 메세지 출력 (유효성 검사 오류는 미출력)
      if (rp.status !== 'VALIDATION_INVALID_PARAMETER') 
        showSnackbar(rp.message || '오류가 발생했습니다.')

      // 에러 콜백 함수 존재 시 처리
      if (options.onError) options.onError(rp)

      // 성공 처리
    } else {
      console.log('요청 처리 성공', rp);
      if (options.onSuccess) options.onSuccess(rp) // 성공 콜백함수 있는 경우 실행
    } 

    // promise 반환
    return rp

    // 서버 요청 실패 처리 (서버에 요청을 보내지 않음)
  } catch (err) {
    console.error('API 요청 시도 실패', err)

    // 네트워크 에러를 전달할 응답 추가
    const errorResponse = {
      success: false,
      message: '서버 연결에 실패했습니다. 잠시 후에 다시 시도해 주세요.',
      error: err.message
    }

    // 스낵바 출력
    showSnackbar(errorResponse.message)

    // 실패 콜백함수가 있다면 실행 후 오류 응답 반환
    if (options.onError) options.onError(errorResponse)
    return errorResponse


    // onFinally 콜백 함수 존재 시 수행
  } finally {
    if (options.onFinally) options.onFinally()
  }
}



/**
 * 내부 백엔드 서버에 파일 업로드용 REST API 요청 전송
 * GET 요청만 params 사용, 그 외 요청은 body를 이용할 것
 * @param endpoint 요청 URL(Endpoint)
 * @param options API 요청에 전송되는 추가 정보
 * @param formData 파일 업로드 요청 Form 객체
 * @returns 내부 REST API 요청 결과 JSON 객체
 */
async function fetchInnerFile(endpoint, options = {}, formData) {

  // [1] 기본 옵션 모음
  const baseOptions = {
    method: 'POST',      // HTTP Method
    headers : {},       // HTTP Header
    public: false,      // '/public' 요청인 경우
    admin: false,       // '/admin' 요청인 경우
  }


  // [2] 필요 데이터 선언
  options = { ...baseOptions, ...options} // API 요청 Options
  const requestUrl = buildUrl(endpoint, options) // 요청 URL
  const method = options.method?.toUpperCase() || 'POST' // 실행 메소드
  const csrfToken = await getCsrf() // CSRF 공격 방지 토큰 값

  // [3] REST API 요청 수행
  const headers = { // header
    ...(csrfToken && { 'X-XSRF-TOKEN': csrfToken }),
    ...options.headers,
  }

  try {
    const response = await fetch(requestUrl, {
      headers,
      method,
      credentials: 'include', // 브라우저가 자동으로 저장된 쿠키를 헤더에 포함하여 전송 (CrossOrigin 시에도 허용)
      body: formData 
    })

    // [4] 요청 응답
    const rp = await toJson(response);

    // [5] 성공/실패 처리
    if (!response.ok || !rp.success) {
      console.log('요청 처리 실패', rp)
      
      // 토큰 만료 혹은 로그인이 필요한 서비스인 경우
      if (['UNAUTHORIZED', 'TOKEN_EXPIRED'].includes(rp.status)) {

        // 스낵바 출력
        showSnackbar(rp.message || "로그인이 필요합니다.")

        // 딜레이 후 리다이렉트
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        
        // 이미 /login 페이지에 있으면 리다이렉트 안 함
        if (currentPath === '/login') return;

        // returnUrl 생성
        const returnUrl = currentPath + currentSearch;
        const loginUrl = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
        console.log('Navigate to:', loginUrl);
        logout();
        window.location.href = loginUrl;

        // 리다이렉트 값을 넘기고 반환
        return { ...rp, redirected: true }
      }

      // 권한이 부족한 경우
      if (rp.status === 'ACCESS_DENIED') {

        // 스낵바 출력
        showSnackbar(rp.message || '잘못된 요청입니다.')

        // 딜레이 후 리다이렉트
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 300);

        // 리다이렉트 값을 넘기고 반환
        return { ...rp, redirected: true }
      }

      // 유효성 검사 이외 오류는 메세지 출력 (유효성 검사 오류는 미출력)
      if (rp.status !== 'VALIDATION_INVALID_PARAMETER') 
        showSnackbar(rp.message || '오류가 발생했습니다.')

      // 에러 콜백 함수 존재 시 처리
      if (options.onError) options.onError(rp)

      // 성공 처리
    } else {
      console.log('요청 처리 성공', rp);
      if (options.onSuccess) options.onSuccess(rp) // 성공 콜백함수 있는 경우 실행
    } 

    // promise 반환
    return rp

    // 서버 요청 실패 처리 (서버에 요청을 보내지 않음)
  } catch (err) {
    console.error('API 요청 시도 실패', err)

    // 네트워크 에러를 전달할 응답 추가
    const errorResponse = {
      success: false,
      message: '서버 연결에 실패했습니다. 잠시 후에 다시 시도해 주세요.',
      error: err.message
    }

    // 스낵바 출력
    showSnackbar(errorResponse.message)

    // 실패 콜백함수가 있다면 실행 후 오류 응답 반환
    if (options.onError) options.onError(errorResponse)
    return errorResponse

    // onFinally 콜백 함수 존재 시 수행
  } finally {
    if (options.onFinally) options.onFinally()
  }
}



/**
 * 외부 API에 REST API 요청 전송
 * @param endpoint 요청 URL(Endpoint)
 * @param options API 요청에 전송되는 추가 정보
 * @returns 내부 REST API 요청 결과 JSON 객체
 */

async function fetchEx(endpoint, options = {}, body = {}) {

  // [1] 기본 옵션 모음
  const baseOptions = {
    method: 'GET',
    headers : {},
    public: false,      // '/public' 요청인 경우
    admin: false,       // '/admin' 요청인 경우
    handleError: true,  // 기본 에러 처리 활성화 
  }

  
  // [2] 필요 데이터 선언
  options = { ...baseOptions, ...options} // API 요청 Options
  const method = options.method?.toUpperCase() || "GET" // 실행 메소드
  const hasBody = method !== "GET" && method !== "HEAD" // Body 포함가능 여부

  // 외부 API용 헤더 설정
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // API 키가 필요한 경우 추가
  if (options.apiKey) {
    headers['Authorization'] = `Bearer ${options.apiKey}`
    // 또는 headers['X-API-Key'] = options.apiKey;
  }

  // 외부 API 호출 수행
  try {
    const response = await fetch(endpoint, {
      headers,
      method,
      ...(hasBody && { body: JSON.stringify(body) })
    });

    // 호출 결과 JSON 변환
    const json = await toJson(response);
    console.log('외부 API 요청 결과', json)
    
    // 콜백 함수에 따라 성공/실패 처리
    if (!response.ok || !json.success) {
      if (options.onError) options.onError(json)
      else console.error('외부 API 요청 실패!');

    } else {
      if (options.onSuccess) options.onSuccess(json)
      else console.log('외부 API 요청 성공!');
    } 

    // promise 반환
    return json

  } catch (err) {
    console.error('외부 API 요청 시도 실패', err)

    // 스낵바 출력
    if (options.handleError) 
      showSnackbar('서버 연결에 실패했습니다. 잠시 후에 다시 시도해 주세요.')

    // 네트워크 에러를 전달할 응답 추가
    const errorResponse = {
      success: false,
      message: '외부 API 연결 시도에 실패했습니다. 잠시 후에 다시 시도해 주세요.',
      error: err.message
    }

    // 실패 콜백함수가 있다면 실행 후 오류 응답 반환
    if (options.onError) options.onError(errorResponse)
    return errorResponse

    
    // onFinally 콜백 함수 존재 시 수행
  } finally {
    if (options.onFinally) options.onFinally()
  }
}


/**
 * URL 빌드 함수
 * @param endpoint API 엔드포인트
 * @param options 옵션 객체 (public, admin 포함)
 * @returns 완성된 URL
 */
function buildUrl(endpoint, options) {

  // [1] public, admin 여부 판별 값
  const { public: isPublic, admin: isAdmin } = options;
  const hasParams = options.method === 'GET' && options.params && Object.keys(options.params).length > 0


  // [2] 경우의 수 확인 후, 기본 URL 생성
  let baseUrl;
  if (isPublic && isAdmin) { // public과 admin이 둘 다 true인 경우
    console.warn('public과 admin이 동시에 true 입니다.');
    baseUrl = `${BASE_URL}/api${endpoint}`;
  } else if (isPublic) { // public API (로그인 불필요)
    baseUrl = `${BASE_URL}/public/api${endpoint}`;
  } else if (isAdmin) { // admin API (관리자)
    baseUrl = `${BASE_URL}/admin/api${endpoint}`;
  } else { // 그 외 API
    baseUrl = `${BASE_URL}/api${endpoint}`;
  }


  // [3] GET 요청이고, params 존재 시, URL 뒤에 쿼리스트링 추가
  if (hasParams) {
    const queryString = new URLSearchParams(
      Object.entries(options.params)
        .filter(([_, value]) => value !== null && value !== undefined && value !== '') // 유효한 파라미터만 필터링
        .map(([key, value]) => [key, String(value)]) // 문자열로 변환
    ).toString();

    baseUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl
  }


  // [4] 완성된 URL 반환
  return baseUrl
}


/**
 * CSRF 토큰 값 추출
 * @returns CSRF 토큰 값
 */
async function getCsrf() {
  let csrf = getCsrfFromCookie()
  if (csrf) return csrf // 존재하는 경우, 그대로 반환 

  // 직접 fetch 호출
  try {
    const response = await fetch(`${BASE_URL}/api/auth/csrf`, {
      method: 'GET',
      credentials: 'include',
    })

    const rp = await toJson(response)
    console.log("요청 처리 성공", rp)

  } catch (err) {
    console.error('CSRF 토큰 발급 실패', err)
  }

  // 다시 수행
  return getCsrfFromCookie()
}

/**
 * CSRF 쿠키 값 추출
 * @returns CSRF 쿠키에서 추출한 토큰 값
 */
function getCsrfFromCookie() {
  const value = `; ${document.cookie}`
  const parts = value.split('; XSRF-TOKEN=') // 서버에서 전달한 CSRF 쿠키
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return null
}


/**
 * JSON 파싱 보조 함수
 * @response REST API 요청 결과 Promise
 * @returns JSON 형태로 변환된 JS Object
 */
async function toJson(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}


/**
 * API 요청을 호출할 수 있는 함수
 */
export const api = {

  get: (endpoint, options) => fetchInner(endpoint, options, {}),
  getEx: (endpoint, options) => fetchEx(endpoint, options, {}), // 외부 API GET 요청
  post: (endpoint, options, body = {}) => fetchInner(endpoint, { method: "POST", ...options }, body),
  postImage: (endpoint, options, formData) => fetchInnerFile(endpoint, { method: "POST", ...options }, formData),
  put: (endpoint, options, body = {}) => fetchInner(endpoint, { method: "PUT", ...options }, body),
  patch: (endpoint, options, body = {}) => fetchInner(endpoint, { method: "PATCH", ...options }, body),
  delete: (endpoint, options) => fetchInner(endpoint, { method: "DELETE", ...options }, {}),
}