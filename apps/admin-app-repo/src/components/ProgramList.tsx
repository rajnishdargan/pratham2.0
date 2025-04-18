import HeaderComponent from "@/components/HeaderComponent";

import { Numbers, Role, SORT, Status } from "@/utils/app.constant";
import { transformLabel } from "@/utils/Helper";
import {
  Box,
  Container,
  Grid,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Theme } from "@mui/system";
import Loader from "@/components/Loader";
import useStore from "@/store/store";
import ProgramCard from "./ProgramCard";
import { getProgramList, programSearch } from "@/services/ProgramServices";
import loginImg from "../../public/images/login-image.jpg";
import AddProgram from "./AddProgram";
import useSubmittedButtonStore from "@/utils/useSharedState";
import {  limit } from "@/utils/app.constant";

interface Program {
  tenantId: string;
  name?: string;
  domain?: string | null;
  createdAt?: string;
  updatedAt?: string;
  params?: any;
  programImages?: string[] | null;
  description?: string | null;
  status?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
  role?: { roleId: string; name: string; code: string }[];
}
const ProgramList: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<[string, string]>(["name", "asc"]);
  const [selectedSort, setSelectedSort] = useState("Sort");
  const store = useStore();
  const isActiveYear = store.isActiveYearSelected;
  const [userRole, setUserRole] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [openAddNewProgram, setOpenAddNewProgram] =
    React.useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusValue, setStatusValue] = useState(Status.PUBLISHED);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const fetchPrograms = useSubmittedButtonStore(
    (state: any) => state.fetchPrograms
  );
  const setIsArchived = useSubmittedButtonStore(
    (state: any) => state.setIsArchived
  );
  useEffect(() => {
    const storedUserData = localStorage.getItem("adminInfo");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserRole(userData.role);
    }
  }, []);
  useEffect(() => {
    const fetchProgramList = async () => {
      try {
        setLoading(true)

        let programListObject ;
        if(statusValue===Status.PUBLISHED){
          programListObject = {
            limit,
            offset: 0,
          filters: {
            status: [Status.PUBLISHED],
          },
          };
        }
      else if(statusValue===Status.DRAFT){
          programListObject = {
            limit,
            offset: 0,
          filters: {
            status: [Status.DRAFT],
          },
          };
        }
        else
        {
          programListObject = {
            limit,
            offset: 0,
          filters: {
            status: ["archived"],
          },
          };
        }
        
        const result=await programSearch(programListObject);
        // const result = await getProgramList();
        console.log("result", result?.result);
        
        // Format the program list based on the searchKeyword
        const programSummaries = result?.getTenantDetails?.map((program: any) => ({
          name: program.name,
          domain: program.domain,
          status: program.status,
          description: program.description,
          programImages: program.programImages || ["No image available"],
          tenantId:program.tenantId
        }))
        .filter((program: any) => 
          program.name.toLowerCase().includes(searchKeyword.toLowerCase()) 
        
        );
  
        const sortedProgramSummaries = programSummaries.sort((a: any, b: any) => {
          if (selectedSort === "A-Z") {
            return a.name.localeCompare(b.name);  
          } else if (selectedSort === "Z-A") {
            return b.name.localeCompare(a.name);  
          }
          return a.name.localeCompare(b.name);
                });
        
        setPrograms(sortedProgramSummaries);
        setFilteredPrograms(sortedProgramSummaries);
        setLoading(false)

      } catch (error) {
        setPrograms([])
        setFilteredPrograms([]);
        setLoading(false)
        console.error("Error fetching program list:", error);
      }
    };
  
    fetchProgramList();
  }, [statusValue, fetchPrograms, searchKeyword]);  
   
  useEffect(() => {

   const  programSummaries = programs.filter((program: any) => 
    program.name.toLowerCase().includes(searchKeyword.toLowerCase()) 
  );

  const sortedProgramSummaries = programSummaries.sort((a: any, b: any) => {
    if (selectedSort === "A-Z") {
      return a.name.localeCompare(b.name);  
    } else if (selectedSort === "Z-A") {
      return b.name.localeCompare(a.name);  
    }
    return 0;  
  });
  
  setFilteredPrograms(sortedProgramSummaries);
    
  }, [ selectedSort,  searchKeyword, programs]);  
  const handleFilterChange = async (
    event: React.SyntheticEvent,
    newValue: any
  ) => {
    setStatusValue(newValue);
    if (newValue === Status.PUBLISHED) { 
     
      setIsArchived(false);
    } else if (newValue === Status.ARCHIVED) {
      
      setIsArchived(true);
    } else {
      setIsArchived(false);
  }};

  const handleDelete = (rowData: any) => {};
  
  const handleSortChange = async (event: SelectChangeEvent) => {
    const sortOrder =
      event.target.value === "Z-A" ? SORT.DESCENDING : SORT.ASCENDING;
    setSortBy(["name", sortOrder]);
    setSelectedSort(event.target.value);
  };
  const handleConfirmDelete = async () => {};
  const handleSearch = (keyword: string) => {
     setSearchKeyword(keyword);
  };
  const handleAddProgramClick = () => {
    setOpenAddNewProgram(true);

  };
  const handleCloseAddProgram = () => {
    setOpenAddNewProgram(false);
   // setSubmittedButtonStatus(false);

  };
  return (
    <>
      <HeaderComponent
        userType={t("PROGRAM_MANAGEMENT.PROGRAMS")}
        searchPlaceHolder={t("PROGRAM_MANAGEMENT.SEARCH_PROGRAM")}
        showStateDropdown={false}
        handleSortChange={handleSortChange}
        showAddNew={!!isActiveYear && userRole === Role.CENTRAL_ADMIN}
        showSort={true}
        shouldFetchDistricts={false}
        selectedSort={selectedSort}
        showFilter={true}
        statusValue={statusValue}
        handleSearch={handleSearch}
        handleAddUserClick={handleAddProgramClick}
        handleDelete={handleDelete}
        handleFilterChange={handleFilterChange} 
        isProgramPage={true}
      >
         {loading ? (
            <Box
              width={"100%"}
              id="check"
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Loader showBackdrop={false} loadingText={t("COMMON.LOADING")} />
            </Box>
          ) :
       ( <Box sx={{py: 2, px: 2 }}>
            <Grid container spacing={3} >
              {filteredPrograms?.map((program: any) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={program.tenantId}>

                  <ProgramCard
                    programId={program.tenantId}
                    programName={program.name}
                    description={program.description}
                    // domain={program.domain}
                    status={program.status}
                    imageUrl={program.programImages || loginImg}
                    userRole={userRole}
                  />
                </Grid>
              ))}
              {filteredPrograms.length === 0 && (<Typography ml="40%">
                {t("PROGRAM_MANAGEMENT.NO_PROGRAMS_FOUND")}
              </Typography>)
              }
            </Grid>
       </Box>)
}
      </HeaderComponent>
      <AddProgram
            open={openAddNewProgram}
            onClose={handleCloseAddProgram}
         
          />
    </>
  );
};
export default ProgramList;
