## \--- Day 9: Mirage Maintenance ---

### Part 2

Of course, it would be nice to have _even more history_ included in your report. Surely it's safe to just _extrapolate backwards_ as well, right?

For each history, repeat the process of finding differences until the sequence of differences is entirely zero. Then, rather than adding a zero to the end and filling in the next values of each previous sequence, you should instead add a zero to the _beginning_ of your sequence of zeroes, then fill in new _first_ values for each previous sequence.

In particular, here is what the third example history looks like when extrapolating back in time:

```
5  10  13  16  21  30  45
  5   3   3   5   9  15
   -2   0   2   4   6
      2   2   2   2
        0   0   0
```

Adding the new values on the left side of each sequence from bottom to top eventually reveals the new left-most history value: _`5`_.

Doing this for the remaining example data above results in previous values of _`-3`_ for the first history and _`0`_ for the second history. Adding all three new values together produces _`2`_.

Analyze your OASIS report again, this time extrapolating the _previous_ value for each history. _What is the sum of these extrapolated values?_
