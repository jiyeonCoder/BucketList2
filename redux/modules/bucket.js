import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions(type)
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";

const initialState = {
  list: [
    { text: "Shopping", completed: false },
    { text: "Bying House", completed: false },
    { text: "Traveling", completed: false },
    { text: "Coding", completed: false },
  ],
  // list: ["Shopping", "Bying House", "Traveling", "coding"],
};

// Action Creators
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list };
}

export function createBucket(bucket) {
  console.log("Will Create Action!");
  return { type: CREATE, bucket };
}

export function updateBucket(bucket_index) {
  return { type: UPDATE, bucket_index };
}

export function deleteBucket(bucket_index) {
  console.log("지울 bucket Index", bucket_index);
  return { type: DELETE, bucket_index };
}

//middlewares
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = getDocs(collection(db, "bucket"));
    cons;
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "bucket/CREATE": {
      console.log("Now change the data!");
      const new_bucket_list = [...state.list, action.bucket];
      return { list: new_bucket_list };
    }

    case "bucket/UPDATE": {
      const new_bucket_list = state.list.map((i, idx) => {
        console.log(i);
        if (parseInt(action.bucket_index) === idx) {
          return { ...i, completed: true };
        } else {
          return i;
        }
      });
      console.log({ list: new_bucket_list });
      return { list: new_bucket_list };
    }

    case "bucket/DELETE": {
      console.log(state, action);
      const new_bucket_list = state.list.filter((i, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { list: new_bucket_list };
    }
    default:
      return state;
  }
}

// // side effects, only as applicable
// // e.g. thunks, epics, etc
// export function getWidget() {
//   return (dispatch) =>
//     get("/widget").then((widget) => dispatch(updateWidget(widget)));
// }
