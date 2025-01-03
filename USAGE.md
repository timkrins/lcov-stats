Usage: lcov-stats [options]

CLI to produce JSON stats from LCOV input

Options:
  -V, --version                      output the version number
  -i, --input <filename>             filename for lcov info input (default: "lcov.info")
  --input-name <name>                name to represent the input, ie. "main" or "base"
  --output-json-stdout               output JSON to stdout (default: true)
  --output-json-stdout-pretty        use pretty JSON output for stdout (default: false)
  --output-json-file <filename>      output JSON to file
  --output-json-file-pretty          use pretty JSON output for file (default: false)
  --output-markdown-stdout           output Markdown to stdout (default: false)
  --output-markdown-file <filename>  output Markdown to file (default: false)
  --compare-with <filename>          filename for another lcov info input to produce a comparison calculation
  --compare-with-name <name>         name to represent the compare-with input, ie. "develop" or "feature/add-todos"
  --fail-percent <threshold>         set failed exit code if a percentage threshold is exceeded
  -h, --help                         display help for command
