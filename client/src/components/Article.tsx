import { Grid, Typography } from "@material-ui/core";
import React from "react";
interface Props {
  title: string;
  description: string;
  body: string;
  created: Date;
  author: any;
}
const Article: React.FC<Props> = (props: Props) => {
  const convertDate = (date: Date) => {
    const dateConvert = new Date(date);
    return dateConvert.toDateString();
  };
  return (
    <Grid
      item
      container
      xs={8}
      sm={8}
      md={8}
      lg={8}
      xl={8}
      className="article"
      spacing={2}
    >
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="title"
      >
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="caption">
          {`by ${props.author.username} - at ${convertDate(props.created)}`}
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="description"
      >
        <Typography>{props.description}</Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="body"
      >
        <Typography variant="body1">{props.body}</Typography>
      </Grid>
    </Grid>
  );
};
export default Article;
