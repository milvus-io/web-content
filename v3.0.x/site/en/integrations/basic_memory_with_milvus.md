---
id: basic_memory_with_milvus.md
summary: In this tutorial, we will build a small memory project for an application team. We will record notes about caching, authentication, deployments, and backups, then retrieve the right note with semantic and hybrid search.
title: Build Semantic Project Memory with Basic Memory and Milvus
---

# Build Semantic Project Memory with Basic Memory and Milvus

[Basic Memory](https://github.com/basicmachines-co/basic-memory) keeps project knowledge in ordinary Markdown files and makes it available through a CLI and MCP server. This gives a coding agent a durable place to remember decisions, runbooks, and lessons that should survive beyond one conversation.

In this tutorial, we will build a small memory project for an application team. We will record notes about caching, authentication, deployments, and backups, then retrieve the right note with semantic and hybrid search.

[Milvus](https://milvus.io/) will store the vectors and run similarity search. Basic Memory will continue to manage the Markdown notes, project metadata, full-text search, and vector manifest in PostgreSQL.

```text
Markdown notes
      |
      v
Basic Memory CLI / MCP
      |-- PostgreSQL: projects, metadata, full-text search, vector manifest
      |-- OpenAI: embeddings
      `-- Milvus: vector persistence and similarity search
```

This tutorial uses Milvus Lite, which runs locally at a path on your machine. The same Basic Memory configuration can later point to Milvus Standalone, Milvus Distributed, or Zilliz Cloud.

## Prerequisites

You need:

- Python 3.12 or later
- [`uv`](https://docs.astral.sh/uv/)
- A PostgreSQL database and its `postgresql+asyncpg://...` connection URL
- An OpenAI API key

Install Basic Memory with its Milvus optional dependencies from PyPI:

```bash
uv tool install --python 3.12 "basic-memory[milvus]"
```

## Configure Basic Memory

Create a workspace for the tutorial. Keeping the Basic Memory configuration and Milvus Lite data here makes the example easy to inspect and remove later.

```bash
mkdir -p basic-memory-milvus-demo/notes
cd basic-memory-milvus-demo

export BASIC_MEMORY_CONFIG_DIR="$PWD/.basic-memory"
```

Configure PostgreSQL as the primary database, OpenAI as the embedding provider, and Milvus as the vector index:

```bash
export BASIC_MEMORY_DATABASE_BACKEND=postgres
export BASIC_MEMORY_DATABASE_URL="postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE"

export BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED=true
export BASIC_MEMORY_SEMANTIC_VECTOR_INDEX=milvus
export BASIC_MEMORY_MILVUS_URI="$PWD/basic-memory-vectors.db"

export BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER=openai
export BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL=text-embedding-3-small
export OPENAI_API_KEY="sk-***********"
```

Here, `BASIC_MEMORY_MILVUS_URI` is a local path, so PyMilvus starts Milvus Lite automatically. No separate Milvus server is required.

Milvus is optional in Basic Memory as a whole, but it is the selected vector backend in this tutorial. The selection currently applies only when the primary database backend is PostgreSQL. SQLite-based Basic Memory projects use `sqlite-vec` instead.

## Create a memory project

A Basic Memory project maps a name to a directory of Markdown notes. Add the tutorial directory as a project and make it the default:

```bash
bm project add app-memory "$PWD/notes" --default
```

The application team now has a durable memory space. Let us fill it with a small, mixed catalog. Some notes will be relevant to our later questions, while others provide realistic distractors.

## Record project memories

Start with the application's caching decision:

```bash
bm tool write-note \
  --title "Caching Strategy" \
  --folder "engineering" \
  --project app-memory <<'EOF'
# Caching Strategy

The application caches read-heavy product responses in Redis for five minutes. This avoids repeated database queries and makes repeated requests faster. Cache entries are invalidated immediately after a write.
EOF
```

Record how authentication tokens are handled:

```bash
bm tool write-note \
  --title "Authentication Tokens" \
  --folder "engineering" \
  --project app-memory <<'EOF'
# Authentication Tokens

JWT access tokens expire after fifteen minutes. Refresh tokens rotate on every use. After suspicious activity, revoke the entire token family and require the user to sign in again.
EOF
```

Add two operational runbooks:

```bash
bm tool write-note \
  --title "Deployment Reliability" \
  --folder "operations" \
  --project app-memory <<'EOF'
# Deployment Reliability

Production releases use a canary deployment. Readiness probes must pass before traffic shifts, and the rollout automatically stops when the error rate crosses the agreed threshold.
EOF

bm tool write-note \
  --title "Database Backups" \
  --folder "operations" \
  --project app-memory <<'EOF'
# Database Backups

PostgreSQL uses daily snapshots and continuous write-ahead log archiving. The team runs a restore drill every month and records the recovery point and recovery time.
EOF
```

Finally, add two unrelated product notes. These make the search exercise more representative than a catalog in which every document is relevant:

```bash
bm tool write-note \
  --title "UI Accessibility" \
  --folder "product" \
  --project app-memory <<'EOF'
# UI Accessibility

The settings screen must support keyboard navigation, visible focus states, sufficient color contrast, and descriptive labels for screen readers.
EOF

bm tool write-note \
  --title "Content Planning" \
  --folder "product" \
  --project app-memory <<'EOF'
# Content Planning

The content calendar tracks blog drafts, launch screenshots, reviewers, and publication dates for the next product release.
EOF
```

Every note is still an ordinary Markdown file under `notes/`. Basic Memory adds the searchable structure without taking ownership away from the filesystem.

## Build the search indexes

Run a full reindex after adding or substantially changing a group of notes:

```bash
bm reindex --full --project app-memory
```

During this step, Basic Memory:

1. Reads and chunks the Markdown notes.
1. Builds the PostgreSQL full-text index.
1. Sends the chunks to the configured OpenAI embedding model.
1. Stores the resulting vectors in the project-specific Milvus collection.
1. Marks successfully stored chunks as ready in its PostgreSQL vector manifest.

Basic Memory uses a deterministic Milvus collection for each project. You do not need to create or name the collection yourself.

## Retrieve a memory by meaning

Suppose a new engineer remembers that the application has an optimization for repeated requests, but does not remember that the team called it a caching strategy.

Use vector search to ask the question in natural language:

```bash
bm tool search-notes \
  "How does the application make repeated requests faster?" \
  --vector \
  --project app-memory \
  --page-size 3 \
  --plain
```

`Caching Strategy` should be the leading result even though the query does not need to repeat the note title. Vector search embeds the question and asks Milvus for the nearest stored chunks.

Exact scores and lower-ranked results can vary with the embedding model and the contents of the project.

## Combine semantic and keyword signals

Now imagine responding to a security incident. The query contains exact terms such as `JWT`, but we also want conceptually related language about token revocation and signing in again.

Use hybrid search:

```bash
bm tool search-notes \
  "JWT rotation after suspicious activity" \
  --hybrid \
  --project app-memory \
  --page-size 3 \
  --plain
```

`Authentication Tokens` should be the leading result. Basic Memory combines PostgreSQL full-text retrieval with Milvus vector retrieval, rewarding content that is strong in either path and especially content found by both.

The three search modes have different strengths:

| Mode      | Command flag | Best use                                                          |
| --------- | ------------ | ----------------------------------------------------------------- |
| Full text | No mode flag | Exact terms, phrases, and boolean keyword queries                 |
| Vector    | `--vector`   | Paraphrases, concepts, and exploratory questions                  |
| Hybrid    | `--hybrid`   | General-purpose retrieval using both keyword and semantic signals |

## Use another Milvus deployment

The application code and Basic Memory commands do not change when you outgrow Milvus Lite. Change the URI and, when required, provide a token.

For a Milvus server:

```bash
export BASIC_MEMORY_MILVUS_URI="http://localhost:19530"
export BASIC_MEMORY_MILVUS_TOKEN="root:Milvus"
```

For Zilliz Cloud:

```bash
export BASIC_MEMORY_MILVUS_URI="https://YOUR_CLUSTER_ENDPOINT"
export BASIC_MEMORY_MILVUS_TOKEN="YOUR_API_KEY"
```

Create a fresh target collection or follow Basic Memory's vector-store migration procedure before switching an existing project between vector backends. Then rebuild the vectors:

```bash
bm reindex --full --project app-memory
```

## Use the same memory through MCP

The CLI is useful for setup, maintenance, scripting, and understanding the data flow. In daily work, an MCP client can start the same Basic Memory service and call tools such as `write_note`, `search_notes`, and `build_context` directly.

For example, a Codex MCP configuration can run the command installed by `uv tool`:

```toml
[mcp_servers.basic-memory]
command = "basic-memory"
args = ["mcp"]

[mcp_servers.basic-memory.env]
BASIC_MEMORY_CONFIG_DIR = "/absolute/path/to/basic-memory-milvus-demo/.basic-memory"
BASIC_MEMORY_DATABASE_BACKEND = "postgres"
BASIC_MEMORY_DATABASE_URL = "postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE"
BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED = "true"
BASIC_MEMORY_SEMANTIC_VECTOR_INDEX = "milvus"
BASIC_MEMORY_MILVUS_URI = "/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db"
BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER = "openai"
BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL = "text-embedding-3-small"
OPENAI_API_KEY = "sk-***********"
```

Other MCP clients use the same executable and arguments in JSON form:

```json
{
  "mcpServers": {
    "basic-memory": {
      "command": "basic-memory",
      "args": ["mcp"],
      "env": {
        "BASIC_MEMORY_CONFIG_DIR": "/absolute/path/to/basic-memory-milvus-demo/.basic-memory",
        "BASIC_MEMORY_DATABASE_BACKEND": "postgres",
        "BASIC_MEMORY_DATABASE_URL": "postgresql+asyncpg://USER:PASSWORD@HOST:5432/DATABASE",
        "BASIC_MEMORY_SEMANTIC_SEARCH_ENABLED": "true",
        "BASIC_MEMORY_SEMANTIC_VECTOR_INDEX": "milvus",
        "BASIC_MEMORY_MILVUS_URI": "/absolute/path/to/basic-memory-milvus-demo/basic-memory-vectors.db",
        "BASIC_MEMORY_SEMANTIC_EMBEDDING_PROVIDER": "openai",
        "BASIC_MEMORY_SEMANTIC_EMBEDDING_MODEL": "text-embedding-3-small",
        "OPENAI_API_KEY": "sk-***********"
      }
    }
  }
}
```

Keep database passwords and API keys in your client's secret management or launch environment when possible. The important requirement is that the MCP process receives the same Basic Memory configuration used by the CLI.

## What each storage layer owns

At the end of the tutorial, the responsibilities are deliberately separated:

- The project directory owns the original Markdown notes.
- PostgreSQL owns Basic Memory's projects, entities, metadata, full-text index, and authoritative vector manifest.
- OpenAI turns note chunks and search questions into embeddings.
- Milvus owns vector persistence and nearest-neighbor retrieval.
- Basic Memory coordinates the layers and exposes one CLI and MCP experience.

Milvus therefore does not replace PostgreSQL in this integration. It replaces the PostgreSQL `pgvector` path for vector storage and similarity search, while the rest of Basic Memory's relational and full-text features remain in PostgreSQL.
