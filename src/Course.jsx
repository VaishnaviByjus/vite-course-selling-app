import {Card} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import { atom, useSetRecoilState, useRecoilState, useRecoilValue} from "recoil";

function Course() {
    let {courseId}= useParams();

    const setCourses = useSetRecoilState(coursesState)

    useEffect(() => {
        function callback2(data){
            setCourses(data.courses);
        }

        function callback1(res) {
            res.json().then(callback2)

        }

        fetch(`http://localhost:3000/admin/courses/`, {
            method : 'GET',
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem('token')
            }
        }).then(callback1);

    }, [])
   
  
    return <div style = {{display : "flex" , justifyContent : "center"}}>
       <CourseCard courseId = {courseId}/>
       <UpdateCard courseId = {courseId} />
</div>
}

function CourseCard(props) {
    const courses = useRecoilValue(coursesState);

    console.log("my course", courses)

    let course = null;
    for(let i = 0; i < courses.length ; i++){
        if(courses[i].id == props.courseId){
            course = courses[i];
        }
    }


    //let course = courses.find(course => course.id == props.courseId);
    console.log("my course", course)
    if(!course){
        return <div>
                     Loading....
        </div>
    }else{
    return <div style={{display: 'flex', justifyContent : 'center'}}> 
        <Card style = {{
        margin : 10,
        width : 300,
        minHeight : 300
    }}>
        <Typography textAlign = "center" variant = "h5">{course.title} </Typography>
        <Typography textAlign = "center">{course.description}</Typography>
        <img src = { course.imageLink} style={{ width : 300}}></img>
    </Card>
    </div>
    }
}

function UpdateCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const course = props.course;
    const [ courses, setCourses] = useRecoilState(coursesState);

    return <div style={{display: "flex", justifyContent: "center"}}>
        <Card varint={"outlined"} style={{width: 400, padding: 20, margin:"10px"}}>
            <Typography>Update Course Details</Typography>
        <TextField
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
        />
       <br/> <br/>
        <TextField
            onChange={(e) => {
                setDescription(e.target.value)
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
        />
        <br/><br/>
         <TextField
            onChange={(e) => {
                setImage(e.target.value)
            }}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
        />
       <br/> <br/>
        <Button
            size={"large"}
            variant="contained"
            onClick={() => {
                function callback2(data) {
                    // localStorage.setItem("token", data.token);
                    // alert('course updated');
                    let updatedCourses = [];
                    for(let i = 0; i < courses.length ; i++){
                        if(courses[i].id == props.courseId){
                            
                            updatedCourses.push({
                                id: props.courseId,
                                title: title,
                                description: description,
                                imageLink: image
                            })                         
                    } else {
                        updatedCourses.push(courses[i]);
                    }
                }
                    setCourses(updatedCourses);
                }
                function callback1(res) {
                    res.json().then(callback2)
                }
                fetch("http://localhost:3000/admin/courses/" +props.courseId, {
                    method: "PUT",
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        imageLink: image,
                        published: true
                    }),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(callback1)
            }}
        > Update course</Button>
        </Card>
    </div>
}


export default Course;

const coursesState = atom({
    key: 'coursesState',
    default: ''
})