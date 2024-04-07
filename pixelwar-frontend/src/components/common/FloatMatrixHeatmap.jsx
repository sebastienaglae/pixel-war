import Plot from "react-plotly.js";
import { useApi } from "@hooks/api";

function FloatMatrixHeatmap({ id }) {
  const { loading, data } = useApi(`/boards/${id}/heatmap`);
  const matrix = [
    {
      z: data,
      type: "heatmap",
    },
  ];

  const layout = {
    title: "Pixel Board Heatmap",
    xaxis: { title: "X Axis" },
    yaxis: { title: "Y Axis" },
  };

  return (
    <div className='d-flex h-100 justify-content-center'>
      {loading && <p>Loading...</p>}
      <div style={{ width: "100%", height: "100%" }}>
        <Plot
          data={matrix}
          layout={layout}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

export default FloatMatrixHeatmap;
