import joi from "joi"
import { generalFiled, headers } from "../../utils/generalField.js"



// *************************************addJob*********************************************
export const addJob = {
    body: joi.object({
        jobTitle: joi.string().required(),
        jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid').required(),
        workingTime: joi.string().valid('part-time', 'full-time').required(),
        seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
        jobDescription: joi.string().required(),
        technicalSkills: joi.array().items(joi.string().required()).required(),
        softSkills: joi.array().items(joi.string().required()).required(),
        addedBy: generalFiled.id,
    }).required(),
    headers: headers.headers.required()
}

// *************************************updateJob*********************************************
export const updateJob = {
    body: joi.object({
        jobTitle: joi.string(),
        jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid'),
        workingTime: joi.string().valid('part-time', 'full-time'),
        seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
        jobDescription: joi.string(),
        technicalSkills: joi.array().items(joi.string()),
        softSkills: joi.array().items(joi.string()),
        addedBy: generalFiled.id,
    }).required(),
    params: joi.object({
        id: generalFiled.id.required()
    }).required(),
    headers: headers.headers.required()
}


// *************************************deleteJob*********************************************
export const deleteJob = {
    params: joi.object({
        id: generalFiled.id.required()
    }).required(),
    headers: headers.headers.required()
}

// *************************************getJobCompany*********************************************
export const getJobCompany = {
    query: joi.object({
        name: joi.string().min(2).max(50).alphanum().required()
    }).required(),
    headers: headers.headers.required()
}

// *************************************filterJobs*********************************************
export const filterJobs = {
    query: joi.object({
        jobTitle: joi.string(),
        jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid'),
        workingTime: joi.string().valid('part-time', 'full-time'),
        seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
        technicalSkills: joi.array().items(joi.string()),
        softSkills: joi.array().items(joi.string()),
    }).required(),
    headers: headers.headers.required()
}


// *************************************applyJob*********************************************
export const applyJob = {
    body: joi.object({
        userSoftSkills: joi.array().items(joi.string().required()).required(),
        userTechSkills: joi.array().items(joi.string().required()).required(),
    }).required(),
    params: joi.object({
        jobId: generalFiled.id.required()
    }).required(),
    file: generalFiled.file.required(),
}