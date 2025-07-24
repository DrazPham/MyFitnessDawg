import { useTranslation } from "react-i18next";
import speakText from "../functions/speakText";

function SpeakTextButton({ text, lang }) {
  const toggleSpeakText = () => {
    speakText(text, lang);
  };

  return (
    <button onClick={toggleSpeakText}>
      Read Text
    </button>
  );
}


export default SpeakTextButton;