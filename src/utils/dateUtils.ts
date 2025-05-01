interface Duration {
    years: number;
    months: number;
}

export const calculateDuration = (startDate: Date, endDate: Date = new Date()): Duration => {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months };
};

export const formatDuration = (duration: Duration): string => {
    const yearText = duration.years > 0 
        ? `${duration.years} year${duration.years !== 1 ? 's' : ''}`
        : '';
    const monthText = duration.months > 0
        ? `${duration.months} month${duration.months !== 1 ? 's' : ''}`
        : '';

    if (yearText && monthText) {
        return `${yearText}, ${monthText}`;
    }
    return yearText || monthText || '0 months';
};

export const parseDate = (dateString: string): Date => {
    const [month, year] = dateString.split(' ');
    const monthIndex = new Date(Date.parse(month + " 1, 2012")).getMonth();
    return new Date(parseInt(year), monthIndex);
};

export const calculateTotalExperience = (experiences: { startDate: Date; endDate: Date }[]): Duration => {
    let totalMonths = 0;

    experiences.forEach(exp => {
        const duration = calculateDuration(exp.startDate, exp.endDate);
        totalMonths += duration.years * 12 + duration.months;
    });

    return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12
    };
}; 