const notFound = require('./404')
const authRouter = require('./authRoutes')
const accountRouter = require('./accountRoutes')
const schoolYearRouter = require('./schoolYearRoutes')
const specialistTeamRouter = require('./specialistTeamRoutes')
const classRouter = require('./classRoutes')
const subjectRouter = require('./subjectRoutes')
const teacherRouter = require('./teacherRoutes')
const teachingAssignmentRouter = require('./teachingAssignmentRoutes')
const studentAssignmentRouter = require('./studentAssignmentRoutes')
const specialistAssignmentRouter = require('./specialistAssignmentRoutes')
const homeroomTeacherAssignmentRouter = require('./homeroomTeacherAssignmentRoutes')
const studentRouter = require('./studentRoutes')
const scoreLockRouter = require('./scoreLockRoutes')
const scoreRouter = require('./scoreRoutes')
const conductRouter = require('./conductRoutes')
const classReportRouter = require('./classReportRoutes')

module.exports = function (app) {
  app.use('/auth', authRouter)
  app.use('/account', accountRouter)
  app.use('/school-year', schoolYearRouter)
  app.use('/teacher', teacherRouter)
  app.use('/student', studentRouter)
  app.use('/specialist-team', specialistTeamRouter)
  app.use('/class', classRouter)
  app.use('/subject', subjectRouter)
  app.use('/score', scoreRouter)
  app.use('/score-lock', scoreLockRouter)
  app.use('/conduct', conductRouter)
  app.use('/teaching-assignment', teachingAssignmentRouter)
  app.use('/student-assignment', studentAssignmentRouter)
  app.use('/specialist-assignment', specialistAssignmentRouter)
  app.use('/homeroom-teacher-assignment', homeroomTeacherAssignmentRouter)
  app.use('/class-report', classReportRouter)

  app.use(notFound)
}