// Data for the interactive lab. Every entry is paraphrased from Schultz & Schultz (2017)
// with its page; scenarios are the book's own examples unless marked `illustrative`.

export const freudMind = {
  levels: [
    { id: "conscious", name: "Conscious", page: 44, text: "Everything you're aware of right now: sensations, thoughts, experiences. Freud saw it as a small, limited part of personality — the tip of the iceberg." },
    { id: "preconscious", name: "Preconscious", page: 45, text: "A storehouse of memories, perceptions and thoughts you aren't aware of at the moment but can easily call up, like remembering what you did last night." },
    { id: "unconscious", name: "Unconscious", page: 45, text: "The large, hidden part below the surface. It holds the instincts, wishes and desires that drive behaviour — forces we cannot see or control. The focus of psychoanalysis." },
  ],
  structures: [
    { id: "id", name: "Id", principle: "Pleasure principle", thought: "Primary-process thought", page: 46, text: "The reservoir of instincts and libido; supplies energy to the whole personality. Selfish, amoral and impulsive, it demands immediate gratification and has no awareness of reality. Freud likened it to a newborn baby." },
    { id: "ego", name: "Ego", principle: "Reality principle", thought: "Secondary-process thought", page: 46, text: "The rational master. It doesn't block the id but postpones or redirects satisfaction to fit reality — the rider guiding the horse. It serves three masters: the id, reality and the superego." },
    { id: "superego", name: "Superego", principle: "Moral perfection", thought: "Conscience + ego-ideal", page: 47, text: "Internalised parental and social morality, learned by about age 5 or 6. The conscience holds punished behaviours; the ego-ideal holds praised ones. It seeks to inhibit id impulses completely, not just delay them." },
  ],
  anxiety: [
    { name: "Reality anxiety", page: 48, text: "Fear of real dangers in the world (fires, wild animals). The basic type from which the others derive." },
    { name: "Neurotic anxiety", page: 48, text: "Id vs ego: an unconscious fear of being punished for acting on id impulses." },
    { name: "Moral anxiety", page: 48, text: "Id vs superego: fear of one's own conscience, felt as guilt or shame." },
  ],
};

export const stages = [
  { name: "Oral", ages: "Birth–1", zone: "Mouth", page: 52, focus: "Pleasure from sucking, biting, swallowing; id dominant; total dependence on the mother.", fixation: "Oral incorporative (overindulged): optimistic, dependent, gullible — the oral passive type. Oral aggressive (teething): pessimistic, hostile, sarcastic, exploitative.", fixPage: 53 },
  { name: "Anal", ages: "1–3", zone: "Anus", page: 53, focus: "Toilet training (around 18 months) is the first outside interference with an instinctual pleasure.", fixation: "Anal aggressive: cruel, destructive, disorderly. Anal retentive: stubborn, stingy, rigid, compulsively neat.", fixPage: 54 },
  { name: "Phallic", ages: "4–5", zone: "Genitals", page: 54, focus: "Oedipus complex (boys: castration anxiety, resolved by identifying with the father); Electra complex in girls (penis envy). Superego develops.", fixation: "Phallic personality: narcissistic, needs constant recognition, struggles with mature relationships.", fixPage: 56 },
  { name: "Latency", ages: "5–puberty", zone: "— (dormant)", page: 57, focus: "Not a true psychosexual stage. The sex instinct is dormant, sublimated into school, sports, hobbies and same-sex friendships.", fixation: "No fixation type described.", fixPage: 57 },
  { name: "Genital", ages: "Adolescence–adulthood", zone: "Genitals (mature)", page: 57, focus: "Begins at puberty. Conflict is less intense; energy is sublimated and later expressed in a committed adult relationship.", fixation: "Genital type (no major fixations): finds satisfaction in love and work.", fixPage: 57 },
];

export const defenses = [
  { name: "Repression", page: 49, def: "Involuntary, unconscious removal of something painful from awareness — the most basic defense.", scenario: "A man represses his sex drive so strongly that he becomes impotent." },
  { name: "Denial", page: 50, def: "Denying the existence of an external threat or traumatic event.", scenario: "Parents whose child has died keep the child's room exactly as it was." },
  { name: "Reaction formation", page: 50, def: "Actively expressing the opposite of a disturbing impulse.", scenario: "Someone threatened by their own sexual longings becomes a fierce crusader against pornography." },
  { name: "Projection", page: 50, def: "Attributing your own disturbing impulse to someone else.", scenario: "“I don't hate him. He hates me.”" },
  { name: "Regression", page: 50, def: "Retreating to an earlier, more secure stage and behaving in childish, dependent ways.", scenario: "Under heavy stress, a person starts acting childish and dependent, as they did at a safer time of life." },
  { name: "Rationalization", page: 50, def: "Reinterpreting behaviour so it seems rational and acceptable.", scenario: "Fired from a job, a person insists they never really liked it anyway." },
  { name: "Displacement", page: 50, def: "Shifting an id impulse from a threatening or unavailable object to a safer substitute.", scenario: "Angry at the boss but afraid to show it, an adult comes home and shouts at the dog." },
  { name: "Sublimation", page: 51, def: "Diverting instinctual energy into socially acceptable, admired activity.", scenario: "Sexual energy is channelled into creative artistic work." },
];

export const jungTypes: Record<string, { text: string; page: number }> = {
  "extraverted-thinking": { page: 88, text: "Live by society's rules; objective, logical, dogmatic; repress feelings. Can seem rigid and cold; make good scientists." },
  "extraverted-feeling": { page: 88, text: "Highly emotional, sociable, sensitive to others' opinions; conform to traditional values; make friends easily. Jung thought it more common in women." },
  "extraverted-sensing": { page: 88, text: "Pleasure-seeking and adaptable; oriented to the real world and new experiences; outgoing, not introspective." },
  "extraverted-intuiting": { page: 88, text: "Creative opportunists who inspire others; succeed in business and politics; changeable, decide on hunches — usually correctly." },
  "introverted-thinking": { page: 89, text: "More interested in ideas than people; private, abstract, poor practical judgment; seen as stubborn and aloof." },
  "introverted-feeling": { page: 89, text: "Capable of deep emotion but don't show it; quiet, modest, mysterious; can appear cold and withdrawn." },
  "introverted-sensing": { page: 89, text: "Passive, calm, detached; aesthetically sensitive, expressing themselves in art or music; repress intuition." },
  "introverted-intuiting": { page: 89, text: "Visionaries and daydreamers with little contact with reality; seen as odd and eccentric; struggle with everyday planning." },
};
export const jungFunctions = [
  { id: "thinking", name: "Thinking", kind: "Rational", page: 88, text: "Judges experience as true or false." },
  { id: "feeling", name: "Feeling", kind: "Rational", page: 88, text: "Judges experience as liked or disliked, pleasant or unpleasant." },
  { id: "sensing", name: "Sensing", kind: "Nonrational", page: 87, text: "Reproduces experience through the senses, like a photograph." },
  { id: "intuiting", name: "Intuiting", kind: "Nonrational", page: 87, text: "A hunch not arising directly from a stimulus." },
];
export const archetypes = [
  { name: "Persona", page: 91, text: "The public mask we wear to play our many roles. Useful, but harmful if we come to believe it is our true self (inflation of the persona, p. 92)." },
  { name: "Anima & animus", page: 92, text: "The feminine side of the male psyche (anima) and masculine side of the female psyche (animus). Both must be expressed, or the personality becomes one-sided." },
  { name: "Shadow", page: 92, text: "The most powerful archetype: primitive animal instincts. Source of evil but also of vitality, creativity and emotion — it must be tamed, not crushed." },
  { name: "Self", page: 93, text: "Unity, integration and harmony of the whole personality; the ultimate life goal. Begins to emerge around middle age and is rarely fully achieved." },
];

export const methods = [
  { scenario: "A psychologist builds a detailed history of an 18-year-old woman's anxiety attacks, probing her past for the source (Freud's patient Katharina).", answer: "Clinical", page: 25 },
  { scenario: "Children watch an adult behave aggressively (or not) and researchers compare how aggressive each group then is (Bandura).", answer: "Experimental", page: 26 },
  { scenario: "Researchers measure need-for-achievement in students already admitted to college and compare it with their grades. Nothing is manipulated.", answer: "Correlational", page: 28 },
  { scenario: "A test is given to hundreds of participants recruited through an online crowd-sourcing service.", answer: "Virtual research", page: 27 },
  { scenario: "Researchers ask whether birth order is related to aggressiveness, comparing people who already differ in birth order.", answer: "Correlational", page: 28 },
];
export const methodNotes = {
  Clinical: { page: 25, text: "Case studies, tests, interviews, dream analysis. Rich, but subjective and hard to verify." },
  Experimental: { page: 25, text: "Manipulate an independent variable, measure a dependent variable, compare experimental and control groups. Can show cause and effect." },
  Correlational: { page: 28, text: "Measures how existing variables relate (correlation coefficient: direction and strength). Cannot prove cause and effect, but good for prediction." },
  "Virtual research": { page: 27, text: "Tests, surveys and experiments run online, often with crowd-sourced participants: fast and cheap." },
} as const;

// ---- Chapter 4: Adler's birth order (pp. 117-120) ---------------------------
export const birthOrder = [
  { pos: "First-born", page: 117, situation: "Gets undivided attention until a sibling arrives, then is “dethroned” — the shock is greater if pampered and if younger when the rival comes (a 2-year-old suffers more than an 8-year-old).", traits: "Oriented to the past, nostalgic, pessimistic about the future; concerned with power, order and authority; good organisers, conscientious, conservative. Tutoring younger siblings can give an intellectual edge (Zajonc).", traitsPage: 118, example: "Adler called Freud a typical eldest son (p. 118)." },
  { pos: "Second-born", page: 118, situation: "Never holds the first-born's powerful position, so never dethroned; parents are usually more relaxed. The older sibling is a pacesetter — model, threat and competitor.", traits: "Optimistic, competitive and ambitious; less concerned with power. If the older child excels, may give up and become an underachiever.", traitsPage: 119, example: "Adler himself was second-born and felt overshadowed by his older brother Sigmund all his life (p. 119)." },
  { pos: "Youngest", page: 119, situation: "Never dethroned; often the family pet, especially if siblings are much older.", traits: "Driven to surpass older siblings, so often develops fast and becomes a high achiever. If pampered, may stay helpless and dependent and struggle with adulthood.", traitsPage: 119, example: "" },
  { pos: "Only child", page: 119, situation: "Never loses primacy; spends more time with adults.", traits: "Matures early and acts adult-like, but has learned neither to share nor compete — disappointed when not the centre of attention, e.g. at school.", traitsPage: 119, example: "" },
];
export const birthOrderNote = { page: 119, text: "Adler wasn't proposing fixed rules: birth order makes certain styles of life more likely, combined with early social interactions, and the creative self uses both (pp. 119–120)." };

// ---- Chapter 5: Horney's neurotic trends (pp. 140-145) ----------------------
export const horneyTrends = [
  { trend: "Moving toward people", type: "Compliant personality", page: 143, protect: "Securing affection; being submissive", needs: "Affection and approval; a dominant partner", text: "Intense need to be loved, wanted and protected; subordinates own wishes, takes the blame, never assertive. Sees self as weak and helpless (“I am so weak… you must protect and love me”). Underneath: repressed hostility and a wish to control others.", adler: "Adler's getting type" },
  { trend: "Moving against people", type: "Aggressive personality", page: 143, protect: "Attaining power", needs: "Power, exploitation, prestige, admiration, achievement or ambition", text: "Life is a jungle where only the fittest survive. Tough, domineering, never shows fear of rejection; judges people by what they offer; may succeed at work but finds no intrinsic satisfaction in it. Also driven by insecurity, anxiety and hostility.", adler: "Adler's dominant or ruling type" },
  { trend: "Moving away from people", type: "Detached personality", page: 144, protect: "Withdrawing (psychologically)", needs: "Self-sufficiency, perfection, narrow limits to life", text: "Keeps emotional distance; desperate need for privacy and independence; avoids commitments and constraints. Feels superior and unique without competing; suppresses love and hate; stresses reason and logic.", adler: "Adler's avoiding type" },
];
export const horneyNotes = [
  { text: "Basic anxiety — pervasive loneliness and helplessness — is the foundation of neurosis; the trends are ways of coping with it.", page: 140 },
  { text: "In the neurotic person one trend dominates and the other two are repressed; the incompatibility of the trends is the core of neurosis (conflict).", page: 144 },
  { text: "A normal person is flexible and can express all three trends as circumstances require.", page: 145 },
];

// ---- Chapter 6: Erikson's psychosocial stages (Table 6.1 p. 164, Table 6.2 p. 171)
export const eriksonStages = [
  { stage: "Oral-sensory", ages: "Birth–1", crisis: "Trust vs. mistrust", strength: "Hope", def: "Belief that our desires will be satisfied; lasting confidence despite setbacks.", page: 163, strengthPage: 164, mal: ["Sensory maladjustment", "Withdrawal"] },
  { stage: "Muscular-anal", ages: "1–3", crisis: "Autonomy vs. doubt, shame", strength: "Will", def: "Determination to exercise freedom of choice and self-restraint despite society's demands.", page: 164, strengthPage: 165, mal: ["Shameless willfulness", "Compulsion"] },
  { stage: "Locomotor-genital", ages: "3–5", crisis: "Initiative vs. guilt", strength: "Purpose", def: "The courage to envision and pursue goals.", page: 165, strengthPage: 165, mal: ["Ruthlessness", "Inhibition"] },
  { stage: "Latency", ages: "6–11", crisis: "Industriousness vs. inferiority", strength: "Competence", def: "Using skill and intelligence to pursue and complete tasks.", page: 166, strengthPage: 166, mal: ["Narrow virtuosity", "Inertia"] },
  { stage: "Adolescence", ages: "12–18", crisis: "Identity cohesion vs. role confusion", strength: "Fidelity", def: "Sincerity, genuineness and a sense of duty in relationships, from a cohesive ego identity.", page: 167, strengthPage: 167, mal: ["Fanaticism", "Repudiation"] },
  { stage: "Young adulthood", ages: "18–35", crisis: "Intimacy vs. isolation", strength: "Love", def: "Mutual devotion in a shared identity — for Erikson the greatest human virtue.", page: 167, strengthPage: 168, mal: ["Promiscuity", "Exclusivity"] },
  { stage: "Adulthood", ages: "35–55", crisis: "Generativity vs. stagnation", strength: "Care", def: "Broad concern for others, shown in the need to teach.", page: 168, strengthPage: 169, mal: ["Overextension", "Rejectivity"] },
  { stage: "Maturity — old age", ages: "55+", crisis: "Ego integrity vs. despair", strength: "Wisdom", def: "Detached concern with the whole of life, passed on to the next generation as heritage.", page: 169, strengthPage: 169, mal: ["Presumption", "Disdain"] },
];
