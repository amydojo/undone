export const snipReceiptVisuals = {
  'nppes-provider-pull': {
    receiptNumber: '01',
    title: 'NPPES Provider Pull',
    type: 'Python workflow',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    whatItProves: 'Public provider records were converted into a structured acquisition queue.',
    operationalSignal: 'NPPES candidates moved through request, response, normalization, taxonomy gate, and profile queue.',
    description: 'NPPES provider records were pulled, normalized, and queued into a repeatable provider acquisition workflow.',
    receiptBodyType: 'providerPullTrace',
    contents: ['NPPES API', 'request inputs', 'response records', 'normalized fields', 'taxonomy gate', 'candidate queue', 'source reference'],
    preview: {
      request: 'GET /nppes/providers?taxonomy=urology',
      response: 'response.records -> candidate set',
      steps: ['request', 'response', 'normalized', 'queued'],
      rows: ['Provider 001 | active | source confirmed', 'Provider 002 | active | clinic fallback needed', 'Provider 004 | review needed | manual review']
    },
    body: {
      provenance: [
        { label: 'source', value: 'NPPES API' },
        { label: 'request', value: 'urology / target service area' },
        { label: 'mode', value: 'sanitized reconstruction' },
        { label: 'output', value: 'provider candidate queue' }
      ],
      requestLog: [
        'request.search_specialty = "urology"',
        'request.location_scope = "target service area"',
        'request.source = "NPPES API"',
        'request.output = "provider candidates"'
      ],
      responseLog: [
        'response.records = candidate set',
        'response.source = "NPPES"',
        'response.normalized_fields = provider profile ledger',
        'response.next_queue = image sourcing'
      ],
      flow: ['request', 'response', 'normalized output', 'taxonomy gate', 'candidate queue'],
      normalizedLedger: [
        { field: 'Provider ID', capturedAs: 'sanitized provider key', sourceNote: 'assigned for portfolio reconstruction' },
        { field: 'NPI Status', capturedAs: 'active / review needed', sourceNote: 'preserved from provider record state' },
        { field: 'Credential', capturedAs: 'provider credential field', sourceNote: 'normalized profile field' },
        { field: 'Taxonomy', capturedAs: 'urology match / adjacent taxonomy', sourceNote: 'taxonomy gate input' },
        { field: 'Organization', capturedAs: 'organization field', sourceNote: 'normalized profile field' },
        { field: 'Practice Location', capturedAs: 'target service area / CA', sourceNote: 'location scope retained' },
        { field: 'Phone', capturedAs: 'contact field', sourceNote: 'normalized profile field' },
        { field: 'Source Reference', capturedAs: 'source reference preserved', sourceNote: 'provenance retained for review' },
        { field: 'Profile Status', capturedAs: 'ready / fallback / review', sourceNote: 'candidate queue output' }
      ],
      queue: [
        { candidate: 'Provider 001', npiStatus: 'active', taxonomyMatch: 'urology match', provenance: 'source confirmed', profileStatus: 'ready for image sourcing' },
        { candidate: 'Provider 002', npiStatus: 'active', taxonomyMatch: 'taxonomy reviewed', provenance: 'source confirmed', profileStatus: 'clinic fallback needed' },
        { candidate: 'Provider 003', npiStatus: 'active', taxonomyMatch: 'urology match', provenance: 'source confirmed', profileStatus: 'ready for validation' },
        { candidate: 'Provider 004', npiStatus: 'review needed', taxonomyMatch: 'adjacent taxonomy', provenance: 'source partial', profileStatus: 'manual review' }
      ]
    },
    footerNote:
      'What this proves: public provider records were converted into a structured acquisition queue instead of manual copy-paste research.'
  },
  'headshot-and-clinic-image-sourcing': {
    receiptNumber: '02',
    title: 'Headshot and Clinic Image Sourcing',
    type: 'Asset pipeline',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    whatItProves: 'Missing provider headshots did not block the provider acquisition pipeline.',
    operationalSignal: 'Image candidates were routed by source confidence, availability, and review state.',
    description: 'Headshot and clinic image sourcing followed fallback logic so provider imagery could move to validation or review.',
    receiptBodyType: 'imageSourcingPipeline',
    contents: ['provider candidate', 'headshot candidate', 'clinic fallback', 'manual image review', 'source confidence', 'asset decision queue'],
    preview: {
      root: 'provider candidate',
      branches: ['headshot -> face validation', 'multiple matches -> review', 'no headshot -> clinic fallback', 'low confidence -> pending'],
      rows: ['IMG 001 | headshot | face validation', 'IMG 002 | clinic exterior | manual review', 'IMG 004 | none | image source pending']
    },
    body: {
      root: 'Provider candidate',
      flow: ['provider candidate', 'headshot search', 'source confidence check', 'clinic fallback', 'asset decision queue', 'validation route'],
      operationalDetails: [
        { label: 'decision basis', value: 'source confidence and availability' },
        { label: 'review path', value: 'manual image review when confidence is mixed' },
        { label: 'fallback', value: 'clinic fallback when no reliable headshot exists' },
        { label: 'next queue', value: 'face validation or image source pending' }
      ],
      branches: [
        { label: 'Headshot candidate found', result: 'Save provider headshot candidate when the source match is reliable.', decision: 'route', next: 'face validation' },
        { label: 'Multiple possible matches', result: 'Hold the candidate when source confidence needs manual image review.', decision: 'hold', next: 'manual image review' },
        { label: 'No reliable headshot', result: 'Search clinic imagery and preserve the fallback as the usable visual asset.', decision: 'clinic fallback', next: 'manual image review' },
        { label: 'Clinic fallback needed', result: 'Route low-confidence or missing imagery to the pending source state.', decision: 'pending', next: 'image source pending' }
      ],
      sourcingSignals: ['provider name match', 'clinic domain match', 'location match', 'face presence', 'image quality', 'source confidence'],
      queue: [
        { assetId: 'IMG 001', sourceType: 'headshot', confidence: 'high', decision: 'route', nextStep: 'face validation' },
        { assetId: 'IMG 002', sourceType: 'clinic exterior', confidence: 'medium', decision: 'hold', nextStep: 'manual image review' },
        { assetId: 'IMG 003', sourceType: 'headshot', confidence: 'medium', decision: 'route', nextStep: 'validate' },
        { assetId: 'IMG 004', sourceType: 'none', confidence: 'low', decision: 'pending', nextStep: 'image source pending' }
      ]
    },
    footerNote:
      'What this proves: missing provider headshots did not block the pipeline because fallback logic routed assets by confidence and availability.'
  },
  'opencv-face-validation': {
    receiptNumber: '03',
    title: 'OpenCV Face Validation',
    type: 'Quality gate',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    whatItProves: 'Provider imagery was checked before it entered the publishable asset set.',
    operationalSignal: 'Image candidates passed through OpenCV detection, QC checks, and decision lanes.',
    description: 'OpenCV validation acted as a computer vision quality gate before images were handed off for publishing.',
    receiptBodyType: 'faceValidationGate',
    contents: ['image candidate', 'face detection', 'QC checks', 'approved lane', 'manual review lane', 'clinic fallback', 'rejected lane'],
    preview: {
      gates: ['Approved', 'Manual Review', 'Fallback Needed', 'Rejected'],
      rows: ['IMG 001 | face yes | approved', 'IMG 003 | face yes | manual review', 'IMG 004 | face no | rejected']
    },
    body: {
      inspection: {
        check: 'CHECK: OpenCV face detection',
        rail: [
          { label: 'input', value: 'image candidate' },
          { label: 'output', value: 'approved / review / fallback / rejected' },
          { label: 'mode', value: 'sanitized QC trace' },
          { label: 'evidence', value: 'decision reason retained' }
        ]
      },
      flow: ['image candidate', 'OpenCV detection', 'QC checks', 'decision lane'],
      checks: [
        'face detected',
        'single subject preferred',
        'resolution acceptable',
        'crop usable',
        'not logo only',
        'not irrelevant clinic image',
        'confidence reviewed'
      ],
      destinations: [
        { label: 'Approved', items: ['IMG 001'] },
        { label: 'Manual Review', items: ['IMG 003'] },
        { label: 'Fallback Needed', items: ['IMG 002'] },
        { label: 'Rejected', items: ['IMG 004'] }
      ],
      table: [
        { imageId: 'IMG 001', faceDetected: 'face yes', quality: 'usable', decision: 'approved', reason: 'single face detected' },
        { imageId: 'IMG 002', faceDetected: 'face no', quality: 'low', decision: 'fallback', reason: 'clinic exterior only' },
        { imageId: 'IMG 003', faceDetected: 'face yes', quality: 'review', decision: 'manual review', reason: 'possible mismatch' },
        { imageId: 'IMG 004', faceDetected: 'face no', quality: 'reject', decision: 'rejected', reason: 'logo or graphic' }
      ]
    },
    footerNote:
      'What this proves: provider imagery was checked before publishing so profile assets were not blindly collected.'
  },
  'structured-asset-folders': {
    receiptNumber: '04',
    title: 'Structured Asset Folders',
    type: 'Handoff system',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    whatItProves: 'Provider data, imagery, validation status, and source notes were preserved for publishing handoff.',
    operationalSignal: 'Each provider folder carried profile data, image state, source notes, validation status, and publish state.',
    description: 'Provider data, image assets, source notes, and validation status were organized into a structured publishing manifest.',
    receiptBodyType: 'assetHandoffMap',
    contents: ['provider folders', 'profile.json', 'headshot.jpg', 'clinic-fallback.jpg', 'source-notes.txt', 'validation-status.txt', 'publish manifest'],
    preview: {
      tree: ['snip-snip-provider-assets/', 'provider-001/', 'profile.json', 'validation-status.txt'],
      manifest: ['Provider 001 | publish-ready', 'Provider 002 | manual review', 'Provider 003 | publish-ready']
    },
    body: {
      folderTree: [
        {
          name: 'snip-snip-provider-assets/',
          children: [
            {
              name: 'provider-001/',
              children: ['profile.json', 'headshot.jpg', 'clinic-fallback.jpg', 'source-notes.txt', 'validation-status.txt']
            },
            {
              name: 'provider-002/',
              children: ['profile.json', 'clinic-fallback.jpg', 'source-notes.txt', 'visual-review.txt']
            },
            {
              name: 'provider-003/',
              children: ['profile.json', 'headshot.jpg', 'source-notes.txt', 'validation-status.txt']
            }
          ]
        }
      ],
      manifestRows: [
        { providerId: 'Provider 001', profileData: 'complete', imageStatus: 'headshot approved', sourceNotes: 'present', validationStatus: 'approved', publishState: 'publish-ready' },
        { providerId: 'Provider 002', profileData: 'complete', imageStatus: 'clinic fallback', sourceNotes: 'present', validationStatus: 'review', publishState: 'manual review' },
        { providerId: 'Provider 003', profileData: 'complete', imageStatus: 'headshot approved', sourceNotes: 'present', validationStatus: 'approved', publishState: 'publish-ready' }
      ],
      handoffFields: ['Provider ID', 'Profile Data', 'Image Status', 'Source Notes', 'Validation Status', 'Publish State'],
      publishingStates: ['publish-ready', 'manual review', 'image source pending', 'source incomplete']
    },
    footerNote:
      'What this proves: provider data, imagery, validation status, and source notes were preserved as a structured publishing handoff instead of a messy folder dump.'
  }
};

export function getSnipReceiptVisual(componentKey) {
  return snipReceiptVisuals[componentKey] ?? null;
}
