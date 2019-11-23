const UserData = require('../../models/userdata');
const { transformUserdata, singleSurvey } = require('./merge');
const { userVerified } = require('../../helpers/is-verified');

module.exports = {

    userdata: async(args, req) => {
        try {
            userVerified(req);
            let userdata = await UserData.find();
            return userdata.map(async(data) => {
                return await transformUserdata(data);
            });
        } catch (error) {
            throw error;
        }
    },

    createUserData: async (args, req) => {
        try {
            userVerified(req);
            let fetchSurvey  = await singleSurvey(args.userdataInput.survey);
            if(!fetchSurvey) throw new Error("Survey Does Not Exist");
    
            let userdata = new UserData({
                user: req.userId,
                survey: fetchSurvey,
                name: args.userdataInput.name,
                phone: args.userdataInput.phone
            });
    
            await userdata.save();
    
            return await transformUserdata(userdata);
        } catch (error) {
            throw error
        }
        
    },
}