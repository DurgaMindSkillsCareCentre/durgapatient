// ═══════════════════════════════════════════════════════════════
// DPC – Clinical Data: Templates & Diagnoses
// ═══════════════════════════════════════════════════════════════

export const THERAPY_TEMPLATES = [
  // ── General ────────────────────────────────────────────────
  { value: 'MANUAL',  label: 'Manual / Free-form Notes (Default)',       cat: 'General' },
  { value: 'CBT',     label: 'Cognitive Behavioral Therapy (CBT)',        cat: 'General' },
  { value: 'DBT',     label: 'Dialectical Behavior Therapy (DBT)',        cat: 'General' },
  { value: 'ACT',     label: 'Acceptance & Commitment Therapy (ACT)',     cat: 'General' },
  { value: 'MBCT',    label: 'Mindfulness-Based Cognitive Therapy (MBCT)',cat: 'General' },
  { value: 'EMDR',    label: 'EMDR – Trauma Processing',                  cat: 'General' },
  { value: 'PCT',     label: 'Person-Centered Therapy (Rogers)',          cat: 'General' },
  { value: 'PDT',     label: 'Psychodynamic Therapy',                     cat: 'General' },
  { value: 'SFT',     label: 'Solution-Focused Brief Therapy (SFBT)',     cat: 'General' },
  { value: 'GT',      label: 'Gestalt Therapy',                           cat: 'General' },
  { value: 'NT',      label: 'Narrative Therapy',                         cat: 'General' },
  { value: 'IPT',     label: 'Interpersonal Therapy (IPT)',               cat: 'General' },
  { value: 'REBT',    label: 'Rational Emotive Behavior Therapy (REBT)',  cat: 'General' },
  { value: 'EFT',     label: 'Emotion-Focused Therapy (EFT)',             cat: 'General' },
  { value: 'CPT',     label: 'Cognitive Processing Therapy (CPT)',        cat: 'General' },
  { value: 'MI',      label: 'Motivational Interviewing (MI)',            cat: 'General' },
  { value: 'BT',      label: 'Behavioral Activation Therapy',             cat: 'General' },
  { value: 'GRIEF',   label: 'Grief & Bereavement Therapy',              cat: 'General' },
  { value: 'CHILD',   label: 'Child & Adolescent Therapy',               cat: 'General' },
  { value: 'ELDER',   label: 'Elderly / Geriatric Counseling',           cat: 'Specialty' },
  { value: 'ADDXN',   label: 'Substance Use & Addiction Therapy',        cat: 'General' },
  { value: 'FST',     label: 'Family Systems Therapy (Bowenian)',         cat: 'Relationship' },
  // ── Relationship ───────────────────────────────────────────
  { value: 'COUPLE',  label: 'Couples Therapy',                          cat: 'Relationship' },
  { value: 'PRE',     label: 'Premarital Counseling',                    cat: 'Relationship' },
  { value: 'POST',    label: 'Postmarital Counseling',                   cat: 'Relationship' },
  { value: 'PPD',     label: 'Pregnant & Postpartum Therapy',            cat: 'Specialty' },
  // ── Sexual Health ──────────────────────────────────────────
  { value: 'LGBTQ',   label: 'LGBTQ+ Affirmative Therapy',              cat: 'Sexual Health' },
  { value: 'SEXHLTH', label: 'Sexual Health & Intimacy Therapy',        cat: 'Sexual Health' },
  { value: 'PE',      label: 'Premature Ejaculation Therapy',           cat: 'Sexual Health' },
  { value: 'ED',      label: 'Erectile Dysfunction Therapy',            cat: 'Sexual Health' },
  { value: 'PORN',    label: 'Porn Addiction Therapy',                  cat: 'Sexual Health' },
  { value: 'MAST',    label: 'Masturbation Addiction Therapy',          cat: 'Sexual Health' },
]

export const TEMPLATE_NOTES = {
  MANUAL: `Chief Complaint:

History of Present Illness:

Mental Status Examination (MSE):
  - Appearance:
  - Behaviour:
  - Speech:
  - Mood / Affect:
  - Thought:
  - Perception:
  - Cognition:
  - Insight / Judgement:

Assessment / Formulation:

Plan:

Medications:

Next Appointment:`,

  CBT: `Session #:   Date:
─────────────────────────────────
Automatic Thoughts Identified:

Cognitive Distortions Present:
  [ ] All-or-Nothing  [ ] Catastrophising  [ ] Mind-reading
  [ ] Overgeneralisation  [ ] Should Statements  [ ] Personalisation

Thought Record Completed: [ ] Yes  [ ] No

Behavioral Experiments Assigned:

Homework Given:

Progress on Previous Homework:

Next Session Plan:`,

  DBT: `Session #:   Date:
─────────────────────────────────
Module: [ ] Mindfulness  [ ] Distress Tolerance  [ ] Emotion Regulation  [ ] Interpersonal Effectiveness

Skills Practiced This Week:

Diary Card Review:
  - Urges (0-5):
  - Emotions:
  - Skills Used:

Chain Analysis (if self-harm/crisis):

New Skills Taught Today:

Homework:

Next Session:`,

  ACT: `Session #:   Date:
─────────────────────────────────
Hexaflex Focus:
  [ ] Acceptance  [ ] Defusion  [ ] Present Moment Awareness
  [ ] Self-as-Context  [ ] Values Clarification  [ ] Committed Action

Psychological Flexibility Score (0-10):

Values Clarified Today:

ACT Exercise Used:

Fusion/Avoidance Patterns Noted:

Committed Action Step Agreed:

Homework:`,

  MBCT: `Session #:   Date:
─────────────────────────────────
Mindfulness Practice Review (last week):
  - Practice done: [ ] Yes  [ ] Partially  [ ] No
  - Obstacles:

Depression Triggers Identified:

Thought Patterns / Ruminative Cycles:

MBCT Exercise Used Today:

Awareness Developed:

Relapse Prevention Work:

Practice for This Week:`,

  EMDR: `Session #:   Date:
─────────────────────────────────
Phase: [ ] 1-History  [ ] 2-Preparation  [ ] 3-Assessment
       [ ] 4-Desensitisation  [ ] 5-Installation  [ ] 6-Body Scan
       [ ] 7-Closure  [ ] 8-Re-evaluation

Target Memory / Image:
Negative Cognition (NC):
Positive Cognition (PC):
VoC Score (1–7):
Emotion:
SUD Score Start (0–10):    SUD Score End:
Body Sensation Location:

Safe Place Established: [ ] Yes  [ ] No
DAS Sets Used:           Bilateral Stimulation Type:

Session Closure Protocol Used: [ ] Yes
Next Target:`,

  PCT: `Session #:   Date:
─────────────────────────────────
Core Conditions Maintained:
  [ ] Empathy  [ ] Unconditional Positive Regard  [ ] Congruence

Client's Self-Exploration Today:

Emotional Themes Emerged:

Therapist Reflections / Responses:

Client-Directed Goals:

Shifts in Self-Concept:

Client Growth / Insight Noted:`,

  PDT: `Session #:   Date:
─────────────────────────────────
Transference Themes:

Counter-transference:

Defense Mechanisms Identified:
  [ ] Repression  [ ] Projection  [ ] Rationalisation
  [ ] Regression  [ ] Displacement  [ ] Denial

Early Relationship Patterns:

Interpretations Made:

Insights Gained by Client:

Working Alliance (1-10):`,

  SFT: `Session #:   Date:
─────────────────────────────────
Miracle Question Response:

Exceptions Found (when problem is absent):

Scaling:
  Problem Severity Now: __ /10   Goal: __ /10
  Motivation: __ /10   Confidence: __ /10

Compliments / Strengths Identified:

Preferred Future Description:

Next Small Achievable Step:`,

  GT: `Session #:   Date:
─────────────────────────────────
Here-and-Now Focus:

Unfinished Business Explored:

Contact / Withdrawal Cycle:

Experiments Used:
  [ ] Empty Chair  [ ] Two-Chair  [ ] Role Reversal  [ ] Body Awareness

Awareness Expanded:

Resistances Noted:

Insight / Integration:`,

  NT: `Session #:   Date:
─────────────────────────────────
Dominant (Problem-Saturated) Story:

Unique Outcomes / Sparkling Moments:

Alternative Story Being Built:

Re-membering Conversations:

Audience / Witnesses:

Letters / Documents Created: [ ] Yes  [ ] No

Re-authoring Direction:`,

  FST: `Session #:   Date:
─────────────────────────────────
Family Members Present:

Genogram Updated: [ ] Yes  [ ] No

Differentiation Level (0-10):

Triangles Identified:

Emotional Cutoffs Noted:

Multi-generational Patterns:

Nuclear Family Emotional System:

Coaching Plan for Client:`,

  IPT: `Session #:   Date:
─────────────────────────────────
IPT Focus Area:
  [ ] Grief  [ ] Role Dispute  [ ] Role Transition  [ ] Interpersonal Deficits

Relationship Inventory Update:

Communication Analysis:
  - Problematic pattern:
  - Alternative explored:

Role Play Done: [ ] Yes  [ ] No
  - Topic:

Progress on Focal Interpersonal Problem:

Homework:`,

  REBT: `Session #:   Date:
─────────────────────────────────
Activating Event (A):

Irrational Belief (B):
  [ ] Demanding/Musturbation  [ ] Awfulising  [ ] Low Frustration Tolerance  [ ] Self-Downing

Consequence – Emotion (C):
Consequence – Behaviour:

Disputation (D):
  Logical:
  Empirical:
  Pragmatic:

Effective New Belief (E):

New Feeling / Behaviour Goal:

Homework:`,

  EFT: `Session #:   Date:
─────────────────────────────────
Presenting Emotion:
Secondary / Reactive Emotion:
Primary / Core Emotion:

Emotional Blocks / Interruptions:

EFT Task Used:
  [ ] Two-Chair Dialogue  [ ] Empty-Chair Work  [ ] Focusing
  [ ] Compassionate Self-Soothing

Emotional Transformation Achieved:

New Meaning / Action Tendency:`,

  CPT: `Session #:   Date:
─────────────────────────────────
Stuck Points Identified:

Impact Statement Review:

Challenging Questions Used:

ABC Worksheet Completed: [ ] Yes  [ ] No

Assimilation vs. Accommodation Addressed:

Alternative / Balanced Thoughts:

Modules Areas: [ ] Safety  [ ] Trust  [ ] Power/Control  [ ] Esteem  [ ] Intimacy

Progress:`,

  MI: `Session #:   Date:
─────────────────────────────────
Stage of Change:
  [ ] Precontemplation  [ ] Contemplation  [ ] Preparation
  [ ] Action  [ ] Maintenance  [ ] Relapse

OARS Techniques Used:
  [ ] Open Questions  [ ] Affirmations  [ ] Reflections  [ ] Summary

Change Talk Elicited (DARN-CAT):

Sustain Talk / Resistance Noted:

Ambivalence Explored:

Discord Managed: [ ] Yes

Autonomy Affirmed: [ ] Yes

Next Step Agreed:`,

  BT: `Session #:   Date:
─────────────────────────────────
Activity Log Review:
  - Activities Completed:
  - Pleasure Ratings (0-10):
  - Mastery Ratings (0-10):

Barriers to Activity:

Avoidance / Withdrawal Patterns:

Activity Schedule for Next Week:
  Mon:   Tue:   Wed:   Thu:   Fri:   Sat:   Sun:

Mood Rating (0-10):   Start:    End:`,

  GRIEF: `Session #:   Date:
─────────────────────────────────
Loss History:
  - Who / What:
  - Date of Loss:
  - Relationship:

Grief Phase (Kübler-Ross): [ ] Denial  [ ] Anger  [ ] Bargaining  [ ] Depression  [ ] Acceptance

Tasks of Mourning (Worden):
  [ ] Accept Reality  [ ] Process Pain  [ ] Adjust to World  [ ] Reconnect

Complicated Grief Indicators:

Meaning-Making Work:

Rituals / Remembrance:

Support Network:`,

  CHILD: `Session #:   Date:   Age:   Grade:
─────────────────────────────────
Parent / Guardian Present: [ ] Yes  [ ] No

Presenting Concerns:

Play Therapy / Art Used: [ ] Yes  [ ] No
  - Themes in Play:

Developmental Assessment:

Behavioural Observations:

School / Home / Social Functioning:

Parent Psychoeducation Given:

Homework / Activity:`,

  ELDER: `Session #:   Date:   Age:
─────────────────────────────────
Cognitive Screening (if applicable):
  MMSE / MoCA Score:

Physical Health Conditions:

Functional Status: [ ] Independent  [ ] Partially Dependent  [ ] Dependent

Late-Life Issues Addressed:
  [ ] Grief / Loss  [ ] Retirement  [ ] Loneliness  [ ] Health Anxiety
  [ ] Family Dynamics  [ ] End-of-Life

Caregiver Involvement:

Safety Assessment:

Therapy Goals for This Stage:`,

  ADDXN: `Session #:   Date:
─────────────────────────────────
Substance / Behaviour:
Stage: [ ] Precontemplation  [ ] Contemplation  [ ] Active Use  [ ] Abstinence  [ ] Relapse

CAGE / AUDIT / DAST Score (if used):

Triggers Identified:

Cravings (0-10):

Relapse Risk Factors:

Coping Skills Reviewed:

12-Step / NA / AA Involvement: [ ] Yes  [ ] No

Harm Reduction Plan:

Withdrawal / Medical Concerns:`,

  // ── Relationship ───────────────────────────────────────────
  COUPLE: `Session #:   Date:   Couple:
─────────────────────────────────
Both Partners Present: [ ] Yes  [ ] No

Presenting Issue Today:

Gottman Four Horsemen Noted:
  [ ] Criticism  [ ] Contempt  [ ] Defensiveness  [ ] Stonewalling

Communication Pattern:
  Pursuer:          Withdrawer:

Attachment Styles:
  Partner A:        Partner B:

Emotionally Focused (EFT) Cycle:

Positive Interactions This Week:

Homework (both partners):`,

  PRE: `Session #:   Date:   Couple:
─────────────────────────────────
Pre-Marriage Assessment Domains:
  [ ] Communication  [ ] Conflict Resolution  [ ] Finances
  [ ] Family of Origin  [ ] Roles & Expectations
  [ ] Sexual Expectations  [ ] Religion / Values
  [ ] Children & Parenting Plans

Areas of Strength:

Areas of Growth:

Individual Concerns Noted:

Psychoeducation Given:

Readiness Assessment (1-10):   A:    B:`,

  POST: `Session #:   Date:
─────────────────────────────────
Marriage Duration:
Presenting Issue:

Adjustment Difficulties:
  [ ] Role Changes  [ ] Sexual Adjustment  [ ] Family of Origin
  [ ] Finances  [ ] Communication Breakdown

Crisis Level: [ ] None  [ ] Moderate  [ ] High (specify):

Interventions Used:

Agreement / Contract Made: [ ] Yes  [ ] No

Next Session Goal:`,

  PPD: `Session #:   Date:
─────────────────────────────────
Status: [ ] Pregnant  [ ] Postpartum
  Weeks/Months:

Edinburgh Postnatal Depression Scale (EPDS) Score:

Screening:
  PHQ-9:    GAD-7:    EPDS:

Perinatal Mental Health Concerns:
  [ ] Antenatal Anxiety  [ ] Antenatal Depression  [ ] Birth Trauma
  [ ] Postnatal Depression  [ ] Postpartum Psychosis  [ ] PTSD

Bonding / Attachment:
  [ ] Strong  [ ] Moderate  [ ] Concerns noted

Breastfeeding Concerns:

Support System:

Safety Assessment (infant + mother):

Medication Considerations (with psychiatrist):

Psychoeducation Given:`,

  // ── LGBTQ+ ────────────────────────────────────────────────
  LGBTQ: `Session #:   Date:
─────────────────────────────────
Identity (client-stated):
  Sexual Orientation:
  Gender Identity:
  Pronouns:

Presenting Concerns:

Coming Out Stage (Cass Model):
  [ ] Identity Confusion  [ ] Comparison  [ ] Tolerance
  [ ] Acceptance  [ ] Pride  [ ] Synthesis

Minority Stress Factors:
  [ ] Discrimination  [ ] Family Rejection  [ ] Internalised Stigma
  [ ] Workplace Stress  [ ] Violence / Safety Concerns

Religious / Cultural Conflict:

Relationship / Partner Issues:

Affirmative Strengths Identified:

Community / Support Resources:

Safety Assessment:`,

  SEXHLTH: `Session #:   Date:
─────────────────────────────────
Sexual Concern Presented:

Sexual History Summary:

Masters & Johnson Phase Affected:
  [ ] Desire  [ ] Arousal  [ ] Orgasm  [ ] Resolution  [ ] Pain

Psychosexual Assessment:
  Psychological Factors:
  Relational Factors:
  Medical Factors:

Sexual Myths / Misconceptions Addressed:

Sensate Focus Exercises Assigned: [ ] Yes  [ ] No

Psychoeducation Given:

Homework (if couple):`,

  PE: `Session #:   Date:
─────────────────────────────────
Type: [ ] Lifelong  [ ] Acquired   Onset Age:
Latency Time (IELT):
Partner Distress: [ ] Yes  [ ] No

Psychological Factors:
  [ ] Anxiety  [ ] Performance Fear  [ ] Relationship Issues
  [ ] Conditioning  [ ] Hypersensitivity

Medical Factors Ruled Out: [ ] Yes  [ ] Pending

Interventions:
  [ ] Stop-Start Technique  [ ] Squeeze Technique
  [ ] Sensate Focus  [ ] Pelvic Floor Awareness
  [ ] CBT for Performance Anxiety

Psychoeducation to Partner: [ ] Yes  [ ] No

Progress (1-10):    Last Week:    This Week:`,

  ED: `Session #:   Date:
─────────────────────────────────
Type: [ ] Lifelong  [ ] Acquired   [ ] Situational  [ ] Generalised
Onset:

Medical Factors (refer urology if needed):
  [ ] Cardiovascular  [ ] Diabetes  [ ] Hormonal  [ ] Neurological
  [ ] Medications  [ ] None identified

Psychological Factors:
  [ ] Performance Anxiety  [ ] Depression  [ ] Relationship Issues
  [ ] Porn-Induced  [ ] Low Self-Esteem  [ ] Trauma

IIEF Score (if used):

Interventions:
  [ ] CBT  [ ] Sensate Focus  [ ] Psychoeducation  [ ] Mindfulness
  [ ] Communication Skills

Partner Included in Session: [ ] Yes  [ ] No

Progress (1-10):`,

  PORN: `Session #:   Date:
─────────────────────────────────
Usage Pattern:
  Frequency:    Hours/Day:    Device Used:
  Type of Content:

Compulsive Sexual Behaviour Disorder Screen:
  Salience:  Control Loss:  Withdrawal:  Conflict:  Relapse:

Impact:
  [ ] Relationship  [ ] Work  [ ] Self-Esteem  [ ] Sexual Function
  [ ] Legal Concerns  [ ] Financial

Triggers:
  Emotional:       Situational:

Neuroplasticity Psychoeducation Given: [ ] Yes
No-PMO Goal Set: [ ] Yes  [ ] No   Target Days:

Relapse Prevention Plan:

Support Group / Accountability: [ ] Yes  [ ] No`,

  MAST: `Session #:   Date:
─────────────────────────────────
Frequency (per week):
Pattern:  [ ] Compulsive  [ ] Guilt-Driven  [ ] Escapist  [ ] Habitual

Impact Areas:
  [ ] Social Functioning  [ ] Relationship  [ ] Sexual Dysfunction
  [ ] Physical Health  [ ] Spiritual / Moral Distress

Intrusive Urges (0-10):    Guilt Level (0-10):

Underlying Issues:
  [ ] Loneliness  [ ] Depression  [ ] Anxiety  [ ] Trauma
  [ ] Low Self-Worth  [ ] Relationship Deficit

Psychoeducation: Normal vs. Compulsive Range – Done: [ ] Yes
CBT Interventions:
  [ ] Thought Stopping  [ ] Urge Surfing  [ ] Schedule Disruption
  [ ] Values Clarification

Progress (1-10):    Last Week:    This Week:`,
}

// ── Diagnoses (DSM-5 / ICD-11) ────────────────────────────────
export const DIAGNOSES = [
  'Major Depressive Disorder (MDD)',
  'Bipolar Disorder I',
  'Bipolar Disorder II',
  'Cyclothymic Disorder',
  'Persistent Depressive Disorder (Dysthymia)',
  'Generalised Anxiety Disorder (GAD)',
  'Panic Disorder',
  'Social Anxiety Disorder',
  'Specific Phobia',
  'Separation Anxiety Disorder',
  'OCD – Obsessive Compulsive Disorder',
  'PTSD – Post-Traumatic Stress Disorder',
  'Acute Stress Disorder',
  'Schizophrenia',
  'Schizoaffective Disorder',
  'Delusional Disorder',
  'ADHD – Attention Deficit Hyperactivity Disorder',
  'Autism Spectrum Disorder (ASD)',
  'Borderline Personality Disorder (BPD)',
  'Narcissistic Personality Disorder',
  'Antisocial Personality Disorder',
  'Eating Disorder – Anorexia Nervosa',
  'Eating Disorder – Bulimia Nervosa',
  'Binge Eating Disorder',
  'Substance Use Disorder',
  'Alcohol Use Disorder',
  'Insomnia Disorder',
  'Somatic Symptom Disorder',
  'Conversion Disorder',
  'Dissociative Identity Disorder',
  'Intellectual Disability',
  'Neurocognitive Disorder / Dementia',
  'Adjustment Disorder',
  'Sexual Dysfunction',
  'Compulsive Sexual Behaviour Disorder',
  'Gender Dysphoria',
  'Perinatal / Postpartum Depression',
  'Other / Provisional Diagnosis',
]

export const GENDERS = ['Male', 'Female', 'Transgender Male', 'Transgender Female', 'Non-binary', 'Genderqueer', 'Prefer not to say']
