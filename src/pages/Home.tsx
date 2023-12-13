import LineChart from "@/components/Charts/BarChart";
import Layout from "@/components/LayoutComponents/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="h-[200vh]">
        <LineChart />
      </div>
    </Layout>
  );
};

export default Home;
