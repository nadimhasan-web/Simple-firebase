import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../Firebase/Firebase.init";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState();
  const auth = getAuth(app);
  console.log(auth);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const logedInUser = result.user;
        console.log(logedInUser);
        setUser(logedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser);
      setUser(loggedUser);
    })
    .catch(error=>{
      console.log(error);
    })
  };
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(null);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
        { user ?
            <button onClick={handleSignOut}>Sign out</button> :
            <>
              <button onClick={handleGoogleLogin}>Google Signin</button>
              <button onClick={handleGithubLogin}>Github Signin</button>
            </>
        }
      {user && (
        <div>
          <h2>User:{user?.displayName}</h2>
          <p>Email:{user?.email}</p>
          <img src={user?.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
