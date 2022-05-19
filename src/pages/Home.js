// React
import { useState } from "react";

// Data
import { projectsData } from "../db/data/dev-data/index";

// Components
import ScrollButton from "../components/ScrollButton";
import ProjectScroll from "../components/ProjectScroll";
import ProjectArticle from "../components/ProjectArticle";

function Home() {
  const [value, setValue] = useState(0);

  return (
    <main>
      <ScrollButton />
      <ProjectScroll projectsData={projectsData} value={value} setValue={setValue} />
      <ProjectArticle projectsData={projectsData} value={value} />
    </main>
  );
}

export default Home;
