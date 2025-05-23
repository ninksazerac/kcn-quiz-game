const questions = [
  {
    question: "เมื่อตื่นขึ้นมาในตอนเช้า ความรู้สึกแรกของคุณคือ...?",
    choices: [
      { text: "คิดถึงเป้าหมายที่ต้องทำให้สำเร็จวันนี้", type: "งาน_เศรษฐกิจ" },
      { text: "อยากเริ่มต้นวันด้วยการดูแลตัวเองให้ดี", type: "สุขภาพ" },
      { text: "นึกถึงคนในครอบครัวหรือคนที่เรารัก", type: "ครอบครัว" },
      { text: "เชื่อว่าวันนี้อาจมีเรื่องดีๆ เกิดขึ้น", type: "ความหวัง" },
    ],
  },
  {
    question: "เมื่อรู้สึกเหนื่อยล้า สิ่งที่คุณมักทำคือ...?",
    choices: [
      { text: "กลับไปโฟกัสที่เป้าหมายหรือโปรเจกต์ของตัวเอง", type: "งาน_เศรษฐกิจ" },
      { text: "พักผ่อน เดินเล่น หรือดูแลร่างกาย", type: "สุขภาพ" },
      { text: "พูดคุยหรืออยู่ใกล้ๆ คนในบ้าน", type: "ครอบครัว" },
      { text: "อ่านหรือฟังสิ่งที่สร้างแรงบันดาลใจ", type: "ความหวัง" },
    ],
  },
  {
    question: "หากมีเวลา 1 วันเต็มโดยไม่มีภาระ คุณอยากใช้มันทำอะไร?",
    choices: [
      { text: "วางแผนหรือลงมือทำสิ่งใหม่ ๆ ที่อาจทำรายได้", type: "งาน_เศรษฐกิจ" },
      { text: "ไปออกกำลังกาย นวด หรือดูแลสุขภาพ", type: "สุขภาพ" },
      { text: "ทำอาหารและใช้เวลาร่วมกับครอบครัว", type: "ครอบครัว" },
      { text: "ออกไปเที่ยวที่ไม่เคยไป เปิดประสบการณ์ใหม่", type: "ความหวัง" },
    ],
  },
  {
    question: "คำพูดที่คุณอยากได้ยินในตอนนี้มากที่สุดคือ...?",
    choices: [
      { text: "\"คุณเก่งมาก และอนาคตของคุณจะมั่นคงแน่นอน\"", type: "งาน_เศรษฐกิจ" },
      { text: "\"คุณดูแลตัวเองได้ดีขึ้นทุกวันนะ\"", type: "สุขภาพ" },
      { text: "\"ไม่ว่าอะไรจะเกิดขึ้น ฉันจะอยู่ข้างคุณเสมอ\"", type: "ครอบครัว" },
      { text: "\"ทุกอย่างกำลังจะดีขึ้นกว่าที่เคยเป็น\"", type: "ความหวัง" },
    ],
  },
  {
    question: "ถ้าจะมีของขวัญวิเศษชิ้นหนึ่งหล่นลงมาตรงหน้า<br> คุณอยากให้มันเป็นอะไร?",
    choices: [
      { text: "โอกาสดี ๆ ที่พาชีวิตมั่นคงขึ้น", type: "งาน_เศรษฐกิจ" },
      { text: "สุขภาพแข็งแรงทั้งกายและใจ ให้ตัวเองและคนที่รัก", type: "สุขภาพ" },
      { text: "ความสัมพันธ์ที่อบอุ่น เข้าใจกันมากขึ้น", type: "ครอบครัว" },
      { text: "พลังใจเล็ก ๆ ที่ช่วยให้ยืนหยัดได้ แม้จะเจอเรื่องยากอีกสักครั้ง", type: "ความหวัง" },
    ],
  },
];

const results = {
  งาน_เศรษฐกิจ: {
    title: "🏢 งานและเศรษฐกิจ 🪙",
    // description: "คุณเป็นมิตร ร่าเริง ชอบเข้าสังคม และภักดีต่อเพื่อน!",
    image:
      "./assets/4.png",
  },
  สุขภาพ: {
    title: "💪 สุขภาพ 🏃",
    // description: "คุณรักอิสระ สุขุม และมีเสน่ห์ลึกลับในตัวเอง",
    image:
      "./assets/1.png",
  },
  ครอบครัว: {
    title: "👨‍👩‍👧 ครอบครัว 💖",
    // description: "คุณกล้าหาญ เป็นผู้นำ และมีพลังแฝงในตัวเอง",
    image:
      "./assets/2.png",
  },
  ความหวัง: {
    title: "🕊️ ความหวัง 🌠",
    // description: "คุณกล้าหาญ เป็นผู้นำ และมีพลังแฝงในตัวเอง",
    image:
      "./assets/3.png",
  },
};

let currentQuestion = 0;
let scores = { งาน_เศรษฐกิจ: 0, สุขภาพ: 0, ครอบครัว: 0, ความหวัง: 0 };
let currentSelection = null;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const resultSection = document.getElementById("result");

function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.innerText = q.question;
  choicesElement.innerHTML = "";
  nextButton.classList.add("hidden");
  currentSelection = null;

  const shuffledChoices = [...q.choices];
  shuffle(shuffledChoices);

  shuffledChoices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.style.fontFamily = "Mali";
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
        nextButton.style.fontFamily = "Mali";
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
  document.getElementById("result-title").style.backgroundColor = "#c4acd67d";
  document.getElementById("result-title").style.padding = "10px";
  document.getElementById("result-title").style.borderRadius = "10px";
  document.getElementById("result-title").classList.add("shimmer-text");
  // document.getElementById("result-description").innerText = result.description;
  document.getElementById("result-image").src = result.image;
  resultSection.classList.remove("hidden");
}

showQuestion();
