Usage: lcov-stats [options]

CLI to produce JSON stats from LCOV input

Options:
  -V, --version               output the version number
  -i, --input <filename>      filename for lcov info input (default: "lcov.info")
  -o, --output <filename>     filename for JSON output. stdout will be used if no output file is given.
  --compare-with <filename>   filename for another lcov info input to produce a comparison calculation
  --pretty                    use pretty JSON output
  --fail-percent <threshold>  set failed exit code if a percentage threshold is exceeded
  -h, --help                  display help for command
