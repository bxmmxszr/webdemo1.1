// functions/models/TranslationRecord.js
const mongoose = require('mongoose');

const translationRecordSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true }, // 关联用户
    passageId: { type: String, required: true }, // 关联短文ID
    sentence: { type: String, required: true }, // 英文原句
    userTranslation: { type: String, required: true }, // 用户翻译
    aiTranslation: { type: String, required: true }, // AI翻译
    score: { type: Number, default: null }, // AI与人工翻译对比的评分（0-10分）
    createdAt: { type: Date, default: Date.now } // 记录创建时间
});

// 使用 mongoose.models 检查模型是否已存在，防止重复编译
module.exports = mongoose.models.TranslationRecord || mongoose.model('TranslationRecord', translationRecordSchema);
