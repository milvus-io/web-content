const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function sortObjectKeys(value) {
  if (Array.isArray(value)) return value.map(sortObjectKeys);
  if (!value || typeof value !== 'object') return value;
  const sorted = {};
  for (const key of Object.keys(value).sort()) {
    sorted[key] = sortObjectKeys(value[key]);
  }
  return sorted;
}

function deterministicStringify(value) {
  return `${JSON.stringify(sortObjectKeys(value), null, 2)}\n`;
}

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

function integratedSpecFilename(options) {
  if (options.publicationPolicy === 'latest') {
    if (!options.target || !options.apiSurface || !options.language) {
      throw new Error('REST_ARTIFACT_FILENAME_INVALID: latest artifacts require target, apiSurface, and language');
    }
    if (options.apiSurface === 'control-plane') return `openapi-${options.target}-control-plane-${options.language}.json`;
    if (!options.protocolVersion) throw new Error('REST_ARTIFACT_FILENAME_INVALID: data-plane latest requires protocolVersion');
    return `openapi-${options.target}-data-plane-${options.protocolVersion}-${options.language}.json`;
  }

  if (options.publicationPolicy === 'track') {
    if (!options.target || !options.releaseTrack || !options.language) {
      throw new Error('REST_ARTIFACT_FILENAME_INVALID: track artifacts require target, releaseTrack, and language');
    }
    if (options.apiSurface !== 'data-plane') throw new Error('REST_ARTIFACT_FILENAME_INVALID: track artifacts require data-plane');
    return `openapi-${options.target}-data-plane-${options.releaseTrack}-${options.language}.json`;
  }

  throw new Error(`REST_ARTIFACT_FILENAME_INVALID: unsupported publication policy "${options.publicationPolicy}"`);
}

function createArtifact(filename, bytes) {
  return {
    filename,
    bytes,
    length: bytes.length,
    sha256: sha256(bytes),
    contentType: 'application/json',
  };
}

function buildManifest(buildResult, metadata, files) {
  const semanticManifest = {
    schemaVersion: '1.0',
    target: metadata.target,
    publicationPolicy: metadata.publicationPolicy,
    releaseTrack: metadata.releaseTrack ?? null,
    apiSurface: metadata.apiSurface,
    protocolVersion: metadata.protocolVersion ?? null,
    language: metadata.language,
    source: {
      identity: metadata.sourceIdentity || null,
      digest: metadata.sourceDigest || null,
    },
    generator: {
      gitSha: metadata.generatorGitSha || null,
    },
    collection: metadata.collection || null,
    review: metadata.review || null,
    files: files.map(({filename, length, sha256: digest}) => ({filename, length, sha256: digest})),
    operations: buildResult.endpointInventory || [],
    stats: buildResult.stats || {},
    validation: {
      danglingLocalRefs: 'none',
    },
  };

  const semanticDigest = sha256(Buffer.from(deterministicStringify(semanticManifest), 'utf8'));
  return {...semanticManifest, semanticDigest};
}

function prepareIntegratedArtifact(buildResult, metadata, extraArtifacts = []) {
  const filename = integratedSpecFilename(metadata);
  const bytes = Buffer.from(deterministicStringify(buildResult.spec), 'utf8');
  const specArtifact = createArtifact(filename, bytes);
  const manifest = buildManifest(buildResult, metadata, [specArtifact, ...extraArtifacts]);
  const manifestArtifact = createArtifact('manifest.json', Buffer.from(deterministicStringify(manifest), 'utf8'));

  return {
    artifacts: [specArtifact, ...extraArtifacts, manifestArtifact],
    manifest,
    semanticDigest: manifest.semanticDigest,
  };
}

function writeIntegratedArtifacts(outputDirectory, artifacts) {
  fs.mkdirSync(outputDirectory, {recursive: true});
  const tempFiles = [];

  try {
    for (const artifact of artifacts) {
      const tempPath = path.join(outputDirectory, `.${artifact.filename}.${process.pid}.${tempFiles.length}.tmp`);
      fs.writeFileSync(tempPath, artifact.bytes);
      tempFiles.push({tempPath, finalPath: path.join(outputDirectory, artifact.filename)});
    }

    for (const {tempPath, finalPath} of tempFiles) {
      fs.renameSync(tempPath, finalPath);
    }
  } catch (err) {
    for (const {tempPath} of tempFiles) {
      try {
        if (fs.existsSync(tempPath)) fs.rmSync(tempPath);
      } catch {
        // Best-effort cleanup while preserving the original error.
      }
    }
    throw err;
  }

  return artifacts.map(artifact => ({
    ...artifact,
    path: path.join(outputDirectory, artifact.filename),
  }));
}

module.exports = {
  integratedSpecFilename,
  prepareIntegratedArtifact,
  writeIntegratedArtifacts,
  deterministicStringify,
  sha256,
};
