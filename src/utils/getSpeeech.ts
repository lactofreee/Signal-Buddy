export const getSpeech = (text?: string) => {
  if (!text) return console.log("NONE TEXT");
  const lang = "ko-KR";
  const utterThis = new SpeechSynthesisUtterance(text);

  const speechSynthesis = window.speechSynthesis;
  const voices = speechSynthesis.getVoices();

  if (voices.length) {
    const kor_voice = voices.find(
      (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_"),
    );
    utterThis.lang = lang;
    utterThis.voice = kor_voice || null;
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(utterThis);
};
