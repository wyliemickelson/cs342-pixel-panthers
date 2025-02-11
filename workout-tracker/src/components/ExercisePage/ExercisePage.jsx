import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";

const exercises = [
  {
    title: "Arms Exercises",
    workouts: ["Bicep Curl", "Triceps Dips", "Hammer Curl", "Concentration Curl"],
    image: "/images/arm_leg_exercise.png",
  },
  {
    title: "Chest Exercises",
    workouts: ["Bench Press", "Push-Ups", "Chest Fly", "Incline Press"],
    image: "/images/chest_exercise.png",
  },
  {
    title: "Buttocks Exercises",
    workouts: ["Hip Thrust", "Glute Bridge", "Step-Ups"],
    image: "/images/buttocks_exercise.png",
  },
  {
    title: "Leg Exercises",
    workouts: ["Romanian Deadlift", "Lunges", "Leg Press", "Calf Raises"],
    image: "/images/arm_leg_exercise.png",
  },
  {
    title: "Cardio Exercises",
    workouts: ["Running", "Jump Rope", "Cycling", "Burpees"],
    image: "/images/cardio_exercise.png",
  },
];

const ExercisePage = () => {
  return <>
  <Navbar />
    <div className="min-h-screen bg-gray-100">
      {/* White Background for Content */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="relative bg-white w-[413px] h-[413px] rounded-xl shadow-lg overflow-hidden p-6"
              >
                {/* Exercise Image */}
                <img
                  src={exercise.image}
                  alt={exercise.title}
                  className="absolute left-[96px] top-[24px] w-[468px] h-[526px] object-cover opacity-80"
                />

                {/* Exercise Title */}
                <h2 className="absolute left-[21px] top-[20px] text-black text-2xl font-bold">
                  {exercise.title}
                </h2>

                {/* Scrollable Workout List */}
                <div className="absolute left-[21px] top-[80px] w-[200px] max-h-[200px] overflow-y-auto text-gray-600 text-lg font-medium space-y-1 pr-2">
                  {exercise.workouts.map((workout, i) => (
                    <p key={i} className="whitespace-nowrap">
                      {workout}
                    </p>
                  ))}
                </div>

                {/* Get Started Button */}
                <div className="absolute left-0 bottom-6 w-[190px] flex items-center gap-3 px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                  <span className="text-black font-medium text-md">Get Started</span>
                  <FaArrowRight className="text-black" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
};

export default ExercisePage;
