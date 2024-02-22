const express = require('express');
const bodyParser = require('body-parser');
const Resume = require('./models/resume'); // 引入简历模型


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // 支持JSON编码的请求体

let resumes = {}; // 模拟数据库存储简历
let nextId = 1; // 简历ID生成器

// 接收简历数据的API端点
app.post('/api/resumes', (req, res) => {
  const resumeData = req.body;
  const resume = new Resume(nextId++, resumeData.userInfo, resumeData.experience, resumeData.education, resumeData.skills);
  resumes[resume.id] = resume; // 存储简历
  res.status(201).send({ id: resume.id }); // 返回新创建的简历ID
});

// 模拟简历内容生成
app.post('/api/resumes/:id/generate', (req, res) => {
  const resumeId = req.params.id;
  const resume = resumes[resumeId];
  if (!resume) {
    return res.status(404).send({error: 'Resume not found'});
  }

  // 假设这里是调用GPT-3生成简历内容的逻辑
  const generatedContent = `这里是生成的简历内容。姓名: ${resume.userInfo.name}, 经验: ${resume.experience.length} 项...`;

  // 将生成的内容添加到简历对象
  resume.generatedContent = generatedContent;
  res.send({ generatedContent });
});
// 获取特定简历的详细信息
app.get('/api/resumes/:id', (req, res) => {
  const resumeId = req.params.id;
  const resume = resumes[resumeId];
  if (!resume) {
    return res.status(404).send({error: 'Resume not found'});
  }

  res.send(resume);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
