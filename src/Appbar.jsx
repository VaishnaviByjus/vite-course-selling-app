import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function callback2(data){
      if(data.username){
        setUserEmail(data.username);
      }
    }

    function callback1(res){
      res.json().then(callback2);
    }

    fetch("http://localhost:3000/admin/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(callback1)
  }, []);

  if(userEmail){
    return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
          }}
        >
          <div>
            <Typography variant={"h6"}>Coursera</Typography>
          </div>
    
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10 }}>
             {userEmail}
            </div>
            <div>
              <Button
                variant={"contained"}
                onClick={() => {
                  localStorage.setItem('token', null);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      );
  }else
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
      }}
    >
      <div>
        <Typography variant={"h6"}>Coursera</Typography>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
        </div>
        <div>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
