export const snipReceiptVisuals = {
  'nppes-provider-pull': {
    receiptNumber: '01',
    title: 'NPPES Provider Pull',
    type: 'Python workflow',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    whatItProves: 'Provider acquisition began from structured public records.',
    operationalSignal: 'API sourced candidates normalized into profile fields.',
    description: 'NPPES provider records were pulled, normalized, and queued into a repeatable acquisition workflow.',
    receiptBodyType: 'providerPullTrace',
    contents: ['provider name', 'NPI', 'taxonomy', 'practice location', 'phone', 'credential', 'organization', 'source reference'],
    preview: {
      steps: ['criteria', 'NPPES API', 'normalized', 'taxonomy', 'queued'],
      meta: ['source: NPPES API', 'status: normalized', 'queue: image sourcing'],
      rows: ['Provider 001 / active / ready', 'Provider 002 / active / fallback', 'Provider 004 / review / manual']
    },
    body: {
      flow: ['Search criteria', 'NPPES API pull', 'provider record normalization', 'taxonomy filter', 'profile candidate queue'],
      operationalDetails: [
        { label: 'source', value: 'NPPES API' },
        { label: 'status', value: 'normalized' },
        { label: 'queue', value: 'image sourcing' },
        { label: 'reference', value: 'source reference preserved' }
      ],
      queryInputs: [
        { label: 'Specialty', value: 'urology' },
        { label: 'Location', value: 'target service area' },
        { label: 'Source', value: 'NPPES API' },
        { label: 'Output', value: 'provider candidates' }
      ],
      normalizedFields: ['Provider name', 'NPI', 'Taxonomy', 'Practice location', 'Phone', 'Credential', 'Organization', 'Source reference'],
      queue: [
        { candidate: 'Provider 001', npiStatus: 'active', taxonomyMatch: 'urology match', location: 'CA', profileStatus: 'ready for image sourcing' },
        { candidate: 'Provider 002', npiStatus: 'active', taxonomyMatch: 'taxonomy reviewed', location: 'CA', profileStatus: 'needs clinic fallback' },
        { candidate: 'Provider 003', npiStatus: 'active', taxonomyMatch: 'urology match', location: 'CA', profileStatus: 'ready for validation' },
        { candidate: 'Provider 004', npiStatus: 'review needed', taxonomyMatch: 'adjacent taxonomy', location: 'CA', profileStatus: 'manual review' }
      ]
    },
    footerNote:
      'Shows real automation beyond no code workflow glue by turning public provider records into a structured acquisition queue.'
  },
  'headshot-and-clinic-image-sourcing': {
    receiptNumber: '02',
    title: 'Headshot and Clinic Image Sourcing',
    type: 'Asset pipeline',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    whatItProves: 'Visual sourcing used fallback logic instead of manual guessing.',
    operationalSignal: 'Provider image candidates were routed by confidence and availability.',
    description: 'Headshot and clinic image sourcing followed fallback logic so missing provider images did not block progress.',
    receiptBodyType: 'imageSourcingPipeline',
    contents: ['provider headshots', 'clinic exterior photos', 'source confidence', 'image quality', 'face presence', 'image source pending'],
    preview: {
      root: 'provider candidate',
      branches: ['headshot found', 'clinic fallback', 'manual review'],
      meta: ['decision: fallback needed', 'status: validation pending'],
      rows: ['Provider 001 / headshot / validation', 'Provider 002 / clinic exterior / review', 'Provider 004 / none / pending']
    },
    body: {
      flow: ['Provider candidate', 'headshot search', 'image candidate review', 'clinic image fallback', 'asset saved', 'validation pending'],
      operationalDetails: [
        { label: 'decision', value: 'fallback needed' },
        { label: 'status', value: 'validation pending' },
        { label: 'source', value: 'source confidence checked' }
      ],
      branches: [
        { label: 'If headshot found', result: 'save provider headshot candidate', next: 'send to validation' },
        { label: 'If no reliable headshot', result: 'search clinic image and save clinic fallback', next: 'image source pending' },
        { label: 'If multiple matches', result: 'manual review required', next: 'source confidence check' }
      ],
      sourcingSignals: ['Provider name match', 'Clinic domain match', 'Location match', 'Image quality', 'Face presence', 'Source confidence'],
      queue: [
        { asset: 'Provider 001', sourceType: 'headshot', confidence: 'high', nextStep: 'face validation' },
        { asset: 'Provider 002', sourceType: 'clinic exterior', confidence: 'medium', nextStep: 'manual review' },
        { asset: 'Provider 003', sourceType: 'headshot', confidence: 'medium', nextStep: 'face validation' },
        { asset: 'Provider 004', sourceType: 'none', confidence: 'low', nextStep: 'image source pending' }
      ]
    },
    footerNote:
      'Shows how the workflow avoided stalling when a provider headshot was unavailable by using clinic image fallback logic.'
  },
  'opencv-face-validation': {
    receiptNumber: '03',
    title: 'OpenCV Face Validation',
    type: 'Quality gate',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    whatItProves: 'Image quality was checked before publishing.',
    operationalSignal: 'Candidate images passed through approve, reject, or fallback decisions.',
    description: 'OpenCV validation acted as a quality gate before images entered the publishable asset set.',
    receiptBodyType: 'faceValidationGate',
    contents: ['face detected', 'single subject preferred', 'resolution acceptable', 'crop usable', 'not logo only', 'manual review'],
    preview: {
      gates: ['Approved', 'Manual Review', 'Fallback Needed'],
      meta: ['validation: face detected', 'decision: fallback needed'],
      rows: ['IMG 001 / approved', 'IMG 003 / review', 'IMG 004 / reject']
    },
    body: {
      flow: ['Image candidate', 'OpenCV face detection', 'quality check', 'approve, reject, or fallback'],
      operationalDetails: [
        { label: 'validation', value: 'face detected' },
        { label: 'decision', value: 'fallback needed' },
        { label: 'status', value: 'manual review if low confidence' }
      ],
      checks: [
        'Face detected',
        'Single subject preferred',
        'Image resolution acceptable',
        'Crop usable',
        'Not logo only',
        'Not irrelevant clinic image',
        'Manual review if confidence is low'
      ],
      destinations: [
        { label: 'Approved', items: ['IMG 001'] },
        { label: 'Manual Review', items: ['IMG 003'] },
        { label: 'Fallback Needed', items: ['IMG 002', 'IMG 004'] }
      ],
      table: [
        { imageId: 'IMG 001', faceDetected: 'yes', quality: 'usable', decision: 'approved', reason: 'single face detected' },
        { imageId: 'IMG 002', faceDetected: 'no', quality: 'low', decision: 'fallback', reason: 'clinic exterior only' },
        { imageId: 'IMG 003', faceDetected: 'yes', quality: 'review', decision: 'manual review', reason: 'possible mismatch' },
        { imageId: 'IMG 004', faceDetected: 'no', quality: 'reject', decision: 'reject', reason: 'logo or graphic' }
      ]
    },
    footerNote:
      'Shows that provider imagery was not blindly collected. It passed through a validation gate before entering the publishable asset set.'
  },
  'structured-asset-folders': {
    receiptNumber: '04',
    title: 'Structured Asset Folders',
    type: 'Handoff system',
    status: 'ready',
    privacyLabel: 'sanitized reconstruction',
    whatItProves: 'Final outputs were organized for publishing handoff.',
    operationalSignal: 'Each provider had source notes, asset status, and profile data preserved.',
    description: 'Provider data, image assets, source notes, and validation status were organized into structured handoff folders.',
    receiptBodyType: 'assetHandoffMap',
    contents: ['provider folders', 'profile.json', 'headshot.jpg', 'clinic-fallback.jpg', 'source notes', 'publish status'],
    preview: {
      tree: ['snip-snip-provider-assets/', 'provider-001/', 'profile.json', 'validation-status.txt'],
      meta: ['handoff: publish ready', 'source notes preserved'],
      states: ['ready to publish', 'image source pending', 'manual review', 'source incomplete']
    },
    body: {
      operationalDetails: [
        { label: 'handoff', value: 'publish ready' },
        { label: 'status', value: 'validation status preserved' },
        { label: 'reference', value: 'source notes retained' }
      ],
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
              children: ['profile.json', 'clinic-fallback.jpg', 'source-notes.txt', 'image-source-pending.txt']
            },
            {
              name: 'provider-003/',
              children: ['profile.json', 'headshot.jpg', 'source-notes.txt', 'validation-status.txt']
            }
          ]
        }
      ],
      handoffFields: ['Provider name', 'Location', 'Taxonomy', 'Profile fields', 'Image status', 'Source references', 'Publish status'],
      publishingStates: ['ready to publish', 'image source pending', 'manual review', 'source incomplete']
    },
    footerNote:
      'Shows the pipeline created structured publishing assets that could be reviewed, updated, and handed off without losing source context.'
  }
};

export function getSnipReceiptVisual(componentKey) {
  return snipReceiptVisuals[componentKey] ?? null;
}
