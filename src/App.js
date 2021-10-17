
import './App.css';
import React, { useState, useCallback } from 'react';

function App() {

  const [currentName, setCurrentName] = useState('')
  const [listOfName, setListOfName] = useState(['name1', 'name2', 'name3'])
  const [namesEntered, setNamesEntered] = useState(false)
  const [firstList, setFirstList] = useState([])
  const [secondList, setSecondList] = useState([])


  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setCurrentName('')
    setListOfName([...listOfName, currentName])
  }, [currentName, setListOfName, listOfName])

  const handleChange = useCallback((e) => setCurrentName(e.target.value), [setCurrentName])

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    console.log(arr);
  }

  const pairUp = () => {
    setNamesEntered(true)
    shuffleArray(listOfName)
    let halfWayIndex = Math.ceil(listOfName.length / 2)
    setFirstList(listOfName.slice(0, halfWayIndex))
    setSecondList(listOfName.slice(halfWayIndex))
  }


  return (
    <div className="App">
      <h1>Gannon's Random Pairing Generator</h1>
      <form onSubmit={handleSubmit} style={{ display: namesEntered ? 'none' : 'block' }} >
        <label>Enter your name:
          <input
            type="text"
            value={currentName}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>

      <h2>List Of Names:</h2>
      {listOfName.map(name => (<p key={name} style={{ display: namesEntered ? 'none' : 'block' }}>{name}</p>))}

      <button onClick={pairUp}> Begin Pairing</button>

      <h3 style={{ display: namesEntered ? 'block' : 'none' }}>Matched Up</h3>
      <div className='pairlisting'>
        <div className='list1'>
          {firstList.map(name => (<p key={name}>{name}</p>))}
        </div>
        <div className='vs'>
          {firstList.map(name => (<p>{'VS'}</p>))}
        </div>
        <div className='list2'>
          {secondList.map(name => (<p key={name}>{name}</p>))}
        </div>
      </div>

    </div>
  );
}

export default App;
