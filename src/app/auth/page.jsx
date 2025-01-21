"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Caraousel from "@/Components/home/Caraousel";
import StudentForm from "@/Components/user/RegForm";

const Page = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans mt-4 px-4">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-purple-600 text-white py-20 rounded-lg">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold mb-6">
            Ace Your NEET Journey with Us
          </h1>
          <p className="text-xl font-light mb-8 max-w-3xl mx-auto">
            Our NEET program combines expert teaching, personalized guidance,
            and state-of-the-art resources to ensure your success in cracking
            the medical entrance exam.
          </p>
          <Link
            href="#enroll"
            className="bg-white text-blue-600 px-8 py-4 font-semibold rounded-full shadow-md hover:bg-gray-100"
          >
            Enroll Now
          </Link>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Student Success Stories
          </h2>
          <Caraousel />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
            Why Choose Our NEET Coaching?
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Our program offers personalized mentorship, cutting-edge study
            materials, and structured learning to help you achieve your medical
            dreams.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">
                Expert Faculty
              </h3>
              <p className="text-gray-600">
                Learn from top educators with years of experience in preparing
                students for NEET.
              </p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-purple-700 mb-4">
                Comprehensive Materials
              </h3>
              <p className="text-gray-600">
                Access our exclusive study materials designed to cover every
                topic in-depth.
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-green-700 mb-4">
                Personalized Guidance
              </h3>
              <p className="text-gray-600">
                Receive one-on-one mentorship to address your specific learning
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-200 py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-10">
            Program Highlights
          </h3>
          <div className="grid md:grid-colo-1 gap-2 grid-cols-2">
            <img
              src="https://xylemlearning.com/wp-content/uploads/2023/05/Integrated-2.png"
              className="w-auto"
            />
            <img src="https://xylemlearning.com/wp-content/uploads/2023/05/Integrated-4.png" />
            <img src="https://xylemlearning.com/wp-content/uploads/2023/05/integrated-5.png" />
            <img src="https://xylemlearning.com/wp-content/uploads/2023/05/Integrated-3.png" />
            <img src="https://xylemlearning.com/wp-content/uploads/2023/05/integrated-6.png" />
            <img src="https://xylemlearning.com/wp-content/uploads/2023/05/integrated-7.png" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Aryan Gupta",
                review:
                  "The personalized guidance I received was incredible. I secured a seat in my dream college!",
              },
              {
                name: "Pooja Sharma",
                review:
                  "The study materials and mock tests were game changers for me. Highly recommended!",
              },
              {
                name: "Rahul Jain",
                review:
                  "Amazing faculty and support team! They truly care about student success.",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.review}"
                </p>
                <h4 className="text-blue-700 font-bold">
                  - {testimonial.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4">
        <StudentForm />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "What is the duration of the NEET repeater program?",
                answer:
                  "The program spans one academic year, covering all essential topics in-depth.",
              },
              {
                question: "Are the study materials updated for NEET 2023?",
                answer:
                  "Yes, all materials are meticulously updated to reflect the latest exam pattern.",
              },
              {
                question: "Do you provide online and offline classes?",
                answer:
                  "We offer both formats to accommodate diverse learning preferences.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <summary className="font-semibold cursor-pointer text-lg">
                  {faq.question}
                </summary>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
