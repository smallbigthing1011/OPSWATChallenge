import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { REACT_APP_API_ENPOINT } from "../endpoint";

interface Props {}
interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
const CreateAcrticle: React.FC<Props> = () => {
  const cookieData: string = document.cookie;
  const token: string = cookieData.split("=")[1];
  const [article, setArticle] = useState<Article>({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  const handleCreateArticle = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const newArticleData = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(article),
      })
    ).json();
    if (!newArticleData.message) {
      const articleInfo = { ...article };
      articleInfo.title = "";
      articleInfo.description = "";
      articleInfo.body = "";
      setArticle(articleInfo);
      console.log(newArticleData);
      window.location.reload();
    }
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const articleInfo = { ...article };
    articleInfo.title = event.target.value;
    setArticle(articleInfo);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const articleInfo = { ...article };
    articleInfo.description = event.target.value;
    setArticle(articleInfo);
  };
  const handleChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    const articleInfo = { ...article };
    articleInfo.body = event.target.value;
    setArticle(articleInfo);
  };
  return (
    <div>
      <form className="article-form" onSubmit={handleCreateArticle}>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          xl={8}
          container
          spacing={1}
          justify="center"
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h5" align="center">
              Article
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography>Title</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChangeTitle}
              value={article.title}
              required
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography>Description</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChangeDescription}
              value={article.description}
              required
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography>Body</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChangeBody}
              value={article.body}
              required
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button variant="text" type="submit">
              Save Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default CreateAcrticle;
