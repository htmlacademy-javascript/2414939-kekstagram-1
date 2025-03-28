function isPalindrome(str) {
  str = str.toLowerCase().replace(/\s+/g, '');
  return str === str.split('').reverse().join('');
}

function extractDigits(str) {
  const digits = str.match(/\d+/g);
  if (!digits) {
    return NaN;
  }
  const number = parseInt(digits.join(''), 10);
  return number;
}

function padString(str, minLength, paddingStr) {
  if (str.length >= minLength) {
    return str;
  }
  const padded = paddingStr.repeat(Math.ceil(minLength / paddingStr.length)).slice(0, minLength);
  return padded + str;
}

function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}
