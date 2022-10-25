import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import swal from "sweetalert";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();
  const db = getFirestore(app);

  const submitData = async (e) => {
    e.preventDefault();

    if (userName === "") {
      toast("Enter Your Name");
    } else if (userEmail === "") {
      toast("Enter Your Email");
    } else if (userPassword === "") {
      toast("Enter Your Password");
    } else {
      // fireBase Start
      try {
        const docRef = await addDoc(collection(db, "users"), {
          UserName: userName,
          UserEmail: userEmail,
          UserPassword: userPassword,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      // sign up

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast("Thanks");
          console.log(user);

          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          swal("Sorry", errorCode, "error");
        });

      // Firebase End
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
        const token = credential.accessToken;

        const user = result.user;

        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        swal("Sorry", errorCode, "error");

        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  return (
    <>
      <div className="form" style={{ backgroundColor: "#664CA8" }}>
        <form action="" onSubmit={submitData}>
          <div className="heading">
            <img
              src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-flying-rocket-png-image_3718748.jpg"
              alt=""
            />
            <h1>Welcome to Bardeen</h1>
            <p>Lorem ipsum Welcome to Bardeen</p>
          </div>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setUserName(e.target.value)}
          />
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
            <Link to="/signin" className="link_href">
              Sign In
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

export default SignUp;
