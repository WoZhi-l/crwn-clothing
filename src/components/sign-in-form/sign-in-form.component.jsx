import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import "./sign-in-form.style.scss";
import {
  signInWithGooglePopup,
  signInAutjUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
// import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password || !email) {
      alert("!");
      return;
    }
    try {
      await signInAutjUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      // console.log(response);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("incorrect password for email");
      } else if (error.code === "auth/user-not-found") {
        alert("no user associated with this email");
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button children="Sign IN" type="sumbit" />
          <Button
            children="Sign IN WITH GOOGLE"
            buttonType="google"
            type="button"
            onClick={signWithGoogle}
          />
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
