//test 폴더 내 파일은 나중에 다 삭제할거임

// ✅ 테스트용 더미 데이터 (API 연동 전)
  const data = [   
    {"mkscShrnIscd":"005930","dataRank":"1","htsKorIsnm":"삼성전자","stckPrpr":"108600","prdyVrss":"-900","prdyVrssSign":"5","prdyCtrt":"-0.82","stckAvls":"6428727","mrktWholAvlsRlim":"15.20"},{"mkscShrnIscd":"000660","dataRank":"2","htsKorIsnm":"SK하이닉스","stckPrpr":"566000","prdyVrss":"-11000","prdyVrssSign":"5","prdyCtrt":"-1.91","stckAvls":"4120493","mrktWholAvlsRlim":"9.74"},{"mkscShrnIscd":"373220","dataRank":"3","htsKorIsnm":"LG에너지솔루션","stckPrpr":"443500","prdyVrss":"-8000","prdyVrssSign":"5","prdyCtrt":"-1.77","stckAvls":"1037790","mrktWholAvlsRlim":"2.45"},{"mkscShrnIscd":"207940","dataRank":"4","htsKorIsnm":"삼성바이오로직스","stckPrpr":"1657000","prdyVrss":"28000","prdyVrssSign":"2","prdyCtrt":"1.72","stckAvls":"767041","mrktWholAvlsRlim":"1.81"},{"mkscShrnIscd":"005935","dataRank":"5","htsKorIsnm":"삼성전자우","stckPrpr":"80600","prdyVrss":"100","prdyVrssSign":"2","prdyCtrt":"0.12","stckAvls":"657676","mrktWholAvlsRlim":"1.56"},{"mkscShrnIscd":"005380","dataRank":"6","htsKorIsnm":"현대차","stckPrpr":"307500","prdyVrss":"-8000","prdyVrssSign":"5","prdyCtrt":"-2.54","stckAvls":"629630","mrktWholAvlsRlim":"1.49"},{"mkscShrnIscd":"329180","dataRank":"7","htsKorIsnm":"HD현대중공업","stckPrpr":"574000","prdyVrss":"31000","prdyVrssSign":"2","prdyCtrt":"5.71","stckAvls":"509558","mrktWholAvlsRlim":"1.21"},{"mkscShrnIscd":"012450","dataRank":"8","htsKorIsnm":"한화에어로스페이스","stckPrpr":"960000","prdyVrss":"23000","prdyVrssSign":"2","prdyCtrt":"2.45","stckAvls":"495009","mrktWholAvlsRlim":"1.17"},{"mkscShrnIscd":"034020","dataRank":"9","htsKorIsnm":"두산에너빌리티","stckPrpr":"77100","prdyVrss":"300","prdyVrssSign":"2","prdyCtrt":"0.39","stckAvls":"493873","mrktWholAvlsRlim":"1.17"},{"mkscShrnIscd":"000270","dataRank":"10","htsKorIsnm":"기아","stckPrpr":"123700","prdyVrss":"-1900","prdyVrssSign":"5","prdyCtrt":"-1.51","stckAvls":"482941","mrktWholAvlsRlim":"1.14"},{"mkscShrnIscd":"105560","dataRank":"11","htsKorIsnm":"KB금융","stckPrpr":"126000","prdyVrss":"-1900","prdyVrssSign":"5","prdyCtrt":"-1.49","stckAvls":"480642","mrktWholAvlsRlim":"1.14"},{"mkscShrnIscd":"068270","dataRank":"12","htsKorIsnm":"셀트리온","stckPrpr":"187200","prdyVrss":"100","prdyVrssSign":"2","prdyCtrt":"0.05","stckAvls":"432359","mrktWholAvlsRlim":"1.02"},{"mkscShrnIscd":"028260","dataRank":"13","htsKorIsnm":"삼성물산","stckPrpr":"252000","prdyVrss":"500","prdyVrssSign":"2","prdyCtrt":"0.20","stckAvls":"428341","mrktWholAvlsRlim":"1.01"},{"mkscShrnIscd":"402340","dataRank":"14","htsKorIsnm":"SK스퀘어","stckPrpr":"322000","prdyVrss":"0","prdyVrssSign":"3","prdyCtrt":"0.00","stckAvls":"426782","mrktWholAvlsRlim":"1.01"},{"mkscShrnIscd":"035420","dataRank":"15","htsKorIsnm":"NAVER","stckPrpr":"247000","prdyVrss":"-2000","prdyVrssSign":"5","prdyCtrt":"-0.80","stckAvls":"387426","mrktWholAvlsRlim":"0.92"},{"mkscShrnIscd":"055550","dataRank":"16","htsKorIsnm":"신한지주","stckPrpr":"78100","prdyVrss":"100","prdyVrssSign":"2","prdyCtrt":"0.13","stckAvls":"379172","mrktWholAvlsRlim":"0.90"},{"mkscShrnIscd":"042660","dataRank":"17","htsKorIsnm":"한화오션","stckPrpr":"115100","prdyVrss":"1100","prdyVrssSign":"2","prdyCtrt":"0.96","stckAvls":"352682","mrktWholAvlsRlim":"0.83"},{"mkscShrnIscd":"015760","dataRank":"18","htsKorIsnm":"한국전력","stckPrpr":"50800","prdyVrss":"-900","prdyVrssSign":"5","prdyCtrt":"-1.74","stckAvls":"326118","mrktWholAvlsRlim":"0.77"},{"mkscShrnIscd":"012330","dataRank":"19","htsKorIsnm":"현대모비스","stckPrpr":"358000","prdyVrss":"-4500","prdyVrssSign":"5","prdyCtrt":"-1.24","stckAvls":"324823","mrktWholAvlsRlim":"0.77"},{"mkscShrnIscd":"009540","dataRank":"20","htsKorIsnm":"HD한국조선해양","stckPrpr":"447000","prdyVrss":"8000","prdyVrssSign":"2","prdyCtrt":"1.82","stckAvls":"316356","mrktWholAvlsRlim":"0.75"},{"mkscShrnIscd":"032830","dataRank":"21","htsKorIsnm":"삼성생명","stckPrpr":"157400","prdyVrss":"1600","prdyVrssSign":"2","prdyCtrt":"1.03","stckAvls":"314800","mrktWholAvlsRlim":"0.74"},{"mkscShrnIscd":"267260","dataRank":"22","htsKorIsnm":"HD현대일렉트릭","stckPrpr":"847000","prdyVrss":"5000","prdyVrssSign":"2","prdyCtrt":"0.59","stckAvls":"305319","mrktWholAvlsRlim":"0.72"},{"mkscShrnIscd":"010130","dataRank":"23","htsKorIsnm":"고려아연","stckPrpr":"1473000","prdyVrss":"62000","prdyVrssSign":"2","prdyCtrt":"4.39","stckAvls":"284926","mrktWholAvlsRlim":"0.67"},{"mkscShrnIscd":"035720","dataRank":"24","htsKorIsnm":"카카오","stckPrpr":"60900","prdyVrss":"-1100","prdyVrssSign":"5","prdyCtrt":"-1.77","stckAvls":"269412","mrktWholAvlsRlim":"0.64"},{"mkscShrnIscd":"051910","dataRank":"25","htsKorIsnm":"LG화학","stckPrpr":"378000","prdyVrss":"-8500","prdyVrssSign":"5","prdyCtrt":"-2.20","stckAvls":"266839","mrktWholAvlsRlim":"0.63"},{"mkscShrnIscd":"086790","dataRank":"26","htsKorIsnm":"하나금융지주","stckPrpr":"92800","prdyVrss":"-1200","prdyVrssSign":"5","prdyCtrt":"-1.28","stckAvls":"258286","mrktWholAvlsRlim":"0.61"},{"mkscShrnIscd":"005490","dataRank":"27","htsKorIsnm":"POSCO홀딩스","stckPrpr":"314000","prdyVrss":"-5000","prdyVrssSign":"5","prdyCtrt":"-1.57","stckAvls":"254129","mrktWholAvlsRlim":"0.60"},{"mkscShrnIscd":"006400","dataRank":"28","htsKorIsnm":"삼성SDI","stckPrpr":"310000","prdyVrss":"-4000","prdyVrssSign":"5","prdyCtrt":"-1.27","stckAvls":"249815","mrktWholAvlsRlim":"0.59"},{"mkscShrnIscd":"196170","dataRank":"29","htsKorIsnm":"알테오젠","stckPrpr":"457000","prdyVrss":"-1000","prdyVrssSign":"5","prdyCtrt":"-0.22","stckAvls":"244521","mrktWholAvlsRlim":"0.58"},{"mkscShrnIscd":"010140","dataRank":"30","htsKorIsnm":"삼성중공업","stckPrpr":"27000","prdyVrss":"1100","prdyVrssSign":"2","prdyCtrt":"4.25","stckAvls":"237600","mrktWholAvlsRlim":"0.56"} 
   ];
  /*
  const data = [   
    {"mkscShrnIscd":"005930","dataRank":"1","htsKorIsnm":"삼성전자","stckPrpr":"108600","prdyVrss":"-900","prdyVrssSign":"5","prdyCtrt":"-0.82","stckAvls":"6428727","mrktWholAvlsRlim":"15.20"},{"mkscShrnIscd":"000660","dataRank":"2","htsKorIsnm":"SK하이닉스","stckPrpr":"566000","prdyVrss":"-11000","prdyVrssSign":"5","prdyCtrt":"-1.91","stckAvls":"4120493","mrktWholAvlsRlim":"9.74"},{"mkscShrnIscd":"373220","dataRank":"3","htsKorIsnm":"LG에너지솔루션","stckPrpr":"443500","prdyVrss":"-8000","prdyVrssSign":"5","prdyCtrt":"-1.77","stckAvls":"1037790","mrktWholAvlsRlim":"2.45"},{"mkscShrnIscd":"207940","dataRank":"4","htsKorIsnm":"삼성바이오로직스","stckPrpr":"1657000","prdyVrss":"28000","prdyVrssSign":"2","prdyCtrt":"1.72","stckAvls":"767041","mrktWholAvlsRlim":"1.81"},{"mkscShrnIscd":"005935","dataRank":"5","htsKorIsnm":"삼성전자우","stckPrpr":"80600","prdyVrss":"100","prdyVrssSign":"2","prdyCtrt":"0.12","stckAvls":"657676","mrktWholAvlsRlim":"1.56"},{"mkscShrnIscd":"005380","dataRank":"6","htsKorIsnm":"현대차","stckPrpr":"307500","prdyVrss":"-8000","prdyVrssSign":"5","prdyCtrt":"-2.54","stckAvls":"629630","mrktWholAvlsRlim":"1.49"},{"mkscShrnIscd":"329180","dataRank":"7","htsKorIsnm":"HD현대중공업","stckPrpr":"574000","prdyVrss":"31000","prdyVrssSign":"2","prdyCtrt":"5.71","stckAvls":"509558","mrktWholAvlsRlim":"1.21"},{"mkscShrnIscd":"012450","dataRank":"8","htsKorIsnm":"한화에어로스페이스","stckPrpr":"960000","prdyVrss":"23000","prdyVrssSign":"2","prdyCtrt":"2.45","stckAvls":"495009","mrktWholAvlsRlim":"1.17"},{"mkscShrnIscd":"034020","dataRank":"9","htsKorIsnm":"두산에너빌리티","stckPrpr":"77100","prdyVrss":"300","prdyVrssSign":"2","prdyCtrt":"0.39","stckAvls":"493873","mrktWholAvlsRlim":"1.17"},{"mkscShrnIscd":"000270","dataRank":"10","htsKorIsnm":"기아","stckPrpr":"123700","prdyVrss":"-1900","prdyVrssSign":"5","prdyCtrt":"-1.51","stckAvls":"482941","mrktWholAvlsRlim":"1.14"},{"mkscShrnIscd":"105560","dataRank":"11","htsKorIsnm":"KB금융","stckPrpr":"126000","prdyVrss":"-1900","prdyVrssSign":"5","prdyCtrt":"-1.49","stckAvls":"480642","mrktWholAvlsRlim":"1.14"},{"mkscShrnIscd":"068270","dataRank":"12","htsKorIsnm":"셀트리온","stckPrpr":"187200","prdyVrss":"100","prdyVrssSign":"2","prdyCtrt":"0.05","stckAvls":"432359","mrktWholAvlsRlim":"1.02"},{"mkscShrnIscd":"028260","dataRank":"13","htsKorIsnm":"삼성물산","stckPrpr":"252000","prdyVrss":"500","prdyVrssSign":"2","prdyCtrt":"0.20","stckAvls":"428341","mrktWholAvlsRlim":"1.01"},{"mkscShrnIscd":"402340","dataRank":"14","htsKorIsnm":"SK스퀘어","stckPrpr":"322000","prdyVrss":"0","prdyVrssSign":"3","prdyCtrt":"0.00","stckAvls":"426782","mrktWholAvlsRlim":"1.01"},{"mkscShrnIscd":"035420","dataRank":"15","htsKorIsnm":"NAVER","stckPrpr":"247000","prdyVrss":"-2000","prdyVrssSign":"5","prdyCtrt":"-0.80","stckAvls":"387426","mrktWholAvlsRlim":"0.92"},{"mkscShrnIscd":"055550","dataRank":"16","htsKorIsnm":"신한지주","stckPrpr":"78100","prdyVrss":"100","prdyVrssSign":"2","prdyCtrt":"0.13","stckAvls":"379172","mrktWholAvlsRlim":"0.90"},{"mkscShrnIscd":"042660","dataRank":"17","htsKorIsnm":"한화오션","stckPrpr":"115100","prdyVrss":"1100","prdyVrssSign":"2","prdyCtrt":"0.96","stckAvls":"352682","mrktWholAvlsRlim":"0.83"},{"mkscShrnIscd":"015760","dataRank":"18","htsKorIsnm":"한국전력","stckPrpr":"50800","prdyVrss":"-900","prdyVrssSign":"5","prdyCtrt":"-1.74","stckAvls":"326118","mrktWholAvlsRlim":"0.77"},{"mkscShrnIscd":"012330","dataRank":"19","htsKorIsnm":"현대모비스","stckPrpr":"358000","prdyVrss":"-4500","prdyVrssSign":"5","prdyCtrt":"-1.24","stckAvls":"324823","mrktWholAvlsRlim":"0.77"},{"mkscShrnIscd":"009540","dataRank":"20","htsKorIsnm":"HD한국조선해양","stckPrpr":"447000","prdyVrss":"8000","prdyVrssSign":"2","prdyCtrt":"1.82","stckAvls":"316356","mrktWholAvlsRlim":"0.75"},{"mkscShrnIscd":"032830","dataRank":"21","htsKorIsnm":"삼성생명","stckPrpr":"157400","prdyVrss":"1600","prdyVrssSign":"2","prdyCtrt":"1.03","stckAvls":"314800","mrktWholAvlsRlim":"0.74"},{"mkscShrnIscd":"267260","dataRank":"22","htsKorIsnm":"HD현대일렉트릭","stckPrpr":"847000","prdyVrss":"5000","prdyVrssSign":"2","prdyCtrt":"0.59","stckAvls":"305319","mrktWholAvlsRlim":"0.72"},{"mkscShrnIscd":"010130","dataRank":"23","htsKorIsnm":"고려아연","stckPrpr":"1473000","prdyVrss":"62000","prdyVrssSign":"2","prdyCtrt":"4.39","stckAvls":"284926","mrktWholAvlsRlim":"0.67"},{"mkscShrnIscd":"035720","dataRank":"24","htsKorIsnm":"카카오","stckPrpr":"60900","prdyVrss":"-1100","prdyVrssSign":"5","prdyCtrt":"-1.77","stckAvls":"269412","mrktWholAvlsRlim":"0.64"},{"mkscShrnIscd":"051910","dataRank":"25","htsKorIsnm":"LG화학","stckPrpr":"378000","prdyVrss":"-8500","prdyVrssSign":"5","prdyCtrt":"-2.20","stckAvls":"266839","mrktWholAvlsRlim":"0.63"},{"mkscShrnIscd":"086790","dataRank":"26","htsKorIsnm":"하나금융지주","stckPrpr":"92800","prdyVrss":"-1200","prdyVrssSign":"5","prdyCtrt":"-1.28","stckAvls":"258286","mrktWholAvlsRlim":"0.61"},{"mkscShrnIscd":"005490","dataRank":"27","htsKorIsnm":"POSCO홀딩스","stckPrpr":"314000","prdyVrss":"-5000","prdyVrssSign":"5","prdyCtrt":"-1.57","stckAvls":"254129","mrktWholAvlsRlim":"0.60"},{"mkscShrnIscd":"006400","dataRank":"28","htsKorIsnm":"삼성SDI","stckPrpr":"310000","prdyVrss":"-4000","prdyVrssSign":"5","prdyCtrt":"-1.27","stckAvls":"249815","mrktWholAvlsRlim":"0.59"},{"mkscShrnIscd":"196170","dataRank":"29","htsKorIsnm":"알테오젠","stckPrpr":"457000","prdyVrss":"-1000","prdyVrssSign":"5","prdyCtrt":"-0.22","stckAvls":"244521","mrktWholAvlsRlim":"0.58"},{"mkscShrnIscd":"010140","dataRank":"30","htsKorIsnm":"삼성중공업","stckPrpr":"27000","prdyVrss":"1100","prdyVrssSign":"2","prdyCtrt":"4.25","stckAvls":"237600","mrktWholAvlsRlim":"0.56"} 
  {
    data_rank: "1",
    mksc_shrn_iscd: "005930",
    hts_kor_isnm: "삼성전자",
    stck_prpr: "101100",
    prdy_vrss: "600",
    prdy_vrss_sign: "3",
    prdy_ctrt: "0.60",
    acml_vol: "6095566",
    lstn_stcn: "5919637922",
    stck_avls: "5984754",
    mrkt_whol_avls_rlim: "14.83"
  },  
  {
    data_rank: "2",
    mksc_shrn_iscd: "000660",
    hts_kor_isnm: "SK하이닉스",
    stck_prpr: "534000",
    prdy_vrss: "4000",
    prdy_vrss_sign: "2",
    prdy_ctrt: "0.75",
    acml_vol: "1384467",
    lstn_stcn: "728002365",
    stck_avls: "3887533",
    mrkt_whol_avls_rlim: "9.64"
  },
  {
    data_rank: "3",
    mksc_shrn_iscd: "373220",
    hts_kor_isnm: "LG에너지솔루션",
    stck_prpr: "413500",
    prdy_vrss: "5500",
    prdy_vrss_sign: "2",
    prdy_ctrt: "1.35",
    acml_vol: "164405",
    lstn_stcn: "234000000",
    stck_avls: "967590",
    mrkt_whol_avls_rlim: "2.40"
  },
  {
    data_rank: "4",
    mksc_shrn_iscd: "207940",
    hts_kor_isnm: "삼성바이오로직스",
    stck_prpr: "1657000",
    prdy_vrss: "50000",
    prdy_vrss_sign: "2",
    prdy_ctrt: "3.11",
    acml_vol: "22422",
    lstn_stcn: "46290951",
    stck_avls: "767041",
    mrkt_whol_avls_rlim: "1.90"
  },
  {
    data_rank: "5",
    mksc_shrn_iscd: "005935",
    hts_kor_isnm: "삼성전자우",
    stck_prpr: "75700",
    prdy_vrss: "700",
    prdy_vrss_sign: "2",
    prdy_ctrt: "0.93",
    acml_vol: "705041",
    lstn_stcn: "815974664",
    stck_avls: "617693",
    mrkt_whol_avls_rlim: "1.53"
  },
  {
    data_rank: "6",
    mksc_shrn_iscd: "005380",
    hts_kor_isnm: "현대차",
    stck_prpr: "255500",
    prdy_vrss: "-6000",
    prdy_vrss_sign: "5",
    prdy_ctrt: "-2.29",
    acml_vol: "293665",
    lstn_stcn: "204757766",
    stck_avls: "523156",
    mrkt_whol_avls_rlim: "1.30"
  },
  {
    data_rank: "7",
    mksc_shrn_iscd: "034020",
    hts_kor_isnm: "두산에너빌리티",
    stck_prpr: "75100",
    prdy_vrss: "-1300",
    prdy_vrss_sign: "5",
    prdy_ctrt: "-1.70",
    acml_vol: "1474106",
    lstn_stcn: "640561146",
    stck_avls: "481061",
    mrkt_whol_avls_rlim: "1.19"
  },
  {
    data_rank: "8",
    mksc_shrn_iscd: "105560",
    hts_kor_isnm: "KB금융",
    stck_prpr: "125700",
    prdy_vrss: "900",
    prdy_vrss_sign: "2",
    prdy_ctrt: "0.72",
    acml_vol: "301058",
    lstn_stcn: "381462103",
    stck_avls: "479498",
    mrkt_whol_avls_rlim: "1.19"
  },
  {
    data_rank: "9",
    mksc_shrn_iscd: "329180",
    hts_kor_isnm: "HD현대중공업",
    stck_prpr: "512000",
    prdy_vrss: "-23000",
    prdy_vrss_sign: "5",
    prdy_ctrt: "-4.30",
    acml_vol: "86873",
    lstn_stcn: "88773116",
    stck_avls: "454518",
    mrkt_whol_avls_rlim: "1.13"
  },
  {
    data_rank: "10",
    mksc_shrn_iscd: "000270",
    hts_kor_isnm: "기아",
    stck_prpr: "112100",
    prdy_vrss: "-2000",
    prdy_vrss_sign: "5",
    prdy_ctrt: "-1.75",
    acml_vol: "345873",
    lstn_stcn: "390412998",
    stck_avls: "437653",
    mrkt_whol_avls_rlim: "1.08"
  },
  
  {
    data_rank: "30",
    mksc_shrn_iscd: "000810",
    hts_kor_isnm: "삼성화재",
    stck_prpr: "490000",
    prdy_vrss: "8500",
    prdy_vrss_sign: "2",
    prdy_ctrt: "1.77",
    acml_vol: "24829",
    lstn_stcn: "46011155",
    stck_avls: "225455",
    mrkt_whol_avls_rlim: "0.56"
  }     
  ];*/
  export default data;