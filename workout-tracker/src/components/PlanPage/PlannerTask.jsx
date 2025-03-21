import { FaCheckCircle, FaRegCircle, FaTimesCircle } from "react-icons/fa"
import { useDispatch } from "react-redux"
import {setCurrentTaskId} from "../../store/slices/authSlice.js" 
import { useNavigate } from "react-router-dom"

function makeWorkout(title, workoutInfo, status) {
    return {
        "title": title,
        "workoutInfo": workoutInfo,
        "status": status
    }
}

function makeTask(title, date, workouts) {
    return {
        "title": title,
        "date": date,
        "workouts": workouts
    }
}

const WORKOUT_INCOMPLETE = "incomplete"
const WORKOUT_COMPLETE = "complete"
const WORKOUT_FAILED = "failed"

function PlannerTask({task, removeTask}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    let exercisesDone = 0
    let exercisesTotal = 0
    let exercises = [...task.workout.anaerobicExercises, ...task.workout.aerobicExercises]
    exercises.forEach(exercise => {
        exercisesTotal += 1
        if(exercise.status == "complete") {
            exercisesDone += 1
        }
    });
    const percentage = exercisesDone / exercisesTotal

    function statusIcon(status) {
        switch(status) {
            case "complete":
                return <FaCheckCircle color="#0b0" className="row-span-2 m-1" />
            case "incomplete":
                return <FaRegCircle className="row-span-2 m-1" />
        }
    }

    const date = new Date(task.date)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const totalMinutes = (hours * 60) + minutes
    const dayPercent = (totalMinutes / 1440) * 100

    const onTaskClick = (task) => {
      dispatch(setCurrentTaskId(task._id))
      navigate("/current-workout")
    }

    return <div onClick={() => onTaskClick(task)} className="hover:cursor-pointer">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">{task.title}</h1>
          <button onClick={(e) => {
            e.stopPropagation()
            removeTask(task)
          }} className="round-lg px-2">Remove</button>
        </div>
        {task.workout.anaerobicExercises.map(function(exercise, index) {
            return <div key={index} className="grid content-center justify-center grid-cols-[min-content_1fr]">
                {statusIcon(exercise.status)}
                <p>{exercise.name}</p>
                <p className="text-gray-500">{`${exercise.sets} sets of ${exercise.reps} reps`}</p>
            </div>
        })}
        {task.workout.aerobicExercises.map(function(exercise, index) {
            return <div key={index} className="grid content-center justify-center grid-cols-[min-content_1fr]">
                {statusIcon(exercise.status)}
                <p>{exercise.name}</p>
                <p className="text-gray-500">{`${exercise.minutes} min ${exercise.intensity} intensity`}</p>
            </div>
        })}
        <div className="flex flex-row content-center">
            <progress id="task-progress" value={percentage} max={1} className="rounded-full h-2 m-auto" />
            <label htmlFor="task-progress">{Math.round(percentage * 100)}%</label>
        </div>
    </div>
}

export { makeTask, makeWorkout, WORKOUT_INCOMPLETE, WORKOUT_FAILED, WORKOUT_COMPLETE }
export default PlannerTask