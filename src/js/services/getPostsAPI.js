export const getPostsAPI = async () => {
  try {
    const response = await fetch(
      "https://681f2acf72e59f922ef56c3a.mockapi.io/codechronicles/posts"
    );
    return await response.json();
  } catch (error) {
    console.error("Error while triing to get the posts:", error);
    return null; 
  }
};