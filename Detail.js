import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteBucket,
  deleteBucketFB,
  updateBucket,
  updateBucketFB,
} from "./redux/modules/bucket";

import { useNavigate } from "react-router-dom";

import Button from "@material-ui/core/Button";

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);

  return (
    <div>
      <h1>{bucket_list[bucket_index] ? bucket_list[bucket_index].text : ""}</h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          //dispatch(updateBucket(bucket_index));
          dispatch(updateBucketFB(bucket_list[bucket_index].id));
          history(-1);
        }}>
        Finished
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          //dispatch(deleteBucket(bucket_index));
          dispatch(deleteBucketFB(bucket_list[bucket_index].id));
          history(-1);
        }}>
        Delete
      </Button>
    </div>
  );
};

export default Detail;
