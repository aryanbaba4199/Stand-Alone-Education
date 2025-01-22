import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Stand Alone
          </h1>
          <p className="text-lg md:text-xl font-medium">
            Your trusted platform for IIT JEE, NEET, and MBBS coaching. We
            empower students to achieve their dreams.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            About Us
          </h2>
          <p className="text-lg md:text-xl text-center mb-6">
            At <span className="font-bold">Stand Alone</span>, we are committed
            to providing top-notch coaching and guidance to students aspiring to
            crack competitive exams like IIT JEE, NEET, and MBBS entrance
            exams. With experienced faculty, proven strategies, and a student-focused
            approach, we aim to make learning effective, engaging, and
            accessible.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <img
                src="https://i.pinimg.com/736x/10/5e/77/105e77a72ac6c135ba1a9a40b050c524.jpg" // Replace with your image path
                alt="Study Group"
                className="w-96 h-96 rounded-lg shadow-lg"
              />
              <p className="text-lg mt-4">
                Interactive and collaborative learning to boost understanding
                and performance.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://i.pinimg.com/736x/89/37/e9/8937e90a80159a78dac59874e756b2d3.jpg" // Replace with your image path
                alt="Success"
                className="w-96 h-96 rounded-lg shadow-lg"
              />
              <p className="text-lg mt-4">
                Proven track record of success with thousands of students
                achieving their goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 md:px-12 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Expert Faculty</h3>
              <p>
                Learn from the best minds in the field with years of experience
                in IIT JEE, NEET, and MBBS coaching.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Personalized Guidance</h3>
              <p>
                Tailored study plans and one-on-one mentoring to cater to
                individual needs.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Comprehensive Resources</h3>
              <p>
                Access to premium study material, practice tests, and detailed
                solutions for better preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Hear from Our Students
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg p-6 shadow-lg">
              <p className="italic">
                "Stand Alone's teaching methods helped me understand complex
                concepts with ease. Thanks to them, I secured a seat in my
                dream medical college!"
              </p>
              <p className="font-bold text-right mt-4">- Riya Sharma</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 shadow-lg">
              <p className="italic">
                "The best platform for IIT JEE preparation. The practice tests
                and doubt sessions were a game-changer for me."
              </p>
              <p className="font-bold text-right mt-4">- Arjun Verma</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl font-medium mb-6">
            Join thousands of students who have trusted Stand Alone to achieve
            their dreams. Let us help you excel in IIT JEE, NEET, and MBBS
            exams!
          </p>
          <a
            href="/auth"
            className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all"
          >
            Contact Us Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
