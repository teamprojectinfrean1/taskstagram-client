import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      죄송합니다, 페이지를 찾을 수 없습니다.
      <Link to="/"> 메인페이지로 돌아가기 </Link>
    </div>
  );
};

export default NotFoundPage;
