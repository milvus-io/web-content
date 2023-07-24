import json
import sys

def del_examples(body):
    for prop in body['properties']:
        if 'examples' in body['properties'][prop]:
            del body['properties'][prop]['examples']
        if 'properties' in body['properties'][prop]:
            del_examples(body['properties'][prop])

if __name__ == '__main__':
    version = sys.argv[1]

    with open(f'API_Reference/milvus-restful/{version}/openapi.json', 'r') as f:
        specifications = json.load(f)
        specifications['info']['title'] = 'API Reference'
        specifications['info']['description'] = 'OpenAPI for operations on Zilliz Cloud'
        
        for url in specifications['paths']:
            for method in specifications['paths'][url]:
                
                if 'parameters' in specifications['paths'][url][method]:
                    for param in specifications['paths'][url][method]['parameters']:
                        if 'example' in param:
                            del param['example']

                if 'requestBody' in specifications['paths'][url][method]:
                    del specifications['paths'][url][method]['requestBody']['content']['application/json']['example']
                    schema = specifications['paths'][url][method]['requestBody']['content']['application/json']['schema']
                    if 'anyOf' in schema:
                        for req_body in schema['anyOf']:
                            del_examples(req_body)
                    elif 'oneOf' in schema:
                        for req_body in schema['oneOf']:
                            del_examples(req_body)
                    else:
                        del_examples(schema)

                if 'responses' in specifications['paths'][url][method]:
                    res_body = specifications['paths'][url][method]['responses']['200']['content']['application/json']['schema']
                    if 'anyOf' in specifications['paths'][url][method]['responses']['200']['content']['application/json']['schema']:
                        schemas = specifications['paths'][url][method]['responses']['200']['content']['application/json']['schema']['anyOf']
                        res_body = [ x for x in schemas if 'data' in x['properties'] ][0]
                    else:
                        res_body = specifications['paths'][url][method]['responses']['200']['content']['application/json']['schema']
                    
                    del_examples(res_body)

        del specifications['components']

        # with open('apis/servers.json', 'r') as f:
        #     servers = json.load(f)
        #     specifications['servers'] = servers['servers']
        #     specifications['components'] = servers['components']
        #     specifications['security'] = servers['security']

        with open(f'API_Reference/milvus-restful/{version}/clean.json', 'w') as f:
            c = json.dumps(specifications, indent=4).replace('anyOf', 'oneOf')
            f.write(c)