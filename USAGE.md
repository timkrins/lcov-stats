Usage: lcov-stats [options]

CLI to produce JSON stats from LCOV input

Options:
  -V, --version               output the version number
  -i, --input <filename>      filename for lcov info input (default: "lcov.info")
  --input-name <name>         name to represent the input, ie. "main" or "base"
  -o, --output <filename>     filename for JSON output. stdout will be used if no output file is given.
  --compare-with <filename>   filename for another lcov info input to produce a comparison calculation
  --compare-with-name <name>  name to represent the compare-with input, ie. "develop" or "feature/add-todos"
  --pretty                    use pretty JSON output (default: false)
  --fail-percent <threshold>  set failed exit code if a percentage threshold is exceeded
  -h, --help                  display help for command
