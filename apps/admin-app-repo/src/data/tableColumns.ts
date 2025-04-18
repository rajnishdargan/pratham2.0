import { store } from "@/store/store";
import { Role } from "@/utils/app.constant";
import { DataType, SortDirection } from "ka-table";

interface ColumnConfig {
  key: string;
  titleKey: string;
  width?: number;
  sortDirection?: SortDirection;
  isSortable?: boolean;
  title?: string;
  dataType?: DataType; // Added dataType field
  style?:any
}
const isActiveYear = store.getState().isActiveYearSelected;

const generateColumns = (t: any, configs: ColumnConfig[], isMobile: boolean) => {
  const newConfigs = configs.map((config) => ({
    key: config.key,
    title: t(config.titleKey).toUpperCase(),
    dataType: config.dataType || DataType.String, // Default to String if not provided
    sortDirection: config.sortDirection,
    width: isMobile && config.width ? config.width : config.width || undefined,
    isSortable: config.isSortable,
  })); 
  return [...newConfigs];
};

export const getUserTableColumns = (t: any, isMobile: boolean, isArchived?:any) => {
 


  const configs: ColumnConfig[] = [
    { key: "name", titleKey: "TABLE_TITLE.NAME", width: 130 },
    { key: "age", titleKey: "TABLE_TITLE.AGE", width: 70 },
    { key: "gender", titleKey: "TABLE_TITLE.GENDER", width: 90 },
    { key: "mobile", titleKey: "TABLE_TITLE.MOBILE", width: 130 },
    { key: "district", titleKey: "TABLE_TITLE.DISTRICT_BLOCK", width: 160 },
    // { key: "blocks", titleKey: "TABLE_TITLE.BLOCK", width: 130},
    { key: "centers", titleKey: "TABLE_TITLE.CENTER", width: 130 },
    { key: "updatedBy", titleKey: "TABLE_TITLE.UPDATED_BY", width: 160 },
    // { key: "createdBy", titleKey: "TABLE_TITLE.CREATED_BY", width: 130, sortDirection: SortDirection.Ascend },
    // { key: "createdAt", titleKey: "TABLE_TITLE.CREATED_DATE", width: 160, sortDirection: SortDirection.Ascend },
    { key: "updatedAt", titleKey: "TABLE_TITLE.UPDATED_DATE", width: 160 },
  ];
  // Conditionally add the "actions" column if isActiveYear is true
  if (isActiveYear && !isArchived) {
    configs.push({
      key: "actions",
      titleKey: "TABLE_TITLE.ACTIONS",
      width: 170,
      isSortable: false,
    });
  }

  return generateColumns(t, configs, isMobile);
};
export const getLearnerTableColumns = (t: any, isMobile: boolean, isArchived?:any) => {
 


  const configs: ColumnConfig[] = [
    { key: "name", titleKey: "TABLE_TITLE.NAME", width: 130 },
    { key: "gender", titleKey: "TABLE_TITLE.GENDER", width: 90 },
    { key: "mobile", titleKey: "TABLE_TITLE.MOBILE", width: 130 },
    { key: "dob", titleKey: "TABLE_TITLE.DOB", width: 130 },

    { key: "district", titleKey: "TABLE_TITLE.DISTRICT_BLOCK", width: 160 },
    // { key: "blocks", titleKey: "TABLE_TITLE.BLOCK", width: 130},
    { key: "centers", titleKey: "TABLE_TITLE.CENTER", width: 130 },
    { key: "updatedBy", titleKey: "TABLE_TITLE.UPDATED_BY", width: 160 },
    // { key: "createdBy", titleKey: "TABLE_TITLE.CREATED_BY", width: 130, sortDirection: SortDirection.Ascend },
    // { key: "createdAt", titleKey: "TABLE_TITLE.CREATED_DATE", width: 160, sortDirection: SortDirection.Ascend },
    { key: "updatedAt", titleKey: "TABLE_TITLE.UPDATED_DATE", width: 160 },
    { key: "updatedAt", titleKey: "TABLE_TITLE.Course", width: 160 },

  ];
  // Conditionally add the "actions" column if isActiveYear is true
  if (isActiveYear && !isArchived) {
    configs.push({
      key: "actions",
      titleKey: "TABLE_TITLE.ACTIONS",
      width: 240,
      isSortable: false,
    });
  }

  return generateColumns(t, configs, isMobile);
};

export const getTLTableColumns = (t: any, isMobile: boolean, isArchived:any) => {

  const configs: ColumnConfig[] = [
    { key: "name", titleKey: "TABLE_TITLE.NAME", width: 130 },
    { key: "age", titleKey: "TABLE_TITLE.AGE", width: 70 },
    { key: "gender", titleKey: "TABLE_TITLE.GENDER", width: 90 },
    { key: "district", titleKey: "TABLE_TITLE.DISTRICT_BLOCK", width: 150 },
    // { key: "blocks", titleKey: "TABLE_TITLE.BLOCK", width: 130 },
    { key: "updatedBy", titleKey: "TABLE_TITLE.UPDATED_BY", width: 130 },
    { key: "createdBy", titleKey: "TABLE_TITLE.CREATED_BY", width: 130 },
    { key: "createdAt", titleKey: "TABLE_TITLE.CREATED_DATE", width: 160 },
    { key: "updatedAt", titleKey: "TABLE_TITLE.UPDATED_DATE", width: 160 },
  ];
  // Conditionally add the "actions" column if isActiveYear is true
  if (isActiveYear && !isArchived) {
    configs.push({
      key: "actions",
      titleKey: "TABLE_TITLE.ACTIONS",
      width: 170,
      isSortable: false,
    });
  }

  return generateColumns(t, configs, isMobile);
};

export const getContentCreatorTableColumns = (t: any, isMobile: boolean, isArchived:any) => {

  const configs: ColumnConfig[] = [
    { key: "name", titleKey: "TABLE_TITLE.NAME", width: 130 },
    { key: "age", titleKey: "TABLE_TITLE.AGE", width: 70 },
    { key: "gender", titleKey: "TABLE_TITLE.GENDER", width: 90 },
    // { key: "blocks", titleKey: "TABLE_TITLE.BLOCK", width: 130 },
    { key: "updatedBy", titleKey: "TABLE_TITLE.UPDATED_BY", width: 130 },
    { key: "createdBy", titleKey: "TABLE_TITLE.CREATED_BY", width: 130 },
    { key: "createdAt", titleKey: "TABLE_TITLE.CREATED_DATE", width: 160 },
    { key: "updatedAt", titleKey: "TABLE_TITLE.UPDATED_DATE", width: 160 },
  ];
  // Conditionally add the "actions" column if isActiveYear is true
  if (isActiveYear && !isArchived) {
    configs.push({
      key: "actions",
      titleKey: "TABLE_TITLE.ACTIONS",
      width: 170,
      isSortable: false,
    });
  }

  return generateColumns(t, configs, isMobile);
};

export const getCenterTableData = (t: any, isMobile: boolean, isArchived:any) => {

  const configs: ColumnConfig[] = [
    { key: "name", titleKey: "TABLE_TITLE.NAME", width: 130 },
    { key: "customFieldValues", titleKey: "TABLE_TITLE.TYPE", width: 130 },
    { key: "updatedBy", titleKey: "TABLE_TITLE.UPDATED_BY", width: 130 },
    // { key: "createdBy", titleKey: "TABLE_TITLE.CREATED_BY", width: 130 },
    { key: "createdAt", titleKey: "TABLE_TITLE.CREATED_DATE", width: 130 },
    { key: "updatedAt", titleKey: "TABLE_TITLE.UPDATED_DATE", width: 130 },

    {
      key: "totalActiveMembers",
      titleKey: "TABLE_TITLE.ACTIVE_LEARNERS",
      width: 130,
    },
    {
      key: "totalArchivedMembers",
      titleKey: "TABLE_TITLE.ARCHIVED_LEARNERS",
      width: 130,
    },
  ];
  // Conditionally add the "actions" column if isActiveYear is true
  if (isActiveYear && !isArchived) {
    configs.push({
      key: "actions",
      titleKey: "TABLE_TITLE.ACTIONS",
      width: 125,
    });
  }
  return generateColumns(t, configs, isMobile);
};

//master data
export const getStateDataMaster = (t: any, isMobile: boolean,  isArchived?:any) => {
  const configs: ColumnConfig[] = [
    {
      key: "label",
      titleKey: "TABLE_TITLE.STATE",
      width: 130,
    },
    { key: "value", titleKey: "TABLE_TITLE.CODE", width: 130 },
    {
      key: "createdBy",
      titleKey: "TABLE_TITLE.CREATED_BY",
      width: 130,
    },
    {
      key: "updatedBy",
      titleKey: t("TABLE_TITLE.UPDATED_BY").toUpperCase(),
      width: 130,
    },
    {
      key: "createdAt",
      titleKey: t("TABLE_TITLE.CREATED_DATE").toUpperCase(),
      width: 130,
    },
    {
      key: "updatedAt",
      titleKey: t("TABLE_TITLE.UPDATED_DATE").toUpperCase(),
      width: 130,
    },
    
  ];
  // if (typeof window !== "undefined" && window.localStorage) {
  //   const adminInfo = localStorage.getItem("adminInfo");
  //   let userInfo;

  //   if (adminInfo && adminInfo !== "undefined") {
  //     userInfo = JSON.parse(adminInfo || "{}");
  //   } 
  // // Conditionally add the "actions" column if isActiveYear is true
  // if (isActiveYear && userInfo?.role===Role.CENTRAL_ADMIN) {
  //   configs.push({
  //     key: "actions",
  //     titleKey: t("TABLE_TITLE.ACTIONS").toUpperCase(),
  //     width: 160,
  //   });
  // }
  // }
  if (typeof window !== "undefined" && window.localStorage) {
    const adminInfo = localStorage.getItem("adminInfo");
    let userInfo;

    if (adminInfo && adminInfo !== "undefined") {
      userInfo = JSON.parse(adminInfo || "{}");
    } 
  // Conditionally add the "actions" column if isActiveYear is true
  if (isActiveYear && userInfo?.role===Role.CENTRAL_ADMIN && !isArchived) {
    configs.push({
      key: "actions",
      titleKey: t("TABLE_TITLE.ACTIONS").toUpperCase(),
      width: 160,
    });
  }
}
return generateColumns(t, configs, isMobile);

};

export const getDistrictTableData = (t: any, isMobile: boolean,  isArchived?:any) => {
  const configs: ColumnConfig[] = [
    {
      key: "label",
      titleKey: t("TABLE_TITLE.DISTRICT").toUpperCase(),
      width: 130,
    },
    { key: "value", titleKey: t("TABLE_TITLE.CODE").toUpperCase(), width: 130 },
    {
      key: "createdBy",
      titleKey: t("TABLE_TITLE.CREATED_BY").toUpperCase(),
      width: 130,
    },
    {
      key: "updatedBy",
      titleKey: t("TABLE_TITLE.UPDATED_BY").toUpperCase(),
      width: 130,
    },
    {
      key: "createdAt",
      titleKey: t("TABLE_TITLE.CREATED_DATE").toUpperCase(),
      width: 130,
    },
    {
      key: "updatedAt",
      titleKey: t("TABLE_TITLE.UPDATED_DATE").toUpperCase(),
      width: 130,
    },
  ];
  if (typeof window !== "undefined" && window.localStorage) {
    const adminInfo = localStorage.getItem("adminInfo");
    let userInfo;

    if (adminInfo && adminInfo !== "undefined") {
      userInfo = JSON.parse(adminInfo || "{}");
    } 
  // Conditionally add the "actions" column if isActiveYear is true
  if (isActiveYear && userInfo?.role===Role.CENTRAL_ADMIN && !isArchived) {
    configs.push({
      key: "actions",
      titleKey: t("TABLE_TITLE.ACTIONS").toUpperCase(),
      width: 160,
    });
  }
  }

  return generateColumns(t, configs, isMobile);
};

export const getBlockTableData = (t: any, isMobile: boolean, isArchived?:any) => {

  const configs: ColumnConfig[] = [
    { key: "name", titleKey: "TABLE_TITLE.BLOCK", width: 130 },
    { key: "code", titleKey: "TABLE_TITLE.CODE", width: 130 },
    {
      key: "createdBy",
      titleKey: "TABLE_TITLE.CREATED_BY",
      width: 130,
    },
    {
      key: "updatedBy",
      titleKey: "TABLE_TITLE.UPDATED_BY",
      width: 130,
    },
    {
      key: "createdAt",
      titleKey: "TABLE_TITLE.CREATED_DATE",
      width: 130,
    },
    {
      key: "updatedAt",
      titleKey: "TABLE_TITLE.UPDATED_DATE",
      width: 130,
    },
  ];
  if (typeof window !== "undefined" && window.localStorage) {
    const adminInfo = localStorage.getItem("adminInfo");
    let userInfo;

    if (adminInfo && adminInfo !== "undefined") {
      userInfo = JSON.parse(adminInfo || "{}");
    } 
  // Conditionally add the "actions" column if isActiveYear is true
  if (isActiveYear && userInfo?.role===Role.CENTRAL_ADMIN && !isArchived ) {
    configs.push({
      key: "actions",
      titleKey: t("TABLE_TITLE.ACTIONS").toUpperCase(),
      width: 160,
    });
  }
  }

  return generateColumns(t, configs, isMobile);
};

export const getNotificationTableData = (t: any, isMobile: boolean, isArchived?:any) => {


  const configs: ColumnConfig[] = [

    { key: 'actionId', titleKey: 'TABLE_TITLE.ID', dataType: DataType.Number, width: 50,  },
    { key: 'title', titleKey: 'TABLE_TITLE.TITLE', dataType: DataType.String, width: 180,  },
    { key: 'key', titleKey: 'TABLE_TITLE.KEY', dataType: DataType.String, width: 180,  },
    { key: 'context', titleKey: 'TABLE_TITLE.CONTEXT',  width: 100, },
    { key: 'status', titleKey: 'TABLE_TITLE.STATUS',  width: 100,  },
    { key: 'templateType', titleKey: 'TABLE_TITLE.TYPE', dataType: DataType.Object, width: 100, style: { textAlign: 'center' } },
    { key: 'actions', titleKey: 'TABLE_TITLE.ACTIONS',  width: 120 }
  ];
 

  return generateColumns(t, configs, isMobile);
};


export const getCoursesTableData = (t: any, isMobile: boolean, isArchived?:any) => {


  const configs: ColumnConfig[] = [

    { key: "name", titleKey: "TABLE_TITLE.NAME", width: 130 },
    { key: 'courseName', titleKey: 'TABLE_TITLE.COURSE_NAME', dataType: DataType.Number, width: 100,  },
    { key: 'courseStatus', titleKey: 'TABLE_TITLE.COURSE_STATUS', dataType: DataType.String, width: 90,  },
    { key: 'issuedDate', titleKey: 'TABLE_TITLE.ISSUED_DATE', dataType: DataType.String, width: 90,  },
     { key: 'userId', titleKey: 'TABLE_TITLE.USER_ID', dataType: DataType.String, width: 180,  },
     { key: 'courseId', titleKey: 'TABLE_TITLE.COURSE_ID', dataType: DataType.String, width: 180,  },
     
     { key: 'actions', titleKey: 'TABLE_TITLE.ACTIONS', dataType: DataType.String, width: 250,  },


];
 

  return generateColumns(t, configs, isMobile);
};
