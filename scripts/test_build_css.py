"""Run with: python3 -m unittest discover -s scripts -p 'test_*.py'."""
import unittest
from build_css import minify_css


class MinifyCssTests(unittest.TestCase):
    def test_whitespace(self):
        self.assertEqual(minify_css('  a {\n  color: red;\n}\n'), 'a { color: red; }\n')

    def test_quoted_contents(self):
        css = '''a::before { content: "a  : ; , { } /* not comment */"; font: 'A  B'; }'''
        self.assertEqual(minify_css(css), css + '\n')

    def test_escaped_quotes(self):
        css = r'''a {content: "a\"  b"; other: 'x\'  y';}'''
        self.assertEqual(minify_css(css), css + '\n')

    def test_escaped_identifiers_and_hex_terminator(self):
        css = '.\\31  23 { color: red; } .foo\\ bar { color: blue; }'
        self.assertEqual(minify_css(css), css + '\n')
        self.assertEqual(minify_css('.\\000031\r\n  a {}'), '.\\000031\r\n a {}\n')

    def test_comments_preserve_token_and_selector_boundaries(self):
        self.assertEqual(minify_css('.a/* note */.b {color:red/*x*/blue}'), '.a/**/.b {color:red/**/blue}\n')
        self.assertEqual(minify_css('a /* note */ :hover {}'), 'a /**/ :hover {}\n')

    def test_license_comment(self):
        self.assertEqual(minify_css('/*! Keep copyright  2026 */'), '/*! Keep copyright  2026 */\n')

    def test_selector_spaces(self):
        self.assertEqual(minify_css('a  :hover,  p ::before {}'), 'a :hover, p ::before {}\n')

    def test_calc_spacing(self):
        self.assertEqual(minify_css('a {width: calc(100%  -  2px); --gap: 1px  2px;}'), 'a {width: calc(100% - 2px); --gap: 1px 2px;}\n')

    def test_urls_remain_verbatim(self):
        for value in ['url("a  b.svg")', 'url(foo/*bar)', 'URL(data:image/svg+xml;abc)', r'u\72l(foo/*bar)', r'url(foo\)bar)']:
            css = 'a {background: ' + value + ';}'
            self.assertEqual(minify_css(css), css + '\n')

    def test_non_css_whitespace_is_not_changed(self):
        self.assertEqual(minify_css('.a\u00a0b {}'), '.a\u00a0b {}\n')

    def test_string_line_continuation(self):
        css = 'a {content: "a\\\n  b";}'
        self.assertEqual(minify_css(css), css + '\n')

    def test_incomplete_input_rejected(self):
        for css in ['a {content: "oops}', 'a {/*oops', 'a {background:url(foo']:
            with self.subTest(css=css), self.assertRaises(ValueError):
                minify_css(css)


if __name__ == '__main__':
    unittest.main()
