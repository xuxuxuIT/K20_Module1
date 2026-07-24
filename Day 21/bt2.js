const students = [
  { id: 1, name: "Khoa Nguyen" },
  { id: 2, name: "My Tran" },
  { id: 3, name: "Phong Le" },
  { id: 4, name: "Yen Vo" },
  { id: 5, name: "Bao Pham" },
];

const answerKey = [
  { question: 1, correctAnswer: "A", point: 2 },
  { question: 2, correctAnswer: "C", point: 1 },
  { question: 3, correctAnswer: "B", point: 3 },
  { question: 4, correctAnswer: "D", point: 2 },
  { question: 5, correctAnswer: "A", point: 2 },
];

const submissions = [
  {
    studentId: 1,
    submittedAt: "2026-07-10T08:00:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "A" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 2,
    submittedAt: "2026-07-10T08:05:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "B" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "C" },
    ],
  },
  {
    studentId: 3,
    submittedAt: "2026-07-10T07:58:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 4,
    submittedAt: "2026-07-10T08:02:00",
    answers: [
      { question: 1, answer: "B" },
      { question: 2, answer: "C" },
    ],
  },
  {
    studentId: 5,
    submittedAt: "2026-07-10T08:01:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
];

function gradeExam(students, answerKey, submissions) {
  const result = students.map((student) => {
    return {
      id: student.id,
      name: student.name,
      score: 0,
      correctCount: 0,
      wrongQuestions: [],
      rank: 0,
      submittedAt: null,
    };
  });

  for (const studentResult of result) {
    const submission = submissions.find((item) => {
      return item.studentId === studentResult.id;
    });
    if (submission) {
      studentResult.submittedAt = submission.submittedAt;
    }

    if (!submission || !Object.hasOwn(submission, "answers")) {
      for (const key of answerKey) {
        studentResult.wrongQuestions.push(key.question);
      }

      continue;
    }

    for (const x of answerKey) {
      const answer = submission.answers.find((item) => {
        return item.question === x.question;
      });
      // tinh diem

      if (answer && answer.answer === x.correctAnswer) {
        studentResult.score += x.point;
        studentResult.correctCount++;
      } else {
        studentResult.wrongQuestions.push(x.question);
      }
    }

    // console.log(submission);
  }
  result.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });
  let currentRank = 1;

  for (let i = 0; i < result.length; i++) {
    if (i === 0) {
      result[i].rank = 1;
      continue;
    }

    const current = result[i];
    const previous = result[i - 1];

    if (current.score === previous.score) {
      current.rank = previous.rank;
    } else {
      currentRank = i + 1;

      current.rank = currentRank;
    }
  }
  Object.defineProperty(student, "score", {
    writable: false,
  });

  console.log(result);
  return result;
}

const bao = {
  wrongQuestions: [2, 4, 5],
};

for (const question of WrongAnswerIterator(bao)) {
  console.log(question);
}
function WrongAnswerIterator(studentResult) {
  return {
    [Symbol.iterator]() {
      let index = 0;

      return {
        next() {
          if (index < studentResult.wrongQuestions.length) {
            const value = studentResult.wrongQuestions[index];

            index++;

            return {
              value,
              done: false,
            };
          }

          return {
            done: true,
          };
        },
      };
    },
  };
}

console.log(gradeExam(students, answerKey, submissions));
