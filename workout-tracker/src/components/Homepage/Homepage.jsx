import React from "react"
import ContactPageHeader from "./ContactPageHeader/ContactPageHeader.jsx"
import Footer from "./Footer/Footer.jsx"
import { FaArrowRightLong } from "react-icons/fa6";
import { FaDumbbell } from "react-icons/fa6";
import { TbTreadmill } from "react-icons/tb";
import { LuBicepsFlexed } from "react-icons/lu";
import Navbar from "../Navbar/Navbar.jsx";

function Homepage() {

  const detailCards = [
    {
      icon: (<FaDumbbell className="w-6 h-6" />),
      title: "Fitness Training",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur eveniet saepe similique ea. Eveniet, earum?"
    },
    {
      icon: (<TbTreadmill className="w-6 h-6"/>),
      title: "Modern Equipment",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur eveniet saepe similique ea. Eveniet, earum?"
    },
    {
      icon: (<LuBicepsFlexed className="w-6 h-6"/>),
      title: "Experience Trainer",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur eveniet saepe similique ea. Eveniet, earum?"
    },
    {
      icon: (<FaDumbbell className="w-6 h-6"/>),
      title: "Fitness Training",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur eveniet saepe similique ea. Eveniet, earum?"
    }
  ]

  const programCards = [
    {
      imgSrc: "/homepage/programs-1.jpg",
      title: "Aerobic",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur eveniet saepe similique ea. Eveniet, earum?"
    },
    {
      imgSrc: "/homepage//programs-2.jpg",
      title: "Yoga",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur eveniet saepe similique ea. Eveniet, earum?"
    },
    {
      imgSrc: "/homepage//programs-3.jpg",
      title: "Lifter",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur eveniet saepe similique ea. Eveniet, earum?"
    }
  ]

  return <>
  <Navbar />
    <div>
      <div className="flex items-center text-white h-[500px] bg-cover bg-no-repeat bg-center" style={{backgroundImage: "url(/homepage/header.jpg"}}>
        <div className="w-[87.5%] m-auto flex flex-col gap-5">
          <h1 className="text-7xl font-bold">Think Less,</h1>
          <h1 className="text-7xl font-bold">Lift More!</h1>
          <p>We're dedicated to helping you transform your body and mind through the power of fitness</p>
          <button className="w-fit p-4 flex items-center gap-4 hover:cursor-pointer">
            <p>Join Now</p>
            <FaArrowRightLong />
          </button>
        </div>
      </div>

      <div className="w-[87.5%] mx-auto mt-20">
        <h2 className="text-5xl font-semibold text-center">Why Choose Us</h2>
        <p className="text-center mt-4 mb-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil iusto velit provident doloribus quidem, dolorem asperiores, voluptas quos nam tempora sequi, aliquid nemo officia dicta soluta molestias eaque. Odit, porro.</p>
        <div className="grid grid-cols-[2fr_1fr]">
          <ul className="flex flex-wrap">
            {detailCards.map((card) => (
            <div className="w-1/2 flex flex-col gap-2 flex-none p-5">
              <div className="flex items-center justify-center rounded-full bg-stone-100 w-10 h-10">
                {card.icon}
              </div>
              <h3 className="font-semibold text-xl">{card.title}</h3>
              <p className="text-stone-500">{card.text}</p>
            </div>))}
          </ul>
          <div>
            <img className="object-cover h-full" src="/homepage//details-img.jpg" />
          </div>
        </div>
      </div>

      <div className="w-[87.5%] mx-auto my-40">
        <h2 className="text-5xl font-semibold text-center">Our Programs</h2>
        <p className="text-center mt-4 mb-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil iusto velit provident doloribus quidem, dolorem asperiores, voluptas quos nam tempora sequi, aliquid nemo officia dicta soluta molestias eaque. Odit, porro.</p>
        <ul className="grid grid-cols-[1fr_1fr_1fr] gap-4">
          {programCards.map((card) => (
            <div className="flex flex-col gap-2">
              <img src={card.imgSrc} className="h-[400px] object-cover" />
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="text-stone-500">{card.text}</p>
            </div>))}
        </ul>
      </div>
      <ContactPageHeader/>
      <Footer/>
    </div>
  </>
}

export default Homepage