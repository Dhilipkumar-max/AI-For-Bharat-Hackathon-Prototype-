const fs = require('fs');
const file = 'd:/React/AI-Vidya-for-Bharat-main/AI-Vidya-for-Bharat-main/frontend/src/i18n/translations.ts';
let code = fs.readFileSync(file, 'utf8');

// Replace types
code = code.replace(
    'export type SupportedUiLanguage = "en" | "hi" | "ta" | "te" | "kn";',
    'export type SupportedUiLanguage = "en" | "hi" | "ta" | "te" | "ml" | "kn";'
);

code = code.replace(
    'return ["en", "hi", "ta", "te", "kn"].includes(value);',
    'return ["en", "hi", "ta", "te", "ml", "kn"].includes(value);'
);

// Add malayalam block
const mlBlock = `  ml: {
    appName: "AI Vidya for Bharat",
    home: "ഹോം",
    exploreTopics: "വിഷയങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക",
    dashboard: "കോഴ്സ് ഡാഷ്ബോർഡ്",
    settings: "ക്രമീകരണങ്ങൾ",
    navigation: "നാവിഗേഷൻ",
    guestDemo: "അതിഥി ഡെമോ",
    demoModeNoLogin: "ഡെമോ മോഡ് - ലോഗിൻ ആവശ്യമില്ല",
    generateCourseTitle: "കോഴ്സ് ജനറേറ്റ് ചെയ്യുക",
    generateCourse: "കോഴ്സ് ജനറേറ്റ് ചെയ്യുക",
    generating: "ജനറേറ്റ് ചെയ്യുന്നു...",
    generateCourseSubtitle: "AI വഴി കോഴ്സുകൾ ഉടനടി ജനറേറ്റ് ചെയ്യുക.",
    topic: "വിഷയം",
    language: "ഭാഷ",
    topicPlaceholder: "ഉദാഹരണം: കാലാവസ്ഥാ വ്യതിയാനത്തിന്റെ അടിസ്ഥാനങ്ങൾ",
    topicHelp: "നിങ്ങൾ പഠിക്കാൻ ആഗ്രഹിക്കുന്ന വിഷയം നൽകുക.",
    topicRequired: "കോഴ്സ് ജനറേറ്റ് ചെയ്യാൻ ദയവായി ഒരു വിഷയം നൽകുക.",
    popularTopics: "ജനപ്രിയ വിഷയങ്ങൾ",
    tryPopularTopics: "ജനപ്രിയ വിഷയങ്ങൾ ശ്രമിക്കുക",
    programming: "പ്രോഗ്രാമിംഗ്",
    artificialIntelligence: "നിർമ്മിത ബുദ്ധി",
    careerSkills: "കരിയർ കഴിവുകൾ",
    mathematics: "ഗണിതം",
    agriculture: "കൃഷി",
    chooseTopicQuickly: "പെട്ടെന്ന് കോഴ്സ് ജനറേറ്റ് ചെയ്യാൻ ഒരു വിഷയം തിരഞ്ഞെടുക്കുക.",
    continueLearning: "പഠനം തുടരുക",
    progress: "പുരോഗതി",
    chaptersViewed: "അധ്യായങ്ങൾ കണ്ടു",
    startCourseToTrack: "പുരോഗതി അറിയാൻ ഈ കോഴ്സ് ആരംഭിക്കുക",
    yourAiLearningLibrary: "നിങ്ങളുടെ AI ലേണിംഗ് ലൈബ്രറി",
    allCoursesStored: "AI സൃഷ്ടിച്ച എല്ലാ കോഴ്സുകളും ഇവിടെ സൂക്ഷിച്ചിരിക്കുന്നു.",
    courseGeneratedCount: " ജനറേറ്റ് ചെയ്ത കോഴ്സുകൾ",
    oneCourseGenerated: " ജനറേറ്റ് ചെയ്ത കോഴ്സ്",
    searchCourses: "കോഴ്സുകൾ തിരയുക",
    searchByTitleOrTopic: "തലക്കെട്ടോ വിഷയമോ ഉപയോഗിച്ച് തിരയുക",
    loadingCourses: "കോഴ്സുകൾ ലോഡുചെയ്യുന്നു...",
    coursesLoadError: "നിലവിൽ കോഴ്സുകൾ ലോഡുചെയ്യാൻ കഴിഞ്ഞില്ല.",
    noCoursesYet: "ഇതുവരെ കോഴ്സുകളൊന്നും ജനറേറ്റ് ചെയ്തിട്ടില്ല.",
    createFirstCourse: "ഹോം പേജിൽ നിന്ന് നിങ്ങളുടെ ആദ്യ AI കോഴ്സ് സൃഷ്ടിക്കുക.",
    generateFirstCourse: "നിങ്ങളുടെ ആദ്യ കോഴ്സ് ജനറേറ്റ് ചെയ്യുക",
    noMatchingCourses: "അനുയോജ്യമായ കോഴ്സുകൾ കണ്ടെത്തിയില്ല.",
    searchDifferentTitle: "മറ്റൊരു തലക്കെട്ടോ വിഷയമോ ഉപയോഗിച്ച് തിരയാൻ ശ്രമിക്കുക.",
    userPreferences: "ഉപയോക്തൃ മുൻഗണനകൾ",
    websiteLanguage: "വെബ്സൈറ്റ് ഭാഷ",
    websiteLanguageUpdated: "വെബ്സൈറ്റ് ഭാഷ അപ്‌ഡേറ്റ് ചെയ്തു.",
    websiteLanguageHelp: "നിങ്ങളുടെ വെബ്സൈറ്റ് ഇന്റർഫേസ് ഭാഷ തിരഞ്ഞെടുക്കുക.",
    voiceSettings: "ശബ്ദ ക്രമീകരണങ്ങൾ",
    enableVoiceInteraction: "ശബ്ദ ആശയവിനിമയം പ്രവർത്തനക്ഷമമാക്കുക",
    voiceInteractionEnabled: "ശബ്ദ ആശയവിനിമയം പ്രവർത്തനക്ഷമമാക്കി.",
    voiceInteractionDisabled: "ശബ്ദ ആശയവിനിമയം പ്രവർത്തനരഹിതമാക്കി.",
    voiceSettingsHelp: "AI Guru ചാറ്റിൽ ശബ്ദ ആശയവിനിമയം പ്രവർത്തനക്ഷമമാക്കുകയോ പ്രവർത്തനരഹിതമാക്കുകയോ ചെയ്യുക.",
    dataManagement: "ഡാറ്റ മാനേജ്മെന്റ്",
    clearAllCourses: "ജനറേറ്റ് ചെയ്ത എല്ലാ കോഴ്സുകളും മായ്ക്കുക",
    clearing: "മായ്ക്കുന്നു...",
    clearCoursesHelp: "വലിയ ഡാറ്റാബേസിൽ നിന്ന് ജനറേറ്റ് ചെയ്ത എല്ലാ കോഴ്സുകളും ഡിലീറ്റ് ചെയ്യുക.",
    clearCoursesConfirm: "ഇത് ജനറേറ്റ് ചെയ്ത എല്ലാ കോഴ്സുകളും ഡിലീറ്റ് ചെയ്യും. തുടരണമെന്നുണ്ടോ?",
    clearCoursesSuccess: "ജനറേറ്റ് ചെയ്ത എല്ലാ കോഴ്സുകളും മായ്ച്ചു.",
    clearCoursesError: "കോഴ്സുകൾ മായ്ക്കാൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക.",
    demoInformation: "ഡെമോ വിവരങ്ങൾ",
    demoInfoText: "വെബ്സൈറ്റ് ഭാഷ ഈ ഡെമോയുടെ ഇന്റർഫേസ് മുൻഗണന മാറ്റുന്നു. കോഴ്സ് ജനറേറ്റ് ചെയ്യുമ്പോൾ കോഴ്സ് ഉള്ളടക്ക ഭാഷ തിരഞ്ഞെടുക്കപ്പെടുന്നു.",
    settingsTitle: "ക്രമീകരണങ്ങൾ",
    settingsSubtitle: "ഈ അതിഥി ഡെമോ അനുഭവത്തിനായുള്ള മുൻഗണനകൾ നിയന്ത്രിക്കുക.",
    exploreTitle: "വിഷയങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക",
    exploreSubtitle: "വിഭാഗങ്ങൾ തിരിച്ച് വിഷയങ്ങൾ കണ്ടെത്തുക, ഒറ്റ ക്ലിക്കിൽ കോഴ്സ് ജനറേറ്റ് ചെയ്യുക.",
    generatedCourse: "ജനറേറ്റ് ചെയ്ത കോഴ്സ്",
    generatedByAi: "AI വഴി ജനറേറ്റ് ചെയ്തത്",
    courseProgress: "കോഴ്സ് പുരോഗതി",
    courseChapters: "കോഴ്സ് അധ്യായങ്ങൾ",
    aiLearningTools: "AI ലേണിംഗ് ടൂളുകൾ",
    askAiGuru: "AI Guru വിനോട് ചോദിക്കുക",
    explainChapter: "അധ്യായം വിശദീകരിക്കുക",
    generateQuiz: "ക്വിസ് ജനറേറ്റ് ചെയ്യുക",
    giveExamples: "ഉദാഹരണങ്ങൾ നൽകുക",
    needHelpCourse: "ഈ കോഴ്സ് മനസ്സിലാക്കാൻ സഹായം ആവശ്യമുണ്ടോ?",
    useAiToolsForCourse: "ഈ കോഴ്സിനായി AI ടൂളുകൾ ഉപയോഗിക്കുക",
    andChapter: "ഒപ്പം അധ്യായവും",
    loadingGeneratedCourse: "നിങ്ങൾ ജനറേറ്റ് ചെയ്ത കോഴ്സ് ലോഡുചെയ്യുന്നു...",
    courseNotFound: "കോഴ്സ് കണ്ടെത്തിയില്ല.",
    couldNotLoadCourse: "കോഴ്സ് ലോഡുചെയ്യാൻ കഴിഞ്ഞില്ല",
    backToHome: "ഹോമിലേക്ക് മടങ്ങുക",
    unableGenerateCourse: "കോഴ്സ് ജനറേറ്റ് ചെയ്യാൻ കഴിഞ്ഞില്ല",
    topicMissingGenerate: "വിഷയം നൽകിയിട്ടില്ല. ദയവായി തിരികെ പോയി ഒരു വിഷയം നൽകുക.",
    couldNotGenerateNow: "ഇപ്പോൾ നിങ്ങളുടെ കോഴ്സ് ജനറേറ്റ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    retryingCourseGeneration: "കോഴ്സ് ജനറേഷൻ വീണ്ടും ശ്രമിക്കുന്നു...",
    generatingCourseUsingAi: "AI ഉപയോഗിച്ച് നിങ്ങളുടെ കോഴ്സ് ജനറേറ്റ് ചെയ്യുന്നു...",
    preparingChapters: "നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ അധ്യായങ്ങളും വിശദീകരണങ്ങളും തയ്യാറാക്കുന്നു.",
    tryAgain: "വീണ്ടും ശ്രമിക്കുക",
    retrying: "വീണ്ടും ശ്രമിക്കുന്നു...",
    aiGuru: "AI Guru",
    askYourQuestion: "നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക",
    chatSubtitle: "സംഭാഷണ രൂപത്തിൽ ലളിതമായ വിശദീകരണങ്ങൾ നേടുക.",
    chatWelcomeMessage: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI Guru ആണ്. നിങ്ങളുടെ കോഴ്സിനെക്കുറിച്ച് ഏത് ചോദ്യവും ചോദിക്കുക, ഞാൻ വ്യക്തമായി വിശദീകരിക്കാം.",
    courseContextMissing: "കോഴ്സ് വിവരങ്ങൾ ലഭ്യമല്ല. പൂർണ്ണ വിവരങ്ങളോടെ ചോദിക്കാൻ കോഴ്സ് പേജിൽ നിന്ന് ചാറ്റ് തുറക്കുക.",
    currentChapterContext: "നിലവിലെ അധ്യായത്തിന്റെ വിവരങ്ങൾ",
    aiGuruTyping: "AI Guru ടൈപ്പ് ചെയ്യുന്നു...",
    listening: "ശ്രദ്ധിക്കുന്നു...",
    sendMessageError: "സന്ദേശം അയയ്ക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    chatPlaceholder: "നിങ്ങളുടെ അധ്യായങ്ങളെക്കുറിച്ച് AI Guru വിനോട് എന്തും ചോദിക്കുക",
    send: "അയയ്ക്കുക",
    sending: "അയയ്ക്കുന്നു...",
    chatLoading: "ചാറ്റ് ലോഡുചെയ്യുന്നു...",
    generateAnotherCourse: "മറ്റൊരു കോഴ്സ് ജനറേറ്റ് ചെയ്യുക",
    openCourse: "കോഴ്സ് തുറക്കുക",
    createdTime: "സൃഷ്ടിച്ച സമയം",
    unknown: "അജ്ഞാതം",
    chapter: "അധ്യായം",
    expand: "വികസിപ്പിക്കുക",
    collapse: "ചുരുക്കുക",
    courseOverview: "കോഴ്സ് അവലോകനം",
    whatYouWillLearn: "നിങ്ങൾ എന്താണ് പഠിക്കാൻ പോകുന്നത്",
    recommendedVideos: "ശുപാർശ ചെയ്യുന്ന വീഡിയോകൾ",
    openNavigationMenu: "നാവിഗേഷൻ മെനു തുറക്കുക",
    closeNavigationMenu: "നാവിഗേഷൻ മെനു അടയ്ക്കുക",
    voiceButtonStart: "ശബ്ദം",
    voiceButtonStop: "നിർത്തുക",
    microphonePermissionDenied: "മൈക്രോഫോൺ അനുമതി നിഷേധിച്ചു. ദയവായി മൈക്രോഫോൺ ആക്സസ് അനുവദിക്കുക.",
    voiceRequiresHttps: "ശബ്ദ ഇൻപുട്ടിന് സുരക്ഷിത കണക്ഷൻ (HTTPS) ആവശ്യമാണ്.",
    voiceNotSupported: "ഈ ബ്രൗസറിൽ ശബ്ദ ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല.",
    speechNotRecognized: "ശബ്ദം തിരിച്ചറിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    voiceInputFailed: "ശബ്ദ ഇൻപുട്ട് പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    courseFallbackOverview: "ഈ കോഴ്സ് {language} ഭാഷയിൽ {topic} നെക്കുറിച്ചുള്ള പ്രായോഗിക ആമുഖം നൽകുന്നു, പടിപടിയായി പഠിക്കാൻ രൂപകൽപ്പന ചെയ്ത അധ്യായങ്ങളോടെ.",
    outcomeUnderstandChapter: "{chapter} മനസ്സിലാക്കുക",
    outcomeLearnKeyIdeas: "{chapter} ലെ പ്രധാന ആശയങ്ങൾ പഠിക്കുക",
    outcomeImplementConcepts: "{chapter} ലെ ആശയങ്ങൾ പ്രായോഗിക വ്യായാമങ്ങളിൽ പ്രയോഗിക്കുക",
    outcomeApplyLearningProblems: "{chapter} യഥാർത്ഥ പഠന പ്രശ്നങ്ങളിൽ പ്രയോഗിക്കുക",
    outcomeUnderstandFundamentals: "{topic} ന്റെ അടിസ്ഥാന കാര്യങ്ങൾ മനസ്സിലാക്കുക",
    outcomeLearnCoreConcepts: "വ്യക്തമായ ഉദാഹരണങ്ങളോടെ പ്രധാന ആശയങ്ങൾ പഠിക്കുക",
    outcomeApplyPracticalScenarios: "{topic} പ്രായോഗിക സാഹചര്യങ്ങളിൽ പ്രയോഗിക്കുക",
    aiPromptExplainChapter: "\\"{chapter}\\" എന്ന അധ്യായം ലളിതമായി വിശദീകരിക്കുക.",
    aiPromptExplainChapterFallback: "ഈ അധ്യായം ലളിതമായി വിശദീകരിക്കുക.",
    aiPromptGenerateQuiz: "\\"{chapter}\\" എന്ന അധ്യായത്തിനായി ഒരു ചെറിയ ക്വിസ് ജനറേറ്റ് ചെയ്യുക.",
    aiPromptGenerateQuizFallback: "ഈ അധ്യായത്തിനായി ഒരു ചെറിയ ക്വിസ് ജനറേറ്റ് ചെയ്യുക.",
    aiPromptGiveExamples: "\\"{chapter}\\" എന്ന അധ്യായത്തിന് പ്രായോഗിക ഉദാഹരണങ്ങൾ നൽകുക.",
    aiPromptGiveExamplesFallback: "ഈ അധ്യായത്തിന് പ്രായോഗിക ഉദാഹരണങ്ങൾ നൽകുക.",
    languageEnglish: "English",
    languageHindi: "हिन्दी",
    languageTamil: "தமிழ்",
    languageTelugu: "తెలుగు",
    languageKannada: "ಕನ್ನಡ",
    topicPython: "പൈത്തൺ",
    topicJavaScript: "ജാവാസ്ക്രിപ്റ്റ്",
    topicReact: "റിയാക്റ്റ്",
    topicTypeScript: "ടൈപ്പ്സ്ക്രിപ്റ്റ്",
    topicDataStructures: "ഡാറ്റ സ്ട്രക്ചേഴ്സ്",
    topicMachineLearning: "മെഷീൻ ലേണിംഗ്",
    topicNeuralNetworks: "ന്യൂറൽ നെറ്റ്‌വർക്കുകൾ",
    topicPromptEngineering: "പ്രോംപ്റ്റ് എഞ്ചിനീയറിംഗ്",
    topicComputerVision: "കമ്പ്യൂട്ടർ വിഷൻ",
    topicAlgebra: "ബീജഗണിതം",
    topicCalculus: "കാൽക്കുലസ്",
    topicStatistics: "സ്റ്റാറ്റിസ്റ്റിക്സ്",
    topicProbability: "സാധ്യത",
    topicResumeWriting: "റെസ്യൂമെ തയ്യാറാക്കൽ",
    topicInterviewPreparation: "ഇന്റർവ്യൂ തയ്യാറെടുപ്പ്",
    topicCommunicationSkills: "ആശയവിനിമയ കഴിവുകൾ",
    topicTimeManagement: "സമയ മാനേജ്മെന്റ്",
    topicSoilHealth: "മണ്ണിന്റെ ആരോഗ്യം",
    topicCropRotation: "വിള പരിക്രമണം",
    topicSustainableFarming: "സുസ്ഥിര കൃഷി",
    topicIrrigationBasics: "ജലസേചന അടിസ്ഥാനങ്ങൾ",
    videoIntroToTopic: "{topic} ലേക്കുള്ള ആമുഖം",
    videoExplainedChapter: "{chapter} വിശദീകരിച്ചു",
    videoExplainedTopic: "{topic} വിശദീകരിച്ചു",
    videoPracticeForTopic: "{topic} നായുള്ള പരിശീലന വ്യായാമങ്ങൾ"
  },`;

code = code.replace(
    '  }\n} as const;',
    `  },\n${mlBlock}\n} as const;`
);

let lines = code.split('\\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('languageTelugu:')) {
        const spaces = lines[i].match(/^\s*/)[0];
        const orig = lines[i];

        // figure out malayalam based on the dictionary
        let malayalamText = 'Malayalam';
        if (lines[i].includes('Telugu')) malayalamText = 'Malayalam';
        else if (lines[i].includes('तेलुगु')) malayalamText = 'मलयालम';
        else if (lines[i].includes('தெலுங்கு')) malayalamText = 'மலையாளம்';
        else if (lines[i].includes('తెలుగు')) malayalamText = 'മലയാളം';
        else if (lines[i].includes('ತೆಲುಗು')) malayalamText = 'ಮಲಯಾಳಂ';
        else malayalamText = 'മലയാളം';

        lines[i] = orig + '\\n' + spaces + 'languageMalayalam: "' + malayalamText + '",';
    }
}
code = lines.join('\\n');

fs.writeFileSync(file, code);
console.log('updated translations.ts');
