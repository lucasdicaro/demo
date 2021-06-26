import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "./actions";

function UserDetail() {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id])

  if (userDetail === null) {
    return (
    <h1>User not found</h1>
    )
  } else if (userDetail === undefined) {
    return (<h1>Cargando...</h1>)
  } else {
  return (<div>
      <span>Nombre:</span>
      <span>{userDetail.name}</span>
    </div>)
  }
}

export default UserDetail;
