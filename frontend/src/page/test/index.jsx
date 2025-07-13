import { useEffect, useState } from "react";

function Test() {
const [message, setMessage] = useState('Đang tải...');

  useEffect(() => {
  fetch('http://127.0.0.1:2020/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: "Chicken breast" })
  })
    .then((res) => res.json())
    .then((data) => setMessage(data.reply))
    .catch((err) => setMessage("Lỗi kết nối với backend"));
}, []);

  return <h1>{message}</h1>;
}

export default Test;
