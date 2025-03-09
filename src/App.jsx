import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  //ref hook
  const passwordRef=useRef(null);

  const PasswordGenerator = useCallback(() => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) chars += "0123456789";
    if (char) chars += "!@#$%^&*()_-+=<>?";

    let generatedPass = "";
    for (let i = 0; i < length; i++) {
      generatedPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generatedPass);
  }, [length, number, char]);
  const copypassword=useCallback(()=>{
    passwordRef.current?.select()
window.navigator.clipboard.writeText(password)



  },[password])

  useEffect(() => {
    PasswordGenerator();
  }, [length, number, char]); 

  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-screen">
        <div className="box bg-white shadow-2xl w-full p-8 max-w-md">
          <h1 className="text-3xl text-center">Password Generator</h1>
          <div className="form m-10 items-center justify-center flex">
            <input
              type="text"
              className="border  rounded-2xl placeholder: pl-5"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button className="rounded-2xl bg-blue-300 px-4 py-1 text-center ml-2 hover:bg-blue-500" onClick={copypassword}>
              Copy
            </button>
          </div>
          <div className="option1 flex justify-center items-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="pl-3">Length: {length}</label>
          </div>
          <div className="option2 flex justify-center items-center">
            <input
              type="checkbox"
              defaultChecked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            <label>Number</label>
          </div>
          <div className="option2 flex justify-center items-center">
            <input
              type="checkbox"
              defaultChecked={char} 
              onChange={() => setChar((prev) => !prev)} 
            />
            <label>Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
