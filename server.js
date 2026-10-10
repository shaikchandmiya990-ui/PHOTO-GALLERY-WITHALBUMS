const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max per file
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|bmp|avif/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    const mime = file.mimetype.toLowerCase();
    if (allowed.test(ext) || mime.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are permitted.'));
    }
  }
});

// Seed data generator
function getInitialSeedData() {
  const albums = [
    {
      id: 'album-1',
      name: 'Wild Horizons',
      description: 'Majestic mountain ranges, tranquil lakes, and misty forest sunrises.',
      color: '#06b6d4', // Cyan
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      coverPhotoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'album-2',
      name: 'Metropolis & Neon',
      description: 'Futuristic cityscapes, brutalist architecture, and vibrant urban nights.',
      color: '#8b5cf6', // Violet
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      coverPhotoUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'album-3',
      name: 'Human Stories',
      description: 'Expressive street portraits, cultural expressions, and spontaneous candid moments.',
      color: '#f59e0b', // Amber
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      coverPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'album-4',
      name: 'Cosmic & Minimal',
      description: 'Abstract geometries, architectural shadows, and calming minimalist compositions.',
      color: '#ec4899', // Pink
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
      coverPhotoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const photos = [
    // Wild Horizons
    {
      id: 'photo-1',
      title: 'Emerald Valley Reflection',
      description: 'Crystal-clear alpine lake reflecting towering pine ridges in morning mist.',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-1',
      tags: ['nature', 'lake', 'mountains', 'reflection'],
      favorite: true,
      size: 3420000,
      width: 1920,
      height: 1080,
      aspectRatio: 1.77,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString()
    },
    {
      id: 'photo-2',
      title: 'Autumn Canyon Glow',
      description: 'Sunlight piercing through narrow sandstone slot canyons with vibrant orange hues.',
      url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-1',
      tags: ['canyon', 'sunset', 'desert', 'adventure'],
      favorite: false,
      size: 2890000,
      width: 1200,
      height: 1600,
      aspectRatio: 0.75,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
    },
    {
      id: 'photo-3',
      title: 'Glacial Serenade',
      description: 'Cascading turquoise meltwater under arctic clouds.',
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-1',
      tags: ['nature', 'mountains', 'fog', 'atmospheric'],
      favorite: true,
      size: 4120000,
      width: 1600,
      height: 1066,
      aspectRatio: 1.5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString()
    },
    {
      id: 'photo-4',
      title: 'Silent Pine Forest',
      description: 'Deep conifers wrapped in low morning fog in the Pacific Northwest.',
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-1',
      tags: ['trees', 'fog', 'serene', 'forest'],
      favorite: false,
      size: 2750000,
      width: 1600,
      height: 1067,
      aspectRatio: 1.5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
    },

    // Metropolis & Neon
    {
      id: 'photo-5',
      title: 'Cyberpunk Tokyo Rain',
      description: 'Neon billboards reflected on wet tarmac under umbrella crowds in Shinjuku.',
      url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-2',
      tags: ['city', 'neon', 'rain', 'night', 'tokyo'],
      favorite: true,
      size: 3820000,
      width: 1600,
      height: 1067,
      aspectRatio: 1.5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
    },
    {
      id: 'photo-6',
      title: 'Monolithic Skyscraper Apex',
      description: 'Low-angle perspective looking up at geometric glass facades kissing the clouds.',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-2',
      tags: ['architecture', 'glass', 'sky', 'modern'],
      favorite: false,
      size: 3100000,
      width: 1200,
      height: 1600,
      aspectRatio: 0.75,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString()
    },
    {
      id: 'photo-7',
      title: 'Midnight Highway Light Trails',
      description: 'Long exposure vehicular light streams weaving through expressway interchanges.',
      url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-2',
      tags: ['night', 'traffic', 'lights', 'motion', 'city'],
      favorite: true,
      size: 2650000,
      width: 1600,
      height: 1067,
      aspectRatio: 1.5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
    },

    // Human Stories
    {
      id: 'photo-8',
      title: 'Portrait in Warm Sunlight',
      description: 'Golden hour rim lighting highlighting thoughtful gaze and natural skin texture.',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-3',
      tags: ['portrait', 'people', 'golden hour', 'street'],
      favorite: true,
      size: 2450000,
      width: 1200,
      height: 1500,
      aspectRatio: 0.8,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
    },
    {
      id: 'photo-9',
      title: 'Artisan Potter at Work',
      description: 'Clay-dusted hands shaping a vessel on a spinning wooden wheel in the workshop.',
      url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-3',
      tags: ['craft', 'hands', 'artisan', 'warmth'],
      favorite: false,
      size: 2980000,
      width: 1600,
      height: 1067,
      aspectRatio: 1.5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
    },
    {
      id: 'photo-10',
      title: 'The Street Musician',
      description: 'A passionate violin performance in a cobblestone Parisian alley.',
      url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-3',
      tags: ['music', 'street', 'culture', 'passion'],
      favorite: false,
      size: 3200000,
      width: 1600,
      height: 1066,
      aspectRatio: 1.5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
    },

    // Cosmic & Minimal
    {
      id: 'photo-11',
      title: 'Stairway to Shadows',
      description: 'Brutalist concrete staircase casting stark diagonal shadows at midday.',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-4',
      tags: ['minimal', 'stairs', 'shadows', 'geometry'],
      favorite: true,
      size: 2100000,
      width: 1200,
      height: 1600,
      aspectRatio: 0.75,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
    },
    {
      id: 'photo-12',
      title: 'Crimson Dunes at Dusk',
      description: 'Silky rippled desert sands with deep gradients of twilight sky.',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
      albumId: 'album-4',
      tags: ['desert', 'minimal', 'sunset', 'gradient'],
      favorite: false,
      size: 2900000,
      width: 1600,
      height: 1067,
      aspectRatio: 1.5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    }
  ];

  return { albums, photos };
}

// Database helper
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const seed = getInitialSeedData();
    writeDB(seed);
    return seed;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB, restoring seed:', err);
    const seed = getInitialSeedData();
    writeDB(seed);
    return seed;
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// REST API Routes

// 1. Health & status
app.get('/api/status', (req, res) => {
  const db = readDB();
  res.json({
    status: 'ok',
    albumsCount: db.albums.length,
    photosCount: db.photos.length
  });
});

// 2. Albums
app.get('/api/albums', (req, res) => {
  const db = readDB();
  // augment with dynamic photoCount and preview thumbs
  const enrichedAlbums = db.albums.map(album => {
    const albumPhotos = db.photos.filter(p => p.albumId === album.id);
    const previews = albumPhotos.slice(0, 4).map(p => p.thumbnailUrl || p.url);
    const cover = album.coverPhotoUrl || (albumPhotos[0] ? (albumPhotos[0].thumbnailUrl || albumPhotos[0].url) : '');
    return {
      ...album,
      photoCount: albumPhotos.length,
      previews,
      coverPhotoUrl: cover
    };
  });
  res.json(enrichedAlbums);
});

app.post('/api/albums', (req, res) => {
  const { name, description, color, coverPhotoUrl } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Album name is required' });
  }

  const db = readDB();
  const newAlbum = {
    id: 'album-' + Date.now(),
    name: name.trim(),
    description: (description || '').trim(),
    color: color || '#6366f1',
    coverPhotoUrl: coverPhotoUrl || '',
    createdAt: new Date().toISOString()
  };

  db.albums.push(newAlbum);
  writeDB(db);
  res.status(201).json(newAlbum);
});

app.put('/api/albums/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, color, coverPhotoUrl } = req.body;
  const db = readDB();

  const idx = db.albums.findIndex(a => a.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Album not found' });
  }

  if (name !== undefined) db.albums[idx].name = name.trim();
  if (description !== undefined) db.albums[idx].description = description.trim();
  if (color !== undefined) db.albums[idx].color = color;
  if (coverPhotoUrl !== undefined) db.albums[idx].coverPhotoUrl = coverPhotoUrl;

  writeDB(db);
  res.json(db.albums[idx]);
});

app.delete('/api/albums/:id', (req, res) => {
  const { id } = req.params;
  const deletePhotos = req.query.deletePhotos === 'true';
  const db = readDB();

  const albumIdx = db.albums.findIndex(a => a.id === id);
  if (albumIdx === -1) {
    return res.status(404).json({ error: 'Album not found' });
  }

  db.albums.splice(albumIdx, 1);

  if (deletePhotos) {
    // Delete photos files from disk if they were local uploads
    const photosToDelete = db.photos.filter(p => p.albumId === id);
    photosToDelete.forEach(p => {
      if (p.isLocal && p.filename) {
        const filePath = path.join(UPLOADS_DIR, p.filename);
        if (fs.existsSync(filePath)) {
          try { fs.unlinkSync(filePath); } catch (e) {}
        }
      }
    });
    db.photos = db.photos.filter(p => p.albumId !== id);
  } else {
    // Move photos to unorganized (no album)
    db.photos = db.photos.map(p => {
      if (p.albumId === id) {
        return { ...p, albumId: null };
      }
      return p;
    });
  }

  writeDB(db);
  res.json({ success: true, message: 'Album deleted successfully' });
});

// 3. Photos
app.get('/api/photos', (req, res) => {
  const { albumId, favorite, search, sort = 'date-desc', tag } = req.query;
  const db = readDB();
  let result = [...db.photos];

  if (albumId !== undefined && albumId !== '') {
    if (albumId === 'none' || albumId === 'unorganized') {
      result = result.filter(p => !p.albumId);
    } else {
      result = result.filter(p => p.albumId === albumId);
    }
  }

  if (favorite === 'true') {
    result = result.filter(p => p.favorite);
  }

  if (tag) {
    const tLower = tag.toLowerCase();
    result = result.filter(p => (p.tags || []).some(t => t.toLowerCase() === tLower));
  }

  if (search && search.trim()) {
    const query = search.trim().toLowerCase();
    result = result.filter(p => {
      const titleMatch = (p.title || '').toLowerCase().includes(query);
      const descMatch = (p.description || '').toLowerCase().includes(query);
      const tagMatch = (p.tags || []).some(t => t.toLowerCase().includes(query));
      return titleMatch || descMatch || tagMatch;
    });
  }

  // Sorting
  switch (sort) {
    case 'date-asc':
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'name-asc':
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      break;
    case 'name-desc':
      result.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
      break;
    case 'size-desc':
      result.sort((a, b) => (b.size || 0) - (a.size || 0));
      break;
    case 'size-asc':
      result.sort((a, b) => (a.size || 0) - (b.size || 0));
      break;
    case 'date-desc':
    default:
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  res.json(result);
});

// Photo upload (multi-file)
app.post('/api/photos/upload', upload.array('photos', 50), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }

    const db = readDB();
    const { albumId, tags, defaultTitle } = req.body;
    let parsedTags = [];
    if (tags) {
      if (Array.isArray(tags)) parsedTags = tags;
      else parsedTags = tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    }

    const targetAlbumId = albumId && albumId !== 'none' ? albumId : null;

    const addedPhotos = [];
    req.files.forEach((file, index) => {
      const originalNameWithoutExt = path.parse(file.originalname).name;
      const title = defaultTitle && req.files.length === 1 
        ? defaultTitle 
        : originalNameWithoutExt.replace(/[-_]/g, ' ');

      const newPhoto = {
        id: 'photo-' + Date.now() + '-' + index,
        title: title || 'Untitled Photo',
        description: '',
        url: `/uploads/${file.filename}`,
        thumbnailUrl: `/uploads/${file.filename}`,
        filename: file.filename,
        originalName: file.originalname,
        albumId: targetAlbumId,
        tags: parsedTags,
        favorite: false,
        size: file.size,
        mimeType: file.mimetype,
        isLocal: true,
        createdAt: new Date().toISOString()
      };

      db.photos.unshift(newPhoto);
      addedPhotos.push(newPhoto);
    });

    writeDB(db);
    res.status(201).json({
      message: `Successfully uploaded ${addedPhotos.length} photo(s)`,
      photos: addedPhotos
    });
  } catch (error) {
    console.error('Upload handling error:', error);
    res.status(500).json({ error: error.message || 'Server error during upload' });
  }
});

// Update photo
app.put('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, tags, albumId, favorite } = req.body;
  const db = readDB();

  const idx = db.photos.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Photo not found' });
  }

  if (title !== undefined) db.photos[idx].title = title;
  if (description !== undefined) db.photos[idx].description = description;
  if (tags !== undefined) {
    db.photos[idx].tags = Array.isArray(tags) 
      ? tags 
      : tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
  }
  if (albumId !== undefined) {
    db.photos[idx].albumId = albumId === 'none' || albumId === '' ? null : albumId;
  }
  if (favorite !== undefined) db.photos[idx].favorite = Boolean(favorite);

  writeDB(db);
  res.json(db.photos[idx]);
});

// Batch operations
app.post('/api/photos/batch', (req, res) => {
  const { ids, action, albumId, tags, favorite } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Valid photo IDs array required' });
  }

  const db = readDB();
  const idSet = new Set(ids);

  if (action === 'delete') {
    // Delete files from disk if local
    db.photos.forEach(p => {
      if (idSet.has(p.id) && p.isLocal && p.filename) {
        const filePath = path.join(UPLOADS_DIR, p.filename);
        if (fs.existsSync(filePath)) {
          try { fs.unlinkSync(filePath); } catch (e) {}
        }
      }
    });
    db.photos = db.photos.filter(p => !idSet.has(p.id));
  } else if (action === 'move') {
    const targetAlbum = albumId === 'none' || !albumId ? null : albumId;
    db.photos = db.photos.map(p => {
      if (idSet.has(p.id)) {
        return { ...p, albumId: targetAlbum };
      }
      return p;
    });
  } else if (action === 'favorite') {
    db.photos = db.photos.map(p => {
      if (idSet.has(p.id)) {
        return { ...p, favorite: Boolean(favorite) };
      }
      return p;
    });
  } else if (action === 'addTags') {
    const tagsToAdd = Array.isArray(tags) 
      ? tags 
      : (tags || '').split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    
    db.photos = db.photos.map(p => {
      if (idSet.has(p.id)) {
        const currentTags = new Set(p.tags || []);
        tagsToAdd.forEach(t => currentTags.add(t));
        return { ...p, tags: Array.from(currentTags) };
      }
      return p;
    });
  } else {
    return res.status(400).json({ error: 'Unknown batch action: ' + action });
  }

  writeDB(db);
  res.json({ success: true, count: ids.length, action });
});

// Delete single photo
app.delete('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();

  const idx = db.photos.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Photo not found' });
  }

  const photo = db.photos[idx];
  if (photo.isLocal && photo.filename) {
    const filePath = path.join(UPLOADS_DIR, photo.filename);
    if (fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch (e) {}
    }
  }

  db.photos.splice(idx, 1);
  writeDB(db);
  res.json({ success: true, message: 'Photo deleted' });
});

// Reset to seed data
app.post('/api/reset-seed', (req, res) => {
  const seed = getInitialSeedData();
  writeDB(seed);
  res.json({ success: true, message: 'Reset to initial sample library' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Lumina Gallery server running at http://localhost:${PORT}`);
});
