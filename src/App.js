import './App.css';
import city from './assets/city.png';
import utd from './assets/utd.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { FastAverageColor } from 'fast-average-color';

function App() {
  const [editToggle, toggleEdit] = useState(false);
  const [team1Logo, setTeam1Logo] = useState(city);
  const [team2Logo, setTeam2Logo] = useState(utd);
  const [gradient, setGradient] = useState("linear-gradient(to right,rgb(255, 255, 255), #ffffff)");
  const [teamName, setTeamName] = useState('Manchester City');
  const [teamName2, setTeamName2] = useState('Manchester United');
  const [toggleName, setToggleName] = useState(false);
  const [toggleName2, setToggleName2] = useState(false);
  const [addToggle, setAddToggle] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState();
  const [displayPlayer, setDisplayPLayer] = useState('Lionel Messi 90');
  const [fbEvent, setFbEvent] = useState();
  const [team1Array, setTeam1Array] = useState([]);
  const [team2Array, setTeam2Array] = useState([]);
  const [score, setScore] = useState({ team1: 0, team2: 0 });
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fac = new FastAverageColor();

    const getSaturatedColor = async (imageSrc) => {
      try {
        const colorData = await fac.getColorAsync(imageSrc, { algorithm: "sqrt" }); // More balanced colors
        return colorData.hex;
      } catch (error) {
        console.error("Error extracting colors:", error);
        return "#888"; // Fallback color
      }
    };

    const updateGradient = async () => {
      const color1 = await getSaturatedColor(team1Logo);
      const color2 = await getSaturatedColor(team2Logo);
      setGradient(`linear-gradient(100deg, ${color1}, ${color2})`);
    };

    updateGradient();
  }, [team1Logo, team2Logo]);

  useEffect(() => {
    let timer;
    if (isRunning && seconds < 90 * 60) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning,seconds])

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleFileUpload = (e, team) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (team === "team1") {
        setTeam1Logo(imageUrl);
      } else if (team === "team2") {
        setTeam2Logo(imageUrl);
      }
    }
  };

  const addButtonFunctions = () => {
    if (selectedTeam === 'teamA') {

      if (fbEvent != 'goal') {
        if (fbEvent != 'red') {
          const newPLayer = `${displayPlayer}'  🟨`
          setTeam1Array((prevArray) => [...prevArray, newPLayer]);
        } else {
          const newPLayer = `${displayPlayer}'  🟥`
          setTeam1Array((prevArray) => [...prevArray, newPLayer]);
        }
      } else {
        setScore((prevState) => ({
          ...prevState,
          team1: prevState.team1 + 1
        }))
        const newPLayer = `${displayPlayer}' ⚽`
        setTeam1Array((prevArray) => [...prevArray, newPLayer]);
      }

    } else {
      if (fbEvent != 'goal') {
        if (fbEvent != 'red') {
          const newPLayer = `${displayPlayer}'  🟨`
          setTeam2Array((prevArray) => [...prevArray, newPLayer]);
        } else {
          const newPLayer = `${displayPlayer}'  🟥`
          setTeam2Array((prevArray) => [...prevArray, newPLayer]);
        }
      } else {
        setScore((prevState) => ({
          ...prevState,
          team2: prevState.team2 + 1
        }))
        const newPLayer = `${displayPlayer}' ⚽`
        setTeam2Array((prevArray) => [...prevArray, newPLayer]);
      }
    }
    setAddToggle((prev) => !prev);
    console.log({ selectedTeam, displayPlayer, fbEvent })
  };

  return (
    <div className="main" style={{ background: gradient }}>

      <img className='bgImg' src={team1Logo} c id='team1bg' />
      <img className='bgImg' src={team2Logo} id='team2bg' />
      {addToggle && 
      
      <div className='addPopup' >
        <label>Select team</label>
        
        <select onChange={(e) => setSelectedTeam(e.target.value)} value={selectedTeam}>
          <option    >Select team</option>
          <option value='teamA'>{teamName}</option>
          <option value='teamB'>{teamName2}</option>
        </select>

        <label>Player Name and Time</label>

        <input onChange={(e) => setDisplayPLayer(e.target.value)} placeholder='enter player name and goal svore timestamp' />
        
        <label>Event</label>

        <select onChange={(e) => setFbEvent(e.target.value)}>
          <option  >Select event</option>
          <option value='goal'>Goal</option>
          <option value='yellow'>Yellow</option>
          <option value='red'>Red</option>
        </select>

        <button className='glass-button2' onClick={addButtonFunctions}>add</button>
      </div>}

      <nav>
        <button className='glass-button' onClick={() => setAddToggle((prev) => !prev)} >add</button>
        <button className='glass-button' onClick={() => toggleEdit((prev) => !prev)}>edit</button>
      </nav>

      <div className="main-container">
        {/* TEAM 1 */}
        <div className="leftContain logoContain">
          <div className="imgContain">
            <img src={team1Logo} alt="Team 1" />
            {editToggle && (
              <label>
                <FontAwesomeIcon className="logoEditIcon" icon={faPenToSquare} size="2x" color="white" />
                <input type="file" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "team1")} />
              </label>
            )}
          </div>
          <span>
            <h1>{teamName}</h1>
            {toggleName && <div className='popUp'>
              <input type='text' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
              <button onClick={() => setToggleName((prev) => !prev)}>enter</button>
            </div>}
            {editToggle &&
              <FontAwesomeIcon className="logoEditIcon" onClick={() => setToggleName(prevState => !prevState)} icon={faPenToSquare} size="2x" color="white" />
            }
          </span>

          <ul>
            {
              team1Array.map((team, index) => {
                return <li key={index} >{team}</li>
              })
            }
          </ul>
        </div>

        {/* SCOREBOARD */}
        <div className="centerContain">
          <h1>{`${score.team1} : ${score.team2}`}</h1>
          
        </div>

        {/* TEAM 2 */}
        <div className="rightContain logoContain">
          <div className="imgContain">
            <img src={team2Logo} alt="Team 2" />
            {editToggle && (
              <label>
                <FontAwesomeIcon className="logoEditIcon" icon={faPenToSquare} size="2x" color="white" />
                <input type="file" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "team2")} />
              </label>
            )}
          </div>
          <span>
            <h1>{teamName2}</h1>
            {toggleName2 && <div className='popUp'>
              <input type='text' value={teamName2} onChange={(e) => setTeamName2(e.target.value)} />
              <button onClick={() => setToggleName2((prev) => !prev)}>enter</button>
            </div>}
            {editToggle &&
              <FontAwesomeIcon className="logoEditIcon" onClick={() => setToggleName2(prevState => !prevState)} icon={faPenToSquare} size="2x" color="white" />
            }
          </span>
          <ul>
            {
              team2Array.map((team, index) => {
                return <li key={index} >{team}</li>
              })
            }
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
