import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import "./style.css";

export function IndexMainFunction() {
  let currentDate = new Date();
  const [allTaskData, setallTaskData] = useState([]);
  const [task, setTask] = useState("");
  const [day, setDay] = useState("Monday");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(moment().format('h:mm a'));

  useEffect(() => {
    setDate(moment().format("YYYY-MM-DD"))
  },[]);

  function submitData(e) {
    e.preventDefault();
    let formateTime = moment(time,'h:mm').format('h:mm a')
    setallTaskData([...allTaskData, { task, day, date, formateTime }]);
    if(day == '' || day == 'monday')
    {
      setDay('Monday');
    }
    if(date == ''){
      setDate(moment().format("YYYY-MM-DD"));
    }
    setTask("");
    if(time == ''){
      setTime(moment().format('h:mm a'));
    }
  }

  function handleRemove(index) {
    let response =confirm('are you remove this task')
    if(response == true){
      const updatetask = [...allTaskData];
      updatetask.splice(index, 1);
      setallTaskData(updatetask);
    }
  }

  const dayArr = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  let taskUI = allTaskData.map((data, index) => {
    const { task, day, formateTime, date } = data;

    return (
      <>
        <section className="container" key={index}>
          <div className="row">
            <ul className="ms-2 row justify-content-center">
              <li className="col-md-2 overflow-auto">{task}</li>
              <li className="col-md-1">{day}</li>
              <li className="col-md-2">{date}</li>
              <li className="col-md-1">{formateTime}</li>
              <li className="col-md-2">
                <button
                  className="btn btn-outline-danger fw-bold"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </li>
            </ul>
          </div>
        </section>
      </>
    );
  });

  return (
    <>
      <div className="main-container container d-flex justify-content-center align-items-center mt-5">
        <form className="row" onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-12 p-3 d-flex justify-content-center">
            <label htmlFor="newTask">New Task</label>
            <input
              className="input-class form-control border-success"
              type="text"
              id="newTask"
              name="Task"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
              placeholder="enter task name"
            />
          </div>
          <div className="justify-content-center row ">
            <div className="col-md-4 p-3 control-width-div">
              <label htmlFor="date">Date</label>
              <input
                className="form-control"
                type="date"
                id="date"
                name="Date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="col-md-4 p-3 control-width-div">
              <label htmlFor="day">Day</label>
              <select className="form-select" onChange={(e)=>setDay(e.target.value)}>
                {dayArr.map((data,index)=>{
                  return <option kay={index} value={data}>{data}</option>
                })}
              </select>
            </div>
            <div className="col-md-4 p-3 control-width-div">
              <label htmlFor="time">Time</label>
              <input
                className="form-control"
                type="time"
                id="time"
                name="Time"
                value={time}
                placeholder="enter time"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4 mb-5">
            <button type="submit" className="btn btn-outline-light fw-bold" onClick={submitData}>
              Submit
            </button>
          </div>
        </form>
      </div>
      {allTaskData && taskUI}
    </>
  );
}
