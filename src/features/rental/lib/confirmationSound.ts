/**
 * Site-wide rental booking confirmation sound (spec §20). A short (~0.5s,
 * well under the 3s cap), restrained "vehicle lock/confirm" chirp —
 * synthesized entirely with the Web Audio API rather than a shipped audio
 * file. That sidesteps any licensing ambiguity around a sourced sound
 * effect (no reference asset was provided and none exists in the project),
 * costs zero bytes over the wire ("lightweight" by construction), and is
 * trivial to keep short/non-looping/on-brand (soft, not a banking-app
 * beep or an engine rev).
 *
 * Shape: a brief low "thunk" (soft door/lock attack) under a two-note
 * triangle-wave "confirm" chirp through a gentle low-pass filter. Never
 * loops, never auto-repeats.
 */

let sharedContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedContext) sharedContext = new Ctor();
  return sharedContext;
}

/**
 * Best-effort: browsers that block audio without a fresh user gesture will
 * silently fail to resume/start. Callers must not depend on this
 * succeeding — always pair it with a manual, user-triggered control (see
 * `ConfirmationSoundControl`).
 */
export async function playConfirmationChime(): Promise<boolean> {
  const ctx = getContext();
  if (!ctx) return false;

  try {
    if (ctx.state === "suspended") await ctx.resume();
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);

    // Soft low "thunk" — a muted door/lock attack, not an engine rev.
    const thunk = ctx.createOscillator();
    thunk.type = "sine";
    thunk.frequency.setValueAtTime(180, now);
    thunk.frequency.exponentialRampToValueAtTime(70, now + 0.14);
    const thunkGain = ctx.createGain();
    thunkGain.gain.setValueAtTime(0.0001, now);
    thunkGain.gain.exponentialRampToValueAtTime(0.4, now + 0.02);
    thunkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    thunk.connect(thunkGain).connect(master);
    thunk.start(now);
    thunk.stop(now + 0.2);

    // Two-note "confirm" chirp — warm triangle wave, gently filtered.
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2200;
    filter.connect(master);

    const notes: { freq: number; start: number; duration: number }[] = [
      { freq: 659.25, start: 0.16, duration: 0.11 }, // E5
      { freq: 880, start: 0.3, duration: 0.18 }, // A5
    ];
    for (const { freq, start, duration } of notes) {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      const t0 = now + start;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.3, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      osc.connect(gain).connect(filter);
      osc.start(t0);
      osc.stop(t0 + duration + 0.03);
    }

    // Total length ~0.5s — comfortably under the 3-second maximum, no loop.
    return true;
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
