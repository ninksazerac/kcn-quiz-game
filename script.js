const questions = [
  {
    question: "ชอบทำอะไรในเวลาว่าง?",
    choices: [
      { text: "เที่ยว", type: "หมา" },
      { text: "นอนหลับทั้งวัน", type: "แมว" },
      { text: "เดินป่า", type: "เสือ" },
    ],
  },
  {
    question: "กินอะไรเป็นของโปรด?",
    choices: [
      { text: "อะไรก็ได้", type: "หมา" },
      { text: "ปลาทอด", type: "แมว" },
      { text: "สเต๊กเนื้อ", type: "เสือ" },
    ],
  },
  {
    question: "ชอบอยู่กับใคร?",
    choices: [
      { text: "กับเพื่อน ๆ", type: "หมา" },
      { text: "อยู่คนเดียว", type: "แมว" },
      { text: "อยู่กับครอบครัว", type: "เสือ" },
    ],
  },
];

const results = {
  หมา: {
    title: "🐶 คุณคือ 'หมา'!",
    description: "คุณเป็นมิตร ร่าเริง ชอบเข้าสังคม และภักดีต่อเพื่อน!",
    image:
      "https://cdn.pixabay.com/photo/2016/02/19/10/00/dog-1207816_1280.jpg",
  },
  แมว: {
    title: "🐱 คุณคือ 'แมว'!",
    description: "คุณรักอิสระ สุขุม และมีเสน่ห์ลึกลับในตัวเอง",
    image:
      "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
  },
  เสือ: {
    title: "🐯 คุณคือ 'เสือ'!",
    description: "คุณกล้าหาญ เป็นผู้นำ และมีพลังแฝงในตัวเอง",
    image:
      "https://cdn.pixabay.com/photo/2019/08/26/06/24/tiger-4433166_1280.jpg",
  },
};

let currentQuestion = 0;
let scores = { หมา: 0, แมว: 0, เสือ: 0 };
let currentSelection = null;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const resultSection = document.getElementById("result");

function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.innerText = q.question;
  choicesElement.innerHTML = "";
  nextButton.classList.add("hidden");
  currentSelection = null;

  q.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.classList.add("choice-btn");
    btn.dataset.type = choice.type;

    btn.addEventListener("click", () => {
      if (currentSelection === btn) {
        // ยกเลิกการเลือก
        btn.classList.remove("selected");
        currentSelection = null;
        nextButton.classList.add("hidden");
      } else {
        // เปลี่ยนตัวเลือกใหม่
        Array.from(choicesElement.children).forEach((b) =>
          b.classList.remove("selected")
        );
        btn.classList.add("selected");
        currentSelection = btn;
        nextButton.classList.remove("hidden");
      }
    });

    choicesElement.appendChild(btn);
  });
}

nextButton.addEventListener("click", () => {
  if (currentSelection) {
    const selectedType = currentSelection.dataset.type;
    scores[selectedType]++;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  const topType = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
  const result = results[topType];
  document.getElementById("result-title").innerText = result.title;
  document.getElementById("result-description").innerText = result.description;
  document.getElementById("result-image").src = result.image;
  resultSection.classList.remove("hidden");
}

showQuestion();
