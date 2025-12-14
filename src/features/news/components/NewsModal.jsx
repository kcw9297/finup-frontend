import {
  Modal,
  Box,
  IconButton,
  Chip,
  Skeleton,
  keyframes,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function NewsDetailModal({ open, onClose, article, loading }) {
  if (!article) return null;
  const hasDeepAi =
    typeof article?.ai?.summary === "string" && article.ai.summary.length > 0;

  const hasLightAi =
    !!article?.summary &&
    typeof article?.summary?.summary === "string" &&
    article.summary.summary.length > 0;

  const showLightSection = loading || hasLightAi;

  const formattedDate = moment(article.publishedAt).format("YYYY-MM-DD HH:mm");
  const sparkle = keyframes`
    0% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.15); }
    100% { opacity: 0.4; transform: scale(1); }
  `;
  console.log("summary raw =", article.summary);
  console.log("hasLightAi =", hasLightAi);
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
          <Box sx={{ mb: 3 }}>
            <img
              src={article?.thumbnail}
              alt="뉴스 이미지"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
          {loading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
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
          {/* 요약 */}
          {(hasDeepAi || showLightSection) && (
            <Box sx={{ mb: 10 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <h3>요약</h3>
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
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  height={80}
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <p>
                  {hasDeepAi ? article.ai.summary : article.summary.summary}
                </p>
              )}
            </Box>
          )}

          {/* AI 해설 */}
          {hasDeepAi && (
            <Box sx={{ mb: 10 }}>
              <Box sx={{ mb: 1 }}>
                <h3>AI 해설</h3>
              </Box>
              {loading ? (
                <>
                  <Skeleton height={20} width="90%" />
                  <Skeleton height={20} width="95%" />
                  <Skeleton height={20} width="80%" />
                </>
              ) : (
                <p>{article?.ai?.insight}</p>
              )}
            </Box>
          )}

          {/* 필수 개념 */}
          {(hasDeepAi || showLightSection) && (
            <Box sx={{ mb: 10 }}>
              <h3>필수 개념</h3>
              {loading ? (
                <>
                  <Skeleton height={30} width="60%" />
                  <Skeleton height={30} width="50%" />
                  <Skeleton height={30} width="70%" />
                </>
              ) : (
                (hasDeepAi
                  ? article.ai.keywords
                  : article.summary.keywords
                )?.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.5,
                    }}
                  >
                    <Chip
                      label={item.term}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Box sx={{ fontSize: 14, lineHeight: 1.4 }}>
                      {item.definition}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
