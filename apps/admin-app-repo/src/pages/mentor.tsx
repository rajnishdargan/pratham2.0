// @ts-nocheck
import React, { useState, useEffect } from 'react';
import DynamicForm from '@/components/DynamicForm/DynamicForm';
import Loader from '@/components/Loader';
import { useTranslation } from 'react-i18next';
import {
  MentorSearchSchema,
  MentorSearchUISchema,
} from '../constant/Forms/MentorSearch';
import { Status } from '@/utils/app.constant';
import { userList } from '@/services/UserList';
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import PaginatedTable from '@/components/PaginatedTable/PaginatedTable';
import { Button } from '@mui/material';
import SimpleModal from '@/components/SimpleModal';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { updateCohortMemberStatus } from '@/services/CohortService/cohortService';
import editIcon from '../../public/images/editIcon.svg';
import deleteIcon from '../../public/images/deleteIcon.svg';
import Image from 'next/image';
import {
  extractMatchingKeys,
  fetchForm,
  searchListData,
} from '@/components/DynamicForm/DynamicFormCallback';
import { FormContext } from '@/components/DynamicForm/DynamicFormConstant';
import AddEditUser from '@/components/EntityForms/AddEditUser/AddEditUser';
import GenericDeleteModal from '@/components/GenericDeleteModal';
import DeleteDetails from '@/components/DeleteDetails';

//import { DynamicForm } from '@shared-lib';

const Mentor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [schema, setSchema] = useState(MentorSearchSchema);
  const [uiSchema, setUiSchema] = useState(MentorSearchUISchema);
  const [addSchema, setAddSchema] = useState(null);
  const [addUiSchema, setAddUiSchema] = useState(null);
  const [prefilledAddFormData, setPrefilledAddFormData] = useState({});
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [prefilledFormData, setPrefilledFormData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableUserId, setEditableUserId] = useState('');
  const [roleId, setRoleID] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [village, setVillage] = useState('');
  const [reason, setReason] = useState("");


  const { t, i18n } = useTranslation();
  const initialFormData = localStorage.getItem('stateId')
    ? { state: localStorage.getItem('stateId') }
    : {};

  useEffect(() => {
    if (response?.result?.totalCount !== 0) {
      searchData(prefilledFormData, 0);
    }
  }, [pageLimit]);
  useEffect(() => {
    // Fetch form schema from API and set it in state.
    const fetchData = async () => {
      const responseForm = await fetchForm([
        {
          fetchUrl: `${process.env.NEXT_PUBLIC_MIDDLEWARE_URL}/form/read?context=${FormContext.mentor.context}&contextType=${FormContext.mentor.contextType}`,
          header: {},
        },
        {
          fetchUrl: `${process.env.NEXT_PUBLIC_MIDDLEWARE_URL}/form/read?context=${FormContext.mentor.context}&contextType=${FormContext.mentor.contextType}`,
          header: {
            tenantid: localStorage.getItem('tenantId'),
          },
        },
      ]);
      console.log('responseForm', responseForm);
      setAddSchema(responseForm?.schema);
      setAddUiSchema(responseForm?.uiSchema);
    };

    setPrefilledAddFormData(initialFormData);
    setPrefilledFormData(initialFormData);
    setRoleID(localStorage.getItem('roleId'));
    setTenantId(localStorage.getItem('tenantId'));
    fetchData();
  }, []);

  const updatedUiSchema = {
    ...uiSchema,
    'ui:submitButtonOptions': {
      norender: true, // Hide submit button if isHide is true
    },
  };

  const SubmitaFunction = async (formData: any) => {
    setPrefilledFormData(formData);
    await searchData(formData, 0);
  };

  const searchData = async (formData: any, newPage: any) => {
    const staticFilter = { role: 'Instructor', status: 'active' };

    const { sortBy } = formData;
    const staticSort = ['firstName', sortBy || 'asc'];
    await searchListData(
      formData,
      newPage,
      staticFilter,
      pageLimit,
      setPageOffset,
      setCurrentPage,
      setResponse,
      userList,
      staticSort
    );
  };

  // Define table columns
  const columns = [
    {
      keys: ['firstName', 'middleName', 'lastName'],
      label: 'Mentor Name',
      render: (row: any) =>
        `${row.firstName || ''} ${row.middleName || ''} ${
          row.lastName || ''
        }`.trim(),
    },
    {
      key: 'status',
      label: 'Status',
      getStyle: (row: any) => ({
        color: row.status === 'active' ? 'green' : 'red',
      }),
    },
    // {
    //   key: 'STATE',
    //   label: 'State',
    //   render: (row) => {
    //     const state =
    //       row.customFields.find((field) => field.label === 'STATE')
    //         ?.selectedValues[0]?.value || '-';
    //     return `${state}`;
    //   },
    // },
    {
      keys: ['STATE', 'DISTRICT', 'BLOCK', 'VILLAGE'],
      label: 'Location (State / District / Block/ Village)',
      render: (row: any) => {
        const state =
          row.customFields.find(
            (field: { label: string }) => field.label === 'STATE'
          )?.selectedValues[0]?.value || '';
        const district =
          row.customFields.find(
            (field: { label: string }) => field.label === 'DISTRICT'
          )?.selectedValues[0]?.value || '';
        const block =
          row.customFields.find(
            (field: { label: string }) => field.label === 'BLOCK'
          )?.selectedValues[0]?.value || '';
        const village =
          row.customFields.find(
            (field: { label: string }) => field.label === 'VILLAGE'
          )?.selectedValues[0]?.value || '';
        return `${state == '' ? '' : `${state}`}${
          district == '' ? '' : `, ${district}`
        }${block == '' ? '' : `, ${block}`}${
          village == '' ? '' : `, ${village}`
        }`;
      },
    },
  ];

  // Define actions
  const actions = [
    {
      icon: (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: 'rgb(227, 234, 240)',
            padding: '10px',
          }}
        >
          <Image src={editIcon} alt="" />
        </Box>
      ),
      callback: (row: any) => {
        console.log('row:', row);
        console.log('AddSchema', addSchema);
        console.log('AddUISchema', addUiSchema);

        let tempFormData = extractMatchingKeys(row, addSchema);
        // console.log('tempFormData', tempFormData);
        setPrefilledAddFormData(tempFormData);
        setIsEdit(true);
        setEditableUserId(row?.userId);
        handleOpenModal();
      },
    },
    {
      icon: (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: 'rgb(227, 234, 240)',
            padding: '10px',
          }}
        >
          {' '}
          <Image src={deleteIcon} alt="" />
        </Box>
      ),
      callback: async (row) => {
        const findVillage = row?.customFields.find((item) => {
          if (item.label === 'VILLAGE') {
            return item;
          }
        });

        setVillage(findVillage?.selectedValues[0]?.value);
        // console.log('row:', row?.customFields[2].selectedValues[0].value);
        setEditableUserId(row?.userId);
        // const memberStatus = Status.ARCHIVED;
        // const statusReason = '';
        // const membershipId = row?.userId;

        // const response = await updateCohortMemberStatus({
        //   memberStatus,
        //   statusReason,
        //   membershipId,
        // });
        // setPrefilledFormData({});
        // searchData(prefilledFormData, currentPage);
        setOpen(true);
        setFirstName(row?.firstName);
        setLastName(row?.lastName);
      },
    },
  ];

  // Pagination handlers
  const handlePageChange = (newPage: any) => {
    console.log('Page changed to:', newPage);
    searchData(prefilledFormData, newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: any) => {
    console.log('Rows per page changed to:', newRowsPerPage);
    setPageLimit(newRowsPerPage);
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //Add Edit Props
  const extraFieldsUpdate = {};
  const extraFields = {
    tenantCohortRoleMapping: [
      {
        tenantId: tenantId,
        roleId: roleId,
      },
    ],
    username: 'youthnetmentor',
    password: Math.floor(10000 + Math.random() * 90000),
  };
  const successUpdateMessage = 'MENTORS.MENTOR_UPDATED_SUCCESSFULLY';
  const telemetryUpdateKey = 'youthnet-mentor-updated-successfully';
  const failureUpdateMessage = 'MENTORS.NOT_ABLE_UPDATE_MENTOR';
  const successCreateMessage = 'MENTORS.MENTOR_CREATED_SUCCESSFULLY';
  const telemetryCreateKey = 'youthnet-mentor-created-successfully';
  const failureCreateMessage = 'MENTORS.NOT_ABLE_CREATE_MENTOR';
  const notificationKey = 'onMentorCreate';
  const notificationMessage = 'MENTORS.USER_CREDENTIALS_WILL_BE_SEND_SOON';
  const notificationContext = 'USER';

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        {isLoading ? (
          <Loader showBackdrop={false} loadingText={t('COMMON.LOADING')} />
        ) : (
          schema &&
          uiSchema && (
            <DynamicForm
              schema={schema}
              uiSchema={updatedUiSchema}
              SubmitaFunction={SubmitaFunction}
              isCallSubmitInHandle={true}
              prefilledFormData={prefilledFormData}
            />
          )
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setPrefilledAddFormData(initialFormData);
              setIsEdit(false);
              setEditableUserId('');
              handleOpenModal();
            }}
          >
            {t('COMMON.ADD_NEW')}{' '}
          </Button>
        </Box>

        <SimpleModal
          open={openModal}
          onClose={handleCloseModal}
          showFooter={false}
          modalTitle={
            isEdit ? t('MENTORS.UPDATE_MENTOR') : t('MENTORS.NEW_MENTOR')
          }
        >
          <AddEditUser
            SuccessCallback={() => {
              setPrefilledFormData({});
              searchData({}, 0);
              setOpenModal(false);
            }}
            schema={addSchema}
            uiSchema={addUiSchema}
            editPrefilledFormData={prefilledAddFormData}
            isEdit={isEdit}
            editableUserId={editableUserId}
            UpdateSuccessCallback={() => {
              setPrefilledFormData({});
              searchData(prefilledFormData, currentPage);
              setOpenModal(false);
            }}
            extraFields={extraFields}
            extraFieldsUpdate={extraFieldsUpdate}
            successUpdateMessage={successUpdateMessage}
            telemetryUpdateKey={telemetryUpdateKey}
            failureUpdateMessage={failureUpdateMessage}
            successCreateMessage={successCreateMessage}
            telemetryCreateKey={telemetryCreateKey}
            failureCreateMessage={failureCreateMessage}
            notificationKey={notificationKey}
            notificationMessage={notificationMessage}
            notificationContext={notificationContext}
          />
        </SimpleModal>

        {response && response?.result?.getUserDetails ? (
          <Box sx={{ mt: 1 }}>
            <PaginatedTable
              count={response?.result?.totalCount}
              data={response?.result?.getUserDetails}
              columns={columns}
              actions={actions}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              defaultPage={currentPage}
              defaultRowsPerPage={pageLimit}
            />
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="20vh"
          >
            <Typography marginTop="10px" textAlign={'center'}>
              {t('COMMON.NO_MENTOR_FOUND')}
            </Typography>
          </Box>
        )}
      </Box>
      <GenericDeleteModal
        checked={checked}
        open={open}
        onClose={() => setOpen(false)}
        title="Delete User Permanently"
        primary={'Delete User'}
        secondary={'Cancel'}
        reason={reason}
      >
        <DeleteDetails
          firstName={firstName}
          lastName={lastName}
          village={village}
          checked={checked}
          setChecked={setChecked}
          reason={reason}
          setReason={setReason}
        />
      </GenericDeleteModal>
    </>
  );
};
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Mentor;
