import React, { createContext, useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageLayout from 'components/PageLayout';
import Post from './Post';
import PostList from './PostList';
import NotFound from 'pages/NotFound';
import fetchPosts from 'posts';

const BlogContext = createContext({});

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const grabPosts = async () => {
      const postData = await Promise.all(fetchPosts);
      setPosts(postData);
    };

    grabPosts();
  }, []);

  return (
    <PageLayout>
      <BlogContext.Provider value={{ posts }}>
        <Suspense>
          <Switch>
            {posts?.map(({ slug, ...rest }) => (
              <Route
                exact
                key={slug}
                path={`/blog/${slug}`}
                render={() => <Post slug={slug} {...rest} />}
              />
            ))}
            <Route exact render={() => <PostList posts={posts} />} path="/blog" />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BlogContext.Provider>
    </PageLayout>
  );
};

export default Blog;
