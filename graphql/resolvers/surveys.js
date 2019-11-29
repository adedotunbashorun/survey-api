const Survey = require('../../models/survey');
const User = require('../../models/user');
const { transformSurvey } = require('./merge');
const { userVerified } = require('../../helpers/is-verified');

module.exports = {
    surveys: async(args, req) => {
        try {
            userVerified(req);
            let surveys = await Survey.find();
            return surveys.map(async(survey) => {
                return await transformSurvey(survey);
            });
        } catch (error) {
            throw error;
        }
    },

    createSurvey: async(args,req) => {
        try {
            userVerified(req);
            const survey =  new Survey({
                answer: args.surveyInput.answer,
                creator: req.userId,
                userdata: args.surveyInput.userdata
            });

            await survey.save();

            let createdSurvey = await transformSurvey(survey);

            let creator = await User.findOne({_id: req.userId});
            creator.createdSurveys.push(survey._doc);
            await creator.save();

            return createdSurvey;
        } catch (error) {
            throw error;
        }
    },
}