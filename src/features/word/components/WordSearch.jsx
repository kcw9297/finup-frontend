import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// TODO: 훅 연결 전까지 임시 데이터
const MOCK_ROWS = [
  {
    no: 1,
    category: '금융',
    word: '주가지수선물거래',
    description:
      '금융선물거래의 한 종류로, 증권시장이나 해외지수에 매매되는 전체 또는 일부 주식의 가격수준인 주가지수를 매매대상으로 한다. 주가지수는 해당 상장주식의 가격수준을 나타내는 추상 수치로 인도 및 인수가 불가능하기 때문에 실제로 존재하는 농산물·금속·통화·채권·주식 등 현물을 대상으로 하는 선물계약과는 다르게 주가지수선물계는 최종 ...',
  },
  {
    no: 2,
    category: '금융',
    word: 'NDF(Non-Deliverable Forward; 역외선물환)',
    description:
      '본국의 세제나 운용상의 규제를 피해 금융·조세·외환관리 면에서 특정 요인을 누릴 수 있도록 타국(역외)에서 운용하는 선물환으로, 파생금융상품의 일종이다. 보통 역외선물환, 차액결제선물환이라 부르며, 영문 약자표를 따 NDF라고도 한다. 역외선물환 시장에서는 만기 현물을 인도하거나 계약 물금을 상호 교환하지 않고 계약한 선물환율과 ...',
  },
  {
    no: 3,
    category: '금융',
    word: '미국 상품 선물 거래 위원회(CFTC: U.S. Commodity Futures Trading Commission)',
    description:
      '미국의 Commodity Futures Trading Commission Act에 따라 1974년에 설립된 독립 조직이다. 원자재에 대한 선물 거래, 옵션 시장을 규제한다. 규제의 목표는 경쟁적인 선물 시장을 유지하는 동시에 투자자를 여러 부정적인 경제적 조작, 사기 등으로부터 보호하는 것이다.',
  },
  {
    no: 4,
    category: '금융',
    word: '선물거래',
    description:
      '선물(futures)거래란 장래 일정 시점에 미리 정한 가격으로 매매할 것을 현재 시점에서 약정하는 거래로, 미래의 가치를 사고 파는 것이다. 선물의 가가 현물시장에 운용되는 기초자산(채권, 외환, 주식 등의 가격 변동)에 의해 파생적으로 결정되는 파생상품(derivatives) 거래의 일종이다. 미리 정한 가격으로 매매를 약속한 것이기 때문에 가...',
  },
  {
    no: 5,
    category: '금융',
    word: '선도환(선물환)/선물환거래',
    description:
      '선도환은 선물환이라고도 하며 미래의 일정기간 내에 일정금액, 일정종류의 외화를 일정 환율로 매매할 것을 약속한 외화환율 뜻한다. 이와 거래를 하는 이유는 기업이 장래의 환율 변동을 피하기 위해 환율을 고정하거나, 환율의 변동을 이용해 이익을 얻기 위함이다. 이렇게 선물환계약이 이루어지는 것을 선물환거래라고 한다.',
  },
];

export default function WordSearch() {
  return (
    <Box sx={{ width: '100%', minHeight: '100%', py: 3 }}>
      {/* ================== SearchBar ================== */}
      <Box
        sx={{
          maxWidth: 1120,
          mx: 'auto',
          mt: 4,
          mb: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 780,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            value="선물"
            fullWidth
            size="small"
            InputProps={{
              readOnly: true,        //  입력 불가
              style: { cursor: "default" }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 44,
                borderRadius: '10px',
                '& fieldset': {
                  borderWidth: 2,
                  borderColor: '#003FBF',
                },
              },
            }}
          />

          <IconButton
            sx={{
              ml: 4,
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: '#003FBF',
              '&:hover': {
                bgcolor: '#0035A5',
              },
            }}
          >
            <SearchIcon sx={{ color: '#fff', fontSize: 22 }} />
          </IconButton>
        </Box>
      </Box>


      {/* =================== 메인 테이블 =================== */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #CED4E4', // 전체 윤곽선
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '80px 120px 260px 1fr',
            alignItems: 'center',
            bgcolor: '#606A80',
            color: '#FFFFFF',
            px: 3,
            py: 1.4,
          }}
        >
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            No
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            주제
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            용어
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            설명
          </Typography>
        </Box>

        {/* 행들 */}
        {MOCK_ROWS.map((row, idx) => (
          <Box
            key={row.no}
            sx={{
              display: 'grid',
              gridTemplateColumns: '80px 120px 260px 1fr',
              alignItems: 'center',
              px: 3,
              py: 0,
              minHeight: 72,
              borderTop: idx === 0 ? '1px solid #CED4E4' : '1px solid #E3E7F2',
              bgcolor: '#FFFFFF',
            }}
          >

            {/* No */}
            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: 13 }}
            >
              {row.no}
            </Typography>

            {/* 주제 */}
            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: 13 }}
            >
              {row.category}
            </Typography>

            {/* 용어 */}
            <Typography
              variant="body2"
              align="center"
              sx={{
                fontSize: 13,
                fontWeight: 500,
                px: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {row.word}
            </Typography>

            {/* 설명 */}
            <Typography
              variant="body2"
              sx={{
                fontSize: 13,
                lineHeight: 1.6,
                px: 1.5,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {row.description}
            </Typography>

          </Box>
        ))}
      </Paper>

      {/* =================== 페이지네이션 =================== */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          page={1}
          count={5}
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: 13,
            },
            '& .Mui-selected': {
              bgcolor: '#003FBF',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#0035A5',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
