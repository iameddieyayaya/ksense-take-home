# ksense-take-home

```javascript

Submitting: {
  high_risk_patients: [
    'DEMO001', 'DEMO002', 'DEMO006',
    'DEMO008', 'DEMO009', 'DEMO010',
    'DEMO012', 'DEMO016', 'DEMO017',
    'DEMO019', 'DEMO020', 'DEMO021',
    'DEMO022', 'DEMO027', 'DEMO028',
    'DEMO029', 'DEMO031', 'DEMO032',
    'DEMO033', 'DEMO034', 'DEMO037',
    'DEMO038', 'DEMO039', 'DEMO040',
    'DEMO041', 'DEMO045', 'DEMO047',
    'DEMO048'
  ],
  fever_patients: [
    'DEMO005', 'DEMO008',
    'DEMO009', 'DEMO012',
    'DEMO021', 'DEMO023',
    'DEMO037', 'DEMO038',
    'DEMO047'
  ],
  data_quality_issues: [
    'DEMO004', 'DEMO005',
    'DEMO007', 'DEMO023',
    'DEMO024', 'DEMO035',
    'DEMO036', 'DEMO043'
  ]
}
Response: {
  success: true,
  message: 'Assessment submitted successfully',
  requestId: 'sfo1::p6d2t-1753816243643-a2418a3a0901',
  results: {
    score: 75,
    percentage: 75,
    status: 'PASS',
    breakdown: { high_risk: [Object], fever: [Object], data_quality: [Object] },
    feedback: { strengths: [Array], issues: [Array] },
    attempt_number: 3,
    max_attempts: 3,
    remaining_attempts: 0,
    is_personal_best: true,
    best_score: 75,
    best_attempt_number: 3,
    can_resubmit: false,
    processed_in_ms: 205
  }
}
```
