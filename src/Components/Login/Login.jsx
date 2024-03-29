import {
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
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const logedInUser = result.user;
        console.log(logedInUser);
        setUser(logedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
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
            <button onClick={handleGoogleLogin}>Google Login</button>
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
