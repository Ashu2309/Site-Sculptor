import mongoose from "mongoose";

export const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "example123"
    },
    name: {
        type: String,
        default: "user"
    },
    profession: {
        type: Array,
        default: ["Web Developer"]
    },
    profileImage: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: "Currently pursuing my B.E degree (Computer Science) from SPPU, India. I'm highly interested in startups, entrepreneurship and technology."
    },
    //About us
    AboutusImage: {
        type: String,
        default: ""
    },
    showEmail: {
        type: Array,
        default: ["example@gmail.com"]
    },
    address: { type: String, default: "Pune" },
    degree: { type: String, default: "BTech" },
    job: { type: String, default: "Web Developer" },
    organization: { type: String, default: "Not Working" },
    birthdate: { type: String, default: "Not Working" },
    course: { type: String, default: "Not Working" },
    institute: { type: String, default: "Not Working" },
    aboutusDescription: {
        type: String,
        default: "E&TC Engineering student looking to obtain the position of software developer intern. Bringing excellent troubleshooting skills and ability to engineer responsive solutions after analyzing codes. I want to work with an organization that can give me ample opportunities to grow so that i will be able to help in the growth of that organization and will be able to enhance my skills and my capabilities."
    },

    mainColor: { type: String },
    background: { type: String },
    mainBackground: { type: String },
    mainBackground2: { type: String },

    textStyle: { type: String },
    textColor: { type: String },
    headColor: { type: String },


    intrest: { type: Array, default: [" Mobile App Development ", "Book Reading", "Movies"] },

    //experiences
    experience: [
        {
            title: { type: String, default: "Microsoft" },
            company: { type: String },
            companyLocation: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            description: { type: String },
        },
    ],
    projects: [{
        title: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        description: { type: String, required: true },
        images: [{ type: String, required: true }],
        technologiesUsed: [{ type: String, required: true }],
        role: { type: String, required: true },
        outcomes: { type: String, required: true },
    },],
    skills: [
        {
            title: { type: String, required: true },
            experience: { type: String },
            skillsname: [
                {
                    name: { type: String, required: true },
                    percentage: { type: Number, default: 0 }, // Add percentage field
                }
            ]
        },
    ],
    links: [{
        linkName: { type: String },
        linkUrl: { type: String, required: true }
    }]

});

export default mongoose.model.Profiles || mongoose.model('Profile', ProfileSchema);