import Sidebar from "../components/Sidebar";

function Admin() {

  const stats = [

    {
      title: "Total Students",
      value: "3,500+",
      color: "from-cyan-500 to-blue-500",
      icon: "🎓",
    },

    {
      title: "Active Events",
      value: "12",
      color: "from-purple-500 to-pink-500",
      icon: "🎉",
    },

    {
      title: "Placement Offers",
      value: "850+",
      color: "from-green-500 to-emerald-500",
      icon: "💼",
    },

    {
      title: "Departments",
      value: "9",
      color: "from-orange-500 to-red-500",
      icon: "🏛️",
    },

  ];

  return (

    <div className="flex min-h-screen bg-[#020617] text-white overflow-hidden">

      <Sidebar />

      {/* MAIN */}

      <div className="flex-1 ml-24 md:ml-72 p-6 md:p-10">

        {/* HEADER */}

        <div className="flex items-center justify-between flex-wrap gap-5">

          <div>

            <h1
              className="text-6xl font-extrabold
              bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
              bg-clip-text text-transparent"
            >

              Admin Panel 🏛️

            </h1>

            <p className="text-gray-400 mt-4 text-xl">
              Manage students, events & campus activities
            </p>

          </div>

          {/* ADMIN BADGE */}

          <div
            className="px-6 py-4 rounded-2xl
            bg-cyan-500/10 border border-cyan-400/20
            backdrop-blur-xl"
          >

            <p className="text-cyan-400 text-lg font-semibold">
              ● Admin Access
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">

          {stats.map((item, index) => (

            <div
              key={index}
              className="rounded-[35px]
              overflow-hidden
              bg-white/5 border border-white/10
              backdrop-blur-xl
              hover:-translate-y-3
              hover:border-cyan-400/30
              transition-all duration-500
              shadow-2xl"
            >

              <div
                className={`h-3 bg-gradient-to-r ${item.color}`}
              />

              <div className="p-8">

                <div
                  className={`w-20 h-20 rounded-3xl
                  bg-gradient-to-r ${item.color}
                  flex items-center justify-center
                  text-4xl shadow-2xl`}
                >

                  {item.icon}

                </div>

                <h2 className="text-5xl font-bold mt-8">
                  {item.value}
                </h2>

                <p className="text-gray-400 mt-3 text-xl">
                  {item.title}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-16">

          <h2 className="text-4xl font-bold mb-8">
            Quick Actions ⚡
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            <button
              className="p-8 rounded-[30px]
              bg-gradient-to-r from-cyan-500 to-blue-500
              hover:scale-105 transition-all duration-300
              text-left shadow-2xl"
            >

              <h3 className="text-3xl font-bold">
                Add Event
              </h3>

              <p className="mt-3 text-lg">
                Create workshops & hackathons
              </p>

            </button>

            <button
              className="p-8 rounded-[30px]
              bg-gradient-to-r from-purple-500 to-pink-500
              hover:scale-105 transition-all duration-300
              text-left shadow-2xl"
            >

              <h3 className="text-3xl font-bold">
                Upload Timetable
              </h3>

              <p className="mt-3 text-lg">
                Manage student schedules
              </p>

            </button>

            <button
              className="p-8 rounded-[30px]
              bg-gradient-to-r from-green-500 to-emerald-500
              hover:scale-105 transition-all duration-300
              text-left shadow-2xl"
            >

              <h3 className="text-3xl font-bold">
                Announcements
              </h3>

              <p className="mt-3 text-lg">
                Push campus notifications
              </p>

            </button>

            <button
              className="p-8 rounded-[30px]
              bg-gradient-to-r from-orange-500 to-red-500
              hover:scale-105 transition-all duration-300
              text-left shadow-2xl"
            >

              <h3 className="text-3xl font-bold">
                Placement Drive
              </h3>

              <p className="mt-3 text-lg">
                Add company opportunities
              </p>

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Admin;