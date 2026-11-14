"""Regenerate the deployed CSS without changing selectors or declarations."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
css = (root / 'styles.css').read_text()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'\s+', ' ', css)
css = re.sub(r'\s*([{}:;,])\s*', r'\1', css).strip() + '\n'
(root / 'styles.20261114.min.css').write_text(css)
