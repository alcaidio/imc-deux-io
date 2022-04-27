import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
dayjs.extend(relativeTime);

const getResult = (arr) => {
  if (!arr.length) return [];

  return arr
    .map(([id, name, size, weight, birthDate, createdDate, bmi]) => {
      return {
        id,
        name,
        size,
        weight,
        birthDate,
        createdDate: dayjs(+createdDate).toNow(true),
        bmi,
      };
    })
    .reverse();
};

export default function History() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("api/submit_data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(getResult(res.data.values));
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="History" subtitle="The BMI history over time.">
      {isLoading ? (
        <Spinner />
      ) : data.length ? (
        <TableContainer className="table" overflowY="true">
          <Table variant="normal">
            <Thead>
              <Tr>
                <Th>From</Th>
                <Th>Name</Th>
                <Th>Date of birth</Th>
                <Th isNumeric>Size (cm)</Th>
                <Th isNumeric>Weight (kg)</Th>
                <Th isNumeric>BMI (kg/m2)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((el) => (
                <Tr key={el.id}>
                  <Td>{el.createdDate}</Td>
                  <Td>{el.name}</Td>
                  <Td>{el.birthDate}</Td>
                  <Td>{el.size}</Td>
                  <Td>{el.weight}</Td>
                  <Td isNumeric>{el.bmi}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <div>No data</div>
      )}
    </Layout>
  );
}
