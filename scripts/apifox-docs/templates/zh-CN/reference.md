---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /{{page_slug}}
title: {{page_title}}
---

import RestHeader from '@site/src/components/RestHeader';

{{page_excerpt}}

<RestHeader method="{{page_method}}" endpoint="{{server}}{{page_url}}" />

---

## 示例

{{ page_title | get_example }}

## 请求

### 参数

{% if query_params | length > 0 -%}

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in query_params %}
    | `{{param['name']}}`  | **{{param['schema']['type']}}** {%- if param['required'] -%}（必选）{%- endif -%}<br/>{{param['description']}}{%- if param['default'] -%}<br/>默认值为 **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br/>参数取值范围在 **{{param['minimum']}}** 到 **{{param['maximum']}}** 之间.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br/>最小值为 **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br/>最大值为 **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- 无查询参数。

{%- endif %}

{% if path_params -%}

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in path_params %}
    | `{{param['name']}}`  | **{{param['schema']['type']}}** {%- if param['required'] -%}（必选）{%- endif -%}<br/>{{param['description']}}{%- if param['default'] -%}<br/>默认值为 **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br/>参数取值范围在 **{{param['minimum']}}** 到 **{{param['maximum']}}** 之间.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br/>最小值为 **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br/>最大值为 **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- 无路径参数。

{%- endif %}

### 请求体

{%- if req_bodies | length > 0 -%}
{%- for req_body in req_bodies %}

```json
{{req_body | req_format }}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
{%- for k, v in req_body['properties'] %}
{%- if v['type'] not in ['array', 'object'] %}
| `{{k}}`  | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}** {%- if k in req_body['required'] -%}（必选）{%- endif -%}<br/>{{v['description']}}{%- if v['default'] -%}<br/>默认值为 **{{v['default']}}**.{%- endif -%}{%- if v['minimum'] and v['maximum'] -%}<br/>参数取值在 **{{v['minimum']}}** 和 **{{v['maximum']}}** 之间.{%- endif -%}{%- if v['minimum'] and not v['maximum'] -%}<br/>最小值为 **{{v['minimum']}}**.{%- endif -%}{%- if v['maximum'] and not v['minimum'] -%}<br/>最大值为 **{{v['maximum']}}**.{%- endif -%} |
{%- elif v['type'] == 'object' %}
| `{{k}}`  | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}** {%- if k in req_body['required'] -%}（必选）{%- endif -%}<br/>{{v['description']}}{%- if v['default'] -%}<br/>默认值为 **{{v['default']}}**.{%- endif -%}{%- if v['minimum'] and v['maximum'] -%}<br/>参数取值在 **{{v['minimum']}}** 和 **{{v['maximum']}}** 之间.{%- endif -%}{%- if v['minimum'] and not v['maximum'] -%}<br/>最小值为 **{{v['minimum']}}**.{%- endif -%}{%- if v['maximum'] and not v['minimum'] -%}<br/>最大值为 **{{v['maximum']}}**.{%- endif -%} |
{%- for ko, vo in v['properties'] %}
| `{{k}}.{{ko}}`  | **{{vo['type']}}{%if 'format' in vo %}({{vo['format']}}){%- endif %}**<br/>{{vo['description']}}{%- if vo['default'] -%}<br/>默认值为 **{{vo['default']}}**.{%- endif -%}{%- if vo['minimum'] and vo['maximum'] -%}<br/>参数取值在 **{{vo['minimum']}}** 和 **{{vo['maximum']}}** 之间.{%- endif -%}{%- if vo['minimum'] and not vo['maximum'] -%}<br/>最小值为 **{{vo['minimum']}}**.{%- endif -%}{%- if vo['maximum'] and not vo['minimum'] -%}<br/>最大值为 **{{vo['maximum']}}**.{%- endif -%} |
{%- endfor %}
{%- elif v['type'] == 'array' %}
| `{{k}}`  | **{{v['type']}}{%if 'format' in v['items'] %} ({{v['items']['type']}} \[{{v['items']['format']}}\]){%- endif %}** {%- if k in req_body['required'] -%}（必选）{%- endif -%}<br/>{{v['description']}}{%- if v['default'] -%}<br/>默认值为 **{{v['default']}}**.{%- endif -%}{%- if v['minimum'] and v['maximum'] -%}<br/>参数取值在 **{{v['minimum']}}** 和 **{{v['maximum']}}** 之间.{%- endif -%}{%- if v['minimum'] and not v['maximum'] -%}<br/>最小值为 **{{v['minimum']}}**.{%- endif -%}{%- if v['maximum'] and not v['minimum'] -%}<br/>最大值为 **{{v['maximum']}}**.{%- endif -%} |
{%- if v['items'] == 'object' %}
{%- for ka, va in v['items']['properties'] %}
| `{{k}}[].{{ka}}`  | **{{va['type']}}{%if 'format' in va %}({{va['format']}}){%- endif %}**<br/>{{va['description']}}{%- if va['default'] -%}<br/>默认值为 **{{va['default']}}**.{%- endif -%}{%- if va['minimum'] and va['maximum'] -%}<br/>参数取值在 **{{va['minimum']}}** 和 **{{va['maximum']}}** 之间.{%- endif -%}{%- if va['minimum'] and not va['maximum'] -%}<br/>最小值为 **{{va['minimum']}}**.{%- endif -%}{%- if va['maximum'] and not va['minimum'] -%}<br/>最大值为 **{{va['maximum']}}**.{%- endif -%} |
{%- endfor %}
{%- endif %}
{%- endif %}
{%- endfor %}


{%- endfor %}
{%- else %}

无请求体。

{%- endif %}

## 响应

{{ res_desc }}

### 响应体

- 处理请求成功后返回

```json
{{res_body | res_format }}
```

- 处理请求失败后返回

```json
{
    "code": integer,
    "message": string
}
```

### 属性

下表罗列了响应包含的所有属性。

| 属性名称  | 属性描述                                                                                                                               |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `code`   | **integer**<br/>表示请求是否成功。<br/><ul><li>`200`：请求成功。</li><li>其它：存在错误。</li></ul> |
{%- if 'properties' in res_body['properties']['data'] %}
| `data`    | **object**<br/>表示响应中携带的数据对象。 |
{%- for k, v in res_body['properties']['data']['properties'] %}
{%- if v['type'] not in ['array', 'object'] or 'properties' not in v['items'] %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br/>{{v['description']}} |
{%- elif v['type'] == 'array' and 'properties' in v['items'] %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br/>{{v['description']}} |
{%- for ka, va in v['items']['properties'] %}
| `data.{{k}}[].{{ka}}`   | **{{va['type']}}{%if 'format' in va %}({{va['format']}}){%- endif %}**<br/>{{va['description']}} |
{%- endfor %}
{%- elif v['type'] == 'object' %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br/>{{v['description']}} |
{%- for ko, vo in v['properties'] %}
| `data.{{k}}.{{ko}}`   | **{{vo['type']}}{%if 'format' in vo %}({{vo['format']}}){%- endif %}**<br/>{{vo['description']}} |
{%- endfor %}
{%- endif %}
{%- endfor %}
{%- elif 'items' in res_body['properties']['data'] %}
| `data`  | **array**<br/>表示响应中携带的 {{res_body['properties']['data']['items']['type']}} 数组. |
{%- if res_body['properties']['data']['items']['type'] == 'object' %}
{%- for k, v in res_body['properties']['data']['items']['properties'] %}
{%- if v['type'] not in ['array', 'object'] or 'properties' not in v['items'] %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br/>{{v['description']}} |
{%- elif v['type'] == 'array' and 'properties' in v['items'] %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br/>{{v['description']}} |
{%- for ka, va in v['items']['properties'] %}
| `data.{{k}}[].{{ka}}`   | **{{va['type']}}{%if 'format' in va %}({{va['format']}}){%- endif %}**<br/>{{va['description']}} |
{%- endfor %}
{%- elif v['type'] == 'object' %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br/>{{v['description']}} |
{%- for ko, vo in v['properties'] %}
| `data.{{k}}.{{ko}}`   | **{{vo['type']}}{%if 'format' in vo %}({{vo['format']}}){%- endif %}**<br/>{{vo['description']}} |
{%- endfor %}
{%- endif %}
{%- endfor %}
{%- endif%}
{%- endif %}
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
{{ page_slug | list_error }}
