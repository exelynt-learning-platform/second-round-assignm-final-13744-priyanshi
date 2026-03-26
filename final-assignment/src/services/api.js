export const sendMessageAPI = async (message) => {
  try {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (message.toLowerCase().includes("error")) {
          reject(new Error("Simulated API error"));
        }

        resolve({
          data: {
            choices: [
              {
                message: {
                  content: `AI Response: ${message}`,
                },
              },
            ],
          },
        });
      }, 1000);
    }).then((res) => {
      return res.data.choices[0].message.content;
    });

  } catch (error) {
    if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};