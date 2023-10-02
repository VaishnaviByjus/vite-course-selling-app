import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue} from "recoil";
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import Appbar from "./Appbar.jsx";
import AddCourse from "./AddCourse.jsx";
import Courses from "./Courses.jsx";
import Course  from "./Course.jsx";


function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >
      <RecoilRoot>
      <Router>
        <Appbar />
        <Routes>
          <Route path={"/addcourse"} element={<AddCourse />} />
          <Route path = {"/course/:courseId"} element = {<Course/>} />
          <Route path={"/courses"} element={<Courses/>}></Route>
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/signup"} element={<Signup />} />
        </Routes>
      </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
