#!/usr/bin/env python3
"""Rewrite the footer date on the homepage to today.

The footer of docs/index.html reads

    (c) Fabian Eckert YYYY . Last updated YYYY-MM-DD

Both the copyright year and the date are stamped with today's date.
Run from anywhere; paths are resolved relative to this file.

Exit code 0 if the file was changed, 1 if it was already current.
"""

import re
import sys
from datetime import date
from pathlib import Path

INDEX = Path(__file__).resolve().parent.parent / "docs" / "index.html"

FOOTER = re.compile(
    r"(&copy; Fabian Eckert )(\d{4})( &middot; Last updated )(\d{4}-\d{2}-\d{2})"
)


def main():
    today = date.today()
    text = INDEX.read_text(encoding="utf-8")

    if not FOOTER.search(text):
        sys.stderr.write(f"stamp-updated: no footer date found in {INDEX}\n")
        return 2

    stamped = FOOTER.sub(
        lambda m: f"{m.group(1)}{today.year}{m.group(3)}{today.isoformat()}", text
    )

    if stamped == text:
        return 1

    INDEX.write_text(stamped, encoding="utf-8")
    print(f"stamp-updated: footer set to {today.isoformat()}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
