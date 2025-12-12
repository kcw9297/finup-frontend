import React from 'react';
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink } from 'react-router-dom';
import { useMemberJoin } from '../hooks/useMemberJoin';

export default function MemberJoin() {
  const {
    form,
    globalDisabled,
    emailSendStatus,
    verifyStatus,
    emailVerified,
    cooldown,
    fieldErrors,

    showPassword,
    showPasswordConfirm,
    showVerificationInput,

    setShowPassword,
    setShowPasswordConfirm,

    handleChange,
    handleClickSendVerification,
    handleClickCheckVerification,
    handleSubmit,
  } = useMemberJoin(); //완

  const primaryBlue = '#2563EB';
  const primaryBlueDark = '#1D4ED8';
  const borderColor = '#E2E8F0';
  const inputBg = '#FFFFFF';
  const inputSoftBg = '#F8FAFC';
  const inputDisabledBg = '#EFF6FF';

  const successGreen = '#22C55E';
  const errorRed = '#EF4444';
  const neutralGray = '#64748B';

  const radiusCard = 4;
  const radiusInput = 2.5;
  const radiusButton = 999;

  const isEmailSending = emailSendStatus === 'sending';
  const isEmailSent = emailSendStatus === 'sent';
  const isEmailError = emailSendStatus === 'error';

  const isVerifying = verifyStatus === 'verifying';
  const isVerified = verifyStatus === 'verified';

  // 인증 완료면 "인증" 버튼도 잠금
  const isEmailLocked = emailVerified;

  const emailButtonDisabled =
    globalDisabled || isEmailSending || cooldown > 0 || isEmailLocked;

  const emailButtonText = isEmailLocked
    ? '완료'
    : isEmailSending
      ? '전송 중…'
      : cooldown > 0
        ? `재전송(${cooldown}s)`
        : isEmailSent
          ? '전송완료'
          : '인증';

  const verifyButtonText = isVerified ? '완료' : isVerifying ? '확인 중…' : '확인';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: radiusCard,
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: 'none',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            회원가입
          </Typography>
          <Typography variant="body2" color="text.secondary">
            새로운 계정을 만들어보세요.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {/* 이메일 */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.75, textAlign: 'left', fontWeight: 600 }}
              >
                이메일
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  placeholder="email@example.com"
                  disabled={globalDisabled} //  도커 다운일 때만 disabled
                  inputProps={{ readOnly: emailVerified }} //  인증 완료 후 수정만 막기
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: radiusInput,
                      backgroundColor: globalDisabled
                        ? inputDisabledBg
                        : isEmailSending
                          ? inputSoftBg
                          : inputBg,

                      '& input::placeholder': {
                        color: '#94A3B8',
                        fontSize: 14,
                      },

                      '& fieldset': {
                        borderColor: isEmailError ? errorRed : borderColor,
                        borderWidth: '0.8px',
                      },
                      '&:hover fieldset': {
                        borderColor: primaryBlue,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: primaryBlue,
                        borderWidth: '1px',
                      },

                      //  disabled인데 텍스트가 "가려져 보이는" 느낌 방지
                      '&.Mui-disabled': { opacity: 1 },

                      //  인증 완료면 회색 글씨/아이콘
                      ...(emailVerified && {
                        '& input': {
                          color: '#94A3B8',
                          WebkitTextFillColor: '#94A3B8',
                        },
                        '& svg': { color: '#94A3B8' },
                      }),
                    },
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleClickSendVerification}
                  disabled={emailButtonDisabled}
                  sx={{
                    borderRadius: radiusInput,
                    px: 2.5,
                    fontWeight: 600,
                    fontSize: 14,
                    minWidth: 90,
                    bgcolor:
                      isEmailSending || cooldown > 0 || isEmailSent || isEmailLocked
                        ? '#E5E7EB'
                        : primaryBlue,
                    color:
                      isEmailSending || cooldown > 0 || isEmailSent || isEmailLocked
                        ? '#6B7280'
                        : '#FFFFFF',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      bgcolor:
                        isEmailSending || cooldown > 0 || isEmailSent || isEmailLocked
                          ? '#E5E7EB'
                          : primaryBlueDark,
                    },
                  }}
                >
                  {emailButtonText}
                </Button>
              </Box>

              {/* 이메일 상태 메시지 */}
              {isEmailSending && (
                <Typography sx={{ mt: 0.6, fontSize: 12, color: neutralGray }}>
                  인증번호를 전송 중입니다…
                </Typography>
              )}
              {isEmailSent && !emailVerified && (
                <Typography sx={{ mt: 0.6, fontSize: 12, color: successGreen }}>
                  인증번호를 발송했습니다. 메일함을 확인해 주세요.
                </Typography>
              )}
              {isEmailError && (
                <Typography sx={{ mt: 0.6, fontSize: 12, color: errorRed }}>
                  이메일 발송 중 오류가 발생했습니다. 다시 시도해 주세요.
                </Typography>
              )}

              {/* 이메일 유효성 에러 */}
              {fieldErrors.email && (
                <Typography sx={{ mt: 0.6, fontSize: 12, color: errorRed }}>
                  {fieldErrors.email}
                </Typography>
              )}
            </Box>

            {/* 인증번호 입력 */}
            {showVerificationInput && (
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 0.75, textAlign: 'left', fontWeight: 600 }}
                >
                  인증번호
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    name="verificationCode"
                    value={form.verificationCode}
                    onChange={handleChange}
                    fullWidth
                    placeholder="인증번호 6자리"
                    disabled={globalDisabled} //  도커 다운일 때만 disabled
                    inputProps={{ readOnly: isVerified }} //  인증 완료 후 수정만 막기
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleClickCheckVerification();
                    }}
                    InputProps={{
                      sx: {
                        borderRadius: radiusInput,
                        backgroundColor: globalDisabled
                          ? inputDisabledBg
                          : isVerifying
                            ? inputSoftBg
                            : inputBg,

                        '& input::placeholder': {
                          color: '#94A3B8',
                          fontSize: 14,
                        },
                        '& fieldset': {
                          borderColor: borderColor,
                          borderWidth: '0.8px',
                        },
                        '&:hover fieldset': {
                          borderColor: primaryBlue,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: primaryBlue,
                          borderWidth: '1px',
                        },

                        '&.Mui-disabled': { opacity: 1 },

                        ...(isVerified && {
                          '& input': {
                            color: '#94A3B8',
                            WebkitTextFillColor: '#94A3B8',
                          },
                        }),
                      },
                    }}
                  />

                  <Button
                    variant="outlined"
                    onClick={handleClickCheckVerification}
                    disabled={globalDisabled || isVerified || isVerifying}
                    sx={{
                      borderRadius: radiusInput,
                      px: 2.5,
                      fontWeight: 600,
                      fontSize: 14,
                      minWidth: 90,
                      color: isVerifying || isVerified ? '#6B7280' : 'text.primary',
                      borderColor: isVerifying || isVerified ? '#E5E7EB' : borderColor,
                      backgroundColor: isVerifying || isVerified ? '#E5E7EB' : 'transparent',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        borderColor: primaryBlue,
                        bgcolor: isVerifying || isVerified ? '#E5E7EB' : '#EFF6FF',
                      },
                    }}
                  >
                    {verifyButtonText}
                  </Button>
                </Box>

                {/* 인증 상태 메시지 */}
                {isVerifying && (
                  <Typography sx={{ mt: 0.6, fontSize: 12, color: neutralGray }}>
                    인증번호를 확인 중입니다…
                  </Typography>
                )}
                {isVerified && (
                  <Typography sx={{ mt: 0.6, fontSize: 12, color: successGreen }}>
                    이메일 인증이 완료되었습니다.
                  </Typography>
                )}
                {verifyStatus === 'error' && (
                  <Typography sx={{ mt: 0.6, fontSize: 12, color: errorRed }}>
                    인증번호가 올바르지 않습니다. 다시 입력해 주세요.
                  </Typography>
                )}

                {/* 인증 관련 유효성 에러 */}
                {fieldErrors.verificationCode && (
                  <Typography sx={{ mt: 0.6, fontSize: 12, color: errorRed }}>
                    {fieldErrors.verificationCode}
                  </Typography>
                )}
              </Box>
            )}

            {/* 비밀번호 */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.75, textAlign: 'left', fontWeight: 600 }}
              >
                비밀번호
              </Typography>

              {(() => {
                const isPasswordError = form.password.length > 0 && Boolean(fieldErrors.password);

                return (
                  <>
                    <TextField
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      fullWidth
                      placeholder="비밀번호를 입력해 주세요."
                      disabled={globalDisabled}
                      error={isPasswordError} // (선택) 테두리도 에러일 때 빨강 처리
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: radiusInput,
                          backgroundColor: globalDisabled ? inputDisabledBg : inputBg,
                          '& input::placeholder': {
                            color: '#94A3B8',
                            fontSize: 14,
                          },
                          '& fieldset': {
                            borderColor: borderColor,
                            borderWidth: '0.8px',
                          },
                          '&:hover fieldset': {
                            borderColor: primaryBlue,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: primaryBlue,
                            borderWidth: '1px',
                          },
                          '&.Mui-disabled': { opacity: 1 },
                        },
                      }}
                    />

                    {/*  항상 1줄: 기본은 회색, 에러면 빨강 */}
                    <Typography
                      sx={{
                        mt: 0.4,
                        fontSize: 12,
                        color: isPasswordError ? errorRed : neutralGray,
                        fontWeight: isPasswordError ? 600 : 400,
                      }}
                    >
                      공백 제외 영문/숫자/특수문자를 8~20자 사이로 입력해야 합니다.
                    </Typography>
                  </>
                );
              })()}
            </Box>

            {/* 비밀번호 확인 */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.75, textAlign: 'left', fontWeight: 600 }}
              >
                비밀번호 확인
              </Typography>

              <TextField
                name="passwordConfirm"
                type={showPasswordConfirm ? 'text' : 'password'}
                value={form.passwordConfirm}
                onChange={handleChange}
                fullWidth
                placeholder="비밀번호를 다시 입력해 주세요."
                disabled={globalDisabled}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit(e);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPasswordConfirm((prev) => !prev)}
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: radiusInput,
                    backgroundColor: globalDisabled ? inputDisabledBg : inputBg,
                    '& input::placeholder': {
                      color: '#94A3B8',
                      fontSize: 14,
                    },
                    '& fieldset': {
                      borderColor: borderColor,
                      borderWidth: '0.8px',
                    },
                    '&:hover fieldset': {
                      borderColor: primaryBlue,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: primaryBlue,
                      borderWidth: '1px',
                    },
                    '&.Mui-disabled': { opacity: 1 },
                  },
                }}
              />

              {fieldErrors.passwordConfirm && (
                <Typography sx={{ mt: 0.6, fontSize: 12, color: errorRed }}>
                  {fieldErrors.passwordConfirm}
                </Typography>
              )}
            </Box>

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={globalDisabled}
              sx={{
                mt: 1,
                borderRadius: radiusButton,
                py: 1.1,
                fontWeight: 600,
                fontSize: 15,
                bgcolor: primaryBlue,
                '&:hover': {
                  bgcolor: primaryBlueDark,
                },
              }}
            >
              {globalDisabled ? (
                <CircularProgress size={20} sx={{ color: 'white' }} />
              ) : (
                '회원가입'
              )}
            </Button>

            {/* 로그인 링크 */}
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" align="center" color="text.secondary">
                이미 계정이 있으신가요?{' '}
                <MuiLink
                  component={RouterLink}
                  to="/login"
                  underline="hover"
                  sx={{
                    color: primaryBlue,
                    fontWeight: 500,
                  }}
                >
                  로그인
                </MuiLink>
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
