import CohortManager from "../src/CohortManager.js"

describe("CohortManager", () => {
    let cohortManager
    const studentOne =  {firstName: "Alistair", lastName: "Henshaw", gitHub: "Alistair1080", email: "alistairhenshaw@gmail.com"}
    const studentOneWithId = {firstName: "Alistair", lastName: "Henshaw", gitHub: "Alistair1080", email: "alistairhenshaw@gmail.com", studentId: 1}

    beforeEach(() => {
        cohortManager = new CohortManager()
        cohortManager.createCohort("alpha")
       
    })

    it("should exist", () => {
        expect(cohortManager).toBeInstanceOf(CohortManager)
    })

    it("should be able to create a cohort", () => {
        expect(cohortManager.cohorts).toEqual([{name: "alpha", students: []}])
    })

    it("should throw an error if the name isn't a string when creating a cohort", () => {
        expect(() => cohortManager.createCohort(42)).toThrow("Name must be a string")
    })

    it("should throw an error if no name value given when creating a cohort", () => {
        expect(() => cohortManager.createCohort()).toThrow("No value given")
    })

    it("should be able to search for a cohort", () => {
        expect(cohortManager.search("alpha")).toEqual({name: "alpha", students: []})
    })

    it("should throw an error if searching for a cohort which doesn't exist", () => {
        expect(() => cohortManager.search("abc")).toThrow("This cohort doesn't exist")
    })

    it("should be able to remove a cohort", () => {
        cohortManager.removeCohort("alpha")
        expect(cohortManager.cohorts).toEqual([])
    })

    it("should throw an error when trying to remove an cohort which doesn't exist", () => {
        expect(() => cohortManager.removeCohort("bravo")).toThrow("This cohort doesn't exist")
        expect(cohortManager.cohorts).toEqual([{name: "alpha", students: []}])
    })

    it("be able to add a student to a cohort", () => {
        cohortManager.addStudent("alpha", studentOne)
        expect(cohortManager.cohorts).toEqual([{name: "alpha", students: [studentOneWithId]}])
    })

    it("should return an error if cohort doesn't exist when trying to add student", () => {
        expect(() => cohortManager.addStudent("john", studentOne)).toThrow("This cohort doesn't exist")
    })

    it("student information incorrect when trying to add a student will result in error", () => {
        expect(() => cohortManager.addStudent("alpha", {})).toThrow("Student object needs an: firstName, lastName, github, email")
    })
})