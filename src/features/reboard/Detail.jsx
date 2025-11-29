import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../../base/utils/fetchUtils"

function Detail(){

  // 데이터 상태
  const [ data, setData ] = useState({})
  const navigate = useNavigate()

  // 파라미터
  const { idx } = useParams();
  const requestUrl = `/reboards/${idx}`

  // 데이터 요청
  useEffect(() => {
    api.get(requestUrl)
    .then(json => setData(json.data))
  }, [requestUrl])

  // 삭제 요청
  const del = () => {

  if (confirm('게시글을 삭제할까요?'))
    api.delete(requestUrl)
    .then(() => {
      alert("삭제 성공!");
      navigate('/reboard/search')
    })
  }


  return(<>
    <header>
      <h2>게시판-상세</h2>
    </header>
    <nav>
      <Link to='/reboard/search'>목록</Link>
      <Link to={`/reboard/edit/${idx}`}>수정</Link>
      <Link onClick={del}>삭제</Link>
    </nav>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%"/>
          <col width="*"/>
        </colgroup>
        <tbody>
          <tr>
            <th>번호</th>
            <td>{data.idx}</td>
          </tr>
          <tr>
            <th>이름</th>
            <td>{data.name}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{data.subject}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td style={{whiteSpace:'pre-wrap'}}>
              {data.content}
            </td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{data.regdate}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>
  )
}
export default Detail