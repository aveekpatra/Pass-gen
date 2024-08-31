import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setlength] = useState(12);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++) {
      if (numAllowed) {
        characters += "0123456789";
      }
      if (charAllowed) {
        characters += "!@#$%^&*()";
      }
      password += characters.charAt(
        Math.floor(Math.random() * characters.length + 1)
      );
    }
    setPassword(password);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numAllowed]);

  const copiedMessage = () => {
    // alert("Password copied!")
    document.getElementById("btn").textContent = "Copied";
    document.getElementById("btn").style.backgroundColor = "green";
    setTimeout(() => {
      document.getElementById("btn").textContent = "Copy";
      document.getElementById("btn").style.backgroundColor =
        "rgb(37 99 235 / var(--tw-bg-opacity))";
    }, 3000);
  };

  return (
    <>
      <div
        id="container"
        className="flex bg-violet-700 h-screen w-full justify-center items-center"
      >
        <div
          id="box"
          className="bg-white rounded-xl fixed top-28 p-6 shadow-lg "
        >
          <input
            type="text"
            name=""
            id=""
            className="p-3 w-[600px] bg-slate-400 rounded-l-md outline-none"
            value={password}
            placeholder="Password will be here"
            readOnly
            ref={passRef}
          />
          <button
            className="bg-blue-600 p-3 rounded-r-md px-6 text-white"
            id="btn"
            onClick={() => {
              window.navigator.clipboard.writeText(password);
              passRef.current.select();
              copiedMessage();
            }}
          >
            Copy
          </button>
          <div className="flex items-center justify-between pt-5">
            <div className="flex items-center gap-3">
              <input
                type="range"
                name=""
                id=""
                min={10}
                max={38}
                value={length}
                className="cursor-pointer mt-1"
                onChange={(e) => setlength(e.target.value)}
              />
              <label htmlFor=""> Length: {length}</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="numbox"
                className="cursor-pointer mt-1"
                defaultChecked={numAllowed}
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numbox"> Number Allowed</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="checkbox"
                className="cursor-pointer mt-1"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="checkbox"> Character Allowed</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
