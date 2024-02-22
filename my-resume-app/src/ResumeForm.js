import React, { useState } from 'react';

function ResumeForm() {
  const [name, setName] = useState('');
  // 可以为表单的每个字段添加更多的状态

  const handleSubmit = (event) => {
  event.preventDefault();
  fetch('http://localhost:3000/api/resumes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userInfo: { name }, // 根据后端API需求，添加更多字段
      // experience, education, skills等
    }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
};


  return (
    <form onSubmit={handleSubmit}>
      <label>
        姓名:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {/* 添加更多的表单字段 */}
      <button type="submit">提交简历</button>
    </form>
  );
}

export default ResumeForm;
