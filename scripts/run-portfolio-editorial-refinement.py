from pathlib import Path

root = Path(__file__).resolve().parents[1]
source_path = root / 'scripts' / 'apply-portfolio-editorial-refinement.py'
source = source_path.read_text()

# The broad record.title replacement already updates template-literal usages.
source = source.replace("    replace(path, '${record.title}', '${record.displayTitle ?? record.title}', -1)\n", "")

# Swap the first two Mirror component keys without replacing the newly written value.
source = source.replace(
    "replace(records, \"componentKey: 'signal-interpretation-map'\", \"componentKey: 'body-weather-state-system'\", 1)\n",
    "replace(records, \"componentKey: 'signal-interpretation-map'\", \"componentKey: '__mirror-checkin-temp__'\", 1)\n"
)
source = source.replace(
    "replace(records, \"componentKey: 'body-weather-state-system'\", \"componentKey: 'signal-interpretation-map'\", 1)\n",
    "replace(records, \"componentKey: 'body-weather-state-system'\", \"componentKey: 'signal-interpretation-map'\", 1)\nreplace(records, \"componentKey: '__mirror-checkin-temp__'\", \"componentKey: 'body-weather-state-system'\", 1)\n"
)

exec(compile(source, str(source_path), 'exec'), {'__file__': str(source_path), '__name__': '__main__'})
