// Interactive-lab data for Egan, The Skilled Helper (10th ed., 2012). Paraphrased with page refs;
// helper responses in the substitutes game are the book's own examples, shortened.

export const model = {
  page: 222,
  stages: [
    { id: "I", name: "Stage I: The current picture", q: "What are my concerns?", aim: "Help clients explore their concerns as clearly as possible, with neither too much nor too little detail.", page: 222, ch: 9,
      tasks: [
        { id: "I-A", name: "The story", q: "What's going on in my life? What are my main concerns?", ch: 9, page: 222 },
        { id: "I-B", name: "The real story", q: "Looking more closely, what's really going on? What new perspectives will help?", ch: 10, page: 222 },
        { id: "I-C", name: "The right story", q: "What should I work on — which issues would make a real difference?", ch: 10, page: 223 },
      ] },
    { id: "II", name: "Stage II: The preferred picture", q: "What do I need or want?", aim: "Help clients imagine the future they want, in terms of outcomes and goals.", page: 223, ch: 11,
      tasks: [
        { id: "II-A", name: "Possibilities", q: "What possibilities do I have for a better future?", ch: 11, page: 223 },
        { id: "II-B", name: "Goals / outcomes", q: "What do I really want and need? Which solutions are best for me?", ch: 12, page: 223 },
        { id: "II-C", name: "Commitment", q: "What am I willing to pay for what I want?", ch: 12, page: 223 },
      ] },
    { id: "III", name: "Stage III: The way forward", q: "How do I make it happen?", aim: "Help clients draw up a realistic plan to reach their goals.", page: 223, ch: 13,
      tasks: [
        { id: "III-A", name: "Possible strategies", q: "What are the possible paths to my goals?", ch: 13, page: 223 },
        { id: "III-B", name: "Best-fit strategies", q: "Which strategies are best for me and fit my resources?", ch: 13, page: 223 },
        { id: "III-C", name: "Plans", q: "How do I organise my strategies — what first, second, third?", ch: 13, page: 223 },
      ] },
  ],
  arrow: { page: 224, text: "All three stages sit on the action arrow: clients need to act on their own behalf from the very first session. The stages and their nine tasks are about planning for change; implementation (Chapter 14) is about making it happen." },
  nonlinear: { page: 223, text: "The stages are logical but not a rigid, step-by-step sequence in practice." },
};

export const soler = [
  { letter: "S", name: "Face the client Squarely", page: 77, text: "Adopt a posture of involvement — \"I'm here with you.\" Not a military stance: if facing squarely feels threatening, an angled position works. What matters is the quality of your presence." },
  { letter: "O", name: "Adopt an Open posture", page: 77, text: "Crossed arms and legs can signal less involvement. Ask yourself how far your posture communicates openness and availability — literally or metaphorically." },
  { letter: "L", name: "Lean toward the client at times", page: 77, text: "A slight lean says you're interested; slouching back can say you're bored. Leaning too far or too soon can frighten a client. More broadly, it means bodily (and mental) flexibility." },
  { letter: "E", name: "Maintain good Eye contact", page: 78, text: "Fairly steady eye contact, not staring; looking away now and then is fine. Frequent looking away may hint at your own reluctance or discomfort. In some cultures too much eye contact, especially with authority, is inappropriate." },
  { letter: "R", name: "Be relatively Relaxed", page: 78, text: "No fidgeting or distracting expressions, and comfort using your body as a vehicle of contact. Being natural puts the client at ease." },
];
export const solerNotes = [
  { page: 77, text: "SOLER is only a framework, and should be adapted to different cultures." },
  { page: 78, text: "A counsellor teaching visually impaired students proposed SOLAR — A for “Aim” your head and body toward the client, since eye contact matters little but voice direction matters a lot." },
  { page: 78, text: "These are guidelines, not absolute rules to apply rigidly." },
];

export const rami = {
  page: 131,
  story: "Rami, a middle-aged man hit by the economic collapse, is losing his house. In his second session he tells the counsellor that a business partner he trusted as a friend defrauded him, legally or untraceably. He has found a way to get financial revenge to restore his family's honour, and says no one will know.",
};
export const substitutes = [
  { name: "No response", page: 132, example: "The counsellor says nothing and leaves Rami sitting in silence after his disclosure.", why: "If a client says something significant, respond to it, however briefly — otherwise they may think it didn't merit a response (cultures do differ about silence)." },
  { name: "Distracting question", page: 132, example: "“Are you sure there is no way to get your money back?”", why: "Ignores Rami's key messages and feelings and pursues the helper's own agenda for information." },
  { name: "Cliché", page: 132, example: "“Given the greed in our culture, I'm not surprised things like this happen.”", why: "Hollow and dismissive — it implies the client doesn't really have a problem because this happens a lot." },
  { name: "Interpretation", page: 132, example: "“Have you ever thought that revenge will cure nothing?”", why: "Theory over understanding: ignores feelings, sounds moralistic, and misses what revenge means in Rami's culture." },
  { name: "Advice", page: 132, example: "“Focus on your financial and family concerns — it's a business problem.”", why: "Out of order at this stage and robs clients of self-responsibility (though some clients and cultures expect advice; it can be offered collaboratively, p. 133)." },
  { name: "Parroting", page: 133, example: "The counsellor restates Rami's whole account back to him almost point by point.", why: "Mere repetition carries no sense of being with the client. Use your own words, a slightly different angle, note the emotion, and don't say too much." },
  { name: "Agreement and sympathy", page: 133, example: "“I can see how hard this is… I know I'd feel awful.”", why: "Sympathy is closer to pity and agreement than understanding; at worst it is collusion with the client." },
  { name: "Faking it", page: 134, example: "The counsellor has lost the thread but nods along as if they understood.", why: "Don't feign understanding. Admit you're lost (“I think I've lost you — could we go over that again?”); it shows respect." },
];
