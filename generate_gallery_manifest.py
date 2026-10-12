
from pathlib import Path
import json

# Website project folder
PROJECT_DIR = Path(__file__).resolve().parent

# Photo folders for each event date
PHOTO_FOLDERS = {
    "02-oct": PROJECT_DIR / "assets" / "Gallery" / "2 October",
    "03-oct": PROJECT_DIR / "assets" / "Gallery" / "3 October",
}

# Supported image formats
IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"
}

# Generated manifest file
OUTPUT_FILE = PROJECT_DIR / "gallery-manifest.js"


def main():
    manifest = {}

    for album_id, folder in PHOTO_FOLDERS.items():
        filenames = []

        if folder.exists():
            for file_path in sorted(folder.rglob("*")):
                if (
                    file_path.is_file()
                    and file_path.suffix.lower() in IMAGE_EXTENSIONS
                ):
                    filenames.append(
                        file_path.relative_to(folder).as_posix()
                    )
        else:
            print(f"FOLDER NOT FOUND: {folder}")

        display_date = {
            "02-oct": "2 October 2026",
            "03-oct": "3 October 2026",
        }[album_id]

        manifest[album_id] = {
            "date": display_date,
            "photos": filenames,
        }

        print(
            f"{display_date}: found {len(filenames)} photo(s)"
        )

    javascript = (
        "window.GALLERY_MANIFEST = "
        + json.dumps(manifest, indent=2)
        + ";\n"
    )

    OUTPUT_FILE.write_text(javascript, encoding="utf-8")

    print(f"\nManifest saved to: {OUTPUT_FILE}")
    print("gallery.js has not been changed.")


if __name__ == "__main__":
    main()
