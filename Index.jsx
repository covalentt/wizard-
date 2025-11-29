import React, { useState, useEffect } from 'react';
import { Sparkles, User, Users } from 'lucide-react';

export default function KalonWorld() {
  const [stage, setStage] = useState('welcome'); // welcome, login, character, story
  const [userData, setUserData] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const characters = {
    male: [
      { id: 1, name: 'Aether the Wise', personality: 'Calm and strategic', trait: 'Intelligence +5', bg: 'from-blue-600 to-purple-600' },
      { id: 2, name: 'Blaze the Fierce', personality: 'Bold and aggressive', trait: 'Strength +5', bg: 'from-red-600 to-orange-600' },
      { id: 3, name: 'Shadow the Silent', personality: 'Mysterious and cunning', trait: 'Stealth +5', bg: 'from-gray-700 to-black' },
      { id: 4, name: 'Nova the Radiant', personality: 'Optimistic and charismatic', trait: 'Charm +5', bg: 'from-yellow-500 to-pink-500' },
      { id: 5, name: 'Frost the Stoic', personality: 'Patient and resilient', trait: 'Defense +5', bg: 'from-cyan-500 to-blue-800' }
    ],
    female: [
      { id: 1, name: 'Luna the Mystic', personality: 'Intuitive and wise', trait: 'Magic +5', bg: 'from-purple-600 to-indigo-600' },
      { id: 2, name: 'Ember the Brave', personality: 'Courageous and fierce', trait: 'Strength +5', bg: 'from-orange-600 to-red-700' },
      { id: 3, name: 'Raven the Enigma', personality: 'Clever and elusive', trait: 'Stealth +5', bg: 'from-gray-800 to-purple-900' },
      { id: 4, name: 'Aurora the Bright', personality: 'Joyful and inspiring', trait: 'Charm +5', bg: 'from-pink-500 to-yellow-400' },
      { id: 5, name: 'Crystal the Guardian', personality: 'Protective and steady', trait: 'Defense +5', bg: 'from-teal-500 to-blue-700' }
    ],
    guest: [
      { id: 1, name: 'Wanderer', personality: 'Curious explorer', trait: 'Balanced', bg: 'from-gray-600 to-gray-800' },
      { id: 2, name: 'Seeker', personality: 'Truth finder', trait: 'Balanced', bg: 'from-indigo-600 to-purple-700' }
    ]
  };

  const handleInstagramLogin = () => {
    // Simulating Instagram login
    const mockData = {
      username: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'Alex',
      gender: Math.random() > 0.5 ? 'male' : 'female',
      source: 'instagram'
    };
    
    // Save to localStorage for demo (you'll replace this with Google Sheets)
    localStorage.setItem('kalon_user', JSON.stringify(mockData));
    setUserData(mockData);
    setStage('character');
  };

  const handleGuestLogin = () => {
    const guestData = {
      username: 'guest',
      name: 'Guest',
      gender: 'guest',
      source: 'guest'
    };
    setUserData(guestData);
    setStage('character');
  };

  const selectCharacter = (char) => {
    setSelectedCharacter(char);
    setTimeout(() => setStage('story'), 500);
  };

  const getCharacterList = () => {
    if (!userData) return [];
    return characters[userData.gender] || characters.guest;
  };

  if (stage === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>

        {/* Floating banner */}
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4 py-4 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
              Welcome to Kalon's World
            </h1>
            <Sparkles className="text-yellow-400 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl animate-pulse">
                Your Adventure Awaits
              </h2>
              <p className="text-xl md:text-2xl text-purple-200">
                Step into a realm of magic, mystery, and infinite possibilities
              </p>
            </div>

            {/* Mystical circle effect */}
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-50 animate-pulse" />
              <div className="absolute inset-8 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-yellow-300 animate-bounce" />
              </div>
            </div>

            <button
              onClick={() => setStage('login')}
              className="group relative px-12 py-5 text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full overflow-hidden transform transition-all hover:scale-110 hover:shadow-2xl"
            >
              <span className="relative z-10">Dive In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
        <div className="bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border-2 border-purple-500/50 max-w-md w-full space-y-6 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Choose Your Path
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={handleInstagramLogin}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg"
            >
              <User className="w-6 h-6" />
              Login with Instagram
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">or</span>
              </div>
            </div>

            <button
              onClick={handleGuestLogin}
              className="w-full py-4 px-6 bg-gray-700 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-600 transform hover:scale-105 transition-all shadow-lg"
            >
              <Users className="w-6 h-6" />
              Continue as Guest
            </button>
          </div>

          <p className="text-sm text-center text-gray-400 italic">
            💡 Recommended: Login with Instagram for the full experience
          </p>
        </div>
      </div>
    );
  }

  if (stage === 'character') {
    const charList = getCharacterList();
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Champion, {userData?.name}
            </h2>
            <p className="text-xl text-purple-300">
              Each character brings unique strengths to your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charList.map((char) => (
              <div
                key={char.id}
                onClick={() => selectCharacter(char)}
                className={`cursor-pointer bg-gradient-to-br ${char.bg} p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-white/20`}
              >
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-6xl">⚔️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{char.name}</h3>
                  <p className="text-white/90 italic">{char.personality}</p>
                  <div className="bg-black/30 py-2 px-4 rounded-full">
                    <p className="text-yellow-300 font-semibold">{char.trait}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'story') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-12 px-4">
        <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border-2 border-purple-500/50">
          <div className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                Your Journey Begins
              </h2>
              <div className="flex items-center justify-center gap-4 text-white">
                <span className="text-xl">{userData?.name}</span>
                <span className="text-purple-400">as</span>
                <span className="text-xl font-bold text-yellow-400">{selectedCharacter?.name}</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                The ancient gates of Kalon shimmer before you, pulsing with an otherworldly light. As {selectedCharacter?.name}, you feel the power of {selectedCharacter?.trait.toLowerCase()} coursing through your veins.
              </p>
              <p className="text-lg">
                The guardian spirit materializes, its ethereal form swirling with stardust. "Welcome, brave soul," it whispers. "Three paths lie before you, each leading to a different destiny..."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <button className="p-6 bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl hover:scale-105 transform transition-all">
                  <div className="text-4xl mb-2">🌲</div>
                  <h4 className="font-bold text-white mb-2">The Enchanted Forest</h4>
                  <p className="text-sm text-green-100">Ancient wisdom awaits</p>
                </button>

                <button className="p-6 bg-gradient-to-br from-red-600 to-orange-800 rounded-xl hover:scale-105 transform transition-all">
                  <div className="text-4xl mb-2">⛰️</div>
                  <h4 className="font-bold text-white mb-2">The Fire Mountains</h4>
                  <p className="text-sm text-orange-100">Test your courage</p>
                </button>

                <button className="p-6 bg-gradient-to-br from-blue-600 to-cyan-800 rounded-xl hover:scale-105 transform transition-all">
                  <div className="text-4xl mb-2">🌊</div>
                  <h4 className="font-bold text-white mb-2">The Crystal Caverns</h4>
                  <p className="text-sm text-cyan-100">Uncover hidden secrets</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}