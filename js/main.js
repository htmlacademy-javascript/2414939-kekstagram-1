
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { loadPhotosFromServer } from './server.js';
import './forms.js';

const photos = await loadPhotosFromServer();
renderThumbnails(photos, openBigPicture);
