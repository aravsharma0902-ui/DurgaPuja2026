
(() => {
  "use strict";

  // ==========================================
  // 1. GALLERY ALBUM DATA
  // ==========================================

  const albums = [
    {
      id: "02-oct",
      date: "2 October 2026",
      activities:
        "Science Experiments · Being a Magician · Fireless Cooking",
      photos: [],
      videos: []
    },
    {
      id: "03-oct",
      date: "3 October 2026",
      activities:
        "Best Out of Waste · Drawing & Painting · Mehendi",
      photos: [],
      videos: []
    },
    {
      id: "11-oct",
      date: "11 October 2026",
      activities: "Rangoli · Sports & Fun Games",
      photos: [],
      videos: []
    },
    {
      id: "17-oct",
      date: "17 October 2026",
      activities: "Maha Saptami · Puja · Cultural Performances",
      photos: [],
      videos: []
    },
    {
      id: "18-oct",
      date: "18 October 2026",
      activities: "Puja Rituals · Anjali · Cultural Performances",
      photos: [],
      videos: []
    },
    {
      id: "19-oct",
      date: "19 October 2026",
      activities: "Maha Ashtami · Pushpanjali · Dandiya Night",
      photos: [],
      videos: []
    },
    {
      id: "20-oct",
      date: "20 October 2026",
      activities: "Maha Navami · Puja · Kumari Puja",
      photos: [],
      videos: []
    }
  ];

  
  // ==========================================
  // 2. LOAD PHOTO MANIFEST
  // ==========================================

  const manifest = window.GALLERY_MANIFEST || {};

  albums.forEach((album) => {
    const manifestAlbum = manifest[album.id];

    if (manifestAlbum && Array.isArray(manifestAlbum.photos)) {
      album.photos = manifestAlbum.photos;
    }
  });


  // ==========================================
  // 3. MOBILE NAVIGATION
  // ==========================================

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuScrim = document.getElementById("menuScrim");

  function setMenu(open) {
    if (!mobileMenu || !menuScrim) return;

    mobileMenu.classList.toggle("open", open);
    menuScrim.classList.toggle("open", open);

    menuButton?.classList.toggle("active", open);
    menuButton?.setAttribute("aria-expanded", String(open));
    menuButton?.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );

    document.body.classList.toggle("menu-open", open);
  }

  menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.contains("open");
    setMenu(!isOpen);
  });

  menuScrim?.addEventListener("click", () => {
    setMenu(false);
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // ==========================================
  // 4. ALBUM CARD ELEMENTS
  // ==========================================

  const photoAlbums = document.getElementById("photoAlbums");
  const videoAlbums = document.getElementById("videoAlbums");

  function createAlbumCard(album, type, index) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "date-album";
    button.style.setProperty(
      "--album-cover",
      index % 2 === 0 ? "#451115" : "#291014"
    );

    const isPhoto = type === "photos";
    const count = album[type].length;

    const number = document.createElement("span");
    number.className = "album-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const date = document.createElement("span");
    date.className = "album-date";
    date.textContent = album.date;

    const title = document.createElement("h3");
    title.textContent = isPhoto ? "Photographs" : "Videos";

    const activities = document.createElement("span");
    activities.className = "album-activities";
    activities.textContent = album.activities;

    const open = document.createElement("span");
    open.className = "album-open";
    open.textContent = isPhoto
      ? `VIEW PHOTOS · ${count} FILES ↗`
      : `WATCH VIDEOS · ${count} FILES ↗`;

    button.append(number, date, title, activities, open);

   
    button.addEventListener("click", () => {
      if (album.id === "03-oct" && type === "photos") {
        openOctoberCategories(album);
      } else {
        openAlbum(album, type);
      }
    });

    return button;
  }

  // ==========================================
  // BUILD SEPARATE PHOTOS AND VIDEOS LISTS
  // ==========================================

  if (photoAlbums) {
    photoAlbums.replaceChildren();

    albums.forEach((album, index) => {
      photoAlbums.appendChild(
        createAlbumCard(album, "photos", index)
      );
    });
  } else {
    console.error(
      'Gallery: Could not find the element with id="photoAlbums".'
    );
  }

  if (videoAlbums) {
    videoAlbums.replaceChildren();

    albums.forEach((album, index) => {
      videoAlbums.appendChild(
        createAlbumCard(album, "videos", index)
      );
    });
  } else {
    console.error(
      'Gallery: Could not find the element with id="videoAlbums".'
    );
  }

 

  // ==========================================
  // 5. ALBUM VIEWER
  // ==========================================

  const viewer = document.getElementById("albumViewer");
  const closeButton = document.getElementById("albumClose");
  const albumType = document.getElementById("albumType");
  const albumTitle = document.getElementById("albumTitle");
  const albumDescription =
    document.getElementById("albumDescription");
  const albumMedia = document.getElementById("albumMedia");

  // Actual folders containing your photographs.
  const photoFolders = {
    "02-oct": "assets/Gallery/2 October",
    "03-oct": "assets/Gallery/3 October"
  };

  function openAlbum(album, type, fileOverride = null) {
    if (!viewer || !albumMedia) {
      console.error(
        "Gallery: The album viewer elements are missing from gallery.html."
      );
      return;
    }

    const isPhoto = type === "photos";
   const files = fileOverride ?? album[type];

    if (albumType) {
      albumType.textContent = isPhoto
        ? "PHOTO COLLECTION"
        : "VIDEO COLLECTION";
    }

    if (albumTitle) {
      albumTitle.textContent = album.date;
    }

    if (albumDescription) {
      albumDescription.textContent = album.activities;
    }

    albumMedia.replaceChildren();

    if (!files.length) {
      const empty = document.createElement("div");
      empty.className = "album-empty";

      empty.textContent = isPhoto
        ? "No photographs found for this date. Check gallery-manifest.js and your photo folder."
        : "No videos have been added to this date yet.";

      albumMedia.appendChild(empty);
    } else {
      files.forEach((filename) => {
        const figure = document.createElement("figure");
        figure.className = "album-media-item";

        const media = document.createElement(
          isPhoto ? "img" : "video"
        );

        if (isPhoto) {
          const folder = photoFolders[album.id];

          if (folder) {
            media.src = `${folder}/${filename}`;
          } else {
            media.src =
              `assets/gallery/photos/${album.id}/${filename}`;
          }

          media.alt = `${album.date} — ${filename}`;
          media.loading = "lazy";
        } else {
          media.src =
            `assets/gallery/videos/${album.id}/${filename}`;

          media.controls = true;
          media.preload = "metadata";
          media.playsInline = true;
        }

        media.addEventListener("error", () => {
          const error = document.createElement("figcaption");
          error.className = "media-error";
          error.textContent =
            `Could not load "${filename}". Check its folder and filename.`;

          figure.replaceChildren(error);
        });

        const caption = document.createElement("figcaption");
        caption.textContent = filename;

        figure.append(media, caption);
        albumMedia.appendChild(figure);
      });
    }

    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("album-open");

    closeButton?.focus();
  }
  // ==========================================
// 5B. 3 OCTOBER PHOTO CATEGORIES
// ==========================================

function openOctoberCategories(album) {
  if (!viewer || !albumMedia) return;

  if (albumType) albumType.textContent = "PHOTO COLLECTION";
  if (albumTitle) albumTitle.textContent = "3 October 2026";
  if (albumDescription) {
    albumDescription.textContent =
      "Choose an activity to explore its photographs.";
  }

  albumMedia.replaceChildren();

  
  const categories = [
    {
      name: "Painting",
      folder: "Drawing"
    },
    {
      name: "Handicraft",
      folder: "Handicraft"
    },
    {
      name: "Mehendi",
      folder: "Mehndi"
    }
  ];


  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "date-album";
    button.style.setProperty(
      "--album-cover",
      index % 2 === 0 ? "#451115" : "#291014"
    );

    const number = document.createElement("span");
    number.className = "album-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("h3");
    title.textContent = category.name;

    const description = document.createElement("span");
    description.className = "album-activities";
    description.textContent =
      `3 October 2026 · ${category.name}`;

    const open = document.createElement("span");
    open.className = "album-open";
    open.textContent = "VIEW PHOTOS ↗";

    button.append(number, title, description, open);

    button.addEventListener("click", () => {
      const files = album.photos.filter((filename) => {
        const path = String(filename).replace(/\\/g, "/");
        return path.startsWith(category.folder + "/");
      });

      openAlbum(album, "photos", files);
    });

    albumMedia.appendChild(button);
  });

  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("album-open");

  closeButton?.focus();
}
  
  // ==========================================
  // 5A. PREMIUM PHOTO LIGHTBOX
  // ==========================================

  const premiumLightbox = document.createElement("div");
  premiumLightbox.className = "premium-lightbox";
  premiumLightbox.setAttribute("aria-hidden", "true");

  premiumLightbox.innerHTML = `
    <div class="premium-lightbox-top">
      <span class="premium-lightbox-label"></span>
      <button class="premium-lightbox-close"
        type="button" aria-label="Close photo viewer">×</button>
    </div>

    <button class="premium-lightbox-arrow premium-lightbox-prev"
      type="button" aria-label="Previous photo">‹</button>

    <img class="premium-lightbox-image" alt="">

    <button class="premium-lightbox-arrow premium-lightbox-next"
      type="button" aria-label="Next photo">›</button>

    <div class="premium-lightbox-bottom">
      <span class="premium-lightbox-caption"></span>
      <span class="premium-lightbox-counter"></span>
    </div>
  `;

  document.body.appendChild(premiumLightbox);

  const premiumImage = premiumLightbox.querySelector(
    ".premium-lightbox-image"
  );
  const premiumLabel = premiumLightbox.querySelector(
    ".premium-lightbox-label"
  );
  const premiumCaption = premiumLightbox.querySelector(
    ".premium-lightbox-caption"
  );
  const premiumCounter = premiumLightbox.querySelector(
    ".premium-lightbox-counter"
  );

  let premiumPhotos = [];
  let premiumIndex = 0;
  let previousFocus = null;

  function showPremiumPhoto(index) {
    if (!premiumPhotos.length) return;

    premiumIndex =
      (index + premiumPhotos.length) % premiumPhotos.length;

    const photo = premiumPhotos[premiumIndex];

    premiumImage.src = photo.src;
    premiumImage.alt = photo.alt;
    premiumLabel.textContent = photo.date;
    premiumCaption.textContent = photo.filename;

    premiumCounter.textContent =
      `${String(premiumIndex + 1).padStart(2, "0")} / ` +
      `${String(premiumPhotos.length).padStart(2, "0")}`;

    // Restart the entrance animation for each photo.
    premiumImage.style.animation = "none";
    void premiumImage.offsetWidth;
    premiumImage.style.animation = "";
  }

  function openPremiumLightbox(photos, index) {
    premiumPhotos = photos;
    previousFocus = document.activeElement;

    premiumLightbox.classList.add("is-open");
    premiumLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("premium-lightbox-open");

    showPremiumPhoto(index);

    premiumLightbox.querySelector(
      ".premium-lightbox-close"
    ).focus();
  }

  function closePremiumLightbox() {
    if (!premiumLightbox.classList.contains("is-open")) return;

    premiumLightbox.classList.remove("is-open");
    premiumLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("premium-lightbox-open");

    premiumImage.removeAttribute("src");
    premiumPhotos = [];

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  premiumLightbox.querySelector(
    ".premium-lightbox-prev"
  ).addEventListener("click", () => {
    showPremiumPhoto(premiumIndex - 1);
  });

  premiumLightbox.querySelector(
    ".premium-lightbox-next"
  ).addEventListener("click", () => {
    showPremiumPhoto(premiumIndex + 1);
  });

  premiumLightbox.querySelector(
    ".premium-lightbox-close"
  ).addEventListener("click", closePremiumLightbox);

  premiumLightbox.addEventListener("click", (event) => {
    if (event.target === premiumLightbox) {
      closePremiumLightbox();
    }
  });

  // Allow swipe navigation on touchscreens.
  let touchStartX = 0;

  premiumLightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  premiumLightbox.addEventListener("touchend", (event) => {
    const difference =
      event.changedTouches[0].screenX - touchStartX;

    if (Math.abs(difference) < 60) return;

    showPremiumPhoto(
      premiumIndex + (difference < 0 ? 1 : -1)
    );
  }, { passive: true });

  // Open the lightbox when a photograph in an album is clicked.
  if (albumMedia) {
    albumMedia.addEventListener("click", (event) => {
      const image = event.target.closest("img");

      if (!image || !albumMedia.contains(image)) return;

      const figures = Array.from(
        albumMedia.querySelectorAll(".album-media-item")
      );

      const photos = figures
        .map((figure) => {
          const img = figure.querySelector("img");

          if (!img || !img.src) return null;

          return {
            src: img.src,
            alt: img.alt,
            filename:
              figure.querySelector("figcaption")?.textContent || "",
            date: albumTitle?.textContent || ""
          };
        })
        .filter(Boolean);

      const index = photos.findIndex(
        (photo) => photo.src === image.src
      );

      if (index !== -1) {
        openPremiumLightbox(photos, index);
      }
    });
  }

  // Keyboard navigation while the lightbox is open.
  document.addEventListener("keydown", (event) => {
    if (!premiumLightbox.classList.contains("is-open")) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showPremiumPhoto(premiumIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPremiumPhoto(premiumIndex - 1);
    } else if (event.key === "Escape") {
      event.stopImmediatePropagation();
      closePremiumLightbox();
    }
  });


  function closeAlbum() {
    if (!viewer) return;

    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("album-open");

    // Stop any videos that are playing.
    viewer.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    });
  }

  closeButton?.addEventListener("click", closeAlbum);

  viewer?.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeAlbum();
    }
  });

  // ==========================================
  // 6. KEYBOARD CONTROLS
  // ==========================================

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      closeAlbum();
    }
  });

  console.log("Durga Puja Gallery initialized successfully.");
  console.log(
    "Photo counts:",
    Object.fromEntries(
      albums.map((album) => [
        album.date,
        album.photos.length
      ])
    )
  );
})();
