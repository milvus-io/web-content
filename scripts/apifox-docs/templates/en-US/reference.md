---
displayed_sidebar: restfulSidebar
sidebar_position: {{sidebar_position}}
slug: /restful/{{page_slug}}
title: {{page_title}}
description: \"{{page_excerpt | split_excerpt}}\"
---

import RestHeader from '@site/src/components/RestHeader';

{{page_excerpt | split_excerpt}}

<RestHeader method="{{page_method}}" endpoint="{{server}}{{page_url}}" />

---

## Example

{% if page_excerpt | split_example === '' %}

{{ page_title | get_example }}

{% else %}

{{ page_excerpt | split_example }}

{% endif %}

## Request

### Parameters

{% if query_params | length > 0 -%}

- Query parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in query_params %}
    | __{{param['name']}}__  | **{{param['schema']['type']}}** {%- if param['required'] -%}(required){%- endif -%}<br>{{param['description']}}{%- if param['default'] -%}<br>The value defaults to **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br>The value ranges from **{{param['minimum']}}** to **{{param['maximum']}}**.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br>The minimum value is **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br>The maximum value is **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- No query parameters required

{%- endif %}

{% if path_params | length > 0 -%}

- Path parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in path_params %}
    | __{{param['name']}}__  | **{{param['schema']['type']}}** {%- if param['required'] -%}(required){%- endif -%}<br>{{param['description']}}{%- if param['default'] -%}<br>The value defaults to **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br>The value ranges from **{{param['minimum']}}** to **{{param['maximum']}}**.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br>The minimum value is **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br>The maximum value is **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- No path parameters required

{%- endif %}

{% if header_params | length > 0 -%}

- Header parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in header_params %}
    | __{{param['name']}}__  | **{{param['schema']['type']}}** {%- if param['required'] -%}(required){%- endif -%}<br>{{param['description']}}{%- if param['default'] -%}<br>The value defaults to **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br>The value ranges from **{{param['minimum']}}** to **{{param['maximum']}}**.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br>The minimum value is **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br>The maximum value is **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- No header parameters required

{%- endif %}

### Request Body

{%- if req_bodies | length > 0 -%}
{%- for req_body in req_bodies %}

{%- if req_bodies | length > 1 %}

#### Option {{loop.index}}: {{req_body['description']}}
{%- endif %}

```json
{{req_body | req_format }}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
{{ req_body | prepare_entries }}

{%- endfor %}
{%- else %}

No request body required

{%- endif %}

## Response

{{ res_desc }}

### Response Body

{%- if res_bodies | length > 0 -%}
{%- for res_body in res_bodies %}

{%- if res_bodies | length > 1 %}

#### Option {{loop.index}}: {{res_body['description']}}
{%- endif %}

```json
{{res_body | res_format }}
```

| Property | Description                                                                                                                                 |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__   | **integer**<br>Indicates whether the request succeeds.<br><ul><li>`0`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
{{ res_body | prepare_entries }}

{%- endfor %}
{%- endif %}

### Error Response

```json
{
    "code": integer,
    "message": string
}
```

| Property | Description                                                                                                                                 |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__   | **integer**<br>Indicates whether the request succeeds.<br><ul><li>`0`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
| __message__  | **string**<br>Indicates the possible reason for the reported error. |

