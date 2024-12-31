# lcov-stats

A quick tool to calculate some stats from LCOV inputs, and optionally cause the command to fail.

### Command help


```
❯ npx --yes github:timkrins/lcov-stats --help
Usage: lcov-stats [options]

CLI to produce JSON stats from LCOV input

Options:
  -V, --version               output the version number
  -i, --input <filename>      filename for lcov info input (default: "lcov.info")
  -o, --output <filename>     filename for JSON output. stdout will be used if no output file is given.
  --diff-with <filename>      filename for another lcov info input to produce a diff calculation
  --pretty                    use pretty JSON output
  --fail-percent <threshold>  set failed exit code if a percentage threshold is exceeded
  -h, --help                  display help for command
```

#### Example usage

You can run the command via `npx`:
```
❯ npx --yes github:timkrins/lcov-stats --input lcov.info
{"total":6,"hit":5,"percent":83.33333333333334}

❯ npx --yes github:timkrins/lcov-stats --input secondary.lcov.info
{"total":6,"hit":4,"percent":66.66666666666666}
```

You can fail the command by using a `--fail-percent` threshold value. This value represents a minimum [lines covered] over [lines detected] percentage.
```
❯ npx --yes github:timkrins/lcov-stats --input lcov.info --fail-percent 95
{"total":6,"hit":5,"percent":83.33333333333334}
❌ Threshold check did not pass 95%

❯ npx --yes github:timkrins/lcov-stats --input secondary.lcov.info --fail-percent 95
{"total":6,"hit":4,"percent":66.66666666666666}
❌ Threshold check did not pass 95%
```

You can also fail the command when using the `--diff-with` option. In this scenario, the `--fail-percent` value represents a percentage change between the two inputs (a negative `--fail-percent` value would represent a drop in overall coverage being acceptable). Please note that this is _not_ "diff coverage", but is the difference between two _overall_ coverage calculations.
```
❯ npx --yes github:timkrins/lcov-stats --input lcov.info --diff-with secondary.lcov.info --fail-percent 0
{"diff":{"total":0,"hit":-1,"percent":-16.666666666666686}}
❌ Threshold check did not pass 0%
```

#### Notes

This tool does not consider branch coverage.

This tool has been primarily written for my own use.

#### Contributing

PRs are welcome.
