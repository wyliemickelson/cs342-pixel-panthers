import PlannerTask, {makeTask, makeWorkout, WORKOUT_COMPLETE} from "./PlannerTask"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/slices/authSlice";

function Planner({date}) {
  const dispatch = useDispatch()

    function next30Days(date) {
        let arr = []
        for(let i=0; i < 30; i++) {
            let newDate = new Date(date)
            newDate.setDate(newDate.getDate() + i)
            newDate.setHours(0)
            newDate.setMinutes(0,0,0)
            arr.push(newDate)
        }
        return arr
    }

    function makeHoursArray() {
        let arr = []
        for(let i = 0; i < 24; i++) {
            let time = new Date(0)
            time.setHours(i)
            time.setMinutes(0, 0, 0)
            arr.push(time)
        }
        return arr
    }

    const removeTask = async (task) => {
      const res = await fetch('http://localhost:3000/api/delete_task', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email: user.email, taskId: task._id}),
      })
      if (!res.ok) {
        console.error("Could not update database")
      } else {
        dispatch(deleteTask(task._id))
      }
    }

    const dayFormat = new Intl.DateTimeFormat(navigator.language, { weekday: "short" })
    const shortDateFormat = new Intl.DateTimeFormat(navigator.language, { month: "short", day: "numeric" })
    const hourFormat = new Intl.DateTimeFormat(navigator.language, { hour: "2-digit", minute: "2-digit", hourCycle: "h12"})
    const daysArray = next30Days(date)
    const hoursArray = makeHoursArray()

    const data = useSelector((state) => state.auth)
    const user = data.user

    return <div className={`flex flex-row rounded-lg grow overflow-scroll`}>
        { /* Hour labels */}
        <div className="min-w-[6rem] text-center h-full flex flex-col">
            <div className="min-h-[4rem]"/>
            <div className="border-r-2  border-[#ddd] flex-grow">
                {hoursArray.map((value) => {
                    return <div key={value} className="min-h-[4rem]">{hourFormat.format(value)}</div>
                })}
            </div>
        </div>

        {/* Day columns */}
        <div className="flex gap-3 flex-row">
            {daysArray.map((value) => {
                const day = value
                return <div key={day}>
                    {/* Date labels */}
                    <div className="flex border-b-2 border-[#ddd] w-[14rem] h-[4rem] justify-center text-center flex-col align-center" key={value}>
                        <p>{dayFormat.format(day)}</p>
                        <b>{shortDateFormat.format(day)}</b>
                    </div>

                    <div className="flex flex-col gap-5 relative">
                        {user.tasks.map(function(value, index) {
                            const task = value
                            let taskDate = new Date(task.date)
                            taskDate.setMinutes(0, 0, 0)
                            taskDate.setHours(0)
                            if( !(taskDate.getTime() === day.getTime()) )
                                return null
                            
                            return <PlannerTask key={index} task={task} removeTask={removeTask} />
                        })}
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Planner;