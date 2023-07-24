import os, sys
import json, csv
from jinja2 import Environment, FileSystemLoader, select_autoescape

class ErrorGenerator:
    def __init__(self):
        self.errcode = 'scripts/erroref/errcode.csv'
        self.grouping = 'scripts/erroref/grouping.csv'
        self.errors = self.__prepare_errorcode()
        self.groups = self.__prepare_grouping()

    def __prepare_errorcode(self):
        errors = {}
        with open(self.errcode, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                errors[row[0]] = row[1]

        return errors

    def __prepare_grouping(self):
        groups = {}
        with open(self.grouping, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                if row[0] not in groups:
                    groups[row[0]] = []
                groups[row[0]].append(row[1])

        return groups
    
    def get_errorcode_desc(self, error_code):
        return self.errors[error_code]

class RefGen:

    def __init__(self, specifications, parents):
        self.specifications = specifications
        self.parents = parents

    def refgen(self, version, exclude):
        env = Environment(
            loader=FileSystemLoader('scripts/templates'),
            autoescape=select_autoescape(['html', 'xml'])
        )

        env.filters['res_format'] = self.res_format
        env.filters['req_format'] = self.req_format
        env.filters['list_error'] = self.list_error
        env.filters['get_example'] = self.get_example

        template = env.get_template('reference.md')

        for url in self.specifications['paths']:
            for method in self.specifications['paths'][url]:
                query_params = []
                path_params = []
                req_bodies = []
                res_body = {}

                page_title = self.specifications['paths'][url][method]['summary'] 
                page_excerpt = self.specifications['paths'][url][method]['description']
                page_parent = [ x['title'] for x in self.parents if x['title'] == self.specifications['paths'][url][method]['tags'][0] ][0]
                siblings = [ x for x in self.parents if x['title'] == page_parent ][0]['pages']
                page_url = [ x for x in siblings if x['title'] == page_title ][0]['url']
                page_method = [ x for x in siblings if x['title'] == page_title ][0]['method']
                server = "https://${MILVUS_HOST}:${MILVUS_PORT}"

                if 'parameters' in self.specifications['paths'][url][method]:
                    for param in self.specifications['paths'][url][method]['parameters']:
                        if param['name'] == "public-endpoint":
                            continue
                        
                        if param['in'] == 'query':
                            query_params.append(param)
                        elif param['in'] == 'path':
                            path_params.append(param)

                if 'requestBody' in self.specifications['paths'][url][method]:
                    schema = self.specifications['paths'][url][method]['requestBody']['content']['application/json']['schema']
                    if 'oneOf' in schema:
                        for req_body in schema['oneOf']:
                            req_bodies.append(req_body)
                    else:
                        req_bodies.append(schema)
                
                if 'responses' in self.specifications['paths'][url][method]:
                    print(page_title)
                    res_des = self.specifications['paths'][url][method]['responses']['200']['description']
                    if 'oneOf' in self.specifications['paths'][url][method]['responses']['200']['content']['application/json']['schema']:
                        schemas = self.specifications['paths'][url][method]['responses']['200']['content']['application/json']['schema']['oneOf']
                        res_body = [ x for x in schemas if 'data' in x['properties'] ][0]
                    else:
                        res_body = self.specifications['paths'][url][method]['responses']['200']['content']['application/json']['schema']

                t = template.render({
                    'page_title': page_title,
                    'page_excerpt': page_excerpt,
                    'page_url': page_url,
                    'server': server,
                    'page_method': page_method,
                    'query_params': query_params,
                    'path_params': path_params,
                    'req_bodies': req_bodies,
                    'res_des': res_des,
                    'res_body': res_body
                })

                for tag in exclude:
                    start_tag = f"<{tag}>"
                    end_tag = f"</{tag}>"

                    while start_tag in t:
                        start_pos = t.find(start_tag)
                        end_pos = t.find(end_tag) + len(end_tag)
                        t = t[:start_pos] + t[end_pos:]

                file_name = page_title.replace(' ', '_').lower()

                with open('API_Reference/milvus-restful/{}/{}/{}.md'.format(version, page_parent, file_name), 'w') as f:
                    f.write(t)

    def get_example(self, title):
        with open('scripts/examples.md', 'r') as f:
            lines = f.readlines()
            start_poses = [ i for i, x in enumerate(lines) if x.startswith('## ') ]
            example_titles = [ x.strip()[3:] for x in lines if x.startswith('## ')]    

            for i, example_title in enumerate(example_titles):
                if example_title == title:
                    end_pos = start_poses[i+1] if i+1 < len(start_poses) else len(lines)
                    start_pos = start_poses[i] + 1
                    return ''.join(lines[start_pos:end_pos])    

    def get_slug(self, docs, title):
        for doc in docs:
            if doc['title'] == title:
                return doc['slug']
            elif 'children' in doc:
                for child in doc['children']:
                    if child['title'] == title:
                        return child['slug']
                    
    def req_format(self, req_body):
        b = None
        if 'properties' in req_body:
            properties = req_body['properties']

            b = {}
            for k,v in properties.items():
                if v['type'] == 'object':
                    b1 = {}
                    for k1,v1 in v['properties'].items():
                        b1[k1] = v1['type']
                        b[k] = b1
                elif v['type'] == 'array':
                    b2 = [{}]
                    if 'properties' in v['items']:
                        for k2,v2 in v['items']['properties'].items():
                            b2[0][k2] = v2['type']

                    b[k] = b2 if b2[0] else []
                else:
                    b[k] = v['type']
        elif 'items' in req_body:
            items = req_body['items']
            if 'properties' in items:
                properties = items['properties']
                b = [{}]
                for k,v in properties.items():
                    b[0][k] = v['type']
                
                b = b if b[0] else []

        return json.dumps(b, indent=4, sort_keys=True)
        
    def res_format(self, res_body):
        b = None
        if 'properties' in res_body['properties']['data']:
            properties = res_body['properties']['data']['properties']
        
            b = {}
            for k,v in properties.items():
                if v['type'] == 'object':
                    b1 = {}
                    for k1,v1 in v['properties'].items():
                        b1[k1] = v1['type']
                        b[k] = b1
                elif v['type'] == 'array':
                    b2 = [{}]
                    if 'properties' in v['items']:
                        for k2,v2 in v['items']['properties'].items():
                            b2[0][k2] = v2['type']
                        b[k] = b2 if b2[0] else []
                else:
                    b[k] = v['type']
        elif 'items' in res_body['properties']['data']:
            items = res_body['properties']['data']['items']
            if 'properties' in items:
                properties = items['properties']
                b = [{}]
                for k,v in properties.items():
                    b[0][k] = v['type']

                b = b if b[0] else []

        if b:
            return json.dumps({
                    "code": 200,
                    "data": b
                }, indent=4, sort_keys=True)
        else: 
            return json.dumps({
                    "code": 200,
                    "data": {}
                }, indent=4, sort_keys=True)
        
    def list_error(self, page_title):
        errgen = ErrorGenerator()
        list_header = '| Error Code | Description |\n| --- | --- |\n'
        if ''.join(page_title.split(' ')) in errgen.groups:
            group = errgen.groups[''.join(page_title.split(' '))]
            list(map(lambda x: int(x),group)).sort()
            return list_header + ''.join([ f'| {x} | {errgen.get_errorcode_desc(x)} |\n' for x in group])
        else:
            return 'None'
        
class CommandFlags:

    def __init__(self, argvs):
        self.argvs = argvs
        self.flags = {}
        self.__parse()

    def __parse(self):
        for i, argv in enumerate(self.argvs):
            if argv.startswith('--'):
                if i+1 < len(self.argvs) and not self.argvs[i+1].startswith('--'):
                    self.flags[argv[2:]] = self.argvs[i+1]
                else:
                    self.flags[argv[2:]] = True

if __name__ == '__main__':
    flags = CommandFlags(sys.argv).flags
    version = flags.get('version', 'v2.2.x')
    exclude = flags.get('exclude', None)

    if exclude:
        exclude = exclude.split(',')

    with open(f'API_Reference/milvus-restful/{version}/clean.json', 'r') as f:
        specifications = json.load(f)

    groups = [ dict(title=x['name']) for x in specifications['tags'] ]
    
    for group in groups:
        if os.path.isdir('API_Reference/milvus-restful/{}/{}'.format(version, group['title'])):
            continue

        os.mkdir('API_Reference/milvus-restful/{}/{}'.format(version, group['title']))

    pages = [ dict(
        title=specifications['paths'][url][method]['summary'],
        description=specifications['paths'][url][method]['description'],
        url=url,
        method=method,
        group=specifications['paths'][url][method]['tags'][0],
    )  for url in specifications['paths'] for method in specifications['paths'][url] ]

    for group in groups:
        group['pages'] = [ x for x in pages if x['group'] == group['title'] ]

    refgen = RefGen(specifications, groups)
    refgen.refgen(version, exclude)

