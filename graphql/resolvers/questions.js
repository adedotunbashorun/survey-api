const Question = require('../../models/question');
const User = require('../../models/user');
const { transformQuestion } = require('./merge');
const { userVerified } = require('../../helpers/is-verified');

module.exports = {
    questions: async(args, req) => {
        try {
            userVerified(req);
            let questions = await Question.find();
            return questions.map(async(question) => {
                return await transformQuestion(question);
            });
        } catch (error) {
            throw error;
        }
    },

    createQuestion: async(args,req) => {
        try {
            userVerified(req);
            const question =  new Question({
                question1: args.questionInput.question1,
                question2: args.questionInput.question2,
                question3: args.questionInput.question3,
                question4: args.questionInput.question4,
                question5: args.questionInput.question5,
                creator: req.userId,
                userdata: args.questionInput.userdata
            });

            await question.save();

            let createdQuestion = await transformQuestion(question);

            let creator = await User.findOne({_id: req.userId});
            creator.createdQuestions.push(question._doc);
            await creator.save();

            return createdQuestion;
        } catch (error) {
            throw error;
        }
    },
}