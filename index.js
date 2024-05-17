import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const handleCompile = async () => {
      try {
        const response = await axios.post('/compile', {
          code,
          language,
          input,
        });
        setOutput(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleCompile();
  }, [code, language, input]);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <h1>Online Compiler</h1>
      <div>
        <label>Code:</label>
        <textarea value={code} onChange={handleCodeChange} />
      </div>
      <div>
        <label>Language:</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
        </select>
      </div>
      <div>
        <label>Input:</label>
        <textarea value={input} onChange={handleInputChange} />
      </div>
      <button onClick={handleCompile}>Compile</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));