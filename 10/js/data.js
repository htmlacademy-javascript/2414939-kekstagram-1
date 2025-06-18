
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
