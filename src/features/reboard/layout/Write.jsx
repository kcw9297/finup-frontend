import { Link, useNavigate } from "react-router-dom"
import { api } from "../../../base/utils/fetchUtils"
import { submitForm } from '../../../base/utils/inputUtils'

function Write() {

  // 페이지 이동을 위한 Hook
  const navigate = useNavigate()

  // 폼 제출 함수
  const doSubmit = e => {

    // form 데이터 -> 객체 변환
    e.preventDefault()
    const data = submitForm(e)

    // 생성 요청 전송
    api.post('/reboards', data)
    .then((rp) => {
      alert(rp.message || "저장 성공!")
      navigate(`/reboard/detail/${rp.data}`)
    })
  }

  // 작성 form 반환
  return (
  <>
    <header>
      <h2>게시판-작성</h2>
    </header>
    <nav>
      <Link to='/reboard/search'>목록</Link>
    </nav>
    <article>
      <form onSubmit={doSubmit}>
        <table id="boardTable">
        <tbody>
          <tr>
            <th>이름</th>
            <td><input type="text" name="name" /></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="subject" /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="content" cols="22" rows="3" /></td>
          </tr>
        </tbody>
        </table>
        <input type="submit" value="전송"/>
      </form>
    </article>
  </>)
}

export default Write