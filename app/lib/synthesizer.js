import context from './audio-context.js';
import Octavian from 'octavian';

const notes = {};

export default function (note) {
  const frequency = new Octavian.Note(note).frequency;
  if (!notes[frequency]) { notes[frequency] = new Synthesizer(frequency); }
  return notes[frequency];
}

class Synthesizer {
  constructor(frequency, destination = context.destination) {
    const oscillator = this.oscillator = context.createOscillator();
    const gain = context.createGain();
    const volume = this.volume = gain.gain;

    oscillator.frequency.value = frequency;
    volume.value = 0;

    oscillator.connect(gain);
    gain.connect(destination);

    oscillator.start();
  }

  start() {
    this.volume.value = 1;
  }

  stop() {
    this.volume.value = 0;
  }
}