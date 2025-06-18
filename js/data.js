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

export async function loadPhotosFromServer(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки данных:', error.message);
    return []; // Вернём пустой массив в случае ошибки
  }
}
