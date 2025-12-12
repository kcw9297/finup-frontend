/** 회원가입 진행 상태(idle / validating / requesting / network_error)를
 *명확한 상태값으로 관리하는 상태 머신 훅
 */

import { useMemo, useState } from 'react';

export function useJoinStatusMachine() {
  /**
   * - idle
   * - validating
   * - requesting
   * - network_error
   */
  const [joinStatus, setJoinStatus] = useState('idle');

  const derived = useMemo(() => {
    const isRequesting = joinStatus === 'requesting';
    const isNetworkError = joinStatus === 'network_error';
    return {
      isRequesting,
      isNetworkError,
      globalDisabled: isRequesting || isNetworkError,
    };
  }, [joinStatus]);

  return { joinStatus, setJoinStatus, ...derived };
}