import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const TabelaZaRad = () => {
  const data = [
    {
      category: 'Literary Works',
      entropy: '8.2492',
      equitability: '0.7649',
      tokenNumber: '1842.5',
      topToken: ',',
      topWord: 'the'
    },
    {
      category: 'Research Papers',
      entropy: '8.3177',
      equitability: '0.8054',
      tokenNumber: '1335.8',
      topToken: 'the',
      topWord: 'the'
    },
    {
      category: 'Newspaper Articles',
      entropy: '7.4974',
      equitability: '0.8714',
      tokenNumber: '395.8',
      topToken: 'the',
      topWord: 'the'
    }
  ];

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Category</Th>
          <Th>Entropy</Th>
          <Th>Shannon's Equitability</Th>
          <Th>Token Number</Th>
          <Th>Top Token</Th>
          <Th>Top Word</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            <Td>{row.category}</Td>
            <Td>{row.entropy}</Td>
            <Td>{row.equitability}</Td>
            <Td>{row.tokenNumber}</Td>
            <Td>{row.topToken}</Td>
            <Td>{row.topWord}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TabelaZaRad;
