export let navigate = null;      // 전역 스코프로 선언할 navigate
export let showSnackbar = null;  // 전역 스코프로 선언할 snackbar

// 전역적으로 사용할 Hook 초기화
export function initGlobalHook(navigateFn, snackbarFn) {
  navigate = navigateFn;
  showSnackbar = snackbarFn;
}