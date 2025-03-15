import React from 'react'
import "./AddWorkoutModal.css"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Toaster, toast } from 'react-hot-toast';
import Modal from "react-modal"
import editIcon from "../edit_icon.png"
import { set } from 'mongoose';
import { useSelector } from 'react-redux';

Modal.setAppElement("#modal-root");

const modalStyle = {
    overlay: {
        backgroundColor: "rgba(56, 56, 56, 0.9)",
    },
    content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "80vh",
        overflowY: "auto",
    },
};



const aerobicSchema = z.object({
    name: z.string({ message: "Exercise name is required." }).min(1, { message: "Exercise name is required." }),
    minutes: z.number().positive({ message: "Number of minutes must be positive." }).int({ message: "Number of minutes must be an integer." }),
    intensity: z.string().min(1, { message: "Intensity level is required." }),
});

const anaerobicSchema = z.object({
    name: z.string({ message: "Exercise name is required." }).min(1, { message: "Exercise name is required." }),
    weight: z.number().positive({ message: "Weight must be positive." }),
    sets: z.number().positive({ message: "The number of sets must be positive." }).int({ message: "Number of sets must be an integer." }),
    reps: z.number().positive({ message: "The number of reps must be positive." }).int({ message: "Number of reps must be an integer." }),
});

const workoutSchema = z.object({
    id: z.number(),
    workoutName: z.string().min(1, { message: "Workout name is required." }),
    workoutType: z.enum(["Anaerobic", "Aerobic"]),
    exercises: z.array(z.union([anaerobicSchema, aerobicSchema])),
});

const AddWorkoutModal = ({ loadedWorkout, modalIsOpen, onClose, onSave }) => {

    if (!modalIsOpen) return null;

    const [workout, setWorkout] = useState([]);
    const [workoutType, setWorkoutType] = useState("Anaerobic");
    const [aerobicExercises, setAerobicExercises] = useState([]);
    const [anaerobicExercises, setAnaerobicExercises] = useState([]);

    useEffect(() => {
        if (modalIsOpen && loadedWorkout) {
            setWorkout(loadedWorkout.exercises || []);
            setWorkoutType(loadedWorkout.workoutType || "Anaerobic");
            console.log(`Loaded Workout: ${loadedWorkout}`);
            console.log(`Loaded Workout: ${loadedWorkout.exercises}`);
        }
    }, [modalIsOpen, loadedWorkout]);

    const handleWorkoutTypeChange = (e) => {
        setWorkoutType(e.target.value);
        console.log(`Workout Type: ${e.target.value}`);
        console.log(`Workout Type: ${workoutType}`);
        reset();
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(workoutType === "Aerobic" ? aerobicSchema : anaerobicSchema),
        mode: "onChange",
    });

    useEffect(() => {
        reset();
    }, [workoutType, reset]);

    const addExercise = (data) => {
        setWorkout((prev) => [...prev, data]);
        // if (workoutType === "Aerobic") {
        // } else if (workoutType === "Anaerobic") {
        //     addAnaerobicExercise((prev) => [...prev, data]);
        // }
        console.log(`Added exercise: ${data.name}`);
        reset();
    }



    // Display validation errors sequentially via toast notifications
    useEffect(() => {
        const errorKeys = Object.keys(errors);
        errorKeys.forEach((key, index) => {
            setTimeout(() => {
                toast.error(errors[key].message);
            }, (index + 1) * 1000);
        });
    }, [errors]);

    const {token, user} = useSelector((state) => state.auth);

    const onSubmit = async (data) => {
        if (workout.length === 0) {
            toast.error("Please add at least one exercise to the workout.");
            return;
        }

        onSave({
            id: Math.floor(Math.random() * 1000),
            name: data.workoutName,
            workoutType,
            exercises: workoutType === "Aerobic" ? aerobicExercises : anaerobicExercises,
        });
        try {
            const body = {
                token: token, 
                workouts: workout
            }; 

            console.log(`Sending body: ${JSON.stringify(body)}`)

            const res = await fetch("http://localhost:3000/api/add_workout", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            if (res.ok) {
                toast.success("Submited workout sucessfully.");
            }
            else {
                toast.error("Could not submit workout");
            }
        } catch (error) {
            console.error("Submitting workout error:", error);
            toast.error("An error occurred during workout submitting. Please try again.");
        }
        reset();
        onClose();
    }

    const onCloseModal = () => {
        setAnaerobicExercises([]);
        setAerobicExercises([]);
        reset();
        onClose();
    }

    const onDeleteExercise = (name) => {
        setWorkout((prev) => prev.filter((exercise) => exercise.name !== name));
    }


    return (
        <div className="workout-modal flex items-center" >
            <Modal className="workout-modal relative z-0" isOpen={modalIsOpen} style={modalStyle} onRequestClose={onCloseModal}>
                <div className="container flex-none basis-1/3">
                    {/* Workout header */}
                    <div className="pop-up-info">
                        <div className="flex justify-between">
                            <h1>Add Workout</h1>
                            <button className="btn1 flex px-4" onClick={onCloseModal}>Close</button>
                        </div>
                        <p>Please input information for your exercise.</p>
                    </div>

                    <div className="workout-name input-section flex flex-col gap-1">
                        <h1>Workout Name</h1>
                        <input
                            name="name"
                            placeholder="Workout Name"
                            type="text"
                            {...register("workoutName")}>
                        </input>

                    </div>
                    {/* Dropdown for Workout Type */}
                    <div className="workout-type">
                        <div>
                            <h1>Workout Type</h1>
                        </div>
                        <select className="flex justify-center" value={workoutType} onChange={handleWorkoutTypeChange}>
                            <option value="Anaerobic">Anaerobic</option>
                            <option value="Aerobic">Aerobic</option>
                        </select>
                    </div>


                    {/* Separator */}
                    < div className="separator">
                        <div className="border"></div>
                    </div>






                    {/* Exercise list */}
                    <ul>
                        {workout.map((exercise, index) => (
                            <li key={exercise.name} className="exercise-card no-bullets">
                                <div className="container clickable-card">
                                    <div className="flex">
                                        <div className="basis-1/16">
                                            <h1 className="text-[20px] font-bold">{index + 1}</h1>
                                        </div>
                                        {workoutType === "Aerobic" ? (
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <b>{exercise.name}</b>
                                                    <button className="btn3" onClick={() => onDeleteExercise(exercise.name)}>x</button>
                                                </div>
                                                <p>{exercise.time + " minutes at an intensity of " + exercise.intensity}</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <b>{exercise.name}</b>
                                                    <button className="btn3" onClick={() => onDeleteExercise(exercise.name)}>x</button>
                                                </div>
                                                <p>{exercise.sets + " sets of " + exercise.reps + " starting at " + exercise.weight}</p>
                                            </div>


                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}

                    </ul>

                    {/* Separator */}
                    <div className="separator">
                        <div className="border"></div>
                    </div>

                    {workoutType === "Aerobic" ? (
                        <div className="input-section">
                            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(addExercise)}>
                                <div>
                                    <h2>Exercise Name</h2>
                                    <input
                                        name="name"
                                        placeholder="Enter name"
                                        type="text"
                                        {...register("name")}
                                    ></input>
                                </div>
                                <div>
                                    <h2>Minutes</h2>
                                    <input
                                        name="minutes"
                                        placeholder="0"
                                        type="number"
                                        {...register("minutes", { valueAsNumber: true })}
                                    ></input>
                                </div>
                                <div>
                                    <h2>Intensity</h2>
                                    <input
                                        name="intensity"
                                        placeholder="Enter intensity"
                                        type="text"
                                        {...register("intensity")}
                                    ></input>
                                </div>
                                <div className="add-exercise">
                                    <button type="submit" className="btn1">+ Add exercise</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <>
                            <div className="input-section">
                                <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(addExercise)}>
                                    <div className="">
                                        <h2>Exercise Name</h2>
                                        <input
                                            name="name"
                                            placeholder="Enter name"
                                            type="text"
                                            {...register("name")}
                                        ></input>
                                    </div>
                                    <div className="">
                                        <h2>Starting Weight (Lbs)</h2>
                                        <input
                                            name="weight"
                                            placeholder="0"
                                            type="number"
                                            {...register("weight", { valueAsNumber: true })}
                                        ></input>
                                    </div>
                                    <div className="">
                                        <h2>Sets</h2>
                                        <input
                                            name="sets"
                                            placeholder="0"
                                            type="number"
                                            {...register("sets", { valueAsNumber: true })}
                                        ></input>
                                    </div>
                                    <div className="">
                                        <h2>Reps</h2>
                                        <input
                                            name="reps"
                                            placeholder="0"
                                            type="number"
                                            {...register("reps", { valueAsNumber: true })}
                                        ></input>
                                    </div>
                                    {/* Submit exercise */}
                                    <div className="add-exercise">
                                        <button type="submit" className="btn1">+ Add exercise</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}


                    {/* Input section */}


                    <Toaster />




                    {/* Buttons */}
                    <div className="px-16">
                        <ul className="flex flex-row justify-end gap-4">
                            <li className="basis-16">
                                <button onClick={onCloseModal} className="btn1">
                                    <div className="cancel-text">Cancel</div>
                                </button>
                            </li>
                            <li className="basis-16">
                                <button className="btn2" onClick={onSubmit}>
                                    <div className="submit-text">Submit</div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal >
        </div >
    )
}

export default AddWorkoutModal