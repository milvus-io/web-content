// Zilliz control-plane read-only availability suite.
// Probes read-only endpoints on a Zilliz Cloud environment (UAT or prod)
// using an API key from the repository .env (# Zilliz section). Never writes:
// every request is a GET or an explicitly read-only list call. Production is
// probed with the same read-only discipline as UAT.
"use strict";

function buildZillizControlPlaneSuite({projectId}) {
  return async function zillizControlPlaneSuite(api) {
    const get = (p) => api.call(p, undefined, {method: 'GET'});

    await api.rec('projects', 'GET /v2/projects', 'read-only GA probe: project list reachable with API key', 'ok',
      await get('/v2/projects'));

    const projectsRes = await get('/v2/projects');
    const clusters = await get('/v2/clusters');
    clusters.__projects = projectsRes.data || [];
    await api.rec('clusters', 'GET /v2/clusters', 'read-only GA probe: cluster list', 'ok', clusters);

    // x-beta PUBLIC set (public preview): reachable like GA from an ordinary key
    const projectRow = (clusters.__projects || []).find((p) => p.projectId === projectId) || (clusters.__projects || [])[0];
    const regionId = projectRow && (projectRow.regionIds || [])[0];
    const onDemand = projectId && regionId
      ? await get(`/v2/clusters/onDemandClusters?projectId=${encodeURIComponent(projectId)}&regionId=${encodeURIComponent(regionId)}`)
      : await get('/v2/clusters/onDemandClusters');
    await api.rec('on-demand', 'GET /v2/clusters/onDemandClusters', 'public-preview probe: on-demand clusters list reachable', 'ok', onDemand);

    if (projectId) {
      const regions = await get(`/v2/projects/${encodeURIComponent(projectId)}/regions`);
      await api.rec('regions', 'GET /v2/projects/{projectId}/regions', 'read-only probe: region list (path-param form; observation)', 'record', regions);
    }

    const bogus = await get('/v2/definitely-not-a-route');
    await api.rec('sanity', 'GET /v2/definitely-not-a-route', 'negative control: unknown route must 404', 'err', bogus);
  };
}

module.exports = {buildZillizControlPlaneSuite};
