class Resume {
  constructor(id, userInfo, experience, education, skills) {
    this.id = id;
    this.userInfo = userInfo; // 包含姓名、邮箱等
    this.experience = experience; // 工作经验列表
    this.education = education; // 教育背景列表
    this.skills = skills; // 技能列表
  }
}

module.exports = Resume;
