export const BatchSearchSchema = {
  type: 'object',
  properties: {
    state: {
      type: 'array',
      title: 'State',
      items: {
        type: 'string',
        enum: ['Select'],
        enumNames: ['Select'],
      },
      api: {
        url: `${process.env.NEXT_PUBLIC_MIDDLEWARE_URL}/fields/options/read`,
        method: 'POST',
        payload: { fieldName: 'state', sort: ['state_name', 'asc'] },
        options: {
          optionObj: 'result.values',
          label: 'label',
          value: 'value',
        },
        callType: 'initial',
      },
      //for multiselect
      uniqueItems: true,
      isMultiSelect: true,
      maxSelections: 1000,
    },
    district: {
      type: 'array',
      title: 'District',
      items: {
        type: 'string',
        enum: ['Select'],
        enumNames: ['Select'],
      },
      api: {
        url: `${process.env.NEXT_PUBLIC_MIDDLEWARE_URL}/fields/options/read`,
        method: 'POST',
        payload: {
          fieldName: 'district',
          controllingfieldfk: '**',
          sort: ['district_name', 'asc'],
        },
        options: {
          optionObj: 'result.values',
          label: 'label',
          value: 'value',
        },
        callType: 'dependent',
        dependent: 'state',
      },
      //for multiselect
      uniqueItems: true,
      isMultiSelect: true,
      maxSelections: 1000,
    },
    block: {
      type: 'array',
      title: 'Block',
      items: {
        type: 'string',
        enum: ['Select'],
        enumNames: ['Select'],
      },
      api: {
        url: `${process.env.NEXT_PUBLIC_MIDDLEWARE_URL}/fields/options/read`,
        method: 'POST',
        payload: {
          fieldName: 'block',
          controllingfieldfk: '**',
          sort: ['block_name', 'asc'],
        },
        options: {
          optionObj: 'result.values',
          label: 'label',
          value: 'value',
        },
        callType: 'dependent',
        dependent: 'district',
      },
      //for multiselect
      uniqueItems: true,
      isMultiSelect: true,
      maxSelections: 1000,
    },
    village: {
      type: 'array',
      title: 'Village',
      items: {
        type: 'string',
        enum: ['Select'],
        enumNames: ['Select'],
      },
      api: {
        url: `${process.env.NEXT_PUBLIC_MIDDLEWARE_URL}/fields/options/read`,
        method: 'POST',
        payload: {
          fieldName: 'village',
          controllingfieldfk: '**',
          sort: ['village_name', 'asc'],
        },
        options: {
          optionObj: 'result.values',
          label: 'label',
          value: 'value',
        },
        callType: 'dependent',
        dependent: 'block',
      },
      //for multiselect
      uniqueItems: true,
      isMultiSelect: true,
      maxSelections: 1000,
    },
    center: {
      type: 'string',
      title: 'CENTER',
      coreField: 0,
      fieldId: 'a7cf7617-79cd-455a-a9f6-6b00fe0a8eca',
      field_type: 'drop_down',
      enum: ['select'],
      enumNames: ['Select'],
      api: {
        url: 'https://dev-interface.prathamdigital.org/interface/v1/cohort/search',
        header: {
          tenantId: '**',
          Authorization: '**',
          academicyearid: '**',
        },
        method: 'POST',
        options: {
          label: 'label',
          value: 'value',
          optionObj: 'result.values',
        },
        payload: {
          limit: '**',
          offset: '**',
          filters: {
            status: ['active'],
          },
        },
        callType: 'initial',
      },
    },
    name: {
      type: 'string',
      title: 'Search Key',
      // description: 'Search for a specific user or entity',
    },
    sortBy: {
      type: 'string',
      title: 'Sort By',
      enum: ['asc', 'desc'],
      enumNames: ['A-Z', 'Z-A'],
    },
  },
};

export const BatchSearchUISchema = {
  'ui:order': ['state', 'district', 'block', 'village', 'searchKey', 'sortBy'],

  state: {
    'ui:widget': 'select',
  },

  district: {
    'ui:widget': 'select',
  },

  block: {
    'ui:widget': 'select',
  },

  village: {
    'ui:widget': 'select',
  },

  searchKey: {
    'ui:widget': 'text',
  },

  sortBy: {
    'ui:widget': 'select',
  },
};
