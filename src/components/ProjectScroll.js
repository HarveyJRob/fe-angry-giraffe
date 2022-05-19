// React
import { useEffect, useRef, useState } from "react";

// MUI
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar, Stack, Button } from "@mui/material";

// Components
import ComboBox from "./AutoComplete";

function ProjectScroll({ projectsData, value, setValue }) {
  const [combined, setCombined] = useState([]);
  const [filter, setFilter] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    let contributors = [];
    let frontend = [];
    let backend = [];
    let testing = [];
    let versionControl = [];
    let codeQuality = [];
    let themes = [];

    projectsData.map((project) => {
      contributors = [...contributors, ...project.contributors];
      frontend = [...frontend, ...project.frontend];
      backend = [...backend, ...project.backend];
      testing = [...testing, ...project.testing];
      versionControl = [...versionControl, ...project.versionControl];
      codeQuality = [...codeQuality, ...project.codeQuality];
      themes = [...themes, ...project.themes];
    });

    setCombined([
      ...[...new Set(contributors)].map((item) => {
        return { label: item, cat: "contributors" };
      }),
      ...[...new Set(frontend)].map((item) => {
        return { label: item, cat: "frontend" };
      }),
      ...[...new Set(backend)].map((item) => {
        return { label: item, cat: "backend" };
      }),
      ...[...new Set(testing)].map((item) => {
        return { label: item, cat: "testing" };
      }),
    ]);
  }, [projectsData]);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const handleClick = (index) => {
    setValue(index);
  };

  return (
    <>
      <div className="container" ref={ref}>
        {projectsData.map((project, index) => {
          if (
            filter.length === 0 ||
            project.contributors.filter((x) => filter.includes(x)).length > 0 ||
            project.frontend.filter((x) => filter.includes(x)).length > 0 ||
            project.backend.filter((x) => filter.includes(x)).length > 0 ||
            project.testing.filter((x) => filter.includes(x)).length > 0 ||
            project.versionControl.filter((x) => filter.includes(x)).length > 0 ||
            project.codeQuality.filter((x) => filter.includes(x)).length > 0 ||
            project.themes.filter((x) => filter.includes(x)).length > 0
          ) {
            return (
              <div key={project.title} className="flex-item">
                <Button onClick={() => handleClick(index)}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ boxShadow: index === value ? "5px 5px 8px #2c3337" : "0px 0px" }}
                  />
                </Button>
              </div>
            );
          }
        })}
      </div>

      <Stack
        direction="row"
        justifyContent="space-between"
        marginTop="20px"
        marginLeft="40px"
        marginRight="40px"
        sx={{ flexWrap: "nowrap" }}
      >
        <Avatar
          sx={{
            backgroundColor: "#aaa8a6",
            "&:hover": { backgroundColor: "#797776" },
            border: "1px solid #f4d504",
            boxShadow: "5px 5px 8px #2c3337",
          }}
        >
          <ChevronLeftIcon sx={{ color: "#000000" }} onClick={() => scroll(-370)} />
        </Avatar>

        <ComboBox techOptions={combined} setFilter={setFilter} filters={filter} />

        <Avatar
          sx={{
            backgroundColor: "#aaa8a6",
            "&:hover": { backgroundColor: "#797776" },
            border: "1px solid #f4d504",
            boxShadow: "5px 5px 8px #2c3337",
          }}
        >
          <ChevronRightIcon sx={{ color: "#000000" }} onClick={() => scroll(370)} />
        </Avatar>
      </Stack>
    </>
  );
}

export default ProjectScroll;
