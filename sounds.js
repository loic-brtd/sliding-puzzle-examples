class CustomSound {
  constructor(path) {
    this.audio = new Audio(path);
  }

  play() {
    this.audio.loop = false;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  loop() {
    this.audio.loop = true;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  pause() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  fadeOut() {
    CustomSound.animateValue(
      this.audio.volume,
      0,
      1000,
      (value) => (this.audio.volume = value)
    );
  }

  fadeIn() {
    CustomSound.animateValue(
      this.audio.volume,
      1,
      1000,
      (value) => (this.audio.volume = value)
    );
  }

  onended(callback) {
    this.audio.onended = callback;
  }

  static animateValue(start, end, duration, callback) {
    if (start === end) return;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      callback(current);
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
