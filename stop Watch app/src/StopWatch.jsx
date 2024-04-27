import React, {useState, useEffect, useRef} from "react";

function StopWatch(){

    const [isRunning, setisRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervelId = useRef(null);
    const startTime = useRef(0)

    useEffect(() => {

        if(isRunning){
            intervelId.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime.current);
            }, 10);

            return () => {
                clearInterval(intervelId.current);
            }
            
        }

    }, [isRunning]);


    function start(){

        setisRunning(true);
        startTime.current = Date.now() - elapsedTime;

    }

    function stop(){
        setisRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setisRunning(false);
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");
        

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;

    }

    return(
        <div className="stopWatch">
            <div className="display">
                {formatTime()}
            </div>
            <div className="control">
                <button onClick={start} className="start-button">start</button>
                <button onClick={stop} className="stop-button">stop</button>
                <button onClick={reset} className="reset-button">reset</button>
            </div>
        </div>
    )
}

export default StopWatch