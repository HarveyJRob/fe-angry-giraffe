// React
import React from "react";

// React Player
import ReactPlayer from "react-player/lazy";

// MUI
import GitHubIcon from "@mui/icons-material/GitHub";
import PublishIcon from "@mui/icons-material/Publish";

import { Avatar, Typography, Divider, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";

// Components
import ChipArray from "./ChipsArray";

function ProjectArticle({ projectsData, value }) {
  return (
    <div className="articleContainer">
      <article>
        <Typography variant="h2" sx={{ m: 2, fontWeight: "bold", fontSize: "24px", textAlign: "center" }}>
          {projectsData[value].title}
        </Typography>

        <Divider>
          {projectsData[value].created_at.toLocaleDateString("en-uk", { year: "numeric", month: "short" })}
        </Divider>

        <ChipArray input={projectsData[value].contributors} />

        <p>{projectsData[value].body}</p>

        {projectsData[value].video && (
          <div className="articleContainer-video">
            <ReactPlayer url={projectsData[value].video} width="100%" height="100%" />
          </div>
        )}

        <List>
          {projectsData[value].repo.length > 0 && (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GitHubIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText>
                <a target="_blank" rel="noreferrer" href={projectsData[value].repo}>
                  Repository
                </a>
              </ListItemText>
            </ListItem>
          )}
          {projectsData[value].hosted.length > 0 && (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PublishIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText>
                <a target="_blank" rel="noreferrer" href={projectsData[value].hosted}>
                  Hosted version
                </a>
              </ListItemText>
            </ListItem>
          )}
        </List>
        <Divider sx={{ margin: 1 }}>Tech Stack</Divider>

        <ChipArray input={projectsData[value].frontend} />
        <ChipArray input={projectsData[value].backend} />
        <ChipArray input={projectsData[value].testing} />
        <ChipArray input={projectsData[value].versionControl} />
        <ChipArray input={projectsData[value].codeQuality} />
      </article>
    </div>
  );
}

export default ProjectArticle;
