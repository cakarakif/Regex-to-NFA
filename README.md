# Regex-to-NFA
Regular-Expression-to-NFA


A JavaScript program, which converts a given regular expression to NFA. The program takes two inputs from the user; a regular expression and a string to test. It returns True if the NFA accepts the given string, otherwise returns False.

 For example
TestNFA (“(a+b)*ca*”, “aaabc”)
> True
TestNFA (“(a+b)*ca*”, “acabb”)
>False
TestNFA (“ba*+c*(ab*a)”, “cccaa”)
> True
TestNFA (“ba*+c*(ab*a)”, “bba”)
>False

 You may assume that:
- The regular expression only contains star, union and concatenation operators.
- The regular expression is syntactically correct. So you don’t need to check syntax errors.
- The regular expression contains only one-level parentheses. No nested parentheses exist.
