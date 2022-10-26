import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import swal from "sweetalert";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const submitData = (e) => {
    e.preventDefault();

    if (userEmail === "") {
      toast("Enter Your Email");
    } else if (userPassword === "") {
      toast("Enter Your Password");
    } else {
      console.log(userEmail, userPassword);
      // navigate("/");
      // firebase start
      const auth = getAuth();
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Sign In", user);
          navigate("/");
          toast("Thanks");
        })
        .catch((error) => {
          const errorCode = error.code;
          swal("Sorry", errorCode, "error");
        });
      // firebase end
    }
  };

  // google Pop
  const googlePop = () => {
    const provider = new GoogleAuthProvider();
    console.log(provider);

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);

        const user = result.user;

        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
   

      

        swal("Sorry", errorCode, "error");

        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  return (
    <>
      <div className="form" style={{ backgroundColor: "#664CA8" }}>
        <form action="" onSubmit={submitData} className="formSection">
          <div className="heading">
            <img
              src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-flying-rocket-png-image_3718748.jpg"
              alt=""
            />
            <h1>Welcome to Bardeen</h1>
            <p>Lorem ipsum Welcome to Bardeen</p>
          </div>

          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setUserPassword(e.target.value)}
          />

          <div className="login_details">
            <Link to="/signup" className="link_href">
              Sign Up
            </Link>
            <Link to="#" className="link_href">
              Create Account
            </Link>
          </div>
          <input type="submit" value="Submit" />

          <div className="google_signUp">
            <div className="google_icon" onClick={googlePop}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                alt="google sign up icon"
              />
              <h1>Sign In with Google</h1>
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>

            <div className="google_icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="google sign up icon"
              />
              <h1>Sign In with Google</h1>
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default SignIn;
