export const updatePostAPI = async (id, updatedData) => {
  try {
    const response = await fetch(
      `https://681f2acf72e59f922ef56c3a.mockapi.io/codechronicles/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Помилка при оновленні поста:", error);
    return null;
  }
};
