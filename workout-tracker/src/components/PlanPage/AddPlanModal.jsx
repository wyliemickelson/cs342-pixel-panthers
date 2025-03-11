import { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-dropdown-select";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

function AddPlanModal({ toggleModal }) {

  const hoursOptions = new Array(24).fill({}).map((option, index) => (
    {
      id: index,
      hour: `${index}:00`
    }
  ))

  const presets = [
    {
      id: 1,
      name: 'Workout 1'
    },
    {
      id: 2,
      name: 'Workout 2'
    }
  ];

  const today = new Date()
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const [startDate, setStartDate] = useState(todayDateOnly)
  const [startTime, setStartTime] = useState(hoursOptions[0])
  const [endTime, setEndTime] = useState(hoursOptions[1])  
  const [workoutPreset, setWorkoutPreset] = useState("")
  const [repeatAllWeek, setRepeatAllWeek] = useState(false)

  const handleSubmit = () => {
    if (startTime.id > endTime.id) {
      toast.error("Cannot start a workout after it has ended.")
    } else if (endTime.id < startTime.id) {
      toast.error("Cannot end a workout before it begins.")
    } else if (!workoutPreset) {
      toast.error("Please choose a workout preset.")
    } else {
      const endDate = new Date(startDate)
      startDate.setHours(startTime.id, 0, 0)
      endDate.setHours(endTime.id, 0, 0)
  
      const newTask = {
        startDate,
        endDate,
        workoutPreset: workoutPreset.id,
        repeatAllWeek
      }
      toggleModal()
    
      //TODO - sumbit task and use it somewhere

    }
  }

  return (
    <>
    <Toaster />
    <div className="absolute w-[100%] h-[100%] opacity-40 bg-black z-5"></div>
      <div className="rounded-xl p-5 absolute left-[50%] top-[50%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 w-[60%] bg-white z-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Add Plan</h2>
          <button onClick={toggleModal} className="p-2 font-bold hover:cursor-pointer">X</button>
        </div>

        <div className="flex mb-5 items-center">
          <div className="w-[50%]">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="flex gap-3 items-center">
            <Select
              options={hoursOptions}
              labelField="hour"
              valueField="id"
              onChange={(time) => setStartTime(time[0])}
              values={[startTime]}
            />
            <p>To</p>
            <Select
              options={hoursOptions}
              labelField="hour"
              valueField="id"
              onChange={(time) => setEndTime(time[0])}
              values={[endTime]}
            />
          </div>
        </div>

        <div>
          <Select
              options={presets}
              labelField="name"
              valueField="id"
              onChange={(preset) => setWorkoutPreset(preset[0])}
          />
          <input type="text"></input>
        </div>

        <div className="flex justify-between mb-5">
          <h3>Repeat All week</h3>
          <input type="checkbox" value={repeatAllWeek} onClick={() => setRepeatAllWeek(!repeatAllWeek)}></input>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={toggleModal} class="hover:cursor-pointer text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
          <button type="button" onClick={handleSubmit} class="hover:cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>
        </div>
      </div>

    </>
  )

}

export default AddPlanModal