"use client";
import { useSyncExternalStore } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Mode = "read" | "simple" | "practice" | "revise";

export interface State {
  read: Record<string, true>;                 // "<uid>:<sectionId>"   (uid = "<subject>-<chapter>")
  checks: Record<string, boolean>;            // "<uid>:<checkIndex>" -> answered correctly
  quizBest: Record<string, number>;           // uid -> best % on chapter test
  cards: Record<string, { box: number; due: number }>; // "<uid>:<cardIndex>" Leitner box
  bookmarks: { ch: string; sectionId: string; at: number }[];
  highlights: { ch: string; sectionId: string; text: string; at: number }[];
  last: { ch: string; sectionId?: string; mode: Mode } | null;
  updatedAt: number;
}

const KEY = "tp-state-v2";
const empty: State = { read: {}, checks: {}, quizBest: {}, cards: {}, bookmarks: [], highlights: [], last: null, updatedAt: 0 };

// ---- store -----------------------------------------------------------------
let state: State = empty;
let loaded = false;
const subs = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try { const s = localStorage.getItem(KEY); if (s) state = { ...empty, ...JSON.parse(s) }; } catch { /* private mode etc. */ }
}

export function update(fn: (s: State) => State) {
  load();
  state = { ...fn(state), updatedAt: Date.now() };
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  subs.forEach((f) => f());
  schedulePush();
}

export function useProgress(): State {
  return useSyncExternalStore(
    (f) => { subs.add(f); return () => subs.delete(f); },
    () => { load(); return state; },
    () => empty,
  );
}

// ---- cloud sync (Supabase magic-link auth; optional) -----------------------
let sb: SupabaseClient | null = null;
export function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return (sb ??= createClient(url, key));
}

let timer: ReturnType<typeof setTimeout> | undefined;
function schedulePush() {
  clearTimeout(timer);
  timer = setTimeout(push, 1500);
}

async function push() {
  const c = supabase(); if (!c) return;
  const { data } = await c.auth.getUser(); if (!data.user) return;
  await c.from("user_state").upsert({ user_id: data.user.id, state, updated_at: new Date().toISOString() });
}

// Newer side wins, whole-blob. ponytail: no per-field merge; fine for one student on 1-2 devices.
export async function pull() {
  const c = supabase(); if (!c) return;
  const { data: u } = await c.auth.getUser(); if (!u.user) return;
  const { data } = await c.from("user_state").select("state").eq("user_id", u.user.id).maybeSingle();
  const remote = data?.state as State | undefined;
  if (remote && remote.updatedAt > state.updatedAt) {
    state = { ...empty, ...remote };
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
    subs.forEach((f) => f());
  } else push();
}

// ---- helpers ---------------------------------------------------------------
export const sectionKey = (uid: string, id: string) => `${uid}:${id}`;
export const BOX_DAYS = [0, 1, 3, 7, 16]; // Leitner intervals per box
