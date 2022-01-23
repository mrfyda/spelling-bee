import json
import random
import sys


def main() -> int:
    with open("public/wordlist.txt", "r") as f:
        words = [line.strip() for line in f if len(line) >= 4]

        sets_in_dict = []
        for word in words:
            if len(set(word)) == 7:
                sets_in_dict.append(set(word))

        while True:
            all_letters = random.choice(sets_in_dict)
            center_letter, letters = list(
                all_letters)[0], list(all_letters)[1:]

            acceptable_words = []
            pangrams = []

            print(all_letters)

            for word in words:
                if set(word).issubset(all_letters) and center_letter in word and len(word) >= 4:
                    acceptable_words.append(word)
                if set(word) == all_letters:
                    pangrams.append(word)

            sets_in_dict.remove(all_letters)

            if len(pangrams) > 1 and 25 <= len(acceptable_words) <= 30:
                break

        print(len(acceptable_words))
        print(acceptable_words)
        print(pangrams)

        puzzle = {
            "centerLetter": center_letter,
            "outerLetters": letters,
            "answers": acceptable_words,
        }

        with open(f"public/puzzles/xx012022-pt.json", "w") as f:
            json.dump(puzzle, f, indent=4)

    return 0


if __name__ == "__main__":
    sys.exit(main())
