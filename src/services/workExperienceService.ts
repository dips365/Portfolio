import React, { useEffect, useState } from 'react';
import { calculateDuration, parseDate, formatDuration } from '../utils/dateUtils';

export interface WorkExperience {
    company: string;
    position: string;
    duration: string;
    formattedDuration: string;
    location: string;
    responsibilities: string[];
    startDate: Date;
    endDate: Date;
}

export const parseWorkExperience = async (): Promise<WorkExperience[]> => {
    try {
        // Read the markdown file
        const response = await fetch('/content/workexperience.md');
        const text = await response.text();

        // Split the content by sections (##)
        const sections = text.split('##').slice(1); // Skip the title

        return sections.map(section => {
            const lines = section.trim().split('\n');
            const companyName = lines[0].trim();

            // Extract data using helper function
            const getFieldValue = (field: string): string => {
                const line = lines.find(l => l.includes(`**${field}**`));
                return line ? line.split(':')[1].trim().replace(/\*\*/g, '') : '';
            };

            const position = getFieldValue('Position');
            const durationStr = getFieldValue('Duration');
            const location = getFieldValue('Location');

            // Extract responsibilities
            const responsibilitiesStartIndex = lines.findIndex(l => l.includes('**Responsibilities**:'));
            const responsibilities = lines
                .slice(responsibilitiesStartIndex + 1)
                .filter(line => line.trim().startsWith('-'))
                .map(line => line.trim().replace('- ', ''));

            // Parse dates and calculate duration
            const [startDateStr, endDateStr] = durationStr.split(' - ');
            const startDate = parseDate(startDateStr);
            const endDate = endDateStr === 'Present' ? new Date() : parseDate(endDateStr);
            const duration = calculateDuration(startDate, endDate);

            return {
                company: companyName,
                position,
                duration: durationStr,
                formattedDuration: formatDuration(duration),
                location,
                responsibilities,
                startDate,
                endDate
            };
        });
    } catch (error) {
        console.error('Error parsing work experience:', error);
        return [];
    }
}; 