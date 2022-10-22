// bucket.js
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
const LOADED = "bucket/LOADED";

const initialState = {
  is_loaded: false,
  list: [
    { text: "안녕", completed: false },
    { text: "안녕", completed: false },
    { text: "안녕", completed: false },
    // { text: "Shopping", completed: false },
    // { text: "Bying House", completed: false },
    // { text: "Traveling", completed: false },
    // { text: "Coding", completed: false },
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

export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}

//middlewares
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, "bucket"));
    console.log(bucket_data);

    let bucket_list = [];

    bucket_data.forEach((b) => {
      console.log(b.data);
      bucket_list.push({ id: b.id, ...b.data() });
      //bucket_list=[...bucket_list, {...b.data()}];
    });
    console.log(bucket_list);
    dispatch(loadBucket(bucket_list));
  };
};

export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    dispatch(isLoaded(false));
    const docRef = await addDoc(collection(db, "bucket"), bucket);
    //const _bucket = await getDoc(docRef);
    const bucket_data = { id: docRef.id, ...bucket };

    //console.log(bucket_data);

    dispatch(createBucket(bucket_data));
    //console.log((await getDoc(docRef)).data());
  };
};

export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket_id);
    await updateDoc(docRef, { completed: true });

    console.log(getState().bucket);

    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(updateBucket(bucket_index));
  };
};

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    if (!bucket_id) {
      window.alert("No id~!");
      return;
    }
    const docRef = doc(db, "bucket", bucket_id);
    await deleteDoc(docRef);

    const _bucket_list = getState().bucket.list;
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id;
    });
    dispatch(deleteBucket(bucket_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucket_list, is_loaded: true };
    }
    // do reducer stuff
    case "bucket/CREATE": {
      console.log("Now change the data!");
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list, is_loaded: true };
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
      return { ...state, list: new_bucket_list };
    }

    case "bucket/DELETE": {
      console.log(state, action);
      const new_bucket_list = state.list.filter((i, idx) => {
        return parseInt(action.bucket_index) !== idx;
      });
      return { ...state, list: new_bucket_list };
    }

    case "bucket/LOADED": {
      return { ...state, is_loaded: action.loaded };
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
