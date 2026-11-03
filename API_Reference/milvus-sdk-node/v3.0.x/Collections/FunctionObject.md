# FunctionObject

Describes a doc-in/doc-out function attached to a collection (for example a text-embedding function), passed via `functions` in the create-collection request.

```typescript
export type FunctionObject = {
  name: string;
  description?: string;
  type: FunctionType | FunctionTypeName;
  input_field_names: string[];
  output_field_names?: string[];
  params: Record<string, any>;
};
```

**FIELDS:**

- **name** (*string*) -

    The function name.

- **description** (*string*) -

    Optional description of the function.

- **type** (*FunctionType | FunctionTypeName*) -

    The function type.

- **input_field_names** (*string[]*) -

    The input field names of the function.

- **output_field_names** (*string[]*) -

    The output field names of the function.

- **params** (*Record<string, any>*) -

    Function parameters.

## Example

```javascript
import { MilvusClient, FunctionType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

await milvusClient.createCollection({
    collection_name: 'my_collection',
    functions: [
        {
            name: 'text_embedding',
            type: FunctionType.TEXTEMBEDDING,
            input_field_names: ['text'],
            output_field_names: ['vector'],
            params: { model: 'bge-large-zh-v1.5' },
        },
    ],
});
```

