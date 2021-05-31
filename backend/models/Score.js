const knex = require('./database')

exports.getScoreList = async () => {
    return knex.select().table('Score')
}

exports.findScore = async (data) => {
    return knex('Score').where({
        studentId: data.studentId,
        teacherId: data.teacherId,
        subjectId: data.subjectId,
        schoolYearId: data.schoolYearId,
        kind: data.kind,
        term: data.term
    }).first()
}

//Return an array contains all score of a student by subject in a term of a school year
exports.getSubjectScore = async (studentId, subjectId, schoolYearId, term) => {
    return knex('Score').where({
        studentId: studentId,
        subjectId: subjectId,
        schoolYearId: schoolYearId,
        term: term
    })
}

//Return an array contains all score of a student in a term of a school year
exports.getStudentScore = async (studentId, schoolYearId, term) => {
    return knex('Score').where({
        studentId: studentId,
        schoolYearId: schoolYearId,
        term: term
    })
}
/** Score type:
 * 0: Miệng 
 * 1: 15 phút
 * 2: 1 tiết
 * 3: Học kỳ
 */
exports.editScore = async (data) => {
    let students = data.students

    let res = await knex.transaction(async trx => {
        try {
            for (let i = 0; i < students.length; i++) {
                let student = students[i]

                //Check exists student
                let existStudent = trx.where('studentId', student.studentId).from('Student').first()
                if (existStudent === undefined || !existStudent) {
                    let message = `Student id = ${student.studentId} not found`
                    return Promise.reject(message)
                }

                let scores = student.scores
                for (let j = 0; j < scores.length; j++) {
                    //Check score & kind & term
                    let score = parseFloat(scores[j].score)
                    let kind = parseInt(scores[j].kind)
                    let term = parseInt(scores[j].term)

                    if (kind < 0 || kind > 3 || score < 0 || score > 10 || term < 1 || term > 2) {
                        let message = `Error with score/kind/term of student id = ${student.studentId}`
                        return Promise.reject(message)
                    }

                    //Check & update score
                    switch (scores[j].method) {
                        case "add":
                            //Check exists
                            let scoreExist = trx.where({
                                'studentId': student.studentId,
                                'schoolYearId': scores[j].schoolYearId,
                                'subjectId': scores[j].subjectId,
                                'kind': kind,
                                'term': term
                            }).from('Score')
                            if (scoreExist || scoreExist != undefined) {
                                let message = `Score existed in database`
                                return Promise.reject(message)
                            }

                            //Add
                            await trx.insert({
                                'studentId': student.studentId,
                                'teacherId': scores[j].teacherId,
                                'subjectId': scores[j].subjectId,
                                'schoolYearId': scores[j].schoolYearId,
                                'kind': kind,
                                'score': score,
                                'term': term
                            }).into('Score')
                            break;

                        case "edit":
                            let existScore = trx.where('scoreId', scores[j].scoreId).from('Score').first()
                            
                            if (existScore === undefined || !existScore) {
                                let message = `Student id = ${scores[j].scoreId} not found`
                                return Promise.reject(message)
                            }

                            await trx.where('scoreId', scores[j].scoreId).update({
                                'score': score,
                                'teacherId': scores[j].teacherId
                            })
                            break;

                        case "delete":
                            let existScore = trx.where('scoreId', scores[j].scoreId).from('Score').first()
                            
                            if (existScore === undefined || !existScore) {
                                let message = `Student id = ${scores[j].scoreId} not found`
                                return Promise.reject(message)
                            }

                            await trx.where('scoreId', scores[j].scoreId).delete()
                            break;
                        default:
                            let message = `Method not found`
                            return Promise.reject(message)
                    }

                }
            }
        } catch (error) { //Rollback
            console.log(error)
            return Promise.reject(error)
        }
    })

    return res

}

//Deprecated
// exports.createScore = async (data) => {
//     return knex('Score').insert([
//         {
//             studentId: data.studentId,
//             teacherId: data.teacherId,
//             subjectId: data.subjectId,
//             schoolYearId: data.schoolYearId,
//             kind: data.kind,
//             score: data.score,
//             term: data.term
//         }
//     ])
// }

// exports.deleteScore = async (scoreId) => {
//     return knex('Score').where('scoreId', scoreId).del()
// }

