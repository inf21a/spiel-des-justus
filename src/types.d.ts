interface Question {
  question: string;
}

interface PolarQuestion extends Question {
  answer: boolean;
}

interface OpenQuestion extends Question {
  options: string[];
  amount: number;
}

interface ChoiceQuestion extends Question {
  options: string[];
  answer?: string;
}

interface GroupQuestion extends Question {
  answer: string;
}

type Events = Array<{
  message: string;
  type: "money" | "pause"; // etc.
  amount?: number;
}>;
