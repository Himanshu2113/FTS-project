import "./App.css";
import Navbar from "./components/Navbar";
import Button from "./components/button";

function App() {
  return (
    <div>
      <Navbar />
      <div className="top-heading">
        <h1 className="top">Welcome To FTS</h1>
        <h2 className="head">
          <br />A Single Platform To Share Your Feelings,Thoughts and Secrets
          Anonymously
        </h2>
        {/* <Button text="Login" l="/login" className="lr" /> */}
        <br />
        <Button text="Register" l="/register" className="lr" />
        <br />
        {/* <Button text="Share your feelings" l="/feelings" /> */}
        {/* <Button text="Share your thoughts" l="/thoughts" /> */}
        {/* <Button text="Share your secrets" l="/secrets" /> */}
      </div>
    </div>
  );
}

export default App;
