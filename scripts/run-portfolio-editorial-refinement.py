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

# The portfolio now opens on Featured. QA must deliberately switch to All
# before selecting non-featured but still discoverable cases.
qa_path = root / 'tests' / 'receipt-visual-qa.spec.js'
qa = qa_path.read_text()
old = """async function openCase(page, caseSlug) {
  const caseCard = await expectSingleVisibleTestId(page, `case-record-${caseSlug}`);
  await caseCard.click();
}"""
new = """async function openCase(page, caseSlug) {
  let caseCard = visibleTestId(page, `case-record-${caseSlug}`);

  if (await caseCard.count() === 0) {
    const allFilter = page.getByRole('button', { name: /filter cases by all/i });
    await allFilter.click();
    caseCard = visibleTestId(page, `case-record-${caseSlug}`);
  }

  await expect(caseCard, `Expected case ${caseSlug} to remain discoverable through All`).toHaveCount(1);
  await caseCard.click();
}"""
if old not in qa:
    raise RuntimeError('Could not update screenshot QA openCase helper')
qa = qa.replace(old, new, 1)
qa = qa.replace("receiptTestId: 'smooth-md-crm-status-logic',\n    filename: 'smooth-crm-status-logic-modal.png'", "receiptTestId: 'smooth-md-lifecycle-map',\n    filename: 'smooth-patient-lifecycle-modal.png'", 1)
qa = qa.replace("receiptTestId: 'mirror-signal-interpretation-map',\n    filename: 'mirror-signal-interpretation-modal.png'", "receiptTestId: 'mirror-check-in-experience',\n    filename: 'mirror-check-in-experience-modal.png'", 1)
qa_path.write_text(qa)
