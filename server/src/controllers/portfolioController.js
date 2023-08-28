import ProfileModel from "../model/Profile.model.js";

export const getdata = async (req, res) => {
    try {
        const { user } = req.params;
        const data = await ProfileModel.findOne({ "username": user });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
export const setdata = async (req, res) => {

    try {
        const body = req.body.input;
        const details = new ProfileModel(body);
        console.log(details)
        details.save().then((result) => res.status(200).send("data filled successfully"))
            .catch((error) => res.status(500).send({ error }));
    } catch (error) {
        res.status(500).send({ error });

    }
}
export const updatedata = async (req, res) => {

    try {
        const { user } = req.params;
        const updatedBody = req.body.input;
        const options = { new: true, useFindAndModify: false };
        const updatedData = await ProfileModel.findOneAndUpdate({ "username": user }, updatedBody, options);
        console.log(updatedData)
        if (!updatedData) {
            return res.status(404).send("Profile not found");
        }

        return res.status(200).send("Profile updated successfully");
    } catch (error) {
        return res.status(404).send("Couldn't Update");
    }
}

export const deletedata = async (req, res) => {
    try {
        const { user } = req.params;
        const deleteData = await ProfileModel.findOneAndDelete({ "name": user });
        if (!deleteData) {
            return res.status(404).send("Profile not found");
        }

        return res.status(200).send("Profile Deleted Successfully");
    } catch (error) {
        return res.status(500).send("Couldn't Delete");

    }
}

// ==================expereince-===========================

export const setexpdata = async (req, res) => {

    try {
        const { user } = req.params;
        const newExperience = req.body.input;
        console.log(newExperience)
        const options = { new: true, useFindAndModify: false };
        const updatedData = await ProfileModel.findOneAndUpdate(
            { "username": user },
            { $push: { experience: newExperience } },
            options
        );

        if (!updatedData) {
            return res.status(404).send("Profile not found");
        }

        return res.status(200).send("Experience created successfully");
    } catch (error) {
        return res.status(404).send("Couldn't create experience");
    }
}

export const updateexpdata = async (req, res) => {
    try {
        const { user } = req.params;
        const { update } = req.body; // update is an object with fields to be updated
        const { indexno } = req.body; // get the _id field of the update object

        const options = { new: true, useFindAndModify: false };
        const updatedData = await ProfileModel.findOneAndUpdate(
            { "username": user },
            { $set: { [`experience.${indexno}`]: update } },
            options
        );

        if (!updatedData) {
            return res.status(404).send("Profile not found");
        }

        return res.status(200).send("Experience updated successfully");
    } catch (error) {
        console.log(error)
        return res.status(404).send("Couldn't update experience");
    }
}

export const deleteexpdata = async (req, res) => {
    try {
        const { user, index } = req.params;
        console.log(user, index)
        const deleteData = await ProfileModel.findOneAndUpdate(
            { "username": user },
            { $unset: { [`experience.${index}`]: 1 } }
        );

        if (!deleteData) {
            return res.status(404).send("Profile not found");
        }

        await ProfileModel.findOneAndUpdate(
            { "username": user },
            { $pull: { "experience": null } },
            { new: true }
        );

        return res.status(200).send("Profile Deleted Successfully");


        return res.status(200).send("Profile Deleted Successfully");
    } catch (error) {
        return res.status(500).send("Couldn't Delete");

    }
}


// ==================project-===========================

export const setprojectdata = async (req, res) => {

    try {
        const { user } = req.params;
        const newproject = req.body.input;
        console.log(newproject)
        const options = { new: true, useFindAndModify: false };
        const updatedData = await ProfileModel.findOneAndUpdate(
            { "username": user },
            { $push: { projects: newproject } },
            options
        );

        if (!updatedData) {
            return res.status(404).send("Profile not found");
        }

        return res.status(200).send("project created successfully");
    } catch (error) {
        return res.status(404).send("Couldn't create project");
    }
}

export const updateprojectdata = async (req, res) => {
    try {
        const { user } = req.params;
        const { update } = req.body; // update is an object with fields to be updated
        const { indexno } = req.body; // get the _id field of the update object

        const options = { useFindAndModify: false };
        const updatedData = await ProfileModel.findOneAndUpdate(
            { "username": user },
            { $set: { [`projects.${indexno}`]: update } },
            options
        );

        if (!updatedData) {
            return res.status(404).send("Profile not found");
        }

        return res.status(200).send("project updated successfully");
    } catch (error) {
        return res.status(404).send("Couldn't update project");
    }
}

export const deleteprojectdata = async (req, res) => {
    try {
        const { user, index } = req.params;
        console.log(user, index)
        const deleteData = await ProfileModel.findOneAndUpdate(
            { "username": user },
            { $unset: { [`projects.${index}`]: 1 } }
        );

        if (!deleteData) {
            return res.status(404).send("Profile not found");
        }

        await ProfileModel.findOneAndUpdate(
            { "username": user },
            { $pull: { "projects": null } },
            { new: true }
        );

        return res.status(200).send("Profile Deleted Successfully");
    } catch (error) {
        return res.status(500).send("Couldn't Delete");

    }
}