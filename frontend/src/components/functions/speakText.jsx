const speakText = (text, lang = "en") => {
  const voices = window.speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance(text);
  const langMap = {
    vi: "vi-VN",
    en: "en-US",
  };

  utterance.lang = langMap[lang] || "en-US";
  speechSynthesis.speak(utterance);
};

export default speakText;