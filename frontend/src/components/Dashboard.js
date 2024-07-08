// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [statistics, setStatistics] = useState({});
//   const [barChartData, setBarChartData] = useState({});
//   const [pieChartData, setPieChartData] = useState({});
//   const [month, setMonth] = useState("03"); // Default to March
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const response = await axios.get(
//         `http://localhost:5000/api/transactions/${month}`,
//         {
//           params: { search, page, perPage },
//         }
//       );
//       setTransactions(response.data);
//     };

//     const fetchStatistics = async () => {
//       const response = await axios.get(
//         `http://localhost:5000/api/statistics/${month}`
//       );
//       setStatistics(response.data);
//     };

//     const fetchBarChartData = async () => {
//       const response = await axios.get(
//         `http://localhost:5000/api/barchart/${month}`
//       );
//       if (response.data) {
//         setBarChartData({
//           labels: response.data.map((item) => item.range),
//           datasets: [
//             {
//               label: "Number of Items",
//               data: response.data.map((item) => item.count),
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//             },
//           ],
//         });
//       }
//     };

//     const fetchPieChartData = async () => {
//       const response = await axios.get(
//         `http://localhost:5000/api/piechart/${month}`
//       );
//       if (response.data) {
//         setPieChartData({
//           labels: response.data.map((item) => item.category),
//           datasets: [
//             {
//               label: "Number of Items",
//               data: response.data.map((item) => item.count),
//               backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//             },
//           ],
//         });
//       }
//     };

//     fetchTransactions();
//     fetchStatistics();
//     fetchBarChartData();
//     fetchPieChartData();
//   }, [month, search, page, perPage]);

//   return (
//     <div>
//       <h1>Transactions Dashboard</h1>
//       <div>
//         <label>Month:</label>
//         <select value={month} onChange={(e) => setMonth(e.target.value)}>
//           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
//             <option key={m} value={m}>
//               {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Search transactions"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Date of Sale</th>
//             <th>Sold</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction) => (
//             <tr key={transaction._id}>
//               <td>{transaction.title}</td>
//               <td>{transaction.description}</td>
//               <td>{transaction.price}</td>
//               <td>{transaction.category}</td>
//               <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
//               <td>{transaction.sold ? "Yes" : "No"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         <button onClick={() => setPage((page) => Math.max(page - 1, 1))}>
//           Previous
//         </button>
//         <button onClick={() => setPage((page) => page + 1)}>Next</button>
//       </div>
//       <div>
//         <h2>Statistics</h2>
//         <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
//         <p>Total Sold Items: {statistics.totalSoldItems}</p>
//         <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
//       </div>
//       <div>
//         <h2>Bar Chart</h2>
//         <Bar data={barChartData} />
//       </div>
//       <div>
//         <h2>Pie Chart</h2>
//         <Pie data={pieChartData} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [month, setMonth] = useState("03"); // Default to March
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/transactions/${month}`,
          {
            params: { search, page, perPage },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/statistics/${month}`
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/barchart/${month}`
        );
        if (response.data) {
          setBarChartData({
            labels: response.data.map((item) => item.range),
            datasets: [
              {
                label: "Number of Items",
                data: response.data.map((item) => item.count),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/piechart/${month}`
        );
        if (response.data) {
          setPieChartData({
            labels: response.data.map((item) => item.category),
            datasets: [
              {
                label: "Number of Items",
                data: response.data.map((item) => item.count),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    setLoading(true);
    Promise.all([
      fetchTransactions(),
      fetchStatistics(),
      fetchBarChartData(),
      fetchPieChartData(),
    ]).then(() => setLoading(false));
  }, [month, search, page, perPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <div>
        <label>Month:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
            <option key={m} value={m.toString().padStart(2, "0")}>
              {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage((page) => Math.max(page - 1, 1))}>
          Previous
        </button>
        <button onClick={() => setPage((page) => page + 1)}>Next</button>
      </div>
      <div>
        <h2>Statistics</h2>
        <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
      <div>
        <h2>Bar Chart</h2>
        {barChartData.labels ? <Bar data={barChartData} /> : <p>No data</p>}
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
        {pieChartData.labels ? (
          <Pie
            data={pieChartData}
            options={{
              // responsive: true,
              // maintainAspectRatio: false,
              // aspectRatio: 1, // Adjust as needed for circular shape
              plugins: {
                legend: {
                  position: "top",
                  // Adjust legend position
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label =
                        pieChartData.labels[tooltipItem.index] || "";
                      const value =
                        pieChartData.datasets[0].data[tooltipItem.index];
                      return `${label}: ${value}`;
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
