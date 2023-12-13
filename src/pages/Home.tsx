import LineChart from "@/components/Charts/BarChart";
import Layout from "@/components/LayoutComponents/Layout";
import { WebCamComponent } from "@/components/webcam/webcam";

const Home = () => {
  return (
    <Layout>
      <div className="h-[200vh]">
        <LineChart />
        <WebCamComponent />
      </div>
    </Layout>
  );
};

export default Home;
