import { Modal, Box, IconButton, Tabs, Tab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function NewsDetailModal({ open, onClose, article, loading }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
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
        <Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{p: 3, maxHeight:"90vh", overflowY:"auto"}}>
          
          {/* HEADER */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2}}>
            <Box>
              <h2 style={{ margin: 0 }}>{article?.title}</h2>
              <span style={{ color: "#777", fontSize: "14px" }}>{article?.publishedAt}・{article?.publisher}</span>
            </Box>
          </Box>
          

          {/* TABS */}
          {/* <Tabs value={0} sx={{ mb: 2 }}>
            <Tab label="탭1" />
            <Tab label="탭2" />
            <Tab label="탭3" />
            <Tab label="탭4" />
          </Tabs> */}

          {/* IMAGE */}
          <Box sx={{ mb: 3 }}>
            <img
              src={article?.thumbnail}
              alt="뉴스 이미지"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>

          {/* 본문 내용 */}
          <Box sx={{ mb: 3 }}>
            <h3>요약</h3>
            <a href={article?.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#3B5BDB', textDecoration:"none" }}>
              원문 보기 →
            </a>
            <p>{article?.ai?.summary}</p>
          </Box>

          {/* AI 분석 */}
          <Box sx={{ mb: 3 }}>
            <h3>AI 해설</h3>
            <p>{article?.ai?.explanation}</p>
          </Box>

          {/* 필요 개념 */}
          <Box sx={{ mb: 3 }}>
            <h3>필수 개념</h3>
            {article?.ai?.keywords?.map((c, idx) => (
              <p key={idx}>• {c}</p>
            ))}
          </Box>

          {/* 추천 콘텐츠 */}
          <Box>
            <h3>추천 콘텐츠</h3>
            <Box
                mt={2}
                sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    background: "#e9ecef",
                    borderRadius: "12px",
                  }}
                />
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    background: "#e9ecef",
                    borderRadius: "12px",
                  }}
                />
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    background: "#e9ecef",
                    borderRadius: "12px",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
    </Modal>
  );
}