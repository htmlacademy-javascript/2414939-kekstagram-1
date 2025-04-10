import { avatars, messages, names } from './data.js';
import { getRandomInt, getRandomArrayElement } from './utils.js';

export function generateComments(count) {
  const comments = [];
  const usedIds = new Set();

  for (let i = 0; i < count; i++) {
    let commentId;
    do {
      commentId = getRandomInt(100, 999);
    } while (usedIds.has(commentId));
    usedIds.add(commentId);

    const comment = {
      id: commentId,
      avatar: getRandomArrayElement(avatars),
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names)
    };

    comments.push(comment);
  }

  return comments;
}
