import React from 'react';
import Layout from '@/components/layout/Layout';

export default function Index() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e]">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to <span className="text-purple-400">CeyQuest</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Your comprehensive learning hub for government textbooks, interactive quizzes, 
              and personalized learning experiences for Grades 6-9.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                Start Learning
              </button>
              <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                Explore Subjects
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Textbook Manager</h3>
              <p className="text-white/70">Access and analyze government textbooks with AI-powered insights</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Quizzes</h3>
              <p className="text-white/70">Test your knowledge with adaptive quizzes and real-time feedback</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-white/70">Monitor your learning progress and achievements</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Platform Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">4</div>
                <div className="text-white/70">Grades</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">12+</div>
                <div className="text-white/70">Subjects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">100+</div>
                <div className="text-white/70">Chapters</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
                <div className="text-white/70">Questions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
