import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBucket, updateBucket } from "./redux/modules/bucket";

import { useNavigate } from "react-router-dom";

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);

  return (
    <div>
      <h1>{bucket_list[bucket_index].text}</h1>
      <button
        onClick={() => {
          dispatch(updateBucket(bucket_index));
          history(-1);
        }}>
        Finished
      </button>
      <button
        onClick={() => {
          dispatch(deleteBucket(bucket_index));
          history(-1);
        }}>
        Delete
      </button>
    </div>
  );
};

export default Detail;
