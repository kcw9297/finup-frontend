import { Modal, Box, IconButton, Tabs, Tab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function NewsDetailModal({ open, onClose, data }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "600px",
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
        <Box sx={{p: 3, maxHeight:"90vh", overflowY:"auto"}}>
          {/* HEADER */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2}}>
            <Box>
              <h2 style={{ margin: 0 }}>{data?.title}</h2>
              <span style={{ color: "#777", fontSize: "14px" }}>{data?.publishedAt}・{data?.publisher}</span>
            </Box>

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
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
              src={data?.thumbnail}
              alt="뉴스 이미지"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>

          {/* 본문 내용 */}
          <Box sx={{ mb: 3 }}>
            <h3>요약</h3>
            <p>{data?.summary}</p>
          </Box>

          {/* AI 분석 */}
          <Box sx={{ mb: 3 }}>
            <h3>AI 분석</h3>
            <p>{data?.aiAnalysis}</p>
          </Box>

          {/* 필요 개념 */}
          <Box sx={{ mb: 3 }}>
            <h3>필수 개념</h3>
            {data?.concepts?.map((c, idx) => (
              <p key={idx}>• {c}</p>
            ))}
          </Box>

          {/* 추천 콘텐츠 */}
          <Box>
            <h3>추천 콘텐츠</h3>
            <Box sx={{ display: "flex", gap: 2 }}>
              {data?.recommend?.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: "100px",
                    height: "100px",
                    background: "#e5e5e5",
                    borderRadius: "10px",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
