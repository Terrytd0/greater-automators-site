import { Fragment } from 'react'
import Reveal from './Reveal.jsx'

const PROJECTS = [
  {
    id: 'lexrag',
    kind: 'RAG / Document Intelligence',
    name: 'LexRAG',
    tagline: 'Contract & case-law intelligence with citation-grounded answers.',
    problem:
      'Paralegals burn hours per matter manually searching thousands of pages of contracts and prior filings for relevant clauses and precedent. Keyword search misses paraphrased questions, while a generic LLM chat answers confidently without evidence — unusable, and risky, for legal work.',
    solution:
      'A retrieval-augmented generation platform that ingests PDF contracts and case-law, indexes them for hybrid retrieval, and generates answers that cite only retrieved passages — refusing to answer when the corpus does not contain enough evidence.',
    does:
      'Ingests PDFs with full provenance, retrieves via dense vector search fused with BM25 keyword search and refined by a cross-encoder reranker, then generates citation-grounded answers through a FastAPI endpoint. Includes duplicate detection, document-scoped queries, and a golden-dataset evaluation harness enforced as a CI quality gate.',
    outcome:
      'Reduces manual document search per matter while keeping every answer grounded in cited evidence.',
    stack: ['FastAPI', 'Qdrant', 'Elasticsearch', 'MongoDB', 'bge-m3', 'RAGAS'],
    repo: 'https://github.com/Terrytd0/LexRag',
    featured: true,
    schematic: [
      ['PDF contracts', 'in'],
      ['chunk + embed', 'proc'],
      ['hybrid retrieve', 'proc'],
      ['rerank', 'proc'],
      ['cited answer', 'out'],
    ],
  },
  {
    id: 'lead-intel',
    kind: 'Lead Intelligence',
    name: 'AI Lead Intelligence',
    tagline: 'An automated CRM enrichment engine for incoming leads.',
    problem:
      'Sales teams spend significant time researching each new lead before reaching out — looking up the company, understanding the business, writing outreach, updating the CRM, and informing the team. This repetitive work slows response times and limits scalability.',
    solution:
      'An AI-powered pipeline that receives lead submissions, validates and deduplicates them, researches each company, generates personalized outreach, enriches the CRM, and notifies the team — end to end.',
    does:
      'Connects Google Forms, n8n, Airtable, OpenAI, Slack and Gmail. Detects duplicate and returning contacts, runs company research with guardrails that prevent fabricated information, generates cold emails and LinkedIn intros, and writes an audit log for every execution.',
    outcome:
      'Removes the repetitive research and CRM work around each new lead so sales can focus on outreach.',
    stack: ['n8n', 'OpenAI', 'Airtable', 'Cloudflare Tunnel', 'Slack', 'Gmail'],
    repo: 'https://github.com/Terrytd0/AI-Lead-Intelligence-Platform',
    featured: false,
    schematic: [
      ['lead form', 'in'],
      ['validate', 'proc'],
      ['research', 'proc'],
      ['enrich CRM', 'proc'],
      ['notify team', 'out'],
    ],
  },
  {
    id: 'finance',
    kind: 'Financial Analysis & Reporting',
    name: 'Finance Intelligence Platform',
    tagline: 'Automated financial ingestion, validation, analysis and reporting.',
    problem:
      'Analysts spend hours each day on repetitive spreadsheet work — cleaning and reconciling data, calculating KPIs by hand, identifying anomalies, writing executive summaries and distributing reports.',
    solution:
      'An AI-assisted pipeline that mirrors the analyst workflow: ingest, validate, calculate KPIs deterministically, flag anomalies with AI, generate decision-ready executive reports, and notify stakeholders — with every figure traceable to its source.',
    does:
      'A FastAPI service with a Python ingestion pipeline, deterministic KPI engine, AI anomaly detection with exponential-backoff retries, and an n8n workflow that routes results by severity into reporting, audit and notification streams. Covered by 65 automated tests.',
    outcome:
      'Reduces repetitive spreadsheet preparation and gives analysts traceable, decision-ready reports faster.',
    stack: ['FastAPI', 'Python', 'OpenAI', 'n8n', 'Airtable', 'Pytest'],
    repo: 'https://github.com/Terrytd0/Finance-Intelligence-Platform',
    featured: false,
    schematic: [
      ['CSV / XLSX', 'in'],
      ['validate', 'proc'],
      ['KPIs', 'proc'],
      ['anomalies', 'proc'],
      ['report + alert', 'out'],
    ],
  },
  {
    id: 'supportops',
    kind: 'Customer Support Automation',
    name: 'SupportOps AI',
    tagline: 'A multi-agent platform for triaging and resolving support tickets.',
    problem:
      'Support teams handle a high volume of repetitive requests that follow predictable patterns, while complex or sensitive cases still need human judgment and escalation.',
    solution:
      'An enterprise-grade system that orchestrates a team of specialized AI agents to classify, route and resolve support requests, with a supervisor approval queue for anything flagged as sensitive or unresolved.',
    does:
      'Built with LangGraph for stateful orchestration and CrewAI for role-based agents, behind a FastAPI backend with PostgreSQL as the system of record and Redis for rate limiting, idempotency, checkpoints and caching. Includes JWT auth, a policy engine and audit logging — 167 tests.',
    outcome:
      'Handles the repetitive ticket volume so support teams can focus on complex, sensitive cases.',
    stack: ['LangGraph', 'CrewAI', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    repo: 'https://github.com/Terrytd0/Supportops-AI',
    featured: false,
    schematic: [
      ['ticket', 'in'],
      ['classify', 'proc'],
      ['route', 'proc'],
      ['agent resolve', 'proc'],
      ['approve / reply', 'out'],
    ],
  },
]

const LEXRAG_FLOW = [
  { label: 'PDF contracts', detail: 'case law', kind: 'in', state: 'DOCS' },
  { label: 'chunk + embed', detail: 'bge-m3', kind: 'proc', state: 'INGEST' },
  { label: 'hybrid retrieve', detail: 'vector + BM25', kind: 'proc', state: 'RETRIEVE' },
  { label: 'rerank', detail: 'cross-encoder', kind: 'proc', state: 'REFINE' },
  { label: 'cited answer', detail: 'citation-grounded', kind: 'out', state: 'ANSWER' },
]

function LexRagVisual() {
  return (
    <div className="sys" aria-hidden="true">
      <div className="sys-head">
        <span className="sys-title mono">lexrag.query()</span>
        <span className="sys-status mono">GROUNDED</span>
      </div>
      <div className="sys-flow">
        {LEXRAG_FLOW.map((n, i) => (
          <Fragment key={n.label}>
            <div className={`sys-node sys-${n.kind}`}>
              <div className="sys-node-top">
                <span className="sys-id mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="sys-state mono">{n.state}</span>
              </div>
              <div className="sys-label">{n.label}</div>
              {n.detail && <div className="sys-detail mono">{n.detail}</div>}
            </div>
            {i < LEXRAG_FLOW.length - 1 && (
              <div className="sys-link" aria-hidden="true">
                <span className="sys-flow-dot" style={{ '--d': `${i * 0.5}s` }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="sys-foot mono">
        <span>question → cited answer</span>
        <span className="sys-foot-note">answers cite retrieved evidence · refuses without it</span>
      </div>
    </div>
  )
}

function Schematic({ nodes }) {
  return (
    <div className="schematic" aria-hidden="true">
      {nodes.map(([label, kind], i) => (
        <div className="sch-step" key={i} style={{ '--i': i }}>
          <div className={`sch-node sch-${kind}`}>
            <span className="sch-dot" />
            {label}
          </div>
          {i < nodes.length - 1 && (
            <div className="sch-link">
              <span className="sch-line" />
              <span className="sch-flow" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function GitHubLink({ p }) {
  return (
    <a
      className="project-repo mono"
      href={p.repo}
      target="_blank"
      rel="noreferrer"
      aria-label={`${p.name} on GitHub`}
    >
      <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
      GitHub
    </a>
  )
}

function FeaturedProject({ p }) {
  return (
    <article className="featured">
      <div className="featured-copy">
        <div className="featured-top">
          <span className="project-kind mono">{p.kind}</span>
          <GitHubLink p={p} />
        </div>
        <h3 className="featured-name">{p.name}</h3>
        <p className="featured-tagline">{p.tagline}</p>

        <div className="featured-detail">
          <div className="detail-block">
            <h4 className="detail-h">Problem</h4>
            <p>{p.problem}</p>
          </div>
          <div className="detail-block">
            <h4 className="detail-h">Solution</h4>
            <p>{p.solution}</p>
          </div>
        </div>

        <div className="featured-does">
          <h4 className="detail-h">What it does</h4>
          <p>{p.does}</p>
        </div>

        <div className="featured-outcome">
          <h4 className="detail-h">Business outcome</h4>
          <p>{p.outcome}</p>
        </div>

        <div className="featured-stack">
          <h4 className="detail-h">Stack</h4>
          <div className="stack-tags">
            {p.stack.map((s) => (
              <span key={s} className="stack-tag mono">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="featured-visual">
        <LexRagVisual />
      </div>
    </article>
  )
}

function ProjectCard({ p }) {
  return (
    <article className="project">
      <div className="project-top">
        <span className="project-kind mono">{p.kind}</span>
        <GitHubLink p={p} />
      </div>
      <h3 className="project-name">{p.name}</h3>
      <p className="project-tagline">{p.tagline}</p>
      <div className="project-flow">
        <Schematic nodes={p.schematic} />
      </div>
      <p className="project-does">{p.does}</p>
      <p className="project-outcome">{p.outcome}</p>
      <div className="project-stack">
        <div className="stack-tags">
          {p.stack.map((s) => (
            <span key={s} className="stack-tag mono">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  const featured = PROJECTS.find((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="work">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Selected Work</span>
          <h2 className="section-title">Built, tested, shipped</h2>
          <p className="section-sub">
            Not placeholder decks — real systems engineered end to end. Each
            one started as a concrete workflow gap and shows how repetitive
            work is routed, processed and handed off — with human oversight
            where it matters.
          </p>
        </div>

        <FeaturedProject p={featured} />

        <div className="work-grid">
          {rest.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        <Reveal>
          <p className="work-note">
            These projects are proof of engineering capability, not off-the-shelf
            products. Your workflow will be different — that&rsquo;s the point.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
