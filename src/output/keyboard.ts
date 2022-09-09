/** Sends global keyboard events. */
const keyboard = {
  /** Uses pressing of the key. */
  get press() {
    return true;
  },

  /** Uses releasing of the key. */
  get release() {
    return true;
  },

  /** Types provided text. */
  get type() {
    return true;
  },
};

export default keyboard;
