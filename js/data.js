export const avatars = [
  'img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg',
  'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'
];

export const names = ['Иван', 'Анна', 'Алексей', 'Ольга', 'Дмитрий', 'Сергей'];

export const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const descriptions = [
  'Дорога',
  'Горы',
  'Море',
  'Ужин',
  'Кемпинг',
  'Закат'
];

// Утилиты
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrayElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}


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


export function generatePhotosData() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(descriptions),
      likes: getRandomInt(15, 200),
      comments: generateComments(getRandomInt(0, 5))
    };

    photos.push(photo);
  }

  return photos;
}

