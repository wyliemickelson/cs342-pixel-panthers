
import "./WorkoutPage.css";
import Popup from "./AddWorkoutModal/AddWorkoutModal";
import { act, useEffect, useRef, useState } from "react";
import AddWorkoutModal from "./AddWorkoutModal/AddWorkoutModal";
import WorkoutCard from "./WorkoutCard/WorkoutCard";
import WorkoutList from "./WorkoutList/WorkoutList"
import RedirectLoginPage from "../RedirectLoginPage/RedirectLoginPage";
import { useSelector } from "react-redux";

const workouts = [
    {
        id: 1,
        name: "Workout 1",
        workoutType: "Anaerobic",
        exercises:
            [
                {
                    id: 1,
                    name: "Bicep Curls",
                    weight: "45 lbs",
                    sets: "3",
                    reps: "12"
                },
                {
                    id: 2,
                    name: "Front Lat Pulldowns",
                    weight: "100 lbs",
                    sets: "3",
                    reps: "12"
                },
                {
                    id: 3,
                    name: "Rope Face Pulls",
                    weight: "30 lbs",
                    sets: "3",
                    reps: "15-20"
                },
                {
                    id: 4,
                    name: "Concentration Curls",
                    weight: "20 lbs",
                    sets: "3",
                    reps: "15"
                }
            ]
    },
    {
        id: 2,
        name: "Workout 2",
        workoutType: "Anaerobic",
        exercises:
            [
                {
                    id: 1,
                    name: "Bicep Curls",
                    weight: "45 lbs",
                    sets: "3",
                    reps: "12"
                },
                {
                    id: 2,
                    name: "Front Lat Pulldowns",
                    weight: "100 lbs",
                    sets: "3",
                    reps: "12"
                },
                {
                    id: 3,
                    name: "Rope Face Pulls",
                    weight: "30 lbs",
                    sets: "3",
                    reps: "15-20"
                },
                {
                    id: 4,
                    name: "Concentration Curls",
                    weight: "20 lbs",
                    sets: "3",
                    reps: "15"
                }
            ]
    },
    {
        id: 3,
        name: "Workout 3",
        workoutType: "Anaerobic",
        exercises:
            [
                {
                    id: 1,
                    name: "Bicep Curls",
                    weight: "45 lbs",
                    sets: "3",
                    reps: "12"
                },
                {
                    id: 2,
                    name: "Front Lat Pulldowns",
                    weight: "100 lbs",
                    sets: "3",
                    reps: "12"
                },
                {
                    id: 3,
                    name: "Rope Face Pulls",
                    weight: "30 lbs",
                    sets: "3",
                    reps: "15-20"
                },
                {
                    id: 4,
                    name: "Concentration Curls",
                    weight: "20 lbs",
                    sets: "3",
                    reps: "15"
                }
            ]
    }
];



const WorkoutPage = () => {
    const { user } = useSelector((state) => state.auth)
    const loggedIn = user?.email

    // A workout is a list of exercises
    const [workoutList, setWorkoutList] = useState(user.customWorkouts);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeWorkout, setActiveWorkout] = useState([]);

    const openModal = () => {
        if(!modalIsOpen) {
            setModalIsOpen(true);
        }
    }

    useEffect(() => {

    }, [workoutList]);

    const handleSaveWorkout = (workout) => {
        console.log(`workout saved name: ${workout.name}`);
        console.log(`workout saved list: ${workout.exercises}`);
        setWorkoutList((prev) => [...prev, workout]);
        if(modalIsOpen) {
            setModalIsOpen(false);
        }
    }

    const closeModal = () => {
        if(modalIsOpen) {
            setModalIsOpen(false);
        }
        setActiveWorkout([]);
    }


    const editWorkout = (workout) => {
        console.log(`passed in workout name: ${workout.name}`);
        console.log(`passed in workout list: ${workout.exercises}`);
        setActiveWorkout(workout);
        openModal();
        console.log(`active workout: ${activeWorkout}`);
    }

    return (
        <>
            {!loggedIn ? <RedirectLoginPage /> :
                (<div className="workout-page relative flex flex-col items-center gap-2">
                    <div className="banner flex items-center justify-center relative">

                        <h1 className="">Your Workouts</h1>
                        <button className="btn3" onClick={() => setModalIsOpen(true)}>New Workout</button>
                    </div>
                    <button className="btn1 basis-1/2" onClick={() => setActiveWorkout(workouts)}>Populate Workout</button>

                    <WorkoutList 
                        workoutList={ workoutList ? workoutList : [] }
                        onEdit={(workout) => editWorkout(workout)}
                        onDelete={(workout) => setWorkoutList(workoutList.filter((w) => w.id !== workout.id))}                    
                    />


                    { modalIsOpen && <AddWorkoutModal
                        loadedWorkout={activeWorkout}
                        modalIsOpen={modalIsOpen}
                        onClose={closeModal}
                        onSave={handleSaveWorkout}
                        onRequestClose={closeModal}
                    />}
                </div>)
            }
        </>
    );
};

export default WorkoutPage;
