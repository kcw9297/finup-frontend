import { Box, Typography, Tooltip, IconButton, Stack, Paper } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useWordbook } from "../../wordbook/hooks/useWordbook";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function WordBookContent({ onClose, open }) {

  const { list, loading, removeWord } = useWordbook(open);
  const navigate = useNavigate();

  return (
    <>
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'base.dark',
          height: 60,
          px: 3,
          py: 2,
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'text.contrastText' }}>
          내 단어장
        </Typography>
        <IconButton
          onClick={onClose}
          disableRipple
          disableFocusRipple
          sx={{ color: 'text.contrastText', padding: '5px' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* 컨텐츠 영역 */}
      <Box sx={{ px: 3, py: 3 }}>
        {/* 로딩 */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              불러오는 중...
            </Typography>
          </Box>
        )}

        {/* 빈 상태 */}
        {!loading && list.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              아직 담은 단어가 없습니다.
            </Typography>
          </Box>
        )}

        {/* 단어 리스트 */}
        {!loading && list.length > 0 && (
          <Box 
            sx={{ 
              minHeight: 400, 
              maxHeight: 520, 
              overflowY: 'auto',
              pr: 1,
            }}
          >
            <Stack spacing={2} sx={{ pr: 1 }}>
              {list.map((word) => (
                <Paper
                  key={word.termId}
                  variant="outlined"
                  onClick={() => navigate(`/words/detail/${word.termId}`)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#F6F8FF',
                    },
                  }}
                >
                  {/* 왼쪽: 단어 정보 */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={600} noWrap>
                      {word.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {word.description}
                    </Typography>
                  </Box>

                  {/* 오른쪽: 액션 */}
                  <Box sx={{ flexShrink: 0 }}>
                    <Tooltip title="삭제">
                      <IconButton
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeWord(word.termId);
                        }}
                        sx={{
                          color: "text.secondary",
                          "&:hover": {
                            color: "error.main",
                            backgroundColor: "rgba(211, 47, 47, 0.08)",
                          },
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}