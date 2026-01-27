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
import { useNewsWordsRecommendation } from "../hooks/useNewsWordsRecommendation.js";


export default function NewsDetailModal({ open, onClose, article }) {

  // 뉴스 내 AI 분석 요청
  const { 
    analysis, loading: loadingAnalyze, 
    setNewsId: setNewsIdForAnalysis, setOpen: setOpenForAnalysis, retryAnalysis 
  } = useNewsAnalyzation()

  const { 
    recommendation, loading: loadingRecommendation, 
    setNewsId: setNewsIdForRecommendation, setOpen: setOpenForRecommendation, retryRecommendation
  } = useNewsWordsRecommendation()

  // 모달이 열릴 때 AI 분석 실행
  useEffect(() => {

    if (article?.newsId) {
      setNewsIdForAnalysis(article.newsId)
      setNewsIdForRecommendation(article.newsId)
    }

    setOpenForAnalysis(open)
    setOpenForRecommendation(open)

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
          {loadingAnalyze && (
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
                <IconButton
                  size="small"
                  disabled={loadingAnalyze}
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
              </Tooltip>
            </Box>
            
            {loadingAnalyze ? (
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

          {/* AI 학습단어 추천 */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{  
              gap: 2,
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <h3>AI 학습단어 추천</h3>
              
              <Tooltip title="재추천">
                <IconButton
                  size="small"
                  disabled={loadingRecommendation}
                  sx={{
                    border: '1px solid',
                    borderColor: 'line.dark',
                    borderRadius: 1,
                    width: 32,
                    height: 32
                  }}
                  onClick={retryRecommendation}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            {loadingRecommendation ? (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={142} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={130} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={85} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={85} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={95} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={75} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={88} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={82} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={92} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={92} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={112} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={135} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={98} height={32} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={102} height={32} sx={{ borderRadius: 2 }} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {recommendation?.map((word) => (
                  <Chip
                    key={word.termId}
                    label={word.name}
                    size="small"
                    variant="outlined"
                    onClick={() => window.open(`/words/detail/${word.termId}`, '_blank')}
                    sx={{
                      borderRadius: '999px',
                      cursor: 'pointer',
                      '&:hover': { 
                        bgcolor: '#F5F5F5' 
                      }
                    }}
                  />
                )) || (
                  <Typography color="text.secondary" fontSize={14}>
                    추천 단어가 없습니다.
                  </Typography>
                )}
              </Box>
            )}
          </Box>


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
