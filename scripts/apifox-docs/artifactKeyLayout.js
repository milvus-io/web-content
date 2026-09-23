function publicationBase(options) {
  if (options.apiSurface === 'control-plane') {
    if (options.target !== 'zilliz' || options.publicationPolicy !== 'latest') throw new Error('REST_CONTROL_PLANE_KEY_INVALID');
    return `openapi/v2/control-plane/zilliz/latest/all/${options.language}`;
  }
  if (options.apiSurface !== 'data-plane') throw new Error('REST_API_SURFACE_INVALID');
  if (options.publicationPolicy === 'track') {
    return `openapi/v2/data-plane/${options.target}/tracks/${options.releaseTrack}/${options.language}`;
  }
  return `openapi/v2/data-plane/${options.target}/latest/${options.protocolVersion}/${options.language}`;
}

function artifactKeys(options, artifact) {
  const base = publicationBase(options);
  return {
    immutableKey: `${base}/objects/${artifact.sha256}/${artifact.filename}`,
    latestKey: `${base}/${artifact.filename === 'manifest.json' ? 'manifest.json' : 'openapi.json'}`,
  };
}

module.exports = {artifactKeys, publicationBase};
