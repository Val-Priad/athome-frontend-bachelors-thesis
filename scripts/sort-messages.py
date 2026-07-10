#!/usr/bin/env python3

import os
import subprocess
from collections.abc import Iterator
from pathlib import Path


class MessagesNotFoundError(RuntimeError):
    pass


os.chdir(Path(__file__).resolve().parent)

MESSAGES_DIR = Path("../messages")


def get_messages() -> Iterator[Path]:
    if not MESSAGES_DIR.exists() or not MESSAGES_DIR.is_dir():
        raise MessagesNotFoundError()

    return MESSAGES_DIR.iterdir()


def sort_keys(message_file: Path) -> None:
    if not message_file.is_file() or message_file.suffix != ".json":
        print(f"Skipping: {message_file.name}")
        return

    sorted_file = message_file.with_name(f"{message_file.stem}_sorted.json")

    try:
        with sorted_file.open("w", encoding="utf-8") as f:
            subprocess.run(
                ["jq", "-S", ".", str(message_file)],
                stdout=f,
                check=True,
            )

        sorted_file.replace(message_file)
        print(f"Sorted: {message_file.name}")

    except subprocess.CalledProcessError:
        print(f"Failed to sort: {message_file.name}")

        if sorted_file.exists():
            sorted_file.unlink()


def main() -> None:
    try:
        messages = get_messages()

        for message in messages:
            sort_keys(message)

    except MessagesNotFoundError:
        print("Messages folder was not found")


if __name__ == "__main__":
    main()
