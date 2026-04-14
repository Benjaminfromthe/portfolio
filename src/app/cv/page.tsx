import Image from "next/image";

export default function CVPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full text-center">

        {/* Profile Image */}
        <div className="flex justify-center">
          <Image
            src="/images/profile.jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold mt-4">
          Benjamin Nshimiye
        </h1>

        <p className="text-gray-600 mt-2">
          Software Developer | AI Enthusiast | Full Stack Engineer
        </p>

        {/* About */}
        <div className="mt-6 text-left">
          <h2 className="text-xl font-semibold">About Me</h2>
          <p className="text-gray-700 mt-2">
            I am a passionate developer who loves building AI-powered applications,
            modern web apps, and solving real-world problems using technology.
          </p>
        </div>

        {/* Button */}
        <a
          href="/"
          className="inline-block mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Go Back Home
        </a>

      </div>
    </div>
  );
}