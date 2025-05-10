export const deletePostAPI = async (postId) => {
  try {
    const response = await fetch(
      `https://681f2acf72e59f922ef56c3a.mockapi.io/codechronicles/posts/${postId}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Помилка при видаленні поста:", error);
    return null;
  }
};
