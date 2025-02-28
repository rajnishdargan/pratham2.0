export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { readForm } = req.body;

      if (readForm && readForm.length > 0) {
        fetchFormFields(readForm).then((fields) => {
          // console.log('fieldFromFunction!!!', fields);

          if (fields && fields.length > 0) {
            const { schema, uiSchema } = generateSchemaAndUISchema(fields);
            res.status(200).json({
              schema,
              uiSchema,
            });
          } else {
            res
              .status(500)
              .json({ error: 'Form Fields Not Found in API Call' });
          }
        });
      } else {
        res.status(500).json({ error: 'Form data is required' });
      }
    } catch (error) {
      // console.log('error hgfgfh', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

const fetchFormFields = async (readForm) => {
  const axios = require('axios');
  let fields = [];
  for (let i = 0; i < readForm.length; i++) {
    let fetchUrl = readForm[i].fetchUrl;
    let header = readForm[i].header;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: fetchUrl,
      headers: {
        Accept: '*/*',
        ...header,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        fields = [...fields, ...response?.data?.result?.fields];
        // console.log('response', response?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  // console.log('field!!!', fields);
  return fields;
};

function generateSchemaAndUISchema(fields) {
  const schema = {
    type: 'object',
    properties: {},
  };
  const uiSchema = {};

  fields.forEach((field) => {
    const {
      name,
      hint,
      label,
      placeholder,
      coreField,
      fieldId,
      type,
      options,
      pattern,
      isRequired,
      maxSelection,
      maxLength,
      minLength,
      //custom field attributes
      api,
      extra,
    } = field;

    const schemaField = {
      type: 'string',
      title: label,
      coreField,
      fieldId,
      field_type: type,
    };

    if (pattern) {
      schemaField.pattern = String(pattern);
    }
    if (maxSelection) {
      schemaField.maxSelection = parseInt(maxSelection, 10);
    }
    if (maxLength) {
      schemaField.maxLength = parseInt(maxLength, 10);
    }
    if (minLength) {
      schemaField.minLength = parseInt(minLength, 10);
    }
    if (isRequired) {
      schema.required = schema.required || [];
      schema.required.push(name);
    }
    // Handling UI Schema (including hint and placeholder)
    uiSchema[name] = {
      'ui:widget': 'text', // default widget
    };

    if (placeholder) {
      uiSchema[name]['ui:placeholder'] = placeholder;
    }

    if (hint) {
      uiSchema[name]['ui:help'] = hint;
    }

    if (type === 'drop_down' || type === 'radio') {
      schemaField.enum = options.map((opt) => opt.value);
      schemaField.enumNames = options.map((opt) => opt.label);
      uiSchema[name] = { 'ui:widget': type === 'radio' ? 'radio' : 'select' };
    } else if (type === 'checkbox') {
      schemaField.type = 'array';
      schemaField.items = { type: 'string' };
      schemaField.enum = options?.map((opt) => opt.value) || [];
      schemaField.enumNames = options?.map((opt) => opt.label) || [];
      uiSchema[name] = { 'ui:widget': 'checkboxes' };
    } else if (type === 'date') {
      schemaField.format = 'date';
      uiSchema[name] = { 'ui:widget': 'date' };
    } else if (type === 'dateTime') {
      schemaField.format = 'date-time';
      uiSchema[name] = { 'ui:widget': 'dateTime' };
    } else {
      uiSchema[name] = { 'ui:widget': 'text' };
    }

    //Our custom RJSF field attributes
    if (api) {
      schemaField.api = api;
      schemaField.enum = ['select'];
      schemaField.enumNames = ['Select'];
    }

    if (extra) {
      schemaField.extra = extra;
    }

    schema.properties[name] = schemaField;
  });

  return { schema, uiSchema };
}
