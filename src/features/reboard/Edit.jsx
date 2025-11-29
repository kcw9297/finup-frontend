import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { api } from "../../base/utils/fetchUtils"
import { changeFormInput, submitForm } from '../../base/utils/inputUtils'


function Edit(){

  // 파라미터
  const { idx } = useParams()
  const navigate = useNavigate() // 리다이렉트 Hook         

  // URL
  const requestUrl = `/reboards/${idx}`

  // 현재 데이터 상태
  const [ data, setData ] = useState({})

  // 초기 데이터 불러오기
  useEffect(() => {
    api.get(requestUrl)
    .then(json => {
      console.log(json);
      setData(json.data)
    })
  }, [requestUrl])

  // 데이터 수정 요청
  const doSubmit = e => {
  
    e.preventDefault()

    // 갱신 요청
    api.put(requestUrl, submitForm(e))
      .then(rp => {
        alert(rp.message || "게시글 수정 성공!")
        navigate(-1); // 이전 페이지로
      })
  }

  return(<>
    <header>
      <h2>게시판-수정</h2>
    </header>
    <nav>
      <Link to='/reboard/search'>목록</Link>
      <Link to={`/reboard/detail/${idx}`}>뒤로</Link>
    </nav>
    <article>
    <form onSubmit={e => {doSubmit(e)}}>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>이름</th>
            <td><input name="name" value={data.name || ''} onChange={e => changeFormInput(e, setData)}/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input name="subject" value={data.subject || ''} onChange={e => changeFormInput(e, setData)}/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea name="content" col="22" rows="3" value={data.content || ''} onChange={e => changeFormInput(e, setData)}/>
            </td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="수정"/>
    </form>
  </article>
  </>)
}
export default Edit