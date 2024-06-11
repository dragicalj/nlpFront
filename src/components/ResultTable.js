import React, { useContext, useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { AnalysisContext } from './AnalysisContext'; 

const ResultTable = () => {
    const { selectedCategories, selectedCriteria, showResults } = useContext(AnalysisContext);
    const [categoryStatistics, setCategoryStatistics] = useState([]);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchCategoryStatistics = async () => {
            try {
                const response = await fetch(`http://138.68.107.72:8000/api/category_statistics/${userId}/`);
                const data = await response.json();
                setCategoryStatistics(data);
            } catch (error) {
                console.error('Error fetching category statistics:', error);
            }
        };
    
        if (showResults) {
            fetchCategoryStatistics();
        }
    }, [showResults]);

    const getCategoryData = (categoryName, criteria) => {
        const category = categoryStatistics.find(cat => cat.name === categoryName);
        if (!category) return 'N/A';

        switch (criteria) {
            case 'Entropy':
                return category.mean_entropy.toFixed(2);
            case 'Shannon Equitability':
                return category.mean_shannon_value.toFixed(2);
            case 'Token Number':
                return category.mean_num_tokens.toFixed(2);
            case 'Top Token':
                return category.top_token;
            case 'Top Word':
                return category.top_word;
            default:
                return 'N/A';
        }
    };

    const rows = selectedCategories.map((category) => {
        const values = selectedCriteria.map((criteria) => getCategoryData(category, criteria));
        return { category, values };
    });

    if (!showResults) {
        return null;
    }

    return (
        <Box overflowX="auto">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Category</Th>
                        {selectedCriteria.map((criteria) => (
                            <Th key={criteria}>{criteria}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {rows.map((row, index) => (
                        <Tr key={index}>
                            <Td>{row.category}</Td>
                            {row.values.map((value, valueIndex) => (
                                <Td key={valueIndex}>{value}</Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default ResultTable;