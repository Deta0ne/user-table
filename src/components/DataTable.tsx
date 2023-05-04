import React, { useState } from "react";
import { Box, Stack, Paper, Button, Typography } from "@mui/material";
import Vector from "../assets/Button.png";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import AddIcon from "@mui/icons-material/Add";

const DataTable = () => {
  //Tab and role filter
  const [tabValue, setTabValue] = useState("all");
  return (
    <>
      <Paper>
        <Stack direction={"row"}>
          <Button
            variant="text"
            sx={{
              background: `url(${Vector})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <Typography>Users</Typography>
          <TabContext value={tabValue}>
            <TabList>
              <Tab label="All" value="all" />
              <Tab label="Contributor" value="contributor" />
              <Tab label="Author" value="author" />
              <Tab label="Administrator" value="administrator" />
              <Tab label="Subscriber" value="subscriber" />
            </TabList>
          </TabContext>
          <Button variant="contained" size="small">
            Add New User
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default DataTable;
