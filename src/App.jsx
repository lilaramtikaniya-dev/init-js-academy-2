import { useState, useEffect, useRef } from 'react';
import {
  Box, Calculator, GitBranch, Repeat, Zap, List, Package, MousePointerClick,
  Cloud, Layers, Lock, CheckCircle2, Sparkles, MessageCircle, X, Send,
  Clock, Trophy, ChevronRight, ChevronLeft, BookOpen, RefreshCw, ArrowLeft
} from 'lucide-react';

/* ---------------------------------------------------------------- */
/* CONTENT                                                            */
/* ---------------------------------------------------------------- */

const TOPICS = [
  {
    id: 1,
    title: 'Variables & Data Types',
    icon: Box,
    blurb: 'Boxes that hold your data',
    lesson: {
      intro: "Variables are named containers for storing data. JavaScript gives you three ways to declare them, and every value has a type.",
      points: [
        'let — can be reassigned, scoped to the block it\'s in',
        'const — cannot be reassigned after it\'s set',
        'var — old-style, function-scoped (avoid in new code)',
        'Primitive types: string, number, boolean, undefined, null',
        'typeof tells you the type of a value'
      ],
      example: 'let name = "Asha";\nconst age = 21;\nvar isStudent = true;\n\nconsole.log(typeof name);  // "string"\nconsole.log(typeof age);   // "number"',
      explain: 'name can change later because it\'s let, but age is locked in with const. typeof returns the data type as a string.'
    },
    quiz: [
      { type: 'mcq', q: 'Which keyword creates a variable that cannot be reassigned?', options: ['var', 'let', 'const', 'function'], answer: 2 },
      { type: 'code', q: 'What does this print?', code: 'let x = "5";\nlet y = 5;\nconsole.log(x == y);', options: ['true', 'false', 'undefined', 'Error'], answer: 0 },
      { type: 'mcq', q: 'What does typeof null return?', options: ['"null"', '"object"', '"undefined"', '"boolean"'], answer: 1 },
      { type: 'code', q: 'What happens when this runs?', code: 'const a = 10;\na = 20;\nconsole.log(a);', options: ['Prints 20', 'Prints 10', 'Prints undefined', 'Throws an error'], answer: 3 },
      { type: 'mcq', q: 'Which of these is NOT a primitive data type?', options: ['String', 'Boolean', 'Array', 'Number'], answer: 2 },
    ]
  },
  {
    id: 2,
    title: 'Operators & Type Conversion',
    icon: Calculator,
    blurb: 'Doing math and comparing values',
    lesson: {
      intro: 'Operators let you calculate, compare, and combine values. JavaScript will sometimes silently convert types for you — this is called coercion.',
      points: [
        'Arithmetic: + - * / % ** (exponent)',
        'Comparison: == (loose, converts types) vs === (strict, no conversion)',
        'Logical: && (and), || (or), ! (not)',
        '"+" with a string triggers concatenation, not addition',
        '"-", "*", "/" with strings try to convert to numbers'
      ],
      example: 'console.log("5" + 3);   // "53"  (string concatenation)\nconsole.log("5" - 3);   // 2     (converted to number)\nconsole.log(5 === "5"); // false (different types)',
      explain: '"+" sees a string and joins them as text. "-" forces a numeric conversion. === checks type AND value, so a number never equals a string.'
    },
    quiz: [
      { type: 'code', q: 'What does this print?', code: 'console.log("10" + 5);', options: ['"105"', '15', '"15"', 'NaN'], answer: 0 },
      { type: 'code', q: 'What does this print?', code: 'console.log("10" - 5);', options: ['"10-5"', '5', 'NaN', '"5"'], answer: 1 },
      { type: 'mcq', q: 'Which operator checks both value AND type?', options: ['==', '===', '=', '!='], answer: 1 },
      { type: 'code', q: 'What does this print?', code: 'console.log(2 ** 3);', options: ['6', '8', '9', '23'], answer: 1 },
      { type: 'mcq', q: 'What is the result of true && false?', options: ['true', 'false', '1', 'undefined'], answer: 1 },
    ]
  },
  {
    id: 3,
    title: 'Control Flow',
    icon: GitBranch,
    blurb: 'Making decisions in code',
    lesson: {
      intro: 'Control flow statements let your program choose different paths depending on conditions.',
      points: [
        'if / else if / else — run code based on true/false conditions',
        'switch — compares one value against many possible cases',
        "Don't forget break inside switch cases, or execution falls through",
        'Ternary operator: condition ? valueIfTrue : valueIfFalse',
        'Comparisons (>, <, >=, <=, ===) return booleans used in conditions'
      ],
      example: 'let marks = 85;\nif (marks >= 90) {\n  console.log("A");\n} else if (marks >= 75) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
      explain: 'JavaScript checks each condition top to bottom and runs the first block whose condition is true. Here 85 >= 75 is true, so "B" is printed.'
    },
    quiz: [
      { type: 'code', q: 'What does this print?', code: 'let x = 7;\nif (x % 2 === 0) {\n  console.log("Even");\n} else {\n  console.log("Odd");\n}', options: ['Even', 'Odd', '7', 'undefined'], answer: 1 },
      { type: 'mcq', q: 'What is the correct ternary operator syntax?', options: ['condition ? a : b', 'if(condition){a}else{b}', 'condition => a', 'condition then a else b'], answer: 0 },
      { type: 'code', q: 'What does this print?', code: 'let day = 3;\nswitch (day) {\n  case 1: console.log("Mon"); break;\n  case 2: console.log("Tue"); break;\n  case 3: console.log("Wed"); break;\n  default: console.log("Other");\n}', options: ['Mon', 'Tue', 'Wed', 'Other'], answer: 2 },
      { type: 'mcq', q: 'What happens if you forget "break" in a switch case?', options: ['It throws an error', 'Only that case runs', 'Execution falls through to the next cases', 'The switch does nothing'], answer: 2 },
      { type: 'code', q: 'What does this print?', code: 'let age = 16;\nlet status = age >= 18 ? "Adult" : "Minor";\nconsole.log(status);', options: ['Adult', 'Minor', '16', 'true'], answer: 1 },
    ]
  },
  {
    id: 4,
    title: 'Loops',
    icon: Repeat,
    blurb: 'Repeating actions automatically',
    lesson: {
      intro: 'Loops let you run a block of code multiple times without copy-pasting it.',
      points: [
        'for — runs a set number of times: for (let i=0; i<5; i++)',
        'while — runs while a condition stays true',
        'do...while — runs the body at least once, then checks the condition',
        'for...of — loops over values in an array',
        'break exits a loop early, continue skips to the next iteration'
      ],
      example: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}\n// Output: 0  1  2',
      explain: 'i starts at 0. The loop runs while i < 3, printing i each time, then increases i by 1. It stops once i becomes 3.'
    },
    quiz: [
      { type: 'code', q: 'What does this print (each on its own line)?', code: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}', options: ['0 1 2', '1 2 3', '0 1 2 3', '1 2'], answer: 0 },
      { type: 'mcq', q: 'Which loop is guaranteed to run its body at least once?', options: ['for', 'while', 'do...while', 'for...of'], answer: 2 },
      { type: 'code', q: 'What value does this print?', code: 'let total = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  total += i;\n}\nconsole.log(total);', options: ['15', '12', '9', '13'], answer: 1 },
      { type: 'mcq', q: 'for...of is mainly used to iterate over:', options: ['object property names', 'iterable values like arrays', 'function definitions', 'class declarations'], answer: 1 },
      { type: 'code', q: 'How many times does "Hi" get printed?', code: 'let i = 0;\nwhile (i < 3) {\n  console.log("Hi");\n  i++;\n}', options: ['2 times', '3 times', 'Infinitely', '0 times'], answer: 1 },
    ]
  },
  {
    id: 5,
    title: 'Functions',
    icon: Zap,
    blurb: 'Reusable blocks of logic',
    lesson: {
      intro: 'Functions package up code so you can reuse it with different inputs (parameters) and get a result back (return value).',
      points: [
        'function declaration: function add(a, b) { return a + b; }',
        'arrow function: const add = (a, b) => a + b;',
        'Parameters can have default values: function greet(name = "Guest")',
        'A function without a return statement returns undefined',
        'Variables declared inside a function are not visible outside it (scope)'
      ],
      example: 'function add(a, b) {\n  return a + b;\n}\n\nconst multiply = (a, b) => a * b;\n\nconsole.log(add(2, 3));      // 5\nconsole.log(multiply(2, 3)); // 6',
      explain: 'Both styles define reusable logic. The arrow function with a single expression automatically returns its result — no "return" keyword needed.'
    },
    quiz: [
      { type: 'code', q: 'What does this print?', code: 'function greet(name = "Guest") {\n  return "Hello " + name;\n}\nconsole.log(greet());', options: ['"Hello "', '"Hello Guest"', '"Hello undefined"', 'Error'], answer: 1 },
      { type: 'mcq', q: 'Which is a correct arrow function that takes x and returns x * 2?', options: ['x => x * 2', 'function(x) => x * 2', '=> x * 2', '(x) -> x * 2'], answer: 0 },
      { type: 'code', q: 'What does the second console.log print?', code: 'function add(a, b) {\n  console.log(a + b);\n}\nlet result = add(2, 3);\nconsole.log(result);', options: ['5', 'undefined', 'NaN', 'Error'], answer: 1 },
      { type: 'mcq', q: 'A variable declared with "let" inside a function is:', options: ['accessible everywhere', 'accessible only within that function', 'accessible in the parent function', 'deleted immediately'], answer: 1 },
      { type: 'code', q: 'What does this print?', code: 'const square = (n) => n * n;\nconsole.log(square(4));', options: ['16', '8', '4', 'NaN'], answer: 0 },
    ]
  },
  {
    id: 6,
    title: 'Arrays',
    icon: List,
    blurb: 'Ordered lists of values',
    lesson: {
      intro: 'Arrays store ordered lists of values and come with built-in methods for working with that data.',
      points: [
        'Create with square brackets: let nums = [1, 2, 3]',
        'push() adds to the end, pop() removes from the end',
        'map() transforms every item into a new array',
        'filter() keeps only items that pass a test',
        'reduce() combines all items into a single value'
      ],
      example: 'let nums = [1, 2, 3, 4];\nlet doubled = nums.map(n => n * 2);\nlet evens = nums.filter(n => n % 2 === 0);\n\nconsole.log(doubled); // [2, 4, 6, 8]\nconsole.log(evens);   // [2, 4]',
      explain: 'map runs a function on every element and returns a new array of the results. filter returns only the elements where the function returns true.'
    },
    quiz: [
      { type: 'code', q: 'What does this print?', code: 'let arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);', options: ['[1, 2, 3, 4]', '[4, 1, 2, 3]', '[1, 2, 3]', '[1, 2, 3, 4, 4]'], answer: 0 },
      { type: 'code', q: 'What does this print?', code: 'let arr = [1, 2, 3, 4];\nlet evens = arr.filter(n => n % 2 === 0);\nconsole.log(evens);', options: ['[1, 3]', '[2, 4]', '[1, 2, 3, 4]', '[]'], answer: 1 },
      { type: 'mcq', q: 'Which method returns a new array of the same length with transformed items?', options: ['filter', 'reduce', 'map', 'forEach'], answer: 2 },
      { type: 'code', q: 'What does this print?', code: 'let arr = [1, 2, 3];\nlet sum = arr.reduce((acc, n) => acc + n, 0);\nconsole.log(sum);', options: ['6', '0', '[1, 2, 3]', 'NaN'], answer: 0 },
      { type: 'mcq', q: 'For the array [10, 20, 30], what is arr.length?', options: ['2', '3', '30', 'undefined'], answer: 1 },
    ]
  },
  {
    id: 7,
    title: 'Objects',
    icon: Package,
    blurb: 'Bundling related data together',
    lesson: {
      intro: 'Objects group related values and functions together as key-value pairs, modeling real-world things.',
      points: [
        'Object literal: { key: value, key2: value2 }',
        'Access properties with dot (obj.name) or bracket (obj["name"]) notation',
        'Use bracket notation when the key is stored in a variable',
        'Functions stored on an object are called methods',
        '"this" inside a method refers to the object it was called on'
      ],
      example: 'const person = {\n  name: "Ravi",\n  age: 25,\n  greet() {\n    return "Hi, I\'m " + this.name;\n  }\n};\n\nconsole.log(person.greet()); // "Hi, I\'m Ravi"',
      explain: '"this" lets the greet method refer back to the object it belongs to, so it can read person\'s own name property.'
    },
    quiz: [
      { type: 'code', q: 'What does this print?', code: 'const car = { brand: "Toyota", year: 2022 };\nconsole.log(car.brand);', options: ['"Toyota"', '"brand"', '2022', 'undefined'], answer: 0 },
      { type: 'mcq', q: 'Which notation must you use if the property name is stored in a variable?', options: ['dot notation', 'bracket notation', 'either works the same', 'neither works'], answer: 1 },
      { type: 'code', q: 'What does this print?', code: 'const user = {\n  name: "Maya",\n  greet: function() {\n    return "Hello " + this.name;\n  }\n};\nconsole.log(user.greet());', options: ['"Hello Maya"', '"Hello undefined"', '"Hello this.name"', 'Error'], answer: 0 },
      { type: 'code', q: 'What does this print?', code: 'const obj = { a: 1, b: 2 };\nobj.c = 3;\nconsole.log(Object.keys(obj));', options: ['["a", "b"]', '["a", "b", "c"]', '[1, 2, 3]', '{a, b, c}'], answer: 1 },
      { type: 'mcq', q: 'Inside an object method, "this" usually refers to:', options: ['the global window object', 'the object the method was called on', 'undefined', 'the method itself'], answer: 1 },
    ]
  },
  {
    id: 8,
    title: 'DOM & Events',
    icon: MousePointerClick,
    blurb: 'Making web pages interactive',
    lesson: {
      intro: 'The DOM (Document Object Model) is how JavaScript "sees" your HTML page. Events let you respond to user actions like clicks.',
      points: [
        'document.querySelector("selector") finds the first matching element',
        'el.textContent sets or reads the visible text of an element',
        'el.innerHTML can insert HTML markup, not just text',
        'el.addEventListener("click", handlerFunction) runs code on interaction',
        'Common events: click, input, submit, mouseover, keydown'
      ],
      example: 'const btn = document.querySelector("#myBtn");\nconst output = document.querySelector("#output");\n\nbtn.addEventListener("click", () => {\n  output.textContent = "Button clicked!";\n});',
      explain: 'querySelector grabs references to elements on the page. addEventListener attaches a function that runs every time that element is clicked.'
    },
    quiz: [
      { type: 'mcq', q: 'Which method selects the FIRST element matching a CSS selector?', options: ['getElementById', 'querySelector', 'getElementsByClass', 'selectElement'], answer: 1 },
      { type: 'code', q: 'What does this code do?', code: 'const el = document.querySelector("h1");\nel.textContent = "Hello DOM";', options: ['Creates a new h1 element', 'Changes the text of the first h1 on the page', 'Deletes the h1 element', 'Throws an error'], answer: 1 },
      { type: 'mcq', q: 'The first argument to addEventListener is usually:', options: ['a CSS selector', 'the event type, like "click"', 'a function', 'an HTML tag name'], answer: 1 },
      { type: 'code', q: 'If the button is clicked 3 times, what gets logged?', code: 'let count = 0;\nbutton.addEventListener("click", () => {\n  count++;\n  console.log(count);\n});', options: ['1 1 1', '0 1 2', '1 2 3', '3 3 3'], answer: 2 },
      { type: 'mcq', q: 'Compared to textContent, innerHTML:', options: ['only sets plain text', 'can parse and insert HTML markup', 'removes the element', 'only works on <body>'], answer: 1 },
    ]
  },
  {
    id: 9,
    title: 'Async JS & APIs',
    icon: Cloud,
    blurb: 'Promises, async/await, and fetch',
    comingSoon: true,
  },
  {
    id: 10,
    title: 'Frameworks & Beyond',
    icon: Layers,
    blurb: 'React, Node.js, and real-world apps',
    comingSoon: true,
  },
];

const TOTAL_UNLOCKABLE = TOPICS.filter(t => !t.comingSoon).length;
const QUIZ_SECONDS = 5 * 60;
const PASS_SCORE = 3; // out of 5

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/* ---------------------------------------------------------------- */
/* COMPONENT                                                          */
/* ---------------------------------------------------------------- */

export default function InitJsAcademy() {
  const [completed, setCompleted] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState('roadmap'); // roadmap | topic
  const [activeId, setActiveId] = useState(null);
  const [tab, setTab] = useState('lesson'); // lesson | quiz | result

  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_SECONDS);
  const [quizScore, setQuizScore] = useState(0);

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm your JS doubt-solver 🤖. Stuck on a concept, an error, or a quiz question? Ask me anything — in English or Hinglish, your choice." }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Load progress from local storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('init-js-progress');
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.completed)) setCompleted(data.completed);
      }
    } catch (e) {
      // no saved progress yet
    }
    setLoaded(true);
  }, []);

  // Save progress
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('init-js-progress', JSON.stringify({ completed }));
    } catch (e) {
      // ignore storage errors
    }
  }, [completed, loaded]);

  // Quiz countdown
  useEffect(() => {
    if (tab !== 'quiz') return;
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [tab, timeLeft]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen, chatLoading]);

  const activeTopic = TOPICS.find(t => t.id === activeId);
  const activeIndex = TOPICS.findIndex(t => t.id === activeId);

  function isUnlocked(index) {
    const topic = TOPICS[index];
    if (topic.comingSoon) return false;
    if (index === 0) return true;
    return completed.includes(TOPICS[index - 1].id);
  }

  function openTopic(index) {
    if (!isUnlocked(index)) return;
    setActiveId(TOPICS[index].id);
    setView('topic');
    setTab('lesson');
  }

  function backToRoadmap() {
    setView('roadmap');
    setActiveId(null);
  }

  function startQuiz() {
    setQIndex(0);
    setAnswers({});
    setTimeLeft(QUIZ_SECONDS);
    setTab('quiz');
  }

  function selectAnswer(optIdx) {
    setAnswers(prev => ({ ...prev, [qIndex]: optIdx }));
  }

  function submitQuiz() {
    const quiz = activeTopic.quiz;
    let score = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    setQuizScore(score);
    if (score >= PASS_SCORE && !completed.includes(activeTopic.id)) {
      setCompleted(prev => [...prev, activeTopic.id]);
    }
    setTab('result');
  }

  async function sendChatMessage() {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setChatInput('');
    setChatLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const textBlock = (data.content || []).find(b => b.type === 'text');
      const reply = textBlock ? textBlock.text : "Sorry, I couldn't generate a response. Try asking again?";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Hmm, I couldn't reach the AI service right now. Please try again in a moment." }]);
    } finally {
      setChatLoading(false);
    }
  }

  const completedCount = completed.length;
  const progressPct = Math.round((completedCount / TOTAL_UNLOCKABLE) * 100);

  return (
    <div className="min-h-screen w-full font-sans" style={{ background: 'radial-gradient(circle at 50% -10%, #1b2233 0%, #0a0e16 55%)', color: '#E5E9F0' }}>
      <style>{`
        @keyframes flow { from { background-position: 0 0; } to { background-position: 0 32px; } }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(240,219,79,0.45); }
          70% { box-shadow: 0 0 0 14px rgba(240,219,79,0); }
          100% { box-shadow: 0 0 0 0 rgba(240,219,79,0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.6); }
          60% { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.5s ease-out both; }
        .pop-in { animation: popIn 0.45s ease-out both; }
        .slide-up { animation: slideUp 0.25s ease-out both; }
        .node-current { animation: pulseRing 2.2s infinite; }
        .connector-active {
          background-image: repeating-linear-gradient(180deg, #F0DB4F 0px, #F0DB4F 8px, transparent 8px, transparent 16px);
          background-size: 100% 32px;
          animation: flow 0.9s linear infinite;
        }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #2a3344; border-radius: 3px; }
      `}</style>

      {view === 'roadmap' && (
        <Roadmap
          completed={completed}
          completedCount={completedCount}
          progressPct={progressPct}
          isUnlocked={isUnlocked}
          openTopic={openTopic}
        />
      )}

      {view === 'topic' && activeTopic && (
        <TopicView
          topic={activeTopic}
          tab={tab}
          setTab={setTab}
          backToRoadmap={backToRoadmap}
          startQuiz={startQuiz}
          qIndex={qIndex}
          setQIndex={setQIndex}
          answers={answers}
          selectAnswer={selectAnswer}
          timeLeft={timeLeft}
          submitQuiz={submitQuiz}
          quizScore={quizScore}
          nextTopic={activeIndex + 1 < TOPICS.length ? TOPICS[activeIndex + 1] : null}
          nextUnlockedNow={activeIndex + 1 < TOPICS.length && !TOPICS[activeIndex + 1].comingSoon}
          openNext={() => openTopic(activeIndex + 1)}
        />
      )}

      {/* AI Doubt Solver */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full px-4 py-3 font-mono text-sm font-bold shadow-lg"
          style={{ background: '#F0DB4F', color: '#0A0E16', boxShadow: '0 8px 24px rgba(240,219,79,0.35)' }}
        >
          <Sparkles className="w-5 h-5" />
          Ask AI
        </button>
      )}

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end bg-black bg-opacity-40">
          <div
            className="slide-up w-full sm:w-96 sm:m-6 rounded-t-2xl sm:rounded-2xl flex flex-col h-[80vh] sm:h-[600px] border"
            style={{ background: '#0F1623', borderColor: '#1F2937' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#1F2937' }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" style={{ color: '#F0DB4F' }} />
                <div>
                  <p className="font-mono font-bold text-sm" style={{ color: '#E5E9F0' }}>Doubt Solver</p>
                  <p className="text-xs" style={{ color: '#7C8AA0' }}>Ask anything about JS</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 rounded-lg" style={{ color: '#7C8AA0' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap"
                    style={m.role === 'user'
                      ? { background: 'rgba(240,219,79,0.15)', color: '#F0DB4F', border: '1px solid rgba(240,219,79,0.25)' }
                      : { background: '#161E2E', color: '#E5E9F0', border: '1px solid #1F2937' }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-3 py-2 text-sm font-mono" style={{ background: '#161E2E', color: '#7C8AA0', border: '1px solid #1F2937' }}>
                    thinking...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t flex items-center gap-2" style={{ borderColor: '#1F2937' }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendChatMessage(); }}
                placeholder="Type your doubt..."
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                style={{ background: '#161E2E', color: '#E5E9F0', border: '1px solid #1F2937' }}
              />
              <button
                onClick={sendChatMessage}
                disabled={chatLoading}
                className="p-2 rounded-lg"
                style={{ background: '#F0DB4F', color: '#0A0E16', opacity: chatLoading ? 0.5 : 1 }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* ROADMAP VIEW                                                       */
/* ---------------------------------------------------------------- */

function Roadmap({ completed, completedCount, progressPct, isUnlocked, openTopic }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-28">
      <header className="mb-8 fade-in-up">
        <p className="font-mono text-xs tracking-widest mb-1" style={{ color: '#F0DB4F' }}>// LEARNING PATH</p>
        <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#E5E9F0' }}>init();</h1>
        <p className="mt-2 text-sm" style={{ color: '#7C8AA0' }}>
          From your first variable to a working web page — one module unlocks the next.
        </p>

        <div className="mt-6">
          <div className="flex justify-between text-xs font-mono mb-1" style={{ color: '#7C8AA0' }}>
            <span>{completedCount} / {TOPICS.filter(t => !t.comingSoon).length} modules complete</span>
            <span>{progressPct}%</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#1F2937' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #F0DB4F, #5EEAD4)' }}
            />
          </div>
        </div>
      </header>

      <div>
        {TOPICS.map((topic, i) => {
          const unlocked = isUnlocked(i);
          const done = completed.includes(topic.id);
          const isCurrent = unlocked && !done;
          const Icon = topic.icon;
          const prevDone = i > 0 && completed.includes(TOPICS[i - 1].id);

          return (
            <div key={topic.id} className="fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              {i > 0 && (
                <div className={`ml-6 w-1 h-6 ${prevDone ? 'connector-active' : ''}`} style={!prevDone ? { background: '#1F2937' } : {}} />
              )}

              <button
                onClick={() => openTopic(i)}
                disabled={!unlocked}
                className="w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-transform"
                style={{
                  background: topic.comingSoon ? 'repeating-linear-gradient(135deg, #131A28 0px, #131A28 10px, #161B2A 10px, #161B2A 20px)' : '#131A28',
                  border: `1px solid ${done ? 'rgba(94,234,212,0.35)' : isCurrent ? 'rgba(240,219,79,0.4)' : '#1F2937'}`,
                  opacity: unlocked || topic.comingSoon ? 1 : 0.6,
                  cursor: unlocked ? 'pointer' : 'default',
                }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isCurrent ? 'node-current' : ''}`}
                  style={{
                    background: done ? 'rgba(94,234,212,0.15)' : isCurrent ? 'rgba(240,219,79,0.15)' : 'rgba(255,255,255,0.04)',
                    color: done ? '#5EEAD4' : isCurrent ? '#F0DB4F' : topic.comingSoon ? '#6D5BD0' : '#4A5568',
                  }}
                >
                  {done ? <CheckCircle2 className="w-6 h-6" /> : !unlocked ? <Lock className="w-5 h-5" /> : <Icon className="w-6 h-6" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-bold text-sm sm:text-base truncate" style={{ color: unlocked ? '#E5E9F0' : '#7C8AA0' }}>
                      {topic.title}
                    </p>
                    {topic.comingSoon && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(109,91,208,0.2)', color: '#A89BF0' }}>
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: '#7C8AA0' }}>{topic.blurb}</p>
                  {!unlocked && !topic.comingSoon && (
                    <p className="text-xs mt-1 font-mono" style={{ color: '#4A5568' }}>
                      Complete "{TOPICS[i - 1].title}" to unlock
                    </p>
                  )}
                </div>

                {unlocked && <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: '#4A5568' }} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* TOPIC VIEW (lesson / quiz / result)                               */
/* ---------------------------------------------------------------- */

function TopicView(props) {
  const {
    topic, tab, setTab, backToRoadmap, startQuiz,
    qIndex, setQIndex, answers, selectAnswer, timeLeft, submitQuiz, quizScore,
    nextTopic, nextUnlockedNow, openNext,
  } = props;

  const Icon = topic.icon;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-28">
      <button onClick={backToRoadmap} className="flex items-center gap-2 text-sm font-mono mb-6" style={{ color: '#7C8AA0' }}>
        <ArrowLeft className="w-4 h-4" /> Roadmap
      </button>

      <div className="flex items-center gap-3 mb-6 fade-in-up">
        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(240,219,79,0.15)', color: '#F0DB4F' }}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-mono text-xl sm:text-2xl font-bold" style={{ color: '#E5E9F0' }}>{topic.title}</h1>
          <p className="text-sm" style={{ color: '#7C8AA0' }}>{topic.blurb}</p>
        </div>
      </div>

      {tab === 'lesson' && (
        <div className="fade-in-up">
          <p className="text-base leading-relaxed mb-4" style={{ color: '#E5E9F0' }}>{topic.lesson.intro}</p>

          <ul className="space-y-2 mb-5">
            {topic.lesson.points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#C2CADA' }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#5EEAD4' }} />
                {p}
              </li>
            ))}
          </ul>

          <div className="rounded-xl overflow-hidden border mb-2" style={{ borderColor: '#1F2937', background: '#0D1420' }}>
            <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: '#1F2937' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#FB7185' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#F0DB4F' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#5EEAD4' }} />
              <span className="ml-2 text-xs font-mono" style={{ color: '#4A5568' }}>example.js</span>
            </div>
            <pre className="px-4 py-3 text-sm overflow-x-auto font-mono" style={{ color: '#C2CADA' }}>{topic.lesson.example}</pre>
          </div>
          <p className="text-sm mb-8" style={{ color: '#7C8AA0' }}>{topic.lesson.explain}</p>

          <button
            onClick={startQuiz}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-mono font-bold"
            style={{ background: '#F0DB4F', color: '#0A0E16' }}
          >
            <Clock className="w-4 h-4" /> Start 5-Minute Quiz
          </button>
        </div>
      )}

      {tab === 'quiz' && (
        <QuizPanel
          topic={topic}
          qIndex={qIndex}
          setQIndex={setQIndex}
          answers={answers}
          selectAnswer={selectAnswer}
          timeLeft={timeLeft}
          submitQuiz={submitQuiz}
        />
      )}

      {tab === 'result' && (
        <ResultPanel
          topic={topic}
          quizScore={quizScore}
          startQuiz={startQuiz}
          backToRoadmap={backToRoadmap}
          nextTopic={nextTopic}
          nextUnlockedNow={nextUnlockedNow}
          openNext={openNext}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* QUIZ PANEL                                                         */
/* ---------------------------------------------------------------- */

function QuizPanel({ topic, qIndex, setQIndex, answers, selectAnswer, timeLeft, submitQuiz }) {
  const quiz = topic.quiz;
  const question = quiz[qIndex];
  const isLast = qIndex === quiz.length - 1;
  const answered = answers[qIndex] !== undefined;
  const urgent = timeLeft <= 30;

  return (
    <div className="fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5">
          {quiz.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i === qIndex ? '#F0DB4F' : answers[i] !== undefined ? '#5EEAD4' : '#1F2937',
              }}
            />
          ))}
        </div>
        <div
          className="flex items-center gap-1.5 font-mono text-sm px-3 py-1 rounded-full"
          style={{ background: urgent ? 'rgba(251,113,133,0.15)' : 'rgba(255,255,255,0.05)', color: urgent ? '#FB7185' : '#7C8AA0' }}
        >
          <Clock className="w-3.5 h-3.5" /> {formatTime(timeLeft)}
        </div>
      </div>

      <p className="text-xs font-mono mb-2" style={{ color: '#4A5568' }}>Question {qIndex + 1} of {quiz.length}</p>
      <p className="text-base font-medium mb-3" style={{ color: '#E5E9F0' }}>{question.q}</p>

      {question.code && (
        <pre
          className="rounded-xl border px-4 py-3 text-sm overflow-x-auto font-mono mb-4"
          style={{ borderColor: '#1F2937', background: '#0D1420', color: '#C2CADA' }}
        >
          {question.code}
        </pre>
      )}

      <div className="space-y-2 mb-6">
        {question.options.map((opt, i) => {
          const selected = answers[qIndex] === i;
          return (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className="w-full text-left rounded-xl px-4 py-3 text-sm font-mono border transition-colors"
              style={{
                background: selected ? 'rgba(240,219,79,0.12)' : '#131A28',
                borderColor: selected ? '#F0DB4F' : '#1F2937',
                color: selected ? '#F0DB4F' : '#C2CADA',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setQIndex(i => Math.max(0, i - 1))}
          disabled={qIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-xl font-mono text-sm"
          style={{ color: qIndex === 0 ? '#3A4254' : '#7C8AA0', background: '#131A28', border: '1px solid #1F2937' }}
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        {isLast ? (
          <button
            onClick={submitQuiz}
            className="flex items-center gap-1 px-5 py-2 rounded-xl font-mono text-sm font-bold"
            style={{ background: '#F0DB4F', color: '#0A0E16' }}
          >
            Submit <CheckCircle2 className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setQIndex(i => Math.min(quiz.length - 1, i + 1))}
            disabled={!answered}
            className="flex items-center gap-1 px-5 py-2 rounded-xl font-mono text-sm font-bold"
            style={{ background: answered ? '#F0DB4F' : '#1F2937', color: answered ? '#0A0E16' : '#4A5568' }}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* RESULT PANEL                                                       */
/* ---------------------------------------------------------------- */

function ResultPanel({ topic, quizScore, startQuiz, backToRoadmap, nextTopic, nextUnlockedNow, openNext }) {
  const total = topic.quiz.length;
  const passed = quizScore >= PASS_SCORE;

  return (
    <div className="pop-in text-center py-6">
      <div
        className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
        style={{ background: passed ? 'rgba(94,234,212,0.15)' : 'rgba(251,113,133,0.12)', color: passed ? '#5EEAD4' : '#FB7185' }}
      >
        {passed ? <Trophy className="w-10 h-10" /> : <RefreshCw className="w-10 h-10" />}
      </div>

      <h2 className="font-mono text-2xl font-bold mb-1" style={{ color: '#E5E9F0' }}>
        {quizScore} / {total}
      </h2>
      <p className="text-sm mb-6" style={{ color: '#7C8AA0' }}>
        {passed ? "Nice work — you've unlocked the next module!" : `Score ${PASS_SCORE}/${total} or higher to unlock the next module.`}
      </p>

      {passed && nextTopic && nextUnlockedNow && (
        <div className="rounded-xl border px-4 py-3 mb-6 flex items-center gap-3 text-left" style={{ borderColor: 'rgba(240,219,79,0.3)', background: 'rgba(240,219,79,0.06)' }}>
          <Sparkles className="w-5 h-5 flex-shrink-0" style={{ color: '#F0DB4F' }} />
          <div>
            <p className="text-xs font-mono" style={{ color: '#7C8AA0' }}>Up next</p>
            <p className="text-sm font-mono font-bold" style={{ color: '#F0DB4F' }}>{nextTopic.title}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {!passed && (
          <button onClick={startQuiz} className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-mono font-bold" style={{ background: '#F0DB4F', color: '#0A0E16' }}>
            <RefreshCw className="w-4 h-4" /> Retake Quiz
          </button>
        )}
        {passed && nextTopic && nextUnlockedNow ? (
          <button onClick={openNext} className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-mono font-bold" style={{ background: '#F0DB4F', color: '#0A0E16' }}>
            Next Module <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={backToRoadmap} className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-mono font-bold border" style={{ borderColor: '#1F2937', color: '#E5E9F0' }}>
            <BookOpen className="w-4 h-4" /> Back to Roadmap
          </button>
        )}
      </div>
    </div>
  );
}
