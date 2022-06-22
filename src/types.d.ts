interface Question {
  question: string;
}

interface PolarQuestion extends Question {
  answer: boolean;
}

interface OpenQuestion extends Question {
  options: Array<string>;
  amount: number;
}

interface ChoiceQuestion extends Question {
  options: Array<string>;
  answer?: string;
}

interface GroupQuestion extends Question {
  answer: string;
}

interface JustusEvent {
  message: string;
  eventType: string;
  amount: number;
}
