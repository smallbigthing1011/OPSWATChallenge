import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Article, CreateArticle, Navbar } from "../components";
import { REACT_APP_API_ENPOINT } from "../endpoint";
interface Props {}

const ArticlesList: React.FC<Props> = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const cookieData: string = document.cookie;
  const token: string = cookieData.split("=")[1];
  const fetchArticlesData = async () => {
    setLoading(true);
    const articlesData = await (
      await fetch(`${REACT_APP_API_ENPOINT}/api/articles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
    ).json();
    if (!articlesData.message) {
      setArticles(articlesData.articles);

      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticlesData();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <Container maxWidth="md">
        <Grid container justify="center">
          <Grid
            item
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            className="article-form-wrap"
          >
            <CreateArticle></CreateArticle>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            container
            justify="center"
            spacing={4}
            className="articles-wrap"
          >
            {articles.length === 0
              ? "No articles yet..."
              : articles.map((item: any) => {
                  return (
                    <Article
                      title={item.title}
                      description={item.description}
                      body={item.body}
                      created={item.created}
                      author={item.author}
                    ></Article>
                  );
                })}
          </Grid>
        </Grid>
        <Grid container justify="center"></Grid>
      </Container>
    </div>
  );
};
export default ArticlesList;
