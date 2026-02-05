import {
  Modal,
  Box,
  IconButton,
  Chip,
  Skeleton,
  keyframes,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNewsAnalyzation } from "../hooks/useNewsAnalyzation.js";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from "react";
import { useNewsWordsAnalyzation } from "../hooks/useNewsWordsAnalyzation.js";


export default function NewsDetailModal({ open, onClose, article, analyzeWord }) {

  // 뉴스 내 AI 분석 요청
  const { 
    analysis, loading: loadingAnalysis, 
    setNewsId: setNewsIdForAnalysis, setOpen: setOpenForAnalysis, retryAnalysis 
  } = useNewsAnalyzation()

  const { 
    analysisWords, loading: loadingAnalysisWords, 
    setNewsId: setNewsIdForAnalysisWords, setOpen: setOpenForAnalysisWords, retryAnalysisWords
  } = useNewsWordsAnalyzation(analyzeWord)

  // 모달이 열릴 때 AI 분석 실행
  useEffect(() => {

    if (article?.newsId) {
      setNewsIdForAnalysis(article.newsId)
      setNewsIdForAnalysisWords(article.newsId)
    }

    setOpenForAnalysis(open)
    setOpenForAnalysisWords(open)

  }, [open, article?.newsId]);



  const formattedDate = moment(article?.publishedAt).format("YYYY-MM-DD HH:mm");
  const sparkle = keyframes`
    0% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.15); }
    100% { opacity: 0.4; transform: scale(1); }
  `;
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "relative",
          width: "800px",
          bgcolor: "#fff",
          mx: "auto",
          mt: "40px",
          borderRadius: "12px",
          p: 3,
          outline: "none",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
      >
        {/* 닫기 버튼 - 오른쪽 상단 */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* 내용 영역 */}
        <Box
          sx={{
            p: 2,
            padding: "25px",
            maxHeight: "85vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {/* HEADER */}
          <Box sx={{ mb: 3 }}>
            <h2 style={{ margin: 0 }}>{article?.title}</h2>
            <span style={{ color: "#777", fontSize: "14px" }}>
              {formattedDate} · {article?.publisher}
            </span>
          </Box>

          {/* IMAGE */}
          <Box sx={{ mb: 3, display:"flex", justifyContent:"center" }}>
            <img
              src={article?.thumbnail}
              alt="뉴스 이미지"
              style={{ width: "70%", borderRadius: "10px" }}
            />
          </Box>
          

          {/* AI 분석 중 표시 */}
          {(loadingAnalysis || loadingAnalysisWords) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
              }}
            >
              <AutoAwesomeIcon
                sx={{
                  color: "#3B5BDB",
                  animation: `${sparkle} 1.5s ease-in-out infinite`,
                }}
              />
              <Typography
                sx={{ fontSize: 14, color: "#3B5BDB", fontWeight: 600 }}
              >
                AI 분석 중…
              </Typography>
            </Box>
          )}

          {/* AI 해설 */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{  
              gap: 2,
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <h3>AI 해설</h3>
              
              <Tooltip title="재추천">
                <span>
                  <IconButton
                    size="small"
                    disabled={loadingAnalysis}
                    sx={{
                      border: '1px solid',
                      borderColor: 'line.dark',
                      borderRadius: 1,
                      width: 32,
                      height: 32
                    }}
                    onClick={() => {
                      retryAnalysis()
                    }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
            
            {loadingAnalysis ? (
              <>
                <Skeleton height={20} width="90%" />
                <Skeleton height={20} width="95%" />
                <Skeleton height={20} width="80%" />
              </>
            ) : (
              <Typography color="text.secondary" fontSize={14}>
                {analysis || "AI 해설이 제공되지 않았습니다." }
              </Typography>
            )}
          </Box>

          {/* AI 뉴스단어 분석 */}
          {analyzeWord && <Box sx={{ mb: 3 }}>
            <Box sx={{  
              gap: 2,
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <h3>AI 뉴스단어 분석</h3>
              
              {/* AI 뉴스단어 분석 재추천 버튼 */}
              <Tooltip title="재추천">
                <span>
                  <IconButton
                    size="small"
                    disabled={loadingAnalysisWords}
                    sx={{
                      border: '1px solid',
                      borderColor: 'line.dark',
                      borderRadius: 1,
                      width: 32,
                      height: 32
                    }}
                    onClick={retryAnalysisWords}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>

            {analyzeWord && loadingAnalysisWords ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {[...Array(5)].map((_, idx) => (
                  <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Skeleton variant="rectangular" width={200} height={20} sx={{ borderRadius: 2 }} />
                    <Skeleton width="90%" height={20} />
                  </Box>
                ))}
              </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                  {analysisWords && analysisWords.length > 0 ? (
                    analysisWords.map((word, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex', 
                          gap: 2, 
                          alignItems: 'center',
                          p: 1,
                          borderRadius: 2,
                          transition: 'background-color 0.2s',
                          '&:hover': {
                            bgcolor: '#F8F9FA'
                          }
                        }}
                      >
                        {/* 칩 영역 - 고정 너비 */}
                        <Box sx={{ minWidth: 220, display: 'flex', justifyContent: 'flex-start' }}>
                          <Chip
                            label={word.name}
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              const newWindow = window.open(`/words/search?keyword=${word.name}`, '_blank')
                              newWindow.location.href = `/words/search?keyword=${word.name}`
                            }}
                            sx={{
                              borderRadius: '999px',
                              cursor: 'pointer',
                              fontWeight: 600,
                              '&:hover': { 
                                bgcolor: '#E7F5FF',
                                borderColor: '#3B5BDB'
                              }
                            }}
                          />
                        </Box>
                        
                        {/* 설명 영역 - 나머지 공간 */}
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            sx={{ 
                              fontSize: 12, 
                              color: 'text.secondary',
                              lineHeight: 1.6
                            }}
                          >
                            {word.meaning.split('.').map((part, i, arr) => (
                              <span key={i}>
                                {part.trim()}
                                {i < arr.length - 1 && (
                                  <>
                                    .
                                    <br />
                                  </>
                                )}
                              </span>
                            ))}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography color="text.secondary" fontSize={14} sx={{ mt: 1 }}>
                      분석된 단어가 없습니다.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          }

          {/* 본문 */}
          <Box sx={{ mb: 5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <h3>본문</h3>
              <a
                href={article?.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "14px",
                  color: "#3B5BDB",
                  textDecoration: "none",
                }}
              >
                원문 보기 →
              </a>
            </Box>
            
              <Typography 
                sx={{ 
                  lineHeight: 1.8, 
                  whiteSpace: "pre-line",
                  fontSize: "15px",
                  color: "#333"
                }}
              >
                {article?.description || article?.summary || "본문 내용이 없습니다."}
              </Typography>
            
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              onClick={onClose}
              sx={{
                backgroundColor: 'base.dark',
                color: 'text.contrastText',
                padding: '10px 20px',
                border: 2,
                borderColor: 'base.dark',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              닫기
            </Button>
          </Box>

      </Box>
      </Box>
    </Modal>
  );
}
