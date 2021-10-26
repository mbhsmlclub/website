const allLectures = require.context(
  '!babel-loader!mdx-loader!lectures',
  true,
  /\.mdx$/,
  'lazy'
);

const lectures = allLectures.keys().reverse().map(async filePath => {
  const module = await allLectures(filePath);

  return {
    content: module.default,
    ...module.frontMatter,
  };
});

export default lectures;
