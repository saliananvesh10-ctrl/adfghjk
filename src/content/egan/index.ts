import { withUid, type OutlineItem, type Subject } from "../types";
import ch01 from "./ch01.json";
import ch02 from "./ch02.json";
import ch03 from "./ch03.json";
import ch04 from "./ch04.json";
import ch05 from "./ch05.json";
import ch06 from "./ch06.json";
import ch07 from "./ch07.json";
import ch08 from "./ch08.json";
import ch09 from "./ch09.json";
import ch10 from "./ch10.json";
import ch11 from "./ch11.json";
import ch12 from "./ch12.json";
import ch13 from "./ch13.json";
import ch14 from "./ch14.json";

const P1 = "Part I: Laying the Groundwork", P2 = "Part II: The Therapeutic Dialogue", P3 = "Part III: The Problem-Management Approach";
// From the book's contents pages.
export const outline: readonly OutlineItem[] = [
  { number: 1, title: "The Ingredients of Successful Helping", theorist: null, approach: P1, pages: [3, 35] },
  { number: 2, title: "The Helping Relationship and the Values That Drive It", theorist: null, approach: P1, pages: [36, 68] },
  { number: 3, title: "Empathic Presence: Tuning In and Listening", theorist: null, approach: P2, pages: [71, 103] },
  { number: 4, title: "Empathic Responding: Working at Mutual Understanding", theorist: null, approach: P2, pages: [104, 134] },
  { number: 5, title: "The Art of Probing and Summarizing", theorist: null, approach: P2, pages: [135, 157] },
  { number: 6, title: "Facilitating Client Self-Challenge: From New Perspectives to New Behavior", theorist: null, approach: P2, pages: [158, 190] },
  { number: 7, title: "Helper Self-Challenge", theorist: null, approach: P2, pages: [191, 214] },
  { number: 8, title: "An Introduction to the Problem-Management Process", theorist: null, approach: P3, pages: [215, 235] },
  { number: 9, title: "Stage I-A: Help Clients Tell Their Stories", theorist: null, approach: P3, pages: [236, 258] },
  { number: 10, title: "Stage I: Task I-B, the Real Story; Task I-C, the Right Story", theorist: null, approach: P3, pages: [259, 281] },
  { number: 11, title: "Stage II: Designing Problem-Managing Goals; Task II-A, Possibilities for a Better Future", theorist: null, approach: P3, pages: [282, 302] },
  { number: 12, title: "Stage II: Task II-B, Goals, Outcomes, Impact; Task II-C, Commitment", theorist: null, approach: P3, pages: [303, 341] },
  { number: 13, title: "Stage III: Planning the Way Forward", theorist: null, approach: P3, pages: [342, 372] },
  { number: 14, title: "Implementation: Making It All Happen", theorist: null, approach: P3, pages: [373, 404] },
];

export const egan: Subject = {
  id: "egan",
  short: "Egan",
  paper: "Introduction to Counselling",
  name: "The Skilled Helper",
  source: { title: "The Skilled Helper (10th ed.)", author: "Gerard Egan", publisher: "Cengage Learning", year: 2012 },
  outline,
  chapters: withUid("egan", [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11, ch12, ch13, ch14]),
};
