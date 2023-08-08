import { useParams } from "react-router-dom";

const Detail = (props) => {
  let { id } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={props.sub.sub_main_img} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.sub.sub_name}</h4>
          <p>{props.sub.sub_content}</p>
          <p>{props.sub.sub_price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};
export default Detail;
