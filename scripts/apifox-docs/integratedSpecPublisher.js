const fs = require('node:fs');
const path = require('node:path');
const {buildIntegratedSpec} = require('./integratedSpecBuilder');
const {
  deterministicStringify,
  prepareIntegratedArtifact,
  sha256,
  writeIntegratedArtifacts,
} = require('./integratedSpecArtifacts');
const {loadSpecifications} = require('./specLoader');
const {artifactKeys} = require('./artifactKeyLayout');

function clone(value) {
  return structuredClone(value);
}

function sourceDigestForFile(filePath) {
  const bytes = fs.readFileSync(filePath);
  return {spec: JSON.parse(bytes.toString('utf8')), digest: sha256(bytes), identity: path.resolve(filePath)};
}

function sourceDigestForDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath)
    .filter(file => file.endsWith('.json'))
    .sort();
  if (files.length === 0) throw new Error(`No .json files found in directory "${directoryPath}"`);

  const combined = files.map(file => {
    const bytes = fs.readFileSync(path.join(directoryPath, file));
    return `${file}\0${sha256(bytes)}`;
  }).join('\n');

  return {
    spec: loadSpecifications(directoryPath),
    digest: sha256(Buffer.from(combined, 'utf8')),
    identity: path.resolve(directoryPath),
  };
}

function resolveSource(specifications) {
  if (typeof specifications === 'string') {
    const stat = fs.statSync(specifications);
    return stat.isFile()
      ? sourceDigestForFile(specifications)
      : sourceDigestForDirectory(specifications);
  }

  const spec = clone(specifications);
  return {
    spec,
    digest: sha256(Buffer.from(deterministicStringify(spec), 'utf8')),
    identity: 'in-memory',
  };
}

async function publishIntegratedSpecs(options) {
  const {
    specifications,
    publicationPolicy,
    target,
    language,
    apiSurface,
    protocolVersion,
    releaseTrack,
    outputDirectory,
    uploader,
    enableCompatibilityAliases = false,
    generatorGitSha = null,
    sourceIdentity,
  } = options;

  const source = resolveSource(specifications);
  const built = buildIntegratedSpec(source.spec, {
    publicationPolicy,
    target,
    language,
    apiSurface,
    protocolVersion,
    releaseTrack,
  });

  const prepared = prepareIntegratedArtifact(built, {
    publicationPolicy,
    target,
    releaseTrack: built.releaseTrack,
    apiSurface: built.apiSurface,
    protocolVersion: built.protocolVersion,
    language,
    sourceIdentity: sourceIdentity || source.identity,
    sourceDigest: source.digest,
    generatorGitSha,
    collection: options.collection || null,
    review: options.review || null,
  }, []);

  if (enableCompatibilityAliases) throw new Error('REST_COMPATIBILITY_ALIASES_UNSUPPORTED');
  const artifacts = prepared.artifacts;

  const localArtifacts = writeIntegratedArtifacts(outputDirectory, artifacts);

  if (uploader) {
    const uploads = [];
    try {
      for (const artifact of localArtifacts) {
        const keys = artifactKeys({
          apiSurface: built.apiSurface,
          publicationPolicy,
          target,
          protocolVersion: built.protocolVersion,
          releaseTrack: built.releaseTrack,
          language,
        }, artifact);
        const immutableUrl = await uploader.uploadArtifact({
          filename: artifact.filename,
          key: keys.immutableKey,
          bytes: artifact.bytes,
          sha256: artifact.sha256,
        });
        const url = uploader.promoteArtifact
          ? await uploader.promoteArtifact({
            filename: artifact.filename,
            key: keys.latestKey,
            bytes: artifact.bytes,
            sha256: artifact.sha256,
            expectedCurrentSha256: options.expectedCurrentSha256?.[keys.latestKey] ?? null,
          })
          : immutableUrl;
        uploads.push({
          filename: artifact.filename,
          immutableKey: keys.immutableKey,
          latestKey: keys.latestKey,
          sha256: artifact.sha256,
          immutableUrl,
          url,
        });
      }
    } catch (err) {
      throw new Error(`S3 upload failed: ${err.message}`, {cause: err});
    }
    return {localArtifacts, uploads, manifest: prepared.manifest};
  }

  return {localArtifacts, uploads: [], manifest: prepared.manifest};
}

async function publishBilingualControlPlaneSpecs(options) {
  if (options.apiSurface !== 'control-plane' || options.publicationPolicy !== 'latest' || options.target !== 'zilliz') {
    throw new Error('REST_BILINGUAL_CONTROL_PLANE_OPTIONS_INVALID');
  }
  const results = [];
  for (const language of ['en-US', 'zh-CN']) {
    results.push(await publishIntegratedSpecs({
      ...options,
      language,
      outputDirectory: path.join(options.outputDirectory, language),
      uploader: null,
    }));
  }
  const releaseManifest = {
    schemaVersion: '1.0',
    apiSurface: 'control-plane',
    target: 'zilliz',
    languages: results.map((result, index) => ({
      language: ['en-US', 'zh-CN'][index],
      semanticDigest: result.manifest.semanticDigest,
      files: result.localArtifacts.map(artifact => ({filename: artifact.filename, sha256: artifact.sha256})),
    })),
  };
  const releaseBytes = Buffer.from(deterministicStringify(releaseManifest), 'utf8');
  const releaseArtifact = {
    filename: 'bilingual-manifest.json',
    bytes: releaseBytes,
    sha256: sha256(releaseBytes),
    length: releaseBytes.length,
    contentType: 'application/json',
  };
  const releasePath = path.join(options.outputDirectory, releaseArtifact.filename);
  fs.mkdirSync(options.outputDirectory, {recursive: true});
  fs.writeFileSync(releasePath, releaseBytes);

  const uploads = [];
  if (options.uploader) {
    for (let index = 0; index < results.length; index += 1) {
      const language = ['en-US', 'zh-CN'][index];
      for (const artifact of results[index].localArtifacts) {
        const keys = artifactKeys({apiSurface: 'control-plane', publicationPolicy: 'latest', target: 'zilliz', language}, artifact);
        uploads.push({
          language,
          filename: artifact.filename,
          key: keys.immutableKey,
          url: await options.uploader.uploadArtifact({...artifact, key: keys.immutableKey}),
        });
      }
    }
    const immutableReleaseKey = `openapi/v2/control-plane/zilliz/releases/${releaseArtifact.sha256}/bilingual-manifest.json`;
    await options.uploader.uploadArtifact({...releaseArtifact, key: immutableReleaseKey});
    if (!options.uploader.promoteArtifact) throw new Error('REST_BILINGUAL_PROMOTION_UNSUPPORTED');
    await options.uploader.promoteArtifact({
      ...releaseArtifact,
      key: 'openapi/v2/control-plane/zilliz/latest/bilingual/manifest.json',
      expectedCurrentSha256: options.expectedCurrentBilingualSha256 ?? null,
    });
  }
  return {results, releaseManifest, releaseArtifact: {...releaseArtifact, path: releasePath}, uploads};
}

module.exports = {
  publishBilingualControlPlaneSpecs,
  publishIntegratedSpecs,
};
