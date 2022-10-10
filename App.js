import React from "react";
import styled from "styled-components";
import { Routes, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBucket } from "./redux/modules/bucket";

import "./App.css";
import BucketList from "./BucketList";
import Detail from "./Detail";
import NotFound from "./NotFound";
import Progress from "./Progress";

import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [list, setList] = React.useState([
    "shopping",
    "Bying House",
    "Traveling",
  ]);

  const text = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(async () => {
    console.log(db);

    //Add(Create) collection
    addDoc(collection(db, "buckets"), { text: "new", completed: false });

    //Delete data
    // const docRef = doc(db, "bucket", "kyeTYdc0Oq4PveTa7Nii");
    // deleteDoc(docRef);

    //Update data
    // const docRef = doc(db, "bucket", "VHFmLJXO8mR0Q73nddM7");
    // updateDoc(docRef, { completed: true });

    //Add data
    //addDoc(collection(db, "bucket"), { text: "new", completed: false });

    //Get data
    // const query = await getDocs(collection(db, "bucket"));
    // console.log(query);
    // query.forEach((doc) => {
    //   console.log(doc.id, doc.data());
    // });
  }, []);

  const addBucketList = () => {
    //setList([...list, text.current.value]);

    dispatch(createBucket({ text: text.current.value, completed: false }));
  };
  return (
    <div className="App">
      <MyForm>
        <Container>
          <Title>My Bucket List</Title>
          <Progress />
          <Line />
          <Routes>
            <Route path="/" element={<BucketList list={list} />} />
            <Route path="/detail/:index" element={<Detail />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Container>
        <InputWrap>
          <input
            type="text"
            ref={text}
            onChange={() => {
              console.log(text.current.value);
            }}
          />
          <button onClick={addBucketList}>Add</button>
        </InputWrap>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}>
          Up
        </button>
      </MyForm>
    </div>
  );
}

const MyForm = styled.div`
  background-color: #eee;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const InputWrap = styled.div`
  padding: 16px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  & > * {
    padding: 5px;
  }
  & input {
    border: 1px solid #888;
    margin-right: 10px;
    width: 70%;
  }
  & input:focus {
    outline: none;
    border: 1px solid #a673ff;
  }
  & button {
    width: 25%;
    color: #fff;
    border: #a673ff;
    background: #a673ff;
  }
`;
const Container = styled.div`
  background-color: #fff;
  width: 50vw;
  max-width: 350px;
  margin: auto;
  height: 80vh;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
`;

export default App;
