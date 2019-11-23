const Survey = require('../../models/survey');
const User = require('../../models/user');
const { transformSurvey } = require('./merge');
const { userVerified } = require('../../helpers/is-verified');

module.exports = {
    surveys: async(args, req) => {
        try {
            // userVerified(req);
            let surveys = await Survey.find();
            return surveys.map(async(survey) => {
                return await transformEvent(survey);
            });
        } catch (error) {
            throw error;
        }
    },

    createSurvey: async(args,req) => {
        try {
            userVerified(req);
            const survey =  new Survey({
                question1: args.surveyInput.question1,
                question2: args.surveyInput.question2,
                question3: args.surveyInput.question3,
                question4: args.surveyInput.question4,
                question5: args.surveyInput.question5,
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