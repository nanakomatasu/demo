// document.querySelector("#logout").addEventListener("click", () => {
//   localStorage.clear();
// });
async function getBack() {
  let token = localStorage.getItem("token");
  console.log(token);
  const res = await axios({
    method: "get",
    url: "/dashboard",
  });
  const arr = res.data.overview;
  const arr1 = res.data.year;
  console.log(arr1);
  var myChart = echarts.init(document.getElementById("line"));
  var option = {
    title: {
      text: "2022全学科薪资走势",
      left: "2%",
      top: "2%",
    },
    xAxis: {
      type: "category",
      data: arr1.map((item) => {
        return item.month;
      }),
      axisLine: {
        lineStyle: {
          color: "#999",
          type: "dashed",
        },
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "15%",
      top: "15%",
      right: "15%",
      bottom: "15%",
    },
    series: [
      {
        data: arr1.map((item) => {
          return item.salary;
        }),
        type: "line",
        smooth: true,
        symbolSize: "10",
        lineStyle: {
          width: 5,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#92c6ff", // 0% 处的颜色
              },
              {
                offset: 0.6,
                color: "#fff", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
    color: ["#62afff"],
  };
  myChart.setOption(option);
  for (const k in arr) {
    document.querySelector(`[name=${k}]`).innerHTML = arr[k];
  }
}
getBack();
document.querySelector("#logout").addEventListener("click", () => {
  localStorage.clear();
  getBack();
});
const username = localStorage.getItem("username");
console.log(username);
const name1 = document.querySelector(".d-lg-block .font-weight-bold");

name1 && (name1.innerHTML = username);
