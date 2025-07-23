import speakText from "../functions/speakText";

const toggleSpeakText = (text) => {
  speakText(text)
};

function SpeakTextButton({ text }){
    return(
    <button onClick={() => toggleSpeakText(text)}>
        Read Text
    </button>
    )
}

export default SpeakTextButton;