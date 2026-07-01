const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { loadSpecifications, resolveRefs } = require('./specLoader');

function writeSpec(dir, file, headerDescription) {
    fs.writeFileSync(path.join(dir, file), JSON.stringify({
        openapi: '3.0.1',
        info: { title: file, version: '1.0.0' },
        tags: [{ name: file }],
        paths: {
            [`/${file}/collections/list`]: {
                post: {
                    summary: `List ${file}`,
                    tags: [file],
                    parameters: [
                        { $ref: '#/components/parameters/AuthorizationHeader' },
                    ],
                    responses: {},
                },
            },
        },
        components: {
            parameters: {
                AuthorizationHeader: {
                    name: 'Authorization',
                    in: 'header',
                    description: headerDescription,
                    required: true,
                    schema: { type: 'string' },
                },
            },
        },
        servers: [],
    }, null, 2));
}

function withTempDir(callback) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'apifox-spec-loader-'));
    try {
        callback(dir);
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

function testPathRefsResolveAgainstTheirSourceFileBeforeMerge() {
    withTempDir(dir => {
        writeSpec(dir, '01-first.json', 'first local header');
        writeSpec(dir, '02-second.json', 'second local header');

        const spec = loadSpecifications(dir);

        assert.equal(
            spec.paths['/01-first.json/collections/list'].post.parameters[0].description,
            'first local header',
        );
        assert.equal(
            spec.paths['/02-second.json/collections/list'].post.parameters[0].description,
            'second local header',
        );
    });
}

function testPreResolutionLeavesCrossFileRefsForMergedResolutionWithoutWarning() {
    withTempDir(dir => {
        fs.writeFileSync(path.join(dir, '01-shared.json'), JSON.stringify({
            openapi: '3.0.1',
            info: { title: 'shared', version: '1.0.0' },
            tags: [{ name: 'shared' }],
            paths: {},
            components: {
                schemas: {
                    SharedName: {
                        type: 'string',
                        description: 'shared schema',
                    },
                },
            },
            servers: [],
        }, null, 2));
        fs.writeFileSync(path.join(dir, '02-consumer.json'), JSON.stringify({
            openapi: '3.0.1',
            info: { title: 'consumer', version: '1.0.0' },
            tags: [{ name: 'consumer' }],
            paths: {
                '/consumer': {
                    post: {
                        summary: 'Consumer',
                        tags: ['consumer'],
                        requestBody: {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            name: { $ref: '#/components/schemas/SharedName' },
                                        },
                                    },
                                },
                            },
                        },
                        responses: {},
                    },
                },
            },
            components: {},
            servers: [],
        }, null, 2));

        const warnings = [];
        const originalWarn = console.warn;
        console.warn = message => warnings.push(message);
        try {
            const spec = loadSpecifications(dir);
            assert.equal(
                spec.paths['/consumer'].post.requestBody.content['application/json'].schema.properties.name.$ref,
                '#/components/schemas/SharedName',
            );
            assert.equal(spec.components.schemas.SharedName.description, 'shared schema');
        } finally {
            console.warn = originalWarn;
        }

        assert.deepEqual(warnings, []);
    });
}

function testResolveRefsPreservesSiblingMetadataOnRefWrapper() {
    const spec = {
        components: {
            schemas: {
                StorageRequest: {
                    type: 'object',
                    properties: {
                        bucketName: { type: 'string' },
                    },
                },
            },
        },
    };

    const resolved = resolveRefs({
        'x-tab-label': 'AWS S3',
        'x-target-lang': 'en-US',
        $ref: '#/components/schemas/StorageRequest',
    }, spec);

    assert.deepEqual(resolved, {
        type: 'object',
        properties: {
            bucketName: { type: 'string' },
        },
        'x-tab-label': 'AWS S3',
        'x-target-lang': 'en-US',
    });
}

function run() {
    testPathRefsResolveAgainstTheirSourceFileBeforeMerge();
    testPreResolutionLeavesCrossFileRefsForMergedResolutionWithoutWarning();
    testResolveRefsPreservesSiblingMetadataOnRefWrapper();
    console.log('apifox spec loader tests passed');
}

run();
