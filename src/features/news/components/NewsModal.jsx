import { Modal, Box, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from 'moment'
export default function NewsDetailModal({ open, onClose, article }) {
  
  const formattedDate = moment(article.publishedAt).format('YYYY-MM-DD HH:mm')
  
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
          overflow: "hidden"
        }}
      >
        {/* 닫기 버튼 - 오른쪽 상단 */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8
          }}
        >
          <CloseIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* 내용 영역 */}
        <Box sx={{ p: 2, padding: "25px", maxHeight: "85vh", overflowY: "auto", "&::-webkit-scrollbar":{display:"none"}, scrollbarWidth:"none"}}>
          
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

          {/* 요약 */}
          <Box sx={{ mb: 10}}>
            <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb: 1 }}>
              <h3 style={{margin:3}}>요약</h3>
              <a
                href={article?.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "14px", color: "#3B5BDB", textDecoration: "none" }}
              >
                원문 보기 →
              </a>
            </Box>
            <p>{article?.ai?.summary}</p>
          </Box>
          

          {/* AI 해설 */}
          <Box sx={{ mb: 10 }}>
            <Box sx={{ mb: 1 }}>
              <h3>AI 해설</h3>
            </Box>
            <p>{article?.ai?.insight}</p>
          </Box>
          {/* 필수 개념 */}
          <Box sx={{ mb: 10 }}>
            <h3>필수 개념</h3>
            {article?.ai?.keywords?.map((item, idx) => (
              <Box key={idx} sx={{ display: "flex",alignItems: "flex-start",gap: 1.5,mb: 1.5 }}>
                <Chip label={item.term} color="primary" variant="outlined" size="small"/>
                <Box sx={{fontSize:14, lineHeight:1.4}}>{item.definition}</Box>
              </Box>
            ))}
          </Box>

          {/* 추천 콘텐츠 */}
          <Box>
            <h3>추천 콘텐츠</h3>
            <Box
              mb={3}
              sx={{ display: "flex", gap: 2 }}
            >
              <Box sx={{ width: 120, height: 120, background: "#e9ecef", borderRadius: "12px" }} />
              <Box sx={{ width: 120, height: 120, background: "#e9ecef", borderRadius: "12px" }} />
              <Box sx={{ width: 120, height: 120, background: "#e9ecef", borderRadius: "12px" }} />
            </Box>
          </Box>

        </Box>
      </Box>
    </Modal>
  );
}
