type Question = {
  question: string;
};

interface PolarQuestion extends Question {
  answer: boolean;
}


interface OpenQuestion extends Question {
  answer: string;
}

interface ChoiceQuestion extends Question {
  options: string[];
}

interface GroupQuestion extends Question {
  options: string[];
}

type Events = Array<{
  message: string;
  type: "money" | "pause"; // etc.
  amount?: number;
}>;
