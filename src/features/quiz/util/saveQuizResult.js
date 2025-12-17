import { api } from "../../../base/utils/fetchUtils";

/**
 * 퀴즈 결과 저장
 * @param {number} score
 * @param {object} options (onSuccess, onError)
 */
export const saveQuizResult = (score, options = {}) => {
  return api.post('/quiz/result', {...options}, {score});
};