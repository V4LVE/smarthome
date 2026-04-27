import { Button } from "@heroui/react";
import Link from "next/link";
import { connectMqtt } from "@/services/mqttService";

export default function Home() {
  connectMqtt();
  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 sm:py-32">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Gradient Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Welcome to SmartHome
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
            Control Your Home,{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Effortlessly
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Experience the future of home automation. Monitor, control, and optimize your smart devices from anywhere with our intuitive platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/dashboard">
              <Button className="px-8 py-6 text-base font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button className="px-8 py-6 text-base font-semibold rounded-lg border-2 border-zinc-300 dark:border-zinc-700 text-black dark:text-white bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-300 w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 pt-16 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                100+
              </p>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
                Devices Supported
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                24/7
              </p>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
                Remote Access
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                Real-time
              </p>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1">
                Monitoring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-black dark:text-white mb-12">
            Powerful Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature Card 1 */}
            <div className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                Instant Control
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Turn devices on or off instantly with a single tap from your phone or dashboard.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg
                  className="w-6 h-6 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                Real-time Analytics
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Track energy usage, temperature, humidity and more with detailed charts and insights.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                Automation
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Set up smart routines and automations to optimize your home automatically.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Enterprise-grade encryption keeps your home data safe and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="w-full max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Join thousands of users who have transformed their homes into smart spaces.
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-6 text-base font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
