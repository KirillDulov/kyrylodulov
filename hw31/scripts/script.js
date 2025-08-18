// завдання 1
async function getData(segment) {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  try {
    const response = await fetch(`${baseURL}${segment}`);
    if (!response.ok) {
      console.error(`Помилка: статус ${response.status}`);
      return response.status;
    }
    const data = await response.json();
    console.log("Отримані дані:", data);
    return data;
  } catch (error) {
    console.error("Помилка виконання запиту:", error.message);
    return error.message;
  }
}
getData("/posts");
getData("/posts/1");

// завдання 2
async function postData(segment, data) {
  const baseURL1 = "https://jsonplaceholder.typicode.com";

  try {
    const response = await fetch(`${baseURL1}${segment}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorMsg = `Помилка: статус ${response.status}`;
      console.error(errorMsg);
      return errorMsg;
    }

    const result = await response.json();
    console.log("Результат:", result);
    return result;

  } catch (error) {
    console.error("Помилка виконання POST-запиту:", error.message);
    return error.message;
  }
}
postData("/posts", {
  title: "Hello",
  body: "Це тестовий пост",
  userId: 1
});

// завдання 3
async function putData(id, data) {
  const baseUrl2 = "https://jsonplaceholder.typicode.com/posts";

  try {
    const response = await fetch(`${baseUrl2}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorMsg1 = `Помилка: статус ${response.status}`;
      console.error(errorMsg1);
      return errorMsg1;
    }

    const result = await response.json();
    console.log("Результат:", result);
    return result;


  } catch (error) {
    console.error("Помилка виконання PUT-запиту:", error.message);
    return error.message;
  }
}

putData(1, {
  id: 1,
  title: "Оновлений заголовок",
  body: "Оновлений текст поста",
  userId: 1
});

// завдання 4
async function patchData(id, data) {
  const baseUrl4 = "https://jsonplaceholder.typicode.com/posts"
  try {
    const response = await fetch(`${baseUrl4}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorMsg2 = `Помилка: статус ${response.status}`;
      console.error(errorMsg2);
      return errorMsg2;
    }

    const result = await response.json();
    console.log("Результат:", result);
    return result;

  } catch (error) {
    console.error("Помилка виконання PATCH-запиту:", error.message);
    return error.message;
  }
}

patchData(1, {
  title: "Часткове оновлення заголовка"
});


// завдання 5
async function deleteData(id) {
  const baseUrl5 = "https://jsonplaceholder.typicode.com/posts";
  try {
    const response = await fetch(`${baseUrl5}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Post with id ${id} has been successfully deleted.`);
      return true;
    } else {
      console.error(`Failed to delete post with id ${id}. Status: ${response.status}`);
      return response.status;
    }
  } catch (error) {
    console.error(`Error during deletion: ${error.message}`);
    return error.message;
  }
}

deleteData(1);

