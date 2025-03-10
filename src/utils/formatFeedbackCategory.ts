export const formatFeedbackCategory = (category: string) => {
  switch (category) {
    case "ETC":
      return "기타";
    case "DELAY":
      return "신호 지연";
    case "MALFUNCTION":
      return "오작동";
    case "ADD_SIGNAL":
      return "신호등 추가";
  }
};
