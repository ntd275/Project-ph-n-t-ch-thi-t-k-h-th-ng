const knex = require('./database')

exports.getSchoolYearList = async (perpage, page) => {
    return await knex.select().table('SchoolYear').paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}

//Get current school year is that has biggest schoolYearId (added latest)
exports.getSchoolYear = async () => {
    let subQuery = await knex('SchoolYear').max('beginSemester1')
    return await knex('SchoolYear').where('beginSemester1', subQuery).first()
}

exports.getSchoolYearById = async (schoolYearId) => {
    return await knex('SchoolYear').where('schoolYearId', schoolYearId).first()
}

exports.createSchoolYear = async (schoolYear) => {
    return await knex('SchoolYear').insert([
        {
            schoolYear: schoolYear.schoolYear,
            beginSemester1: schoolYear.beginSemester1,
            endSemester1: schoolYear.endSemester1,
            beginSemester2: schoolYear.beginSemester2,
            endSemester2: schoolYear.endSemester2,
            description: schoolYear.description
        }
    ])
}

exports.updateSchoolYear = async (schoolYear) => {
    return await knex('SchoolYear')
        .where('schoolYearId', schoolYear.schoolYearId)
        .update({
            schoolYear: schoolYear.schoolYear,
            beginSemester1: schoolYear.beginSemester1,
            endSemester1: schoolYear.endSemester1,
            beginSemester2: schoolYear.beginSemester2,
            endSemester2: schoolYear.endSemester2,
            description: schoolYear.description
        })
}

exports.deleteSchoolYear = async (schoolYearId) => {
    return await knex('SchoolYear').where('schoolYearId', schoolYearId).del()
}

