class CustomSound {

  static globalVolume = 0.1;
  
  constructor(path) {
    this.path = path;
    this.audio = new Audio(path);
    this.audio.volume = CustomSound.globalVolume;
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

  fade(target) {
    target *= CustomSound.globalVolume;
    if (abs(this.audio.volume - target) < 0.05) {
      this.audio.volume = target;
    } else {
      if (this.audio.volume > target) {
        this.audio.volume -= 0.02;
      } else {
        this.audio.volume += 0.02;
      }
      setTimeout(() => this.fade(target), 20);
    }
  }

  volume(value) {
    value *= CustomSound.globalVolume;
    if (value !== undefined) {
      this.audio.volume = value;
    } else {
      return value;
    }
  }

  onended(callback) {
    this.audio.onended = callback;
  }

  static chain(sounds) {
    if (sounds.length == 0) {
      return;
    }
    for (let i = 0; i < sounds.length - 1; i++) {
      let curr = sounds[i];
      let next = sounds[i + 1];
      curr.onended(() => next.play());
    }
    sounds[0].play();
    return sounds[sounds.length - 1];
  }
}
