# Lumina Gallery — Photo & Album Manager

**Lumina Gallery** is a modern, high-performance web application designed for organizing, uploading, and browsing photos in responsive grids and curated albums.

Built with an ultra-clean **glassmorphic dark/light aesthetic**, vanilla CSS design system, and a robust **Node.js + Express + Multer** backend.

---

## ✨ Features

### 1. Album Organization & Curation
- **Create & Edit Albums**: Custom title, description, and color theme accents (Indigo, Cyan, Emerald, Amber, Rose, Violet).
- **Album Hero Banners**: Dynamic blurred background covers, photo counts, and quick actions ("Upload to album", "Slideshow", "Edit", "Delete").
- **Drag & Drop Organization**: Drag any photo card directly onto an album in the sidebar to organize it instantly.
- **Smart Views**:
  - **All Photos**: Complete visual archive.
  - **Favorites**: Bookmarked photos with star badges.
  - **Unorganized**: Photos awaiting album assignment.

### 2. Multi-File Upload & Drag-and-Drop
- **Drag & Drop Zone**: Drop single or batch photos anywhere on the upload area or directly onto the window.
- **Upload Queue Preview**: Displays thumbnail, file name, and file size before starting the upload.
- **Album & Tag Assignment**: Select destination album and add tags during upload.
- **Real-Time Progress**: Animated upload progress bar showing exact percentages.

### 3. Responsive Grid & Browsing Modes
- **Masonry Dynamic Grid**: Unsplash/Pinterest-style staggered grid that preserves native photo aspect ratios.
- **Uniform Square Grid**: Instagram/Google Photos-style square layout for structured browsing.
- **Orientation Filters**: Filter between Horizontal (Landscape), Vertical (Portrait), and All.
- **Dynamic Sorting**: Sort by Newest First, Oldest First, Name (A–Z / Z–A), and File Size.
- **Live Search**: Instant search by photo title, description, or tags with `/` or `Ctrl+K` shortcut.
- **Popular Tags Cloud**: Clickable tag chips in the sidebar to instantly filter photos.

### 4. Batch Operations & Multi-Select
- Toggle **Select Mode** to pick multiple photos simultaneously.
- Floating glassmorphic **Batch Action Toolbar**:
  - **Move to Album**: Move selected photos to any album or unorganized.
  - **Add Tags**: Append new tags to all selected photos.
  - **Favorite**: Mark all selected photos as starred.
  - **Delete**: Safely delete multiple photos at once.

### 5. Luxury Fullscreen Lightbox Viewer
- **Deep Zoom & Pan**: Zoom in up to 400%, wheel-zoom, and drag to pan across high-resolution imagery.
- **Slideshow Mode**: Auto-advancing presentation with animated progress bar and play/pause controls (`Space`).
- **Dominant Color Palette Extractor**: Canvas-powered algorithm extracts top 5 dominant colors with 1-click HEX copy.
- **Detailed Metadata Drawer**: Displays dimensions, file size, upload date, album badge, and format.
- **Keyboard Shortcuts**:
  - `←` / `→`: Navigate photos
  - `Esc`: Close viewer
  - `Space`: Toggle slideshow
  - `F`: Fullscreen mode
  - `I`: Toggle metadata drawer
  - `+` / `-` / `0`: Zoom In / Zoom Out / Reset Zoom

### 6. Theme & Visual Design
- **Dark Mode by default** with glowing ambient radial lighting, subtle 1px border glows, and frosted glass cards.
- **Light Mode toggle** accessible with one click in the top navigation bar.
- Custom typography using Google Fonts (**Outfit** for headings and **Plus Jakarta Sans** for body).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Launch

1. Clone or navigate to the project directory:
   ```bash
   cd "BWT HACKATHON"
   ```

2. Dependencies are already installed (`express`, `multer`, `cors`). To re-install if needed:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Architecture

```
├── server.js            # Express REST API, Multer upload engine & JSON DB
├── package.json         # Project metadata and start scripts
├── data/
│   └── db.json          # Persistent database for albums & photo metadata
├── uploads/             # Disk storage for uploaded image files
└── public/
    ├── index.html       # Semantic HTML5 application shell & accessible modals
    ├── css/
    │   └── styles.css   # Complete glassmorphic CSS design system & animations
    └── js/
        ├── lightbox.js  # Lightbox viewer with zoom, pan, colors, and slideshow
        └── app.js       # Core state manager, batch actions, search, and upload
```

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | Server health and item counts |
| `GET` | `/api/albums` | Get all albums with photo count and previews |
| `POST` | `/api/albums` | Create a new album |
| `PUT` | `/api/albums/:id` | Update album name, description, or color |
| `DELETE` | `/api/albums/:id` | Delete album (optional: keep or remove photos) |
| `GET` | `/api/photos` | Query photos (filters: `albumId`, `favorite`, `search`, `sort`) |
| `POST` | `/api/photos/upload`| Multi-file upload via Multer |
| `PUT` | `/api/photos/:id` | Update photo metadata (title, tags, album, favorite) |
| `POST` | `/api/photos/batch` | Batch actions (`move`, `favorite`, `addTags`, `delete`) |
| `DELETE` | `/api/photos/:id` | Delete individual photo |
| `POST` | `/api/reset-seed` | Restore initial curated sample library |
