// client/src/nlp/NLPProcessor.js
class NLPProcessor {
  static processUserInput(userInput) {
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes('hello')) {
      return { intent: 'hello' };
    } else if (lowerCaseInput.includes('hold')) {
      if (
        lowerCaseInput.includes('check') ||
        lowerCaseInput.includes('list') ||
        lowerCaseInput.includes('show') ||
        lowerCaseInput.includes('get') ||
        lowerCaseInput.includes('see') ||
        lowerCaseInput.includes('display') ||
        lowerCaseInput.includes('view')
      ) {
        return { intent: 'checkHold' };
      } else if (
        lowerCaseInput.includes('how') ||
        lowerCaseInput.includes('what') ||
        lowerCaseInput.includes('which') ||
        lowerCaseInput.includes('when') ||
        lowerCaseInput.includes('where')
      ) {
        return { intent: 'howHold' };
      } else {
        return { intent: 'howHold' }; // default intent is howHold
      }
    } else if (
      lowerCaseInput.includes('booking') ||
      lowerCaseInput.includes('book')
    ) {
      if (
        lowerCaseInput.includes('check') ||
        lowerCaseInput.includes('list') ||
        lowerCaseInput.includes('show') ||
        lowerCaseInput.includes('get') ||
        lowerCaseInput.includes('see') ||
        lowerCaseInput.includes('display') ||
        lowerCaseInput.includes('view') ||
        lowerCaseInput.includes('days') ||
        lowerCaseInput.includes('time') ||
        lowerCaseInput.includes('date')
      ) {
        return { intent: 'bookingList' };
      } else if (
        lowerCaseInput.includes('how') ||
        lowerCaseInput.includes('what') ||
        lowerCaseInput.includes('which') ||
        lowerCaseInput.includes('when') ||
        lowerCaseInput.includes('where')
      ) {
        return { intent: 'howBooking' };
      } else {
        return { intent: 'howBooking' }; // default intent is howBooking
      }
    } else if (lowerCaseInput.includes('product')) {
      if (
        lowerCaseInput.includes('check') ||
        lowerCaseInput.includes('list') ||
        lowerCaseInput.includes('show') ||
        lowerCaseInput.includes('get') ||
        lowerCaseInput.includes('see') ||
        lowerCaseInput.includes('display') ||
        lowerCaseInput.includes('view')
      ) {
        return { intent: 'productList' };
      } else if (
        lowerCaseInput.includes('how') ||
        lowerCaseInput.includes('what') ||
        lowerCaseInput.includes('which') ||
        lowerCaseInput.includes('when') ||
        lowerCaseInput.includes('where')
      ) {
        return { intent: 'howProduct' };
      } else {
        return { intent: 'howProduct' }; // default intent is howBooking
      }
    } else if (
      lowerCaseInput.includes('list') ||
      lowerCaseInput.includes('show')
    ) {
      return { intent: 'listWhat' };
    } else if (
      lowerCaseInput.includes('discount') ||
      lowerCaseInput.includes('offer') ||
      lowerCaseInput.includes('offers') ||
      lowerCaseInput.includes('gift')
    ) {
      return { intent: 'discount' };
    } else {
      return { intent: 'default' };
    }
  }
}

export default NLPProcessor;
