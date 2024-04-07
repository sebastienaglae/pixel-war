import { Container } from "reactstrap";
import FloatMatrixHeatmap from "@components/common/FloatMatrixHeatmap";
import { useParams } from "react-router-dom";

function HeatmapPage() {
    const { id } = useParams();
  return (
      <Container className='my-5'>
          <h2 className='text-center mb-5'>Heatmap</h2>
      <FloatMatrixHeatmap id={id} />
    </Container>
  );
}

export default HeatmapPage;
