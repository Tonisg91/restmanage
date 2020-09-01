class DateService {
    constructor() {
        this.date = new Date
        this.day = this.date.getDate()
        this.month = this.date.getMonth() + 1
    }

    twoDigits(date) {
        return date < 10 ? `0${date}` : `${date}`
    }

    MMDD() {
        return `${this.twoDigits(this.month)}${this.twoDigits(this.day)}`
    }

    MM() {
        return this.twoDigits(this.month)
    }

    DD() {
        return this.twoDigits(this.day)
    }

}

module.exports = new DateService()