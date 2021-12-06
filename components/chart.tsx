import { Line } from "react-chartjs-2";
import {
    Flex,
    Spacer,
    Box,
    Heading,
    Stat,
    StatArrow,
    StatHelpText,
} from "@chakra-ui/react";

type LineChartDataProps = {
    data: {
        //Any type is ok since chartjs will parse them
        labels: any[];
        datasets: any[];
    };
};

const LineChart = ({type}:any) => {
    const data = {
        labels: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
        ],
        datasets: [
            {
                data: [
                    1, 2, 3, 4, 5, 6, 7, 7, 4, 3, 8, 9, 15, 10, 25, 20, 13, 15,
                    17, 19, 21,
                ],
                fill: false,
                borderColor: "#508080",
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },

        datasets: {
            line: {
                pointRadius: 0,
            },
        },

        scales: {
            x: {
                grid: { color: "" },
            },
            y: {
                grid: { color: "" },
            },
        },
    };
    return (
        <Box bg="#181c3c" p={5} borderRadius={15}>
            <Flex>
                <Heading mb={5} color="whiteAlpha.900" size="md">
                    {type}
                </Heading>

                <Spacer />

                <Box>
                    <Stat color="whiteAlpha.900">
                        <StatHelpText>
                            <StatArrow type="increase" />
                            200
                        </StatHelpText>
                    </Stat>
                </Box>
            </Flex>
            <Line data={data as any} options={options} />
        </Box>
    );
};

export { LineChart };
