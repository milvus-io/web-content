const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const LarkDocScraper = require('./larkDocScraper')
const LarkDocWriter = require('./larkDocWriter')

async function withTempDir(callback) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-doc-writer-beta-'))
    try {
        await callback(dir)
    } finally {
        fs.rmSync(dir, { recursive: true, force: true })
    }
}

async function testBaseSourceMetaPreservesBeta() {
    await withTempDir(async dir => {
        fs.writeFileSync(path.join(dir, 'source.json'), JSON.stringify({
            title: 'Connect for On-Demand Search',
            name: 'Connect for On-Demand Search',
            slug: 'connect-for-on-demand-search',
            base_record_id: 'recvlURuqRVAAw',
            base_targets: ['Zilliz.SaaS'],
            base_status: 'Draft',
            base_beta: ['PUBLIC'],
        }, null, 2))

        const writer = new LarkDocWriter(
            'root',
            'base:*',
            'default',
            dir,
            path.join(dir, 'images'),
            'zilliz.saas',
            true,
            false,
        )

        try {
            const meta = await writer.__is_to_publish(
                'Connect for On-Demand Search',
                'connect-for-on-demand-search',
            )

            assert.equal(meta.publish, true)
            assert.equal(meta.beta, 'PUBLIC')

            const frontMatter = writer.__front_matters(
                meta.title,
                'Cloud',
                meta.slug,
                meta.beta,
                null,
                'origin',
                'BTrNwoEfYii1e9kf0BScWDpcnA2',
            )
            assert.match(frontMatter, /^beta: PUBLIC$/m)
        } finally {
            writer.destroy()
        }
    })
}

function testScraperCopiesBetaToBaseSourceMeta() {
    const scraper = new LarkDocScraper('root', 'base:*', 'wiki', 'unused')
    const source = scraper.__source_base_meta({}, {
        record_id: 'recvlURuqRVAAw',
        base_table_id: 'tblWv7PjNDsexddH',
        base_table_name: 'Development',
        base_record_index: 1,
        fields: {
            Docs: '[Connect for On-Demand Search](https://zilliverse.feishu.cn/wiki/BTrNwoEfYii1e9kf0BScWDpcnA2)',
            Slug: 'connect-for-on-demand-search',
            Targets: ['Zilliz.SaaS'],
            Progress: 'Draft',
            Beta: ['PRIVATE'],
        },
    })

    assert.deepEqual(source.base_beta, ['PRIVATE'])
}

function testScraperOmitsPublishMetaForSections() {
    const scraper = new LarkDocScraper('root', 'base:*', 'wiki', 'unused')
    const source = scraper.__source_base_meta({}, {
        record_id: 'recSection',
        base_table_id: 'tblManagement',
        base_table_name: 'Management',
        base_record_index: 2,
        fields: {
            Docs: '[Scale Cluster](http://Scale Cluster)',
            'Placement Type': 'section',
            Progress: 'Deprecated',
            Targets: ['Zilliz.SaaS'],
            Beta: ['PUBLIC'],
        },
    })

    assert.equal(source.base_placement_type, 'section')
    assert.equal(Object.prototype.hasOwnProperty.call(source, 'base_status'), false)
    assert.equal(Object.prototype.hasOwnProperty.call(source, 'base_targets'), false)
    assert.equal(Object.prototype.hasOwnProperty.call(source, 'base_beta'), false)
}

async function testScraperKeepsRecordsHiddenBySelectedView() {
    const scraper = new LarkDocScraper('root', 'base:*', 'wiki', 'unused')
    scraper.base_app_token = 'baseToken'
    scraper.__base_view_id = async () => 'viewA'

    scraper.__base_record_page = async (_token, _table, viewId = null) => {
        const items = viewId
            ? [{ record_id: 'recCanonical', fields: { Docs: 'Canonical' } }]
            : [
                { record_id: 'recCanonical', fields: { Docs: 'Canonical' } },
                { record_id: 'recSection', fields: { Docs: 'Section', 'Placement Type': 'section' } },
            ]
        return items.map((record, index) => ({
            ...record,
            base_table_id: 'tblManagement',
            base_table_name: 'Management',
            base_table_index: 0,
            base_record_index: index,
        }))
    }

    const records = await scraper.__base_records('token', {
        table_id: 'tblManagement',
        name: 'Management',
        index: 0,
    })

    assert.deepEqual(records.map(record => record.record_id), ['recCanonical', 'recSection'])
    assert.equal(records[0].base_record_index, 0)
    assert.equal(records[1].base_record_index, 1)
}

async function testSectionSourceWinsOverDeprecatedCanonicalWithSameSlug() {
    await withTempDir(async dir => {
        fs.writeFileSync(path.join(dir, 'canonical.json'), JSON.stringify({
            title: 'Scale Cluster',
            name: 'Scale Cluster',
            slug: 'scale-cluster',
            node_token: 'canonical-token',
            base_record_id: 'recCanonical',
            base_targets: ['Zilliz.SaaS'],
            base_status: 'Deprecated',
        }, null, 2))
        fs.writeFileSync(path.join(dir, 'section.json'), JSON.stringify({
            title: 'Scale Cluster',
            name: 'Scale Cluster',
            slug: 'scale-cluster',
            node_token: 'base:tblManagement:recSection',
            origin_node_token: 'base:tblManagement:recSection',
            base_record_id: 'recSection',
            base_placement_type: 'section',
            has_child: true,
        }, null, 2))

        const writer = new LarkDocWriter(
            'root',
            'base:*',
            'default',
            dir,
            path.join(dir, 'images'),
            'zilliz.saas',
            true,
            false,
        )

        try {
            const meta = await writer.__is_to_publish(
                'Scale Cluster',
                'scale-cluster',
                'base:tblManagement:recSection',
            )

            assert.equal(meta.publish, true)
            assert.equal(meta.title, 'Scale Cluster')
        } finally {
            writer.destroy()
        }
    })
}

async function testSidebarSkipsRefToTargetFilteredOutForCurrentTarget() {
    await withTempDir(async dir => {
        fs.writeFileSync(path.join(dir, 'root.json'), JSON.stringify({
            title: 'Root',
            slug: 'root',
            node_token: 'root',
            has_child: true,
            children: [
                {
                    title: 'Connect for On-Demand Search',
                    slug: 'connect-for-on-demand-search',
                    node_token: 'ref-token',
                    has_child: false,
                },
            ],
        }, null, 2))
        fs.writeFileSync(path.join(dir, 'ref.json'), JSON.stringify({
            title: 'Connect for On-Demand Search',
            name: 'Connect for On-Demand Search',
            slug: 'connect-for-on-demand-search',
            node_token: 'ref-token',
            base_record_id: 'recRef',
            base_nav_ref: true,
            base_nav_ref_target_token: 'target-token',
            base_targets: ['Zilliz.PaaS'],
            base_status: 'Draft',
        }, null, 2))
        fs.writeFileSync(path.join(dir, 'target.json'), JSON.stringify({
            title: 'Connect for On-Demand Search',
            name: 'Connect for On-Demand Search',
            slug: 'connect-for-on-demand-search',
            node_token: 'target-token',
            base_record_id: 'recTarget',
            base_targets: ['Zilliz.SaaS'],
            base_status: 'Draft',
            blocks: {
                items: [
                    { block_type: 1, page: {}, children: ['text-block'] },
                    { block_id: 'text-block', block_type: 2, text: { elements: [{ text_run: { content: 'body' } }] } },
                ],
            },
        }, null, 2))

        const writer = new LarkDocWriter(
            'root',
            'base:*',
            'default',
            dir,
            path.join(dir, 'images'),
            'zilliz.paas',
            true,
            false,
        )

        try {
            const items = await writer.generate_sidebar('docs-byoc/tutorials', 'docs-byoc')
            assert.deepEqual(items, [])
        } finally {
            writer.destroy()
        }
    })
}

async function run() {
    testScraperCopiesBetaToBaseSourceMeta()
    testScraperOmitsPublishMetaForSections()
    await testScraperKeepsRecordsHiddenBySelectedView()
    await testSectionSourceWinsOverDeprecatedCanonicalWithSameSlug()
    await testSidebarSkipsRefToTargetFilteredOutForCurrentTarget()
    await testBaseSourceMetaPreservesBeta()
    console.log('larkDocWriter beta tests passed')
}

run().catch(error => {
    console.error(error)
    process.exit(1)
})
