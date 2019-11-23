const Survey = require('../../models/survey');
const User = require('../../models/user');
const UserData = require('../../models/userdata');

const transformUser = async user => {
    return {
        ...user._doc,
        _id: user.id,
        createdSurveys: surveys.bind(this, user._doc.createdSurveys)
    }
}

const transformSurvey = async survey => {
    return {
        ...survey._doc,
        _id: survey.id,
        creator: await user.bind(this, survey._doc.creator)
    };
}

const transformUserdata = async userdata => {
    return {
        ...userdata._doc,
        _id: userdata.id,
        user: await user.bind(this, booking._doc.user),
        survey: await singleSurvey.bind(this, userdata._doc.survey),
        name: userdata.name,
        phone:userdata.phone
    }
}

const surveys = async(surveyIds) => {
    try {
        let surveys = await Survey.find({_id: { $in: surveyIds}});
        return surveys.map(async(survey) => {
            return await transformSurvey(survey);
        })
    } catch (error) {
        throw error 
    }
}

const singleSurvey = async(surveyId) => {
    try {
        let survey = await Survey.findById(surveyId);
        return await transformSurvey(survey);
    } catch (error) {
        throw error 
    }
}

const user = async(userId) => {
    try {
        let user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            createdSurveys: await surveys.bind(this, user.createdSurveys)
        }
    } catch (error) {
      throw error  
    }
}

const userdata = async() => {
    try {
        let userdata = await UserData.find();
        return userdata.map(async(data) => {
            return await transformUserdata(data);
        });
    } catch (error) {
        throw error 
    }
}


exports.surveys = surveys;
exports.singleSurvey = singleSurvey;
exports.user = user;
exports.userdata = userdata;
exports.transformSurvey = transformSurvey;
exports.transformUserdata = transformUserdata;
exports.transformUser = transformUser;