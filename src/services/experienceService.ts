import { calculateDuration, parseDate, formatDuration } from '../utils/dateUtils';

export interface Experience {
    company: string;
    position: string;
    duration: string;
    formattedDuration: string;
    location: string;
    responsibilities: string[];
    startDate: Date;
    endDate: Date;
}

export const parseExperience = async (): Promise<Experience[]> => {
    try {
        const response = await fetch('/src/data/workexperience.md');
        const text = await response.text();
        
        const companies = text.split('##').slice(1); // Skip the title
        return companies.map(company => {
            const lines = company.trim().split('\n');
            const companyName = lines[0].trim();
            
            const position = lines.find(line => line.includes('**Position**'))
                ?.split(':')[1].trim().replace(/\*\*/g, '') || '';
                
            const durationStr = lines.find(line => line.includes('**Duration**'))
                ?.split(':')[1].trim().replace(/\*\*/g, '') || '';
            
            const location = lines.find(line => line.includes('**Location**'))
                ?.split(':')[1].trim().replace(/\*\*/g, '') || '';
            
            const responsibilities = lines
                .slice(lines.indexOf('**Responsibilities**:') + 1)
                .filter(line => line.trim().startsWith('-'))
                .map(line => line.trim().replace('- ', ''));

            const [startDateStr, endDateStr] = durationStr.split(' - ');
            const startDate = parseDate(startDateStr);
            const endDate = endDateStr === 'Present' ? new Date() : parseDate(endDateStr);
            
            const duration = calculateDuration(startDate, endDate);
            const formattedDuration = formatDuration(duration);

            return {
                company: companyName,
                position,
                duration: durationStr,
                formattedDuration,
                location,
                responsibilities,
                startDate,
                endDate
            };
        });
    } catch (error) {
        console.error('Error parsing experience:', error);
        return [];
    }
}; 