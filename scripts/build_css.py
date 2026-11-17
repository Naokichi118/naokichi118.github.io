"""Conservatively compact CSS without changing token boundaries.

Keep strings, escapes and url() contents byte-for-byte. Comments become empty
comments, not spaces: removing them can merge tokens, while adding whitespace
can turn a compound selector into a descendant selector. No CSS dependency is
needed. The output is deliberately not an aggressive optimizer.
"""
from pathlib import Path

SPACE = " \t\r\n\f"
HEX = "0123456789abcdefABCDEF"


def _escape(css, i):
    """Return the end and decoded character of an escape starting at i."""
    start = i
    i += 1
    if i == len(css):
        return i, ""
    if css[i] in HEX:
        end = i
        while end < len(css) and end - i < 6 and css[end] in HEX:
            end += 1
        value = int(css[i:end], 16)
        char = chr(value) if 0 < value <= 0x10FFFF else "\ufffd"
        if end < len(css) and css[end] in SPACE:
            if css[end:end + 2] == "\r\n":
                end += 2
            else:
                end += 1
        return end, char
    if css[i:i + 2] == "\r\n":
        return i + 2, ""
    return i + 1, css[start + 1:i + 1]


def _string(css, i):
    quote = css[i]
    i += 1
    while i < len(css):
        if css[i] == "\\":
            i, _ = _escape(css, i)
        elif css[i] == quote:
            return i + 1
        else:
            i += 1
    raise ValueError("Unterminated CSS string")


def _url(css, i):
    """Read a URL's parenthesized contents without interpreting comment text."""
    i += 1
    while i < len(css):
        if css[i] in "\"'":
            i = _string(css, i)
        elif css[i] == "\\":
            i, _ = _escape(css, i)
        elif css[i] == ")":
            return i + 1
        else:
            i += 1
    raise ValueError("Unterminated CSS url()")


def _name_char(char):
    return char.isascii() and (char.isalnum() or char in "_-") or ord(char) >= 128


def minify_css(css):
    out = []
    i = 0
    while i < len(css):
        start = i
        char = css[i]
        if char in SPACE:
            while i < len(css) and css[i] in SPACE:
                i += 1
            # Keep one separator, including after an escape's terminator.
            if out and i < len(css):
                out.append(" ")
        elif css.startswith("/*", i):
            end = css.find("*/", i + 2)
            if end < 0:
                raise ValueError("Unterminated CSS comment")
            i = end + 2
            out.append(css[start:i] if css.startswith("/*!", start) else "/**/")
        elif char in "\"'":
            i = _string(css, i)
            out.append(css[start:i])
        elif char == "\\" or _name_char(char):
            decoded = []
            while i < len(css):
                if css[i] == "\\":
                    i, value = _escape(css, i)
                    decoded.append(value)
                elif _name_char(css[i]):
                    decoded.append(css[i])
                    i += 1
                else:
                    break
            if "".join(decoded).lower() == "url" and i < len(css) and css[i] == "(":
                i = _url(css, i)
            out.append(css[start:i])
        else:
            out.append(char)
            i += 1
    return "".join(out) + "\n"


def main():
    root = Path(__file__).resolve().parent.parent
    source = (root / "styles.css").read_text(encoding="utf-8")
    (root / "styles.20261114.min.css").write_text(minify_css(source), encoding="utf-8")


if __name__ == "__main__":
    main()
