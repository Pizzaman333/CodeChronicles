export const addPostAPI = async (psotData) => {
  try {
    const response = await fetch(
      "https://681f2acf72e59f922ef56c3a.mockapi.io/codechronicles/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(psotData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Помилка при додаванні поста:", error);
    return null;
  }
};
