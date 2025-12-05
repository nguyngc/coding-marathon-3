import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const name = useField("text");
  const username = useField("text");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const addressStreet = useField("text");
  const city = useField("text");
  const zipCode = useField("text");

  const { signup, error } = useSignup("/api/auth/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await signup({
      name: name.value,
      username: username.value,
      password: password.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      address: {
        street: addressStreet.value,
        city: city.value,
        zipCode: zipCode.value
      }
    });
    console.log(result);
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Username:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <label>Phone Number:</label>
        <input {...phoneNumber} />
        <label>Gender:</label>
        <input {...gender} />
        <label>Date of Birth:</label>
        <input {...dateOfBirth} />
        <label>Address:</label>
        <input {...addressStreet} />
        <label>City:</label>
        <input {...city} />
        <label>Zipcode:</label>
        <input {...zipCode} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
