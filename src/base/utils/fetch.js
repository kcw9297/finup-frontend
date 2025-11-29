import { navigate, showSnackbar } from '../../base/config/globalHookConfig'

// 환경 변수 
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 내부 백엔드 서버에 REST API 요청 전송
 * @param endpoint 요청 URL(Endpoint)
 * @param options API 요청에 전송되는 추가 정보
 * @returns 내부 REST API 요청 결과 JSON 객체
 */
export async function fetchInner(endpoint, options = {}) {

  // [1] 추가 옵션
  const addOptions = {
    handleError: true,  // 기본 에러 처리 활성화 
  }


  // [2] 필요 데이터 선언
  const url = `${BASE_URL}${endpoint}`; // 요청 URL
  const method = options.method?.toUpperCase() || "GET"; // 실행 메소드
  const hasBody = method !== "GET" && method !== "HEAD"; // Body 포함가능 여부
  options = { ...addOptions, ...options} // API 요청 Options


  // [3] REST API 요청 수행
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type' : 'application/json',
        ...options.headers,
      },
      credentials: 'include', // 브라우저가 자동으로 저장된 쿠키를 헤더에 포함하여 전송 (CrossOrigin 시에도 허용)
      method: method,
      ...(hasBody && { body: JSON.stringify(options.body) })
    })


    // [4] 요청 응답
    const rp = await toJson(response);


    // [5] 성공/실패 처리
    if (!response.ok || !rp.success) {
      console.log('요청 처리 실패', rp)
      
      // 기본 처리가 활성화 된 경우 실행
      if (options.handleError) {

          // 토큰 만료 혹은 로그인이 필요한 서비스인 경우
          if (['UNAUTHORIZED', 'TOKEN_EXPIRED'].includes(rp.status)) {

            // 스낵바 출력
            showSnackbar(rp.message || "로그인이 필요합니다.")

            // 딜레이 후 리다이렉트
            setTimeout(() => {
              const returnUrl = window.location.pathname + window.location.search;
              navigate(`/login?returnUrl=${encodeURIComponent(returnUrl)}`, { replace: true });
            }, 300);

            // 리다이렉트 값을 넘기고 반환
            return { ...rp, redirected: true }
          }

          // 권한이 부족한 경우
          if (rp.status === 'ACCESS_DENIED') {

            // 스낵바 출력
            showSnackbar(rp.message || '잘못된 요청입니다.')

            // 딜레이 후 리다이렉트
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 300);

            // 리다이렉트 값을 넘기고 반환
            return { ...rp, redirected: true }
          }

          // fieldError 발생 시
          
          // 그 외 오류는 스낵바만 출력
          showSnackbar(rp.message || '오류가 발생했습니다.')
      }

      // 에러 콜백 함수 존재 시 처리
      if (options.onError) options.onError(rp)


      // 성공 처리
    } else {
      console.log('요청 처리 성공', rp);
      if (options.onSuccess) options.onSuccess(rp) // 성공 콜백함수 있는 경우 실행
    } 

    // promise 반환
    return rp

    // 서버 요청 실패 처리 (서버에 요청을 보내지)
  } catch (err) {
    console.error('API 요청 시도 실패', err)

    // 스낵바 출력
    if (options.handleError) 
      showSnackbar('서버 연결에 실패했습니다. 잠시 후에 다시 시도해 주세요.')
  
    // 네트워크 에러를 전달할 응답 추가
    const errorResponse = {
      success: false,
      message: '서버 연결에 실패했습니다. 잠시 후에 다시 시도해 주세요.',
      error: err.message
    }

    // 실패 콜백함수가 있다면 실행 후 오류 응답 반환
    if (options.onError) options.onError(errorResponse)
    return errorResponse
  }
}



/**
 * 외부 API에 REST API 요청 전송
 * @param endpoint 요청 URL(Endpoint)
 * @param options API 요청에 전송되는 추가 정보
 * @returns 내부 REST API 요청 결과 JSON 객체
 */

export async function fetchEx(endpoint, options = {}) {

  // 기본 메서드
  const method = options.method?.toUpperCase() || "GET";

  // Body를 포함할 수 있는지 판별 (GET, HEAD 메소드는 포함 불가능)
  const hasBody = method !== "GET" && method !== "HEAD";

  // 외부 API용 헤더 설정
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // API 키가 필요한 경우 추가
  if (options.apiKey) {
    headers['Authorization'] = `Bearer ${options.apiKey}`;
    // 또는 headers['X-API-Key'] = options.apiKey;
  }

  // 외부 API 호출 수행
  try {
    const response = await fetch(endpoint, {
      headers,
      method,
      ...(hasBody && { body: options.body })
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
  }
}

/**
 * JSON 파싱 보조 함수
 */
async function toJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}